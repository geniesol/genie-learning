import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [SearchController],
})
export class SearchModule {}
