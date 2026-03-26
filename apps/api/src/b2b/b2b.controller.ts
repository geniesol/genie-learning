import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { B2BService } from './b2b.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('b2b')
@UseGuards(JwtAuthGuard, RolesGuard)
export class B2BController {
  constructor(private b2bService: B2BService) {}

  @Get('dashboard')
  @Roles('ADMIN', 'SUPER_ADMIN') // Or a new CORPORATE_ADMIN role
  async getDashboard(@Request() req: any) {
    return this.b2bService.getCompanyDashboard(req.user.userId);
  }

  @Post('team')
  @Roles('ADMIN', 'SUPER_ADMIN')
  async createTeam(@Body() body: { companyId: string, name: string, managerId?: string }) {
    return this.b2bService.createTeam(body.companyId, body.name, body.managerId);
  }

  @Post('team/member')
  @Roles('ADMIN', 'SUPER_ADMIN')
  async addMember(@Body() body: { teamId: string, email: string }) {
    return this.b2bService.addEmployeeToTeam(body.teamId, body.email);
  }
}
