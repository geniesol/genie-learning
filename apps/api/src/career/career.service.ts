import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CareerService {
  private aiServiceUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL') || 'http://localhost:3001';
  }

  async getCareerPath(userId: string, targetJob: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        progress: { include: { lesson: true } },
        enrollments: { include: { course: true } },
      },
    });

    const profile = {
      xp: user?.xp,
      completedCourses: user?.enrollments.filter(e => e.status === 'completed').map(e => e.course.title),
      ongoingCourses: user?.enrollments.filter(e => e.status === 'active').map(e => e.course.title),
    };

    const response = await firstValueFrom(
      this.httpService.post(`${this.aiServiceUrl}/ai/career-path`, {
        targetJob,
        profile,
      })
    );

    return response.data;
  }

  async getResume(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        enrollments: { include: { course: true } },
      },
    });

    const achievements = user?.enrollments.map(e => ({
      course: e.course.title,
      status: e.status,
    }));

    const response = await firstValueFrom(
      this.httpService.post(`${this.aiServiceUrl}/ai/generate-resume`, {
        profile: user?.profile,
        achievements,
      })
    );

    return response.data;
  }
}
