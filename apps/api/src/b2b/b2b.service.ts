import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class B2BService {
  constructor(private prisma: PrismaService) {}

  async getCompanyDashboard(adminId: string) {
    const company = await this.prisma.company.findUnique({
      where: { adminId },
      include: {
        teams: {
          include: {
            members: true,
          },
        },
        companyEnrollments: {
          include: {
            course: true,
          },
        },
      }
    });

    if (!company) throw new NotFoundException('Company not found');

    // Calculate aggregate metrics
    const totalEmployees = company.teams.reduce((acc, team) => acc + team.members.length, 0);
    const activeCourses = company.companyEnrollments.length;
    const averageProgress = 0; // Logic for team avg progress

    return {
      company,
      metrics: {
        totalEmployees,
        seatsRemaining: company.totalSeats - company.usedSeats,
        averageProgress,
      }
    };
  }

  async createTeam(companyId: string, name: string, managerId?: string) {
    return this.prisma.team.create({
      data: {
        name,
        companyId,
        managerId,
      }
    });
  }

  async addEmployeeToTeam(teamId: string, email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.team.update({
      where: { id: teamId },
      data: {
        members: { connect: { id: user.id } }
      }
    });
  }
}
