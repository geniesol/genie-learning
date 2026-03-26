import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class LabService {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0.2, // Low temperature for technical precision
    });
  }

  async reviewCode(code: string, language: string, taskDescription?: string) {
    const prompt = PromptTemplate.fromTemplate(`
      You are an Expert AI Code Mentor for Genie Learning.
      Language: {language}
      Task Context: {taskDescription}
      
      Code to Review:
      \`\`\`{language}
      {code}
      \`\`\`

      Analyze the code and provide a JSON report:
      1. "status": "pass" | "fail" | "optimize"
      2. "review": Short summary of the code quality.
      3. "suggestions": Array of specific improvements (security, performance, readability).
      4. "optimizedSnippet": If status is 'optimize', provide the better version.
      5. "securityAlerts": Any potential vulnerabilities found.

      Output ONLY valid JSON.
    `);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());
    
    try {
      const result = await chain.invoke({ 
        code, 
        language, 
        taskDescription: taskDescription || "General coding exercise" 
      });
      return JSON.parse(result);
    } catch (error) {
      console.error('Lab AI Error:', error);
      throw new Error('Failed to review code.');
    }
  }
}
