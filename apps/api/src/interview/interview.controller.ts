import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { InterviewService } from './interview.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('interview')
@UseGuards(JwtAuthGuard)
export class InterviewController {
  constructor(private interviewService: InterviewService) {}

  @Post('next-question')
  async getQuestion(
    @Request() req: any, 
    @Body() body: { targetJob: string, previousQuestions: string[] }
  ) {
    return this.interviewService.getNextQuestion(req.user.userId, body.targetJob, body.previousQuestions);
  }

  @Post('evaluate')
  async evaluate(
    @Body() body: { targetJob: string, question: string, answer: string }
  ) {
    return this.interviewService.evaluateAnswer(body.targetJob, body.question, body.answer);
  }
}
