import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VectorStoreService } from '../ai/vector-store.service';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { Document } from '@langchain/core/documents';

@Injectable()
export class IngestionService {
  private readonly logger = new Logger(IngestionService.name);
  private splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  constructor(
    private prisma: PrismaService,
    private vectorStoreService: VectorStoreService,
  ) {}

  async ingestCourseContent() {
    this.logger.log('Starting course content ingestion...');

    const courses = await this.prisma.course.findMany({
      include: {
        sections: {
          include: {
            lessons: true,
          },
        },
      },
    });

    for (const course of courses) {
      this.logger.log(`Processing course: ${course.title}`);
      const documents: Document[] = [];

      for (const section of course.sections) {
        for (const lesson of section.lessons) {
          const content = typeof lesson.content === 'string' 
            ? lesson.content 
            : JSON.stringify(lesson.content);

          const chunks = await this.splitter.splitText(content);
          
          chunks.forEach((chunk, index) => {
            documents.push(new Document({
              pageContent: chunk,
              metadata: {
                courseId: course.id,
                courseTitle: course.title,
                sectionId: section.id,
                lessonId: lesson.id,
                lessonTitle: lesson.title,
                chunkIndex: index,
                source: 'course_content',
              },
            }));
          });
        }
      }

      if (documents.length > 0) {
        const vectorStore = await this.vectorStoreService.getVectorStore('course_content');
        await vectorStore.addDocuments(documents);
        this.logger.log(`Ingested ${documents.length} chunks for course: ${course.title}`);
      }
    }

    this.logger.log('Course content ingestion complete.');
    return { success: true, coursesProcessed: courses.length };
  }
}
