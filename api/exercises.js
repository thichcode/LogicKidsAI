import { exerciseTypes, ageGroups } from '../server/config/exerciseTypes.js';
import { GeminiService } from '../server/services/geminiService.js';

// Khởi tạo Gemini service
let geminiService;
try {
  geminiService = new GeminiService();
} catch (error) {
  console.error('❌ Không thể khởi tạo Gemini Service:', error.message);
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        if (req.query.action === 'types') {
          // GET /api/exercises?action=types
          const types = exerciseTypes.map(type => ({
            id: type.id,
            name: type.name,
            description: type.description,
            icon: type.icon
          }));

          res.status(200).json({
            success: true,
            data: types,
            message: 'Lấy danh sách loại bài tập thành công'
          });
        } else if (req.query.action === 'age-groups') {
          // GET /api/exercises?action=age-groups
          res.status(200).json({
            success: true,
            data: ageGroups,
            message: 'Lấy danh sách độ tuổi thành công'
          });
        } else if (req.query.action === 'test-connection') {
          // GET /api/exercises?action=test-connection
          if (!geminiService) {
            return res.status(500).json({
              success: false,
              error: 'Gemini API chưa được cấu hình'
            });
          }

          const isConnected = await geminiService.testConnection();
          
          res.status(200).json({
            success: true,
            data: {
              connected: isConnected,
              message: isConnected ? 'Kết nối Gemini API thành công' : 'Không thể kết nối Gemini API'
            }
          });
        } else {
          res.status(400).json({
            success: false,
            error: 'Action không hợp lệ'
          });
        }
        break;

      case 'POST':
        if (req.query.action === 'generate') {
          // POST /api/exercises?action=generate
          const { ageGroupId, exerciseTypeIds, count = 5 } = req.body;

          // Validate input
          if (!ageGroupId || !exerciseTypeIds || !Array.isArray(exerciseTypeIds)) {
            return res.status(400).json({
              success: false,
              error: 'Thiếu thông tin bắt buộc: ageGroupId, exerciseTypeIds'
            });
          }

          if (!geminiService) {
            return res.status(500).json({
              success: false,
              error: 'Gemini API chưa được cấu hình. Vui lòng kiểm tra GEMINI_API_KEY.'
            });
          }

          // Tìm age group
          const ageGroup = ageGroups.find(ag => ag.id === ageGroupId);
          if (!ageGroup) {
            return res.status(400).json({
              success: false,
              error: 'Độ tuổi không hợp lệ'
            });
          }

          // Tìm exercise types
          const selectedTypes = exerciseTypes.filter(type => 
            exerciseTypeIds.includes(type.id)
          );

          if (selectedTypes.length === 0) {
            return res.status(400).json({
              success: false,
              error: 'Không tìm thấy loại bài tập được chọn'
            });
          }

          // Validate count
          const validCount = Math.min(Math.max(parseInt(count), 1), 10);
          if (isNaN(validCount)) {
            return res.status(400).json({
              success: false,
              error: 'Số lượng bài tập không hợp lệ'
            });
          }

          console.log(`🎯 Tạo ${validCount} bài tập cho độ tuổi ${ageGroup.name}, loại: ${selectedTypes.map(t => t.name).join(', ')}`);

          // Tạo bài tập cho từng loại
          const allExercises = [];
          
          for (const exerciseType of selectedTypes) {
            try {
              // Tạo prompt cho loại bài tập này
              const prompt = exerciseType.promptTemplate(ageGroup, validCount);
              
              // Gọi Gemini API
              const result = await geminiService.generateExercises(prompt);
              
              if (result && result.exercises) {
                // Thêm thông tin loại bài tập vào mỗi exercise
                const exercisesWithType = result.exercises.map(exercise => ({
                  ...exercise,
                  type: exerciseType.id,
                  typeName: exerciseType.name,
                  typeIcon: exerciseType.icon
                }));
                
                allExercises.push(...exercisesWithType);
              }
            } catch (typeError) {
              console.error(`❌ Lỗi khi tạo bài tập loại ${exerciseType.name}:`, typeError.message);
              // Tiếp tục với loại khác thay vì dừng toàn bộ
            }
          }

          if (allExercises.length === 0) {
            return res.status(500).json({
              success: false,
              error: 'Không thể tạo bài tập nào. Vui lòng thử lại sau.'
            });
          }

          // Trả về kết quả
          res.status(200).json({
            success: true,
            data: {
              exercises: allExercises,
              metadata: {
                ageGroup: ageGroup,
                exerciseTypes: selectedTypes.map(t => ({ id: t.id, name: t.name })),
                totalCount: allExercises.length,
                generatedAt: new Date().toISOString()
              }
            },
            message: `Đã tạo thành công ${allExercises.length} bài tập`
          });
        } else {
          res.status(400).json({
            success: false,
            error: 'Action không hợp lệ'
          });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({
          success: false,
          error: `Method ${method} Not Allowed`
        });
    }
  } catch (error) {
    console.error('❌ Lỗi API:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server',
      message: error.message
    });
  }
} 