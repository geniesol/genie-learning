import { Controller, Post, Get, Body, UseGuards, Request, Param } from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('enrollments')
@UseGuards(JwtAuthGuard)
export class EnrollmentsController {
  constructor(private enrollmentsService: EnrollmentsService) {}

  @Post()
  async enroll(@Request() req, @Body('courseId') courseId: string) {
    return this.enrollmentsService.enroll(req.user.userId, courseId);
  }

  @Get('my')
  async getMyEnrollments(@Request() req) {
    return this.enrollmentsService.getMyEnrollments(req.user.userId);
  }

  @Get(':courseId')
  async getEnrollmentDetail(@Request() req, @Param('courseId') courseId: string) {
    return this.enrollmentsService.getEnrollmentDetail(req.user.userId, courseId);
  }
}
