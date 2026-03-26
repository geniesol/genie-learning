import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalUsers,
      totalRevenue,
      totalEnrollments,
      activeStudents,
      revenueByMonth,
      popularCourses,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.payment.aggregate({
        where: { status: 'success' },
        _sum: { amount: true },
      }),
      this.prisma.enrollment.count(),
      this.prisma.user.count({ where: { role: 'student' } }),
      this.prisma.payment.groupBy({
        by: ['createdAt'],
        where: { status: 'success' },
        _sum: { amount: true },
        orderBy: { createdAt: 'asc' },
        // Note: Real grouping by month would usually happen in DB or processed here
      }),
      this.prisma.course.findMany({
        include: {
          _count: {
            select: { enrollments: true },
          },
        },
        orderBy: {
          enrollments: { _count: 'desc' },
        },
        take: 5,
      }),
    ]);

    return {
      overview: {
        totalUsers,
        totalRevenue: totalRevenue._sum.amount || 0,
        totalEnrollments,
        activeStudents,
      },
      popularCourses: popularCourses.map(c => ({
        id: c.id,
        title: c.title,
        enrollments: c._count.enrollments,
      })),
      // Simplified monthly revenue for the mockup dashboard
      revenueTrend: revenueByMonth.map(r => ({
        date: r.createdAt,
        amount: r._sum.amount,
      })),
    };
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        xp: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateUserRole(userId: string, role: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { role: role as any },
    });
  }
}
