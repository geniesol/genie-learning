import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Progress, ProgressStatus } from '@prisma/client';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async markComplete(userId: string, lessonId: string): Promise<Progress> {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return this.prisma.progress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      update: {
        status: 'completed',
        completionPct: 100,
      },
      create: {
        userId,
        lessonId,
        status: 'completed',
        completionPct: 100,
      },
    });
  }

  async getCourseProgress(userId: string, courseId: string) {
    const lessons = await this.prisma.lesson.findMany({
      where: {
        section: { courseId },
      },
      select: { id: true },
    });

    const lessonIds = lessons.map((l) => l.id);

    const completedProgress = await this.prisma.progress.findMany({
      where: {
        userId,
        lessonId: { in: lessonIds },
        status: 'completed',
      },
    });

    const totalLessons = lessonIds.length;
    const completedLessons = completedProgress.length;
    const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    return {
      totalLessons,
      completedLessons,
      percentage,
      lessonStatus: completedProgress.reduce((acc, curr) => {
        acc[curr.lessonId] = curr.status;
        return acc;
      }, {} as Record<string, string>),
    };
  }
}
