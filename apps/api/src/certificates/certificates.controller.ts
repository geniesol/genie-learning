import { Controller, Get, Param, UseGuards, Request, Res } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CertificateService } from './certificates.service';
import type { Response } from 'express';

@Controller('certificates')
@UseGuards(JwtAuthGuard)
export class CertificatesController {
  constructor(private certificatesService: CertificateService) {}

  @Get()
  async getMyCertificates(@Request() req: any) {
    return this.certificatesService.getCertificates(req.user.userId);
  }

  @Get(':courseId/download')
  async download(@Param('courseId') courseId: string, @Request() req: any, @Res() res: Response) {
    return this.certificatesService.generateCertificate(req.user.userId, courseId, res);
  }
}
