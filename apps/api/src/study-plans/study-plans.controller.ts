import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { StudyPlansService } from './study-plans.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('study-plans')
@UseGuards(JwtAuthGuard)
export class StudyPlansController {
  constructor(private studyPlansService: StudyPlansService) {}

  @Post('generate')
  async generatePlan(
    @Request() req,
    @Body('goals') goals: string,
    @Body('background') background: string,
    @Body('timeCommitment') timeCommitment: string,
  ) {
    return this.studyPlansService.generateAndSavePlan(
      req.user.userId,
      goals,
      background,
      timeCommitment,
    );
  }

  @Get('my-plan')
  async getMyPlan(@Request() req) {
    return this.studyPlansService.getStudyPlan(req.user.userId);
  }
}
