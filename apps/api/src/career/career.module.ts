import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [HttpModule, ConfigModule, PrismaModule],
  providers: [CareerService],
  controllers: [CareerController],
})
export class CareerModule {}
