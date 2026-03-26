import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { GamificationService } from '../gamification/gamification.service';

@Injectable()
export class SubmissionsService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    private configService: ConfigService,
    private gamificationService: GamificationService,
  ) {}

  async submitAssignment(userId: string, lessonId: string, content: string) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    // Call AI service for feedback
    const aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL') || 'http://localhost:3001';
    
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${aiServiceUrl}/ai/assignment-feedback`, {
          submission: content,
          lessonTitle: lesson.title,
          lessonContent: lesson.content,
        })
      );

      const feedback = response.data;
      const isPassed = feedback.score >= 70;

      if (isPassed) {
        // Award XP: 50 base + score bonus
        await this.gamificationService.awardXP(userId, 50 + Math.floor(feedback.score / 2));
      }

      // Update progress with assignment data
      return this.prisma.progress.upsert({
        where: {
          userId_lessonId: { userId, lessonId },
        },
        update: {
          status: feedback.score >= 70 ? 'completed' : 'in_progress',
          completionPct: feedback.score,
          data: {
            submission: content,
            feedback,
            submittedAt: new Date().toISOString(),
          },
        },
        create: {
          userId,
          lessonId,
          status: feedback.score >= 70 ? 'completed' : 'in_progress',
          completionPct: feedback.score,
          data: {
            submission: content,
            feedback,
            submittedAt: new Date().toISOString(),
          },
        },
      });
    } catch (error) {
      console.error('AI Service Error:', error.message);
      // Fallback if AI service is down
      return this.prisma.progress.upsert({
        where: {
          userId_lessonId: { userId, lessonId },
        },
        update: {
          data: {
            submission: content,
            error: 'AI feedback delayed.',
            submittedAt: new Date().toISOString(),
          },
        },
        create: {
          userId,
          lessonId,
          status: 'in_progress',
          data: {
            submission: content,
            error: 'AI feedback delayed.',
            submittedAt: new Date().toISOString(),
          },
        },
      });
    }
  }

  async getSubmission(userId: string, lessonId: string) {
    return this.prisma.progress.findUnique({
      where: {
        userId_lessonId: { userId, lessonId },
      },
    });
  }
}
