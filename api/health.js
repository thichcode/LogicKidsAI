export default function handler(req, res) {
  res.status(200).json({ 
    status: 'OK', 
    message: 'LogicKids AI Server đang hoạt động',
    timestamp: new Date().toISOString()
  });
} 