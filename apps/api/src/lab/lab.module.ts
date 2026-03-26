import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { LabService } from './lab.service';
import { LabController } from './lab.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [LabService],
  controllers: [LabController],
})
export class LabModule {}
