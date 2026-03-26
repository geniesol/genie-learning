import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StudyPlansService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async generateAndSavePlan(userId: string, goals: string, background: string, timeCommitment: string) {
    const aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL') || 'http://localhost:3001';
    
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${aiServiceUrl}/ai/generate-study-plan`, {
          goals,
          background,
          timeCommitment,
        })
      );

      const planData = response.data;

      // In this demo, we store the plan in the user's profile or a dedicated table if we had one.
      // Since our schema is fixed, let's use the profile field for now.
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          profile: {
            studyPlan: planData,
            goals,
            background,
            timeCommitment,
            generatedAt: new Date().toISOString(),
          }
        }
      });

      return planData;
    } catch (error) {
      console.error('AI Service Error (Study Plan):', error.message);
      throw new Error('Failed to generate personalized study plan.');
    }
  }

  async getStudyPlan(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    return (user?.profile as any)?.studyPlan || null;
  }
}
