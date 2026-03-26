import { Module } from '@nestjs/common';
import { B2BService } from './b2b.service';
import { B2BController } from './b2b.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [B2BService],
  controllers: [B2BController],
})
export class B2BModule {}
