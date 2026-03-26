import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
  imports: [HttpModule, ConfigModule, PrismaModule, GamificationModule],
  providers: [SubmissionsService],
  controllers: [SubmissionsController],
})
export class SubmissionsModule {}
