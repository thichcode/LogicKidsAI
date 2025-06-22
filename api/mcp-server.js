import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

// MCP Server cho Logic Kids AI
class LogicKidsMCPServer {
  constructor() {
    this.server = new Server(
      {
        name: 'logic-kids-ai-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    // Tool: Tạo bài tập logic
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'generate_logic_exercise',
            description: 'Tạo bài tập logic cho trẻ em theo độ tuổi và loại bài tập',
            inputSchema: {
              type: 'object',
              properties: {
                ageGroup: {
                  type: 'string',
                  description: 'Độ tuổi của trẻ (3-5, 6-8, 9-12, 13-15)',
                  enum: ['3-5', '6-8', '9-12', '13-15']
                },
                exerciseType: {
                  type: 'string',
                  description: 'Loại bài tập logic',
                  enum: ['pattern', 'sequence', 'classification', 'analogy', 'deduction']
                },
                difficulty: {
                  type: 'string',
                  description: 'Độ khó của bài tập',
                  enum: ['easy', 'medium', 'hard']
                },
                count: {
                  type: 'number',
                  description: 'Số lượng bài tập cần tạo',
                  minimum: 1,
                  maximum: 10
                }
              },
              required: ['ageGroup', 'exerciseType', 'difficulty']
            }
          },
          {
            name: 'explain_exercise',
            description: 'Giải thích cách giải bài tập logic',
            inputSchema: {
              type: 'object',
              properties: {
                exercise: {
                  type: 'string',
                  description: 'Nội dung bài tập cần giải thích'
                },
                answer: {
                  type: 'string',
                  description: 'Đáp án của bài tập'
                }
              },
              required: ['exercise', 'answer']
            }
          },
          {
            name: 'validate_answer',
            description: 'Kiểm tra đáp án của học sinh',
            inputSchema: {
              type: 'object',
              properties: {
                exercise: {
                  type: 'string',
                  description: 'Nội dung bài tập'
                },
                studentAnswer: {
                  type: 'string',
                  description: 'Đáp án của học sinh'
                },
                correctAnswer: {
                  type: 'string',
                  description: 'Đáp án đúng'
                }
              },
              required: ['exercise', 'studentAnswer', 'correctAnswer']
            }
          }
        ]
      };
    });

    // Tool: Xử lý tạo bài tập logic
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      switch (name) {
        case 'generate_logic_exercise':
          return await this.generateLogicExercise(args);
        
        case 'explain_exercise':
          return await this.explainExercise(args);
        
        case 'validate_answer':
          return await this.validateAnswer(args);
        
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  async generateLogicExercise(args) {
    const { ageGroup, exerciseType, difficulty, count = 1 } = args;
    
    // Logic tạo bài tập dựa trên các tham số
    const exercises = [];
    
    for (let i = 0; i < count; i++) {
      const exercise = this.createExerciseByType(ageGroup, exerciseType, difficulty);
      exercises.push(exercise);
    }

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            exercises: exercises,
            metadata: {
              ageGroup,
              exerciseType,
              difficulty,
              count,
              generatedAt: new Date().toISOString()
            }
          }, null, 2)
        }
      ]
    };
  }

  createExerciseByType(ageGroup, exerciseType, difficulty) {
    const baseExercise = {
      id: Date.now() + Math.random(),
      difficulty,
      ageGroup,
      category: exerciseType,
      createdAt: new Date().toISOString()
    };

    switch (exerciseType) {
      case 'pattern':
        return this.createPatternExercise(baseExercise, difficulty);
      case 'sequence':
        return this.createSequenceExercise(baseExercise, difficulty);
      case 'classification':
        return this.createClassificationExercise(baseExercise, difficulty);
      case 'analogy':
        return this.createAnalogyExercise(baseExercise, difficulty);
      case 'deduction':
        return this.createDeductionExercise(baseExercise, difficulty);
      default:
        return this.createPatternExercise(baseExercise, difficulty);
    }
  }

  createPatternExercise(base, difficulty) {
    const patterns = {
      easy: {
        title: 'Tìm quy luật đơn giản',
        description: 'Hãy tìm số tiếp theo trong dãy số:',
        content: `
          <div class="exercise-content">
            <h3>Dãy số: 2, 4, 6, 8, 10, ?</h3>
            <p>Hãy tìm số tiếp theo trong dãy số trên.</p>
            
            <div class="options">
              <label><input type="radio" name="answer" value="A" /> A. 11</label>
              <label><input type="radio" name="answer" value="B" /> B. 12</label>
              <label><input type="radio" name="answer" value="C" /> C. 13</label>
              <label><input type="radio" name="answer" value="D" /> D. 14</label>
            </div>
            
            <div class="explanation" style="display: none;">
              <h4>Giải thích:</h4>
              <p>Quy luật: Mỗi số tăng thêm 2</p>
              <p>2 + 2 = 4</p>
              <p>4 + 2 = 6</p>
              <p>6 + 2 = 8</p>
              <p>8 + 2 = 10</p>
              <p>10 + 2 = 12</p>
              <p><strong>Đáp án: B. 12</strong></p>
            </div>
          </div>
        `,
        correctAnswer: 'B'
      },
      medium: {
        title: 'Tìm quy luật phức tạp',
        description: 'Hãy tìm số tiếp theo trong dãy số:',
        content: `
          <div class="exercise-content">
            <h3>Dãy số: 1, 2, 4, 8, 16, ?</h3>
            <p>Hãy tìm số tiếp theo trong dãy số trên.</p>
            
            <div class="options">
              <label><input type="radio" name="answer" value="A" /> A. 24</label>
              <label><input type="radio" name="answer" value="B" /> B. 32</label>
              <label><input type="radio" name="answer" value="C" /> C. 28</label>
              <label><input type="radio" name="answer" value="D" /> D. 36</label>
            </div>
            
            <div class="explanation" style="display: none;">
              <h4>Giải thích:</h4>
              <p>Quy luật: Mỗi số bằng số trước đó nhân với 2</p>
              <p>1 × 2 = 2</p>
              <p>2 × 2 = 4</p>
              <p>4 × 2 = 8</p>
              <p>8 × 2 = 16</p>
              <p>16 × 2 = 32</p>
              <p><strong>Đáp án: B. 32</strong></p>
            </div>
          </div>
        `,
        correctAnswer: 'B'
      },
      hard: {
        title: 'Tìm quy luật nâng cao',
        description: 'Hãy tìm số tiếp theo trong dãy số:',
        content: `
          <div class="exercise-content">
            <h3>Dãy số: 1, 3, 6, 10, 15, ?</h3>
            <p>Hãy tìm số tiếp theo trong dãy số trên.</p>
            
            <div class="options">
              <label><input type="radio" name="answer" value="A" /> A. 18</label>
              <label><input type="radio" name="answer" value="B" /> B. 21</label>
              <label><input type="radio" name="answer" value="C" /> C. 24</label>
              <label><input type="radio" name="answer" value="D" /> D. 28</label>
            </div>
            
            <div class="explanation" style="display: none;">
              <h4>Giải thích:</h4>
              <p>Quy luật: Mỗi số bằng tổng của số trước đó và vị trí hiện tại</p>
              <p>1 + 2 = 3</p>
              <p>3 + 3 = 6</p>
              <p>6 + 4 = 10</p>
              <p>10 + 5 = 15</p>
              <p>15 + 6 = 21</p>
              <p><strong>Đáp án: B. 21</strong></p>
            </div>
          </div>
        `,
        correctAnswer: 'B'
      }
    };

    return { ...base, ...patterns[difficulty] };
  }

  createSequenceExercise(base, difficulty) {
    // Tương tự như pattern nhưng tập trung vào thứ tự
    return this.createPatternExercise(base, difficulty);
  }

  createClassificationExercise(base, difficulty) {
    const classifications = {
      easy: {
        title: 'Phân loại đơn giản',
        description: 'Hãy chọn hình không cùng nhóm:',
        content: `
          <div class="exercise-content">
            <h3>Hình nào không cùng nhóm?</h3>
            <p>🔴 🟢 🔵 🟡 🔴</p>
            
            <div class="options">
              <label><input type="radio" name="answer" value="A" /> A. 🔴 (đỏ)</label>
              <label><input type="radio" name="answer" value="B" /> B. 🟢 (xanh lá)</label>
              <label><input type="radio" name="answer" value="C" /> C. 🔵 (xanh dương)</label>
              <label><input type="radio" name="answer" value="D" /> D. 🟡 (vàng)</label>
            </div>
            
            <div class="explanation" style="display: none;">
              <h4>Giải thích:</h4>
              <p>🔴 xuất hiện 2 lần, các màu khác chỉ xuất hiện 1 lần</p>
              <p><strong>Đáp án: A. 🔴</strong></p>
            </div>
          </div>
        `,
        correctAnswer: 'A'
      }
    };

    return { ...base, ...classifications[difficulty] };
  }

  createAnalogyExercise(base, difficulty) {
    const analogies = {
      easy: {
        title: 'Tương tự đơn giản',
        description: 'Hoàn thành cặp tương tự:',
        content: `
          <div class="exercise-content">
            <h3>Hoàn thành cặp tương tự:</h3>
            <p>🐕 : Chó :: 🐱 : ?</p>
            
            <div class="options">
              <label><input type="radio" name="answer" value="A" /> A. Mèo</label>
              <label><input type="radio" name="answer" value="B" /> B. Chuột</label>
              <label><input type="radio" name="answer" value="C" /> C. Thỏ</label>
              <label><input type="radio" name="answer" value="D" /> D. Cá</label>
            </div>
            
            <div class="explanation" style="display: none;">
              <h4>Giải thích:</h4>
              <p>🐕 là emoji của chó, 🐱 là emoji của mèo</p>
              <p><strong>Đáp án: A. Mèo</strong></p>
            </div>
          </div>
        `,
        correctAnswer: 'A'
      }
    };

    return { ...base, ...analogies[difficulty] };
  }

  createDeductionExercise(base, difficulty) {
    const deductions = {
      easy: {
        title: 'Suy luận đơn giản',
        description: 'Dựa vào thông tin đã cho, hãy suy luận:',
        content: `
          <div class="exercise-content">
            <h3>Suy luận:</h3>
            <p>Tất cả học sinh lớp 3A đều thích toán.</p>
            <p>Minh là học sinh lớp 3A.</p>
            <p>Vậy Minh có thích toán không?</p>
            
            <div class="options">
              <label><input type="radio" name="answer" value="A" /> A. Có</label>
              <label><input type="radio" name="answer" value="B" /> B. Không</label>
              <label><input type="radio" name="answer" value="C" /> C. Không biết</label>
            </div>
            
            <div class="explanation" style="display: none;">
              <h4>Giải thích:</h4>
              <p>Nếu tất cả học sinh lớp 3A đều thích toán và Minh là học sinh lớp 3A, thì Minh cũng thích toán.</p>
              <p><strong>Đáp án: A. Có</strong></p>
            </div>
          </div>
        `,
        correctAnswer: 'A'
      }
    };

    return { ...base, ...deductions[difficulty] };
  }

  async explainExercise(args) {
    const { exercise, answer } = args;
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            explanation: `Giải thích cho bài tập: ${exercise}\n\nĐáp án: ${answer}\n\nĐây là cách giải chi tiết...`,
            tips: [
              'Đọc kỹ đề bài',
              'Tìm quy luật hoặc mối liên hệ',
              'Kiểm tra lại đáp án'
            ]
          }, null, 2)
        }
      ]
    };
  }

  async validateAnswer(args) {
    const { exercise, studentAnswer, correctAnswer } = args;
    
    const isCorrect = studentAnswer.toLowerCase() === correctAnswer.toLowerCase();
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            success: true,
            isCorrect,
            studentAnswer,
            correctAnswer,
            feedback: isCorrect 
              ? 'Chính xác! Bạn đã trả lời đúng.' 
              : `Chưa đúng. Đáp án đúng là: ${correctAnswer}`,
            explanation: isCorrect 
              ? 'Bạn đã hiểu đúng quy luật của bài tập này.'
              : 'Hãy xem lại cách giải và thử lại nhé!'
          }, null, 2)
        }
      ]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

// Khởi chạy server nếu được gọi trực tiếp
if (import.meta.url === `file://${process.argv[1]}`) {
  const server = new LogicKidsMCPServer();
  server.run().catch(console.error);
}

export default LogicKidsMCPServer; 