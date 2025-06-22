import { ageGroups, exerciseTypes } from './_lib/exerciseTypes.js';

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

    if (action === 'app') {
      // GET /api/config?action=app
      const appConfig = {
        appName: 'LogicKids AI',
        version: '1.0.0',
        description: 'Nền tảng tạo bài tập logic cho trẻ em sử dụng AI',
        features: {
          maxExercisesPerRequest: 10,
          supportedAgeGroups: ageGroups.map(ag => ag.id),
          supportedExerciseTypes: exerciseTypes.map(et => et.id),
        },
        api: {
          baseUrl: '/api',
          version: 'v1',
        },
      };
      res.status(200).json({
        success: true,
        data: appConfig,
        message: 'Lấy cấu hình ứng dụng thành công'
      });
    } else {
      res.status(400).json({ success: false, error: 'Invalid action' });
    }
  } catch (error) {
    console.error('❌ Lỗi config API:', error);
    res.status(500).json({
      success: false,
      error: 'Lỗi server khi lấy cấu hình',
      details: error.message
    });
  }
} 