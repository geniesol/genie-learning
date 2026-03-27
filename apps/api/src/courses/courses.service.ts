import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Course, Prisma } from '@genie/db';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(region?: string): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: region ? { regions: { has: region } } : {},
      include: {
        pricing: true,
      },
    });
  }

  async findOne(slug: string): Promise<Course | null> {
    return this.prisma.course.findUnique({
      where: { slug },
      include: {
        sections: {
          include: {
            lessons: true,
          },
        },
        pricing: true,
      },
    });
  }

  async create(data: Prisma.CourseCreateInput): Promise<Course> {
    return this.prisma.course.create({
      data,
    });
  }
}
