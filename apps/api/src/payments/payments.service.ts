import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    const secretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined');
    }
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2025-01-27ts' as any, // Use latest stable
    });
  }

  async createCheckoutSession(userId: string, courseId: string, region: string) {
    const pricing = await this.prisma.coursePricing.findUnique({
      where: {
        courseId_region: { courseId, region },
      },
      include: {
        course: true,
      },
    });

    if (!pricing) {
      throw new BadRequestException('Pricing not found for this course and region');
    }

    const priceAmount = pricing.discountPrice ? pricing.discountPrice.toNumber() : pricing.price.toNumber();

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: pricing.currency.toLowerCase(),
            product_data: {
              name: pricing.course.title,
              description: `Enrollment for ${pricing.course.title}`,
            },
            unit_amount: Math.round(priceAmount * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${this.configService.get('FRONTEND_URL')}/dashboard?payment=success`,
      cancel_url: `${this.configService.get('FRONTEND_URL')}/courses/${pricing.course.slug}?payment=cancelled`,
      metadata: {
        userId,
        courseId,
      },
      customer_email: (await this.prisma.user.findUnique({ where: { id: userId } }))?.email,
    });

    return { url: session.url };
  }

  async handleWebhook(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret!,
      );
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const { userId, courseId } = session.metadata || {};

      if (userId && courseId) {
        // Enroll student
        await this.prisma.enrollment.upsert({
          where: {
            userId_courseId: { userId, courseId },
          },
          update: {
            status: 'active',
          },
          create: {
            userId,
            courseId,
            status: 'active',
          },
        });

        // Log payment
        await this.prisma.payment.create({
          data: {
            userId,
            amount: session.amount_total! / 100,
            currency: session.currency!.toUpperCase(),
            gateway: 'stripe',
            gatewayPaymentId: session.id,
            status: 'success',
          },
        });
      }
    }

    return { received: true };
  }
}
