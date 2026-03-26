import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { ConfigService } from '@nestjs/config';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class FeedbackService {
  private model: ChatOpenAI;

  constructor(private configService: ConfigService) {
    this.model = new ChatOpenAI({
      openAIApiKey: this.configService.get<string>('OPENAI_API_KEY'),
      modelName: 'gpt-4o',
      temperature: 0.5,
    });
  }

  async evaluateSubmission(submission: string, lessonTitle: string, lessonContent: string) {
    const systemPrompt = `You are an expert AI Instructor for Genie Learning. 
    Your goal is to provide constructive, encouraging, and detailed feedback on a student's assignment submission based on the lesson content.
    
    Lesson Title: {lessonTitle}
    Lesson Content: {lessonContent}
    
    Instructions:
    1. Score the submission from 0 to 100.
    2. Provide a summary of what was done well.
    3. Identify specific areas for improvement.
    4. provide a "Final Verdict" or next steps for the student.
    
    Format your response as a JSON object with the following structure:
    {{
      "score": number,
      "summary": "string",
      "strengths": ["string"],
      "improvements": ["string"],
      "verdict": "string"
    }}`;

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', systemPrompt],
      ['human', 'Student Submission: {submission}'],
    ]);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());

    const response = await chain.invoke({
      lessonTitle,
      lessonContent: JSON.stringify(lessonContent),
      submission,
    });

    try {
      // Clean potential markdown code blocks if the LLM wraps the JSON
      const cleanedResponse = response.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanedResponse);
    } catch (error) {
      console.error('Failed to parse AI feedback:', response);
      return {
        score: 0,
        summary: "Error parsing AI feedback.",
        strengths: [],
        improvements: ["Please try again."],
        verdict: "Technical error."
      };
    }
  }
}
