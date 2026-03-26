import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  async awardXP(userId: string, amount: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        xp: {
          increment: amount,
        },
      },
    });
  }

  async getLeaderboard(limit: number = 10) {
    return this.prisma.user.findMany({
      where: { role: 'student' },
      select: {
        id: true,
        email: true,
        xp: true,
      },
      orderBy: {
        xp: 'desc',
      },
      take: limit,
    });
  }

  async getUserStats(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { xp: true },
    });

    const rank = await this.prisma.user.count({
      where: {
        role: 'student',
        xp: { gt: user?.xp || 0 },
      },
    });

    return {
      xp: user?.xp || 0,
      rank: rank + 1,
    };
  }
}
