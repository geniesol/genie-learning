import { Injectable } from '@nestjs/common';
import { OpenAIEmbeddings } from '@langchain/openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmbeddingService {
  private embeddings: OpenAIEmbeddings;

  constructor(private configService: ConfigService) {
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: this.configService.get<string>('OPENAI_API_KEY'),
      modelName: 'text-embedding-3-small',
    });
  }

  getEmbeddings() {
    return this.embeddings;
  }
}
