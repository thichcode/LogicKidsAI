import LogicKidsMCPClient from '../../api/mcp-client.js';

class MCPService {
  constructor() {
    this.client = new LogicKidsMCPClient();
    this.isConnected = false;
  }

  async connect() {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
      console.log('✅ MCP Client connected successfully');
    }
  }

  async disconnect() {
    if (this.isConnected) {
      await this.client.disconnect();
      this.isConnected = false;
      console.log('🔌 MCP Client disconnected');
    }
  }

  async generateExercises(ageGroupId, exerciseTypeIds, count) {
    try {
      await this.connect();

      // Map age group ID to MCP format
      const ageGroupMap = {
        '3-5': '3-5',
        '6-8': '6-8', 
        '9-12': '9-12',
        '13-15': '13-15'
      };

      // Map exercise type ID to MCP format
      const exerciseTypeMap = {
        'pattern': 'pattern',
        'sequence': 'sequence',
        'classification': 'classification',
        'analogy': 'analogy',
        'deduction': 'deduction'
      };

      const ageGroup = ageGroupMap[ageGroupId] || '6-8';
      const exerciseType = exerciseTypeMap[exerciseTypeIds[0]] || 'pattern';
      const difficulty = this.getDifficultyByAgeGroup(ageGroup);

      const result = await this.client.generateLogicExercise(
        ageGroup,
        exerciseType,
        difficulty,
        count
      );

      if (result.success) {
        return {
          success: true,
          exercises: result.exercises,
          metadata: {
            ageGroup: { id: ageGroupId, name: ageGroup },
            exerciseTypes: exerciseTypeIds.map(id => ({ id, name: exerciseTypeMap[id] || id })),
            totalCount: result.exercises.length,
            generatedAt: result.metadata.generatedAt
          }
        };
      } else {
        throw new Error('Failed to generate exercises via MCP');
      }

    } catch (error) {
      console.error('Error in MCP service:', error);
      throw new Error(`MCP Service Error: ${error.message}`);
    }
  }

  async explainExercise(exercise, answer) {
    try {
      await this.connect();
      
      const result = await this.client.explainExercise(exercise, answer);
      
      if (result.success) {
        return {
          success: true,
          explanation: result.explanation,
          tips: result.tips
        };
      } else {
        throw new Error('Failed to explain exercise via MCP');
      }

    } catch (error) {
      console.error('Error explaining exercise via MCP:', error);
      throw new Error(`MCP Explanation Error: ${error.message}`);
    }
  }

  async validateAnswer(exercise, studentAnswer, correctAnswer) {
    try {
      await this.connect();
      
      const result = await this.client.validateAnswer(exercise, studentAnswer, correctAnswer);
      
      if (result.success) {
        return {
          success: true,
          isCorrect: result.isCorrect,
          feedback: result.feedback,
          explanation: result.explanation
        };
      } else {
        throw new Error('Failed to validate answer via MCP');
      }

    } catch (error) {
      console.error('Error validating answer via MCP:', error);
      throw new Error(`MCP Validation Error: ${error.message}`);
    }
  }

  getDifficultyByAgeGroup(ageGroup) {
    const difficultyMap = {
      '3-5': 'easy',
      '6-8': 'easy',
      '9-12': 'medium',
      '13-15': 'hard'
    };
    return difficultyMap[ageGroup] || 'medium';
  }

  async healthCheck() {
    try {
      await this.connect();
      return {
        status: 'healthy',
        service: 'mcp',
        timestamp: new Date().toISOString(),
        connected: this.isConnected
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        service: 'mcp',
        timestamp: new Date().toISOString(),
        error: error.message,
        connected: this.isConnected
      };
    }
  }
}

export default new MCPService(); 