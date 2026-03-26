import { Module } from '@nestjs/common';
import { CertificateService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CertificateService],
  controllers: [CertificatesController],
  exports: [CertificateService],
})
export class CertificatesModule {}
