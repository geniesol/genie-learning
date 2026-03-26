import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class LocalizationService {
  private model: ChatOpenAI;

  constructor() {
    this.model = new ChatOpenAI({
      modelName: 'gpt-4o',
      temperature: 0.3,
    });
  }

  async translateContent(content: string, targetLanguage: string) {
    const prompt = PromptTemplate.fromTemplate(`
      You are an Expert Educational Translator for Genie Learning.
      Translate the following educational content into {targetLanguage}.
      Ensure the tone remains professional, encouraging, and academically accurate.
      Maintain any technical terms in English if they are standard in the field, but provide the translated context.

      Content:
      {content}
    `);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());
    return chain.invoke({ content, targetLanguage });
  }

  calculateRegionalPrice(basePrice: number, region: string) {
    // Basic PPP (Purchasing Power Parity) adjustment logic
    const pppFactors: Record<string, number> = {
      'IN': 0.3, // India: 70% discount
      'US': 1.0, // USA: Base price
      'GB': 0.9, // UK
      'NG': 0.2, // Nigeria
      'BR': 0.5, // Brazil
    };

    const factor = pppFactors[region] || 1.0;
    return basePrice * factor;
  }
}
