import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class ModerationService {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0,
    });
  }

  async moderateContent(content: string, type: 'thread' | 'reply'): Promise<{ allowed: boolean; reason?: string; redirect?: string }> {
    const prompt = PromptTemplate.fromTemplate(`
      You are an AI Moderator for Genie Learning, an academic community.
      Your goal is to ensure discussions are strictly academic, project-based, or curriculum-related.
      
      CRITICAL RULES:
      1. Block any content that is a complaint about the institute, staff, or policies.
      2. Block any content that could be perceived as defamation, legal threats, or hostile criticism of the institute.
      3. Block off-topic discussions that don't relate to courses, projects, or learning.
      4. Allow constructive questions about course content, technical bugs in code, or project collaboration.
      
      Input Content: {content}
      Content Type: {type}
      
      Output JSON format:
      {{
        "allowed": boolean,
        "reason": "short explanation if blocked",
        "redirect": "A polite suggestion on where to send this feedback if it's a complaint (e.g., 'Please contact our private support at support@genielearning.com')"
      }}
    `);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());
    
    try {
      const result = await chain.invoke({ content, type });
      return JSON.parse(result);
    } catch (error) {
      console.error('Moderation Error:', error);
      // Fallback: block if unsure to protect the institute
      return { allowed: false, reason: 'System error during moderation.', redirect: 'Please try again later or contact support.' };
    }
  }
}
