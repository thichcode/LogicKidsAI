import axios from 'axios';

export class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.baseURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY không được cấu hình trong environment variables');
    }
  }

  /**
   * Tạo bài tập sử dụng Gemini API
   * @param {string} prompt - Prompt chi tiết cho AI
   * @returns {Promise<Object>} - Kết quả từ Gemini API
   */
  async generateExercises(prompt) {
    try {
      console.log('🤖 Đang gửi yêu cầu đến Gemini API...');
      
      const response = await axios.post(
        `${this.baseURL}?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 giây timeout
        }
      );

      if (response.data && response.data.candidates && response.data.candidates[0]) {
        const content = response.data.candidates[0].content;
        if (content && content.parts && content.parts[0]) {
          const text = content.parts[0].text;
          console.log('✅ Nhận được phản hồi từ Gemini API');
          
          // Cố gắng parse JSON từ response
          return this.parseGeminiResponse(text);
        }
      }

      throw new Error('Phản hồi từ Gemini API không đúng định dạng');

    } catch (error) {
      console.error('❌ Lỗi khi gọi Gemini API:', error.message);
      
      if (error.response) {
        // Lỗi từ API
        const status = error.response.status;
        const message = error.response.data?.error?.message || 'Lỗi không xác định';
        
        if (status === 400) {
          throw new Error('Yêu cầu không hợp lệ. Vui lòng thử lại với cấu hình khác.');
        } else if (status === 401) {
          throw new Error('API key không hợp lệ. Vui lòng kiểm tra cấu hình.');
        } else if (status === 429) {
          throw new Error('Đã vượt quá giới hạn API. Vui lòng thử lại sau.');
        } else if (status >= 500) {
          throw new Error('Lỗi server. Vui lòng thử lại sau.');
        } else {
          throw new Error(`Lỗi API: ${message}`);
        }
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Yêu cầu bị timeout. Vui lòng thử lại.');
      } else {
        throw new Error('Không thể kết nối đến Gemini API. Vui lòng kiểm tra kết nối internet.');
      }
    }
  }

  /**
   * Parse response từ Gemini API
   * @param {string} text - Text response từ Gemini
   * @returns {Object} - Object đã parse
   */
  parseGeminiResponse(text) {
    try {
      // Tìm JSON trong response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        return JSON.parse(jsonString);
      }

      // Nếu không tìm thấy JSON, tạo response mẫu
      console.warn('⚠️ Không tìm thấy JSON trong response, tạo response mẫu');
      return this.createFallbackResponse(text);
      
    } catch (parseError) {
      console.error('❌ Lỗi parse JSON:', parseError.message);
      return this.createFallbackResponse(text);
    }
  }

  /**
   * Tạo response mẫu khi không parse được JSON
   * @param {string} text - Text response từ Gemini
   * @returns {Object} - Response mẫu
   */
  createFallbackResponse(text) {
    return {
      exercises: [
        {
          id: 1,
          question: "Bài tập mẫu",
          content: text.substring(0, 200) + "...",
          explanation: "Đây là bài tập được tạo bởi AI",
          type: "fallback"
        }
      ],
      rawResponse: text
    };
  }

  /**
   * Kiểm tra kết nối với Gemini API
   * @returns {Promise<boolean>} - True nếu kết nối thành công
   */
  async testConnection() {
    try {
      const testPrompt = "Tạo 1 bài tập đếm đơn giản cho trẻ 3 tuổi. Format JSON: {\"exercises\": [{\"id\": 1, \"question\": \"Đếm số quả táo:\", \"images\": [\"🍎\", \"🍎\"], \"correctAnswer\": 2, \"explanation\": \"Có 2 quả táo\"}]}";
      
      const result = await this.generateExercises(testPrompt);
      return result && result.exercises && result.exercises.length > 0;
    } catch (error) {
      console.error('❌ Test connection failed:', error.message);
      return false;
    }
  }
} 