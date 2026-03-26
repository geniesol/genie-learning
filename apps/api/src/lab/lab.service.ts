import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LabService {
  private aiServiceUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL') || 'http://localhost:3001';
  }

  async getReview(code: string, language: string, task?: string) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.aiServiceUrl}/ai/review-code`, {
        code,
        language,
        task,
      })
    );
    return response.data;
  }
}
