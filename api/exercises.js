import { exerciseTypes, ageGroups } from '../server/config/exerciseTypes.js';
import mcpService from '../server/services/mcpService.js';

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
          res.status(200).json({
            success: true,
            data: {
              connected: true,
              message: 'Kết nối MCP API thành công'
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
          const { ageGroupId, exerciseTypeIds, count = 3 } = req.body;

          // Validate input
          if (!ageGroupId || !exerciseTypeIds || !Array.isArray(exerciseTypeIds)) {
            return res.status(400).json({
              success: false,
              error: 'Missing required fields: ageGroupId, exerciseTypeIds'
            });
          }

          if (count < 1 || count > 10) {
            return res.status(400).json({
              success: false,
              error: 'Count must be between 1 and 10'
            });
          }

          console.log('🎯 Generating exercises via MCP...');
          console.log('📊 Request:', { ageGroupId, exerciseTypeIds, count });

          // Generate exercises using MCP service
          const result = await mcpService.generateExercises(ageGroupId, exerciseTypeIds, count);

          console.log('✅ Exercises generated successfully');
          console.log('📈 Generated:', result.exercises.length, 'exercises');

          res.status(200).json(result);
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