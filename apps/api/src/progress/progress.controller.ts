import { Controller, Post, Get, Body, UseGuards, Request, Param, Query } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Post('complete')
  async markComplete(@Request() req, @Body('lessonId') lessonId: string) {
    return this.progressService.markComplete(req.user.userId, lessonId);
  }

  @Get('course/:courseId')
  async getCourseProgress(@Request() req, @Param('courseId') courseId: string) {
    return this.progressService.getCourseProgress(req.user.userId, courseId);
  }
}
