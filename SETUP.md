# Hướng dẫn cài đặt LogicKids AI

## Yêu cầu hệ thống

- Node.js 18+ 
- npm hoặc yarn
- API key của Google Gemini

## Bước 1: Clone và cài đặt dependencies

```bash
# Clone dự án (nếu có repository)
git clone <repository-url>
cd logickids-ai

# Cài đặt tất cả dependencies
npm run install-all
```

## Bước 2: Cấu hình Gemini API

1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Tạo API key mới
3. Copy API key

## Bước 3: Cấu hình environment variables

### Backend (server/)
```bash
cd server
cp env.example .env
```

Chỉnh sửa file `.env`:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (client/) - Tùy chọn
```bash
cd client
```

Tạo file `.env` nếu cần:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Bước 4: Chạy ứng dụng

### Chạy cả frontend và backend
```bash
# Từ thư mục gốc
npm run dev
```

### Hoặc chạy riêng lẻ

**Backend:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
cd client
npm start
```

## Bước 5: Kiểm tra ứng dụng

1. Frontend: http://localhost:3000
2. Backend API: http://localhost:5000/api/health

## Cấu trúc dự án

```
logickids-ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── public/            # Static files
├── server/                # Node.js backend
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── config/            # Configuration files
│   └── utils/             # Utility functions
├── docs/                  # Documentation
└── package.json           # Root package.json
```

## API Endpoints

### Health Check
- `GET /api/health` - Kiểm tra tình trạng server

### Configuration
- `GET /api/config/app` - Lấy cấu hình ứng dụng
- `GET /api/config/health` - Kiểm tra tình trạng hệ thống

### Exercises
- `GET /api/exercises/age-groups` - Lấy danh sách độ tuổi
- `GET /api/exercises/types` - Lấy danh sách loại bài tập
- `POST /api/exercises/generate` - Tạo bài tập mới
- `GET /api/exercises/test-connection` - Test kết nối Gemini API

## Troubleshooting

### Lỗi "Cannot find module"
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Lỗi Gemini API
1. Kiểm tra API key trong file `.env`
2. Đảm bảo API key có quyền truy cập Gemini API
3. Kiểm tra quota và rate limits

### Lỗi CORS
1. Kiểm tra cấu hình CORS trong `server/index.js`
2. Đảm bảo frontend và backend chạy đúng ports

### Lỗi TypeScript
```bash
# Cài đặt types cần thiết
cd client
npm install @types/react @types/react-dom @types/node
```

## Development

### Scripts có sẵn

**Root:**
- `npm run dev` - Chạy cả frontend và backend
- `npm run install-all` - Cài đặt tất cả dependencies
- `npm run build` - Build frontend cho production

**Backend:**
- `npm run dev` - Chạy với nodemon
- `npm start` - Chạy production
- `npm test` - Chạy tests

**Frontend:**
- `npm start` - Chạy development server
- `npm build` - Build cho production
- `npm test` - Chạy tests

### Cấu hình thêm

#### Thay đổi ports
Chỉnh sửa trong file `.env`:
```env
PORT=5000  # Backend port
```

Và trong `client/package.json`:
```json
{
  "proxy": "http://localhost:5000"
}
```

#### Thêm environment variables
1. Thêm vào `server/env.example`
2. Thêm vào `server/.env`
3. Sử dụng trong code: `process.env.VARIABLE_NAME`

## Production Deployment

### Backend
```bash
cd server
npm install --production
NODE_ENV=production npm start
```

### Frontend
```bash
cd client
npm run build
# Serve build folder với nginx hoặc static server
```

## Support

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra logs trong console
2. Kiểm tra network tab trong browser
3. Đảm bảo tất cả dependencies đã được cài đặt
4. Kiểm tra cấu hình environment variables

---

**LogicKids AI** - Giúp trẻ phát triển tư duy logic một cách thông minh và vui vẻ! 🧠✨ 