import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class MarketingService {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0.9, // Higher temperature for creative marketing
    });
  }

  async generateAbandonedCartOffer(userName: string, courseTitle: string, lastPrice: number) {
    const prompt = PromptTemplate.fromTemplate(`
      You are a Master Growth Marketer for Genie Learning.
      The student {userName} abandoned their cart for the course: {courseTitle} (Price: {lastPrice}).
      
      GENERATE a high-conversion, "limited-time" promotional email snippet:
      1. A catchy subject line.
      2. A personalized message emphasizing the value of {courseTitle} for their career.
      3. A unique discount hook (e.g., "AI-15" for an extra 15% off).
      4. A CTA that creates urgency.

      Output in Markdown.
    `);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());
    return chain.invoke({ userName, courseTitle, lastPrice: lastPrice.toString() });
  }

  async generateUpsellStrategy(userProfile: any, courseHistory: string[]) {
    const prompt = PromptTemplate.fromTemplate(`
      Analyze this student's learning journey and propose a "Smart Upsell" strategy:
      Profile: {userProfile}
      Finished Courses: {courseHistory}

      TASKS:
      1. Identify the next logical high-value course in our catalog (assume we have Advanced versions of their tech stack).
      2. Write a short persuasive pitch why THIS specific course is their next milestone.
      
      Output ONLY valid JSON with keys "recommendedCourse" and "pitch".
    `);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());
    const result = await chain.invoke({ 
      userProfile: JSON.stringify(userProfile), 
      courseHistory: courseHistory.join(', ') 
    });
    return JSON.parse(result);
  }
}
