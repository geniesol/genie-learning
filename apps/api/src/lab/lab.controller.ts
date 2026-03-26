import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { LabService } from './lab.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('lab')
@UseGuards(JwtAuthGuard)
export class LabController {
  constructor(private labService: LabService) {}

  @Post('review')
  async review(@Body() body: { code: string, language: string, task?: string }) {
    return this.labService.getReview(body.code, body.language, body.task);
  }
}
