import mcpService from './_lib/mcpService.js';
import { ageGroups, exerciseTypes } from './_lib/exerciseTypes.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    return handleGenerate(req, res);
  }

  if (req.method === 'GET') {
    const { action } = req.query;
    if (action === 'types') {
      return handleGetTypes(req, res);
    }
    if (action === 'age-groups') {
      return handleGetAgeGroups(req, res);
    }
  }

  return res.status(405).json({ success: false, error: `Method ${req.method} not allowed.` });
}

async function handleGenerate(req, res) {
  try {
    const { ageGroupId, exerciseTypeIds, count = 3 } = req.body;

    if (!ageGroupId || !exerciseTypeIds || !Array.isArray(exerciseTypeIds)) {
      return res.status(400).json({ success: false, error: 'Missing required fields: ageGroupId, exerciseTypeIds' });
    }
    if (count < 1 || count > 10) {
      return res.status(400).json({ success: false, error: 'Count must be between 1 and 10' });
    }

    console.log('🎯 Generating exercises via MCP...');
    const result = await mcpService.generateExercises(ageGroupId, exerciseTypeIds, count);
    console.log('✅ Exercises generated successfully:', result.exercises.length);

    return res.status(200).json(result);

  } catch (error) {
    console.error('❌ Error generating exercises:', error);
    return res.status(500).json({ success: false, error: 'Failed to generate exercises', details: error.message });
  }
}

function handleGetTypes(req, res) {
  try {
    const safeTypes = exerciseTypes.map(({ promptTemplate, ...rest }) => rest);
    return res.status(200).json({ success: true, data: safeTypes });
  } catch (error) {
    console.error('❌ Error getting exercise types:', error);
    return res.status(500).json({ success: false, error: 'Failed to get exercise types' });
  }
}

function handleGetAgeGroups(req, res) {
  try {
    return res.status(200).json({ success: true, data: ageGroups });
  } catch (error) {
    console.error('❌ Error getting age groups:', error);
    return res.status(500).json({ success: false, error: 'Failed to get age groups' });
  }
} 