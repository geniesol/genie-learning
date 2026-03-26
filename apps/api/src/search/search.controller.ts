import { Controller, Post, Body, Query } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Controller('search')
export class SearchController {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  @Post()
  async search(@Body('query') query: string, @Query('limit') limit: number = 5) {
    const aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL') || 'http://localhost:3001';
    
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${aiServiceUrl}/ai/search?limit=${limit}`, {
          query,
        })
      );

      // Process and format results
      const results = response.data.map((item: any) => ({
        title: item.metadata.title,
        type: item.metadata.type, // 'course' or 'lesson'
        slug: item.metadata.courseSlug || item.metadata.slug,
        excerpt: item.content.substring(0, 150) + '...',
      }));

      return results;
    } catch (error) {
      console.error('Search Error:', error.message);
      return [];
    }
  }
}
