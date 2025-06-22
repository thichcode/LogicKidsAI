const express = require('express');
const router = express.Router();
const GeminiService = require('../services/geminiService');
const { exerciseTypes, ageGroups } = require('../config/exerciseTypes');

// Khởi tạo Gemini service
let geminiService;
try {
  geminiService = new GeminiService();
} catch (error) {
  console.error('❌ Không thể khởi tạo Gemini Service:', error.message);
}

/**
 * GET /api/exercises/types
 * Lấy danh sách các loại bài tập
 */
router.get('/types', (req, res) => {
  try {
    const types = exerciseTypes.map(type => ({
      id: type.id,
      name: type.name,
      description: type.description,
      icon: type.icon
    }));

    res.json({
      success: true,
      data: types,
      message: 'Lấy danh sách loại bài tập thành công'
    });
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách loại bài tập:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server khi lấy danh sách loại bài tập'
    });
  }
});

/**
 * GET /api/exercises/age-groups
 * Lấy danh sách độ tuổi
 */
router.get('/age-groups', (req, res) => {
  try {
    res.json({
      success: true,
      data: ageGroups,
      message: 'Lấy danh sách độ tuổi thành công'
    });
  } catch (error) {
    console.error('❌ Lỗi khi lấy danh sách độ tuổi:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server khi lấy danh sách độ tuổi'
    });
  }
});

/**
 * POST /api/exercises/generate
 * Tạo bài tập mới sử dụng Gemini API
 */
router.post('/generate', async (req, res) => {
  try {
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
    res.json({
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

  } catch (error) {
    console.error('❌ Lỗi khi tạo bài tập:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server khi tạo bài tập',
      message: error.message
    });
  }
});

/**
 * GET /api/exercises/test-connection
 * Test kết nối với Gemini API
 */
router.get('/test-connection', async (req, res) => {
  try {
    if (!geminiService) {
      return res.status(500).json({
        success: false,
        error: 'Gemini API chưa được cấu hình'
      });
    }

    const isConnected = await geminiService.testConnection();
    
    res.json({
      success: true,
      data: {
        connected: isConnected,
        message: isConnected ? 'Kết nối Gemini API thành công' : 'Không thể kết nối Gemini API'
      }
    });
  } catch (error) {
    console.error('❌ Lỗi test connection:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi khi test kết nối',
      message: error.message
    });
  }
});

module.exports = router; 