import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import PDFDocument from 'pdfkit';
import { Response } from 'express';

@Injectable()
export class CertificateService {
  constructor(private prisma: PrismaService) {}

  async generateCertificate(userId: string, courseId: string, res: Response) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const course = await this.prisma.course.findUnique({ where: { id: courseId } });

    if (!user || !course) {
      throw new NotFoundException('User or Course not found');
    }

    // Check if certificate already exists
    let certificate = await this.prisma.certificate.findFirst({
      where: { userId, courseId },
    });

    if (!certificate) {
      const verifyCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      const verificationHash = Buffer.from(`${userId}-${courseId}-${verifyCode}`).toString('hex');
      
      certificate = await this.prisma.certificate.create({
        data: {
          userId,
          courseId,
          certificateNumber: `GENIE-${Date.now()}`,
          verificationHash,
          issuedAt: new Date(),
        },
      });
    }

    // Create PDF
    const doc = new PDFDocument({
      layout: 'landscape',
      size: 'A4',
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Certificate-${course.title}.pdf`);

    doc.pipe(res);

    // Design
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fbfbfb');
    
    // Border
    doc.lineWidth(10);
    doc.strokeColor('#2563eb').rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();
    
    // Content
    doc.fillColor('#1e293b').fontSize(40).text('CERTIFICATE OF COMPLETION', 0, 100, { align: 'center' });
    
    doc.fontSize(20).text('This is to certify that', 0, 180, { align: 'center' });
    
    doc.fillColor('#2563eb').fontSize(35).text(user.email.split('@')[0].toUpperCase(), 0, 220, { align: 'center' });
    
    doc.fillColor('#1e293b').fontSize(20).text('has successfully completed the course', 0, 280, { align: 'center' });
    
    doc.fillColor('#2563eb').fontSize(30).text(course.title, 0, 320, { align: 'center' });
    
    doc.fillColor('#64748b').fontSize(12).text(`Issued on ${new Date().toLocaleDateString()}`, 0, 420, { align: 'center' });
    doc.text(`Verification ID: ${certificate.certificateNumber}`, 0, 440, { align: 'center' });
    
    doc.fontSize(25).fillColor('#1e293b').text('Genie Learning', 80, 500);
    doc.fontSize(10).text('Accelerating Global Education', 80, 530);

    doc.end();
  }

  async getCertificates(userId: string) {
    return this.prisma.certificate.findMany({
      where: { userId },
      include: { course: true },
    });
  }
}
