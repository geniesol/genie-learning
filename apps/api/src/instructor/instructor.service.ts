import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@genie/db';

@Injectable()
export class InstructorService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const totalStudents = await this.prisma.user.count({
      where: { role: 'student' },
    });
    
    const activeEnrollments = await this.prisma.enrollment.count();
    
    const totalRevenue = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'success' },
    });

    const recentSubmissions = await this.prisma.progress.count({
      where: {
        data: {
          not: Prisma.JsonNull,
        },
      },
    });

    return {
      totalStudents,
      activeEnrollments,
      revenue: Number(totalRevenue._sum.amount) || 0,
      submissionsPending: recentSubmissions,
    };
  }

  async getAllStudents() {
    return this.prisma.user.findMany({
      where: { role: 'student' },
      select: {
        id: true,
        email: true,
        createdAt: true,
        enrollments: {
          include: {
            course: true,
          },
        },
        progress: {
          orderBy: { updatedAt: 'desc' },
          take: 1,
        },
      },
    });
  }

  async getSubmissions() {
    return this.prisma.progress.findMany({
      where: {
        data: {
          not: Prisma.JsonNull,
        },
      },
      include: {
        user: {
          select: {
            email: true,
          },
        },
        lesson: {
          include: {
            section: {
              include: {
                course: true,
              },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
