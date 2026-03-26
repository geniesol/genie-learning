import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class CareerService {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0.7,
    });
  }

  async generateCareerPath(targetJob: string, currentProfile: any) {
    const prompt = PromptTemplate.fromTemplate(`
      You are an AI Career Architect for Genie Learning.
      The student wants to become a: {targetJob}
      
      Student's Current Profile/Stats:
      {currentProfile}
      
      GENERATE a "Career Architect" JSON report containing:
      1. "gapAnalysis": What skills are they missing to reach this role?
      2. "recommendedPath": A step-by-step learning path using hypothetical course titles (we will map them to our catalog later).
      3. "salaryInsights": Estimated salary range for this role globally and in their region (if known).
      4. "marketDemand": A short analysis of why this role is important now.
      
      Output ONLY valid JSON.
    `);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());
    
    try {
      const result = await chain.invoke({ 
        targetJob, 
        currentProfile: JSON.stringify(currentProfile) 
      });
      return JSON.parse(result);
    } catch (error) {
      console.error('Career AI Error:', error);
      throw new Error('Failed to generate career path.');
    }
  }

  async generateResumeContent(profile: any, achievements: any[]) {
    const prompt = PromptTemplate.fromTemplate(`
      You are an Executive Resume Builder. 
      Create a "High-Impact" resume summary and "Key Projects" section for a student based on these platform achievements:
      
      Profile: {profile}
      Platform Achievements/Courses: {achievements}
      
      Highlight technical XP points and course completions as validation tokens.
      Output in Markdown.
    `);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());
    return chain.invoke({ 
      profile: JSON.stringify(profile), 
      achievements: JSON.stringify(achievements) 
    });
  }
}
