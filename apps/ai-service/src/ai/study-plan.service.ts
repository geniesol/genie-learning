import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { ConfigService } from '@nestjs/config';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';

@Injectable()
export class StudyPlanService {
  private model: ChatOpenAI;

  constructor(private configService: ConfigService) {
    this.model = new ChatOpenAI({
      openAIApiKey: this.configService.get<string>('OPENAI_API_KEY'),
      modelName: 'gpt-4o',
      temperature: 0.7,
    });
  }

  async generateStudyPlan(goals: string, background: string, timeCommitment: string) {
    const systemPrompt = `You are an expert Education Consultant for Genie Learning. 
    Your goal is to generate a personalized, high-fidelity study plan for a student based on their goals, background, and availability.
    
    Student Goals: {goals}
    Student Background: {background}
    Time Commitment: {timeCommitment}
    
    Instructions:
    1. Define a clear "Learning Goal".
    2. Divide the plan into "Modules".
    3. Each module should have:
       - Title
       - Description
       - Suggested core courses/topics
       - Estimated duration
    4. Provide a "Student Roadmap" summary.
    
    Format your response as a JSON object with the following structure:
    {{
      "learningGoal": "string",
      "roadmap": "string",
      "modules": [
        {{
          "title": "string",
          "description": "string",
          "topics": ["string"],
          "duration": "string"
        }}
      ]
    }}`;

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', systemPrompt],
      ['human', 'Please generate my personalized study plan.'],
    ]);

    const chain = prompt.pipe(this.model).pipe(new StringOutputParser());

    const response = await chain.invoke({
      goals,
      background,
      timeCommitment,
    });

    try {
      const cleanedResponse = response.replace(/```json|```/g, '').trim();
      return JSON.parse(cleanedResponse);
    } catch (error) {
      console.error('Failed to parse AI study plan:', response);
      return {
        learningGoal: "Personalized Learning Path",
        roadmap: "A custom journey tailored to your needs.",
        modules: [
          {
            title: "Foundations",
            description: "Core concepts based on your goals.",
            topics: ["Introduction to AI", "System Architecture"],
            duration: "2 weeks"
          }
        ]
      };
    }
  }
}
