import { Module } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';
import { VectorStoreService } from './vector-store.service';
import { RagService } from './rag.service';
import { AiController } from './ai.controller';
import { IngestionService } from './ingestion.service';
import { FeedbackService } from './feedback.service';
import { StudyPlanService } from './study-plan.service';
import { ModerationService } from './moderation.service';
import { CareerService } from './career.service';
import { InterviewService } from './interview.service';
import { LabService } from './lab.service';

import { LocalizationService } from './localization.service';
import { MarketingService } from './marketing.service';

@Module({
  providers: [EmbeddingService, VectorStoreService, RagService, IngestionService, FeedbackService, StudyPlanService, ModerationService,
    CareerService,
    InterviewService,
    LabService,
    LocalizationService,
    MarketingService
  ],
  controllers: [AiController],
  exports: [RagService, FeedbackService, StudyPlanService, CareerService, InterviewService, LabService, LocalizationService, MarketingService],
})
export class AiModule {}
