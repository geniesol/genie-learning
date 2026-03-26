import { Controller, Get, UseGuards } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('instructor')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('INSTRUCTOR', 'ADMIN')
export class InstructorController {
  constructor(private instructorService: InstructorService) {}

  @Get('stats')
  async getStats() {
    return this.instructorService.getDashboardStats();
  }

  @Get('students')
  async getStudents() {
    return this.instructorService.getAllStudents();
  }

  @Get('submissions')
  async getSubmissions() {
    return this.instructorService.getSubmissions();
  }
}
