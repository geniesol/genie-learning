import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { RagService } from './rag.service';
import { IngestionService } from './ingestion.service';
import { FeedbackService } from './feedback.service';
import { StudyPlanService } from './study-plan.service';
import { ModerationService } from './moderation.service';
import { CareerService } from './career.service';
import { InterviewService } from './interview.service';
import { LabService } from './lab.service';
import { LocalizationService } from './localization.service';
import { MarketingService } from './marketing.service';

@Controller()
export class AiController {
  constructor(
    private ragService: RagService,
    private ingestionService: IngestionService,
    private feedbackService: FeedbackService,
    private studyPlanService: StudyPlanService,
    private moderationService: ModerationService,
    private careerService: CareerService,
    private interviewService: InterviewService,
    private labService: LabService,
    private localizationService: LocalizationService,
    private marketingService: MarketingService,
  ) {}

  @Get()
  async healthRoot() {
    return 'Genie AI Service Operational';
  }

  @Get('health')
  async health() {
    return { status: 'ok', service: 'ai-service' };
  }

  @Post('marketing/abandoned')
  async abandonedCart(@Body() body: { name: string, course: string, price: number }) {
    return this.marketingService.generateAbandonedCartOffer(body.name, body.course, body.price);
  }

  @Post('marketing/upsell')
  async getUpsell(@Body() body: { profile: any, history: string[] }) {
    return this.marketingService.generateUpsellStrategy(body.profile, body.history);
  }

  @Post('translate')
  async translate(@Body() body: { content: string, language: string }) {
    return this.localizationService.translateContent(body.content, body.language);
  }

  @Post('regional-price')
  async getPrice(@Body() body: { basePrice: number, region: string }) {
    return { price: this.localizationService.calculateRegionalPrice(body.basePrice, body.region) };
  }

  @Post('review-code')
  async reviewCode(@Body() body: { code: string, language: string, task?: string }) {
    return this.labService.reviewCode(body.code, body.language, body.task);
  }

  @Post('interview-question')
  async getQuestion(@Body() body: { targetJob: string, profile: any, previousQuestions?: string[] }) {
    return this.interviewService.generateInterviewQuestion(body.targetJob, body.profile, body.previousQuestions);
  }

  @Post('interview-evaluate')
  async evaluateInterview(@Body() body: { question: string, answer: string, targetJob: string }) {
    return this.interviewService.evaluateResponse(body.question, body.answer, body.targetJob);
  }

  @Post('career-path')
  async getCareerPath(@Body() body: { targetJob: string, profile: any }) {
    return this.careerService.generateCareerPath(body.targetJob, body.profile);
  }

  @Post('generate-resume')
  async generateResume(@Body() body: { profile: any, achievements: any[] }) {
    return this.careerService.generateResumeContent(body.profile, body.achievements);
  }

  @Post('moderate')
  async moderate(@Body() body: { content: string, type: 'thread' | 'reply' }) {
    return this.moderationService.moderateContent(body.content, body.type);
  }

  @Post('ingest-courses')
  async ingestCourses() {
    return this.ingestionService.ingestCourseContent();
  }

  @Post('chat')
  async chat(
    @Body('question') question: string,
    @Query('collection') collection: string = 'genie_content',
  ) {
    return this.ragService.answerQuestion(question, collection);
  }

  @Post('tutor')
  async tutor(
    @Body('question') question: string,
    @Body('context') context: string,
    @Query('collection') collection: string = 'course_content',
  ) {
    return this.ragService.answerQuestion(question, collection, context);
  }

  @Post('assignment-feedback')
  async assignmentFeedback(
    @Body('submission') submission: string,
    @Body('lessonTitle') lessonTitle: string,
    @Body('lessonContent') lessonContent: string,
  ) {
    return this.feedbackService.evaluateSubmission(submission, lessonTitle, lessonContent);
  }

  @Post('search')
  async search(
    @Body('query') query: string,
    @Query('limit') limit: number = 5,
  ) {
    return this.ragService.semanticSearch(query, 'course_content', limit);
  }

  @Post('generate-study-plan')
  async generateStudyPlan(
    @Body('goals') goals: string,
    @Body('background') background: string,
    @Body('timeCommitment') timeCommitment: string,
  ) {
    return this.studyPlanService.generateStudyPlan(goals, background, timeCommitment);
  }
}
