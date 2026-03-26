import { Controller, Post, Body, UseGuards, Request, Headers } from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-checkout-session')
  async createCheckoutSession(
    @Request() req,
    @Body('courseId') courseId: string,
    @Body('region') region: string,
  ) {
    return this.paymentsService.createCheckoutSession(req.user.userId, courseId, region || 'US');
  }

  @Post('webhook')
  async handleWebhook(
    @Headers('stripe-signature') signature: string,
    @Request() req: RawBodyRequest<ExpressRequest>,
  ) {
    return this.paymentsService.handleWebhook(signature, (req as any).rawBody!);
  }
}
