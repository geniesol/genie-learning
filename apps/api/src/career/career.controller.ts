import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { CareerService } from './career.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('career')
@UseGuards(JwtAuthGuard)
export class CareerController {
  constructor(private careerService: CareerService) {}

  @Post('path')
  async getPath(@Request() req: any, @Body('targetJob') targetJob: string) {
    return this.careerService.getCareerPath(req.user.userId, targetJob);
  }

  @Get('resume')
  async getResume(@Request() req: any) {
    return this.careerService.getResume(req.user.userId);
  }
}
