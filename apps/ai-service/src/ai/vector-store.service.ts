import { Injectable } from '@nestjs/common';
import { QdrantVectorStore } from '@langchain/qdrant';
import { EmbeddingService } from './embedding.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VectorStoreService {
  constructor(
    private embeddingService: EmbeddingService,
    private configService: ConfigService,
  ) {}

  async getVectorStore(collectionName: string) {
    return QdrantVectorStore.fromExistingCollection(
      this.embeddingService.getEmbeddings(),
      {
        url: this.configService.get<string>('QDRANT_URL') || 'http://qdrant:6333',
        collectionName,
      },
    );
  }
}
