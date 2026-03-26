import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { VectorStoreService } from './vector-store.service';
import { ConfigService } from '@nestjs/config';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence, RunnablePassthrough } from '@langchain/core/runnables';

@Injectable()
export class RagService {
  private model: ChatOpenAI;

  constructor(
    private vectorStoreService: VectorStoreService,
    private configService: ConfigService,
  ) {
    this.model = new ChatOpenAI({
      openAIApiKey: this.configService.get<string>('OPENAI_API_KEY'),
      modelName: 'gpt-4o',
      temperature: 0.3,
    });
  }

  async answerQuestion(question: string, collectionName: string, context?: string) {
    const vectorStore = await this.vectorStoreService.getVectorStore(collectionName);
    const retriever = vectorStore.asRetriever();

    const systemPrompt = `You are an AI assistant for Genie Learning. 
    Use the following pieces of retrieved context to answer the question. 
    If you don't know the answer, just say that you don't know, don't try to make up an answer.
    
    Context: {context}
    
    Question: {input}`;

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', systemPrompt],
      ['human', '{input}'],
    ]);

    // Define formatted context helper
    const formatDocuments = (docs: any[]) => docs.map((doc) => doc.pageContent).join('\n\n');

    // Create LCEL chain
    const chain = RunnableSequence.from([
      {
        context: retriever.pipe(formatDocuments),
        input: new RunnablePassthrough(),
      },
      prompt,
      this.model,
      new StringOutputParser(),
    ]);

    const answer = await chain.invoke(question);

    return { answer };
  }

  async semanticSearch(query: string, collectionName: string = 'course_content', limit: number = 5) {
    const vectorStore = await this.vectorStoreService.getVectorStore(collectionName);
    const results = await vectorStore.similaritySearch(query, limit);

    return results.map(doc => ({
      content: doc.pageContent,
      metadata: doc.metadata,
    }));
  }
}
