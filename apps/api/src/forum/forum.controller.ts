import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { ForumService } from './forum.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('forum')
@UseGuards(JwtAuthGuard)
export class ForumController {
  constructor(private forumService: ForumService) {}

  @Post('threads')
  async createThread(
    @Request() req,
    @Body('title') title: string,
    @Body('content') content: string,
    @Param('courseId') courseId?: string,
  ) {
    return this.forumService.createThread(req.user.userId, title, content, courseId!);
  }

  @Get('threads')
  async getThreads(@Query('courseId') courseId?: string) {
    return this.forumService.getThreads(courseId);
  }

  @Get('threads/:id')
  async getThread(@Param('id') id: string) {
    return this.forumService.getThread(id);
  }

  @Post('threads/:id/replies')
  async createReply(
    @Request() req,
    @Param('id') threadId: string,
    @Body('content') content: string,
  ) {
    return this.forumService.createReply(req.user.userId, threadId, content);
  }
}
