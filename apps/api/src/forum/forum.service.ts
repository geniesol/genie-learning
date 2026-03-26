import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ForumService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async createThread(userId: string, title: string, content: string, courseId: string) {
    if (!courseId) {
      throw new BadRequestException('All discussions must be linked to a specific course or project.');
    }

    // Verify course exists
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });
    if (!course) throw new NotFoundException('Course not found');

    // AI Moderation Guard
    await this.moderateContent(content, 'thread');

    return this.prisma.forumThread.create({
      data: {
        title,
        content,
        authorId: userId,
        courseId,
      },
      include: {
        author: {
          select: { email: true },
        },
      },
    });
  }

  private async moderateContent(content: string, type: 'thread' | 'reply') {
    const aiServiceUrl = this.configService.get<string>('AI_SERVICE_URL') || 'http://localhost:3001';
    
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${aiServiceUrl}/ai/moderate`, { content, type })
      );

      const { allowed, reason, redirect } = response.data;

      if (!allowed) {
        throw new BadRequestException({
          message: `Moderation Block: ${reason}`,
          redirect: redirect,
        });
      }
    } catch (err) {
      if (err instanceof BadRequestException) throw err;
      // Fallback: log error but allow if service is down? 
      // Actually, user wants it STRICT, so let's block if we can't verify.
      console.error('Moderation Service unreachable:', err.message);
      throw new BadRequestException('Security Guard is offline. Please try again later.');
    }
  }

  async getThreads(courseId?: string) {
    return this.prisma.forumThread.findMany({
      where: courseId ? { courseId } : {},
      include: {
        author: {
          select: { email: true },
        },
        _count: {
          select: { replies: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getThread(threadId: string) {
    const thread = await this.prisma.forumThread.findUnique({
      where: { id: threadId },
      include: {
        author: {
          select: { email: true },
        },
        replies: {
          include: {
            author: {
              select: { email: true },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    return thread;
  }

  async createReply(userId: string, threadId: string, content: string) {
    const thread = await this.prisma.forumThread.findUnique({
      where: { id: threadId },
    });

    if (!thread) {
      throw new NotFoundException('Thread not found');
    }

    // AI Moderation Guard
    await this.moderateContent(content, 'reply');

    return this.prisma.forumReply.create({
      data: {
        content,
        authorId: userId,
        threadId,
      },
      include: {
        author: {
          select: { email: true },
        },
      },
    });
  }
}
