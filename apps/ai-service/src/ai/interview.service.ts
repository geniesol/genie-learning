import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class InterviewService {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0.8,
    });
  }

  async generateInterviewQuestion(targetJob: string, profile: any, previousQuestions: string[] = []) {
    const prompt = PromptTemplate.fromTemplate(`
      You are an Expert Technical Interviewer for Genie Learning.
      Candidate Target Job: {targetJob}
      Candidate Profile: {profile}
      Previous Questions asked in this session: {previousQuestions}

      Tasks:
      1. Analyze the job and candidate's strengths (based on XP and completed courses).
      2. Generate a challenging, technical interview question relevant to the role.
      3. If no previous questions, start with a "Tell me about a project" or a fundamental technical concept.
      4. If previous questions exist, dig deeper or switch to a new sub-topic (e.g., system design, coding logic, or soft skills).

      Output ONLY the question text.
    `);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());
    
    return chain.invoke({ 
      targetJob, 
      profile: JSON.stringify(profile),
      previousQuestions: previousQuestions.join('\n')
    });
  }

  async evaluateResponse(question: string, answer: string, targetJob: string) {
    const prompt = PromptTemplate.fromTemplate(`
      Role: Expert Interviewer & Technical Lead
      Target Job: {targetJob}
      Question: {question}
      Candidate's Answer: {answer}

      Task:
      Evaluate the candidate's response and provide a JSON report:
      1. "score": 1-10 (Numeric score)
      2. "correctness": Is the technical information correct?
      3. "strengths": What did they answer well?
      4. "improvements": What was missing or could be explained better?
      5. "idealAnswer": A concise version of what a senior-level answer would look like.

      Output ONLY valid JSON.
    `);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());
    
    try {
      const result = await chain.invoke({ question, answer, targetJob });
      return JSON.parse(result);
    } catch (error) {
      console.error('Interview AI Evaluation Error:', error);
      throw new Error('Failed to evaluate interview response.');
    }
  }
}
