import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { ProgressModule } from './progress/progress.module';
import { PaymentsModule } from './payments/payments.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { SearchModule } from './search/search.module';
import { StudyPlansModule } from './study-plans/study-plans.module';
import { InstructorModule } from './instructor/instructor.module';
import { GamificationModule } from './gamification/gamification.module';
import { ForumModule } from './forum/forum.module';
import { AdminModule } from './admin/admin.module';
import { CareerModule } from './career/career.module';
import { InterviewModule } from './interview/interview.module';
import { LabModule } from './lab/lab.module';
import { B2BModule } from './b2b/b2b.module';
import { CertificatesModule } from './certificates/certificates.module';

import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    PrismaModule,
    UsersModule,
    AuthModule,
    CoursesModule,
    EnrollmentsModule,
    ProgressModule,
    PaymentsModule,
    SubmissionsModule,
    SearchModule,
    StudyPlansModule,
    InstructorModule,
    GamificationModule,
    ForumModule,
    AdminModule,
    CareerModule,
    InterviewModule,
    LabModule,
    B2BModule,
    CertificatesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
