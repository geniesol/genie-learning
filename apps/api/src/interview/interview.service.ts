import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class InterviewService {
  private aiServiceUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL') || 'http://localhost:3001';
  }

  async getNextQuestion(userId: string, targetJob: string, previousQuestions: string[]) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { xp: true, enrollments: { include: { course: true } } }
    });

    const profile = {
      xp: user?.xp,
      completedCourses: user?.enrollments.filter(e => e.status === 'completed').map(e => e.course.title),
    };

    const response = await firstValueFrom(
      this.httpService.post(`${this.aiServiceUrl}/ai/interview-question`, {
        targetJob,
        profile,
        previousQuestions,
      })
    );

    return response.data;
  }

  async evaluateAnswer(targetJob: string, question: string, answer: string) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.aiServiceUrl}/ai/interview-evaluate`, {
        targetJob,
        question,
        answer,
      })
    );

    return response.data;
  }
}
