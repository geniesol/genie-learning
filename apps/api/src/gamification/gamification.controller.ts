import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('gamification')
@UseGuards(JwtAuthGuard)
export class GamificationController {
  constructor(private gamificationService: GamificationService) {}

  @Get('leaderboard')
  async getLeaderboard() {
    return this.gamificationService.getLeaderboard();
  }

  @Get('my-stats')
  async getMyStats(@Request() req) {
    return this.gamificationService.getUserStats(req.user.userId);
  }
}
