import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { InterviewService } from './interview.service';
import { InterviewController } from './interview.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [HttpModule, ConfigModule, PrismaModule],
  providers: [InterviewService],
  controllers: [InterviewController],
})
export class InterviewModule {}
