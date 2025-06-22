const express = require('express');
const router = express.Router();

/**
 * GET /api/config/app
 * Lấy cấu hình ứng dụng
 */
router.get('/app', (req, res) => {
  try {
    const config = {
      appName: 'LogicKids AI',
      version: '1.0.0',
      description: 'Nền tảng tạo bài tập logic cho trẻ em',
      features: {
        maxExercisesPerRequest: 10,
        supportedAgeGroups: ['2-3', '3-4', '4-5', '5-6'],
        supportedExerciseTypes: [
          'pattern-sequence',
          'matching', 
          'spot-difference',
          'sorting',
          'counting',
          'missing-piece'
        ]
      },
      api: {
        baseUrl: process.env.NODE_ENV === 'production' 
          ? 'https://yourdomain.com/api' 
          : 'http://localhost:5000/api',
        version: 'v1'
      }
    };

    res.json({
      success: true,
      data: config,
      message: 'Lấy cấu hình ứng dụng thành công'
    });
  } catch (error) {
    console.error('❌ Lỗi khi lấy cấu hình:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server khi lấy cấu hình'
    });
  }
});

/**
 * GET /api/config/health
 * Kiểm tra tình trạng hệ thống
 */
router.get('/health', (req, res) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      },
      services: {
        gemini: process.env.GEMINI_API_KEY ? 'configured' : 'not_configured'
      }
    };

    res.json({
      success: true,
      data: health,
      message: 'Hệ thống hoạt động bình thường'
    });
  } catch (error) {
    console.error('❌ Lỗi health check:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi khi kiểm tra tình trạng hệ thống'
    });
  }
});

module.exports = router; 