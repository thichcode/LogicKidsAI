export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} Not Allowed`
    });
  }

  try {
    const { action } = req.query;

    switch (action) {
      case 'app':
        // GET /api/config?action=app
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
            baseUrl: process.env.VERCEL_URL 
              ? `https://${process.env.VERCEL_URL}/api` 
              : 'http://localhost:3000/api',
            version: 'v1'
          }
        };

        res.status(200).json({
          success: true,
          data: config,
          message: 'Lấy cấu hình ứng dụng thành công'
        });
        break;

      case 'health':
        // GET /api/config?action=health
        const health = {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'production',
          platform: 'Vercel',
          services: {
            gemini: process.env.GEMINI_API_KEY ? 'configured' : 'not_configured'
          }
        };

        res.status(200).json({
          success: true,
          data: health,
          message: 'Hệ thống hoạt động bình thường'
        });
        break;

      default:
        res.status(400).json({
          success: false,
          error: 'Action không hợp lệ. Sử dụng: app hoặc health'
        });
    }
  } catch (error) {
    console.error('❌ Lỗi config API:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server khi lấy cấu hình'
    });
  }
} 