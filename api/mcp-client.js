import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

class LogicKidsMCPClient {
  constructor() {
    this.client = new Client({
      name: 'logic-kids-ai-client',
      version: '1.0.0',
    });
  }

  async connect() {
    const transport = new StdioClientTransport();
    await this.client.connect(transport);
  }

  async generateLogicExercise(ageGroup, exerciseType, difficulty, count = 1) {
    try {
      const result = await this.client.callTool({
        name: 'generate_logic_exercise',
        arguments: {
          ageGroup,
          exerciseType,
          difficulty,
          count
        }
      });

      const response = JSON.parse(result.content[0].text);
      return response;
    } catch (error) {
      console.error('Error generating exercise via MCP:', error);
      throw error;
    }
  }

  async explainExercise(exercise, answer) {
    try {
      const result = await this.client.callTool({
        name: 'explain_exercise',
        arguments: {
          exercise,
          answer
        }
      });

      const response = JSON.parse(result.content[0].text);
      return response;
    } catch (error) {
      console.error('Error explaining exercise via MCP:', error);
      throw error;
    }
  }

  async validateAnswer(exercise, studentAnswer, correctAnswer) {
    try {
      const result = await this.client.callTool({
        name: 'validate_answer',
        arguments: {
          exercise,
          studentAnswer,
          correctAnswer
        }
      });

      const response = JSON.parse(result.content[0].text);
      return response;
    } catch (error) {
      console.error('Error validating answer via MCP:', error);
      throw error;
    }
  }

  async disconnect() {
    await this.client.close();
  }
}

export default LogicKidsMCPClient; 