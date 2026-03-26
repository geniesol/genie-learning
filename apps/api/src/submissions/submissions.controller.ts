import { Controller, Post, Get, Body, UseGuards, Request, Param } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
  constructor(private submissionsService: SubmissionsService) {}

  @Post(':lessonId')
  async submitAssignment(
    @Request() req,
    @Param('lessonId') lessonId: string,
    @Body('content') content: string,
  ) {
    return this.submissionsService.submitAssignment(req.user.userId, lessonId, content);
  }

  @Get(':lessonId')
  async getSubmission(@Request() req, @Param('lessonId') lessonId: string) {
    return this.submissionsService.getSubmission(req.user.userId, lessonId);
  }
}
