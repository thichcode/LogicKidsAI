# 🚀 Hướng dẫn Deploy LogicKids AI

## Phương án 1: Deploy Frontend lên Vercel + Backend lên Railway (Khuyến nghị)

### Bước 1: Deploy Backend lên Railway

1. **Tạo tài khoản Railway:**
   - Truy cập [railway.app](https://railway.app)
   - Đăng ký tài khoản (có thể dùng GitHub)

2. **Deploy Backend:**
   ```bash
   # Clone repository (nếu chưa có)
   git clone <your-repo-url>
   cd logickids-ai/server
   
   # Tạo file .env
   cp env.example .env
   # Chỉnh sửa .env với GEMINI_API_KEY thực
   ```

3. **Push lên Railway:**
   - Tạo project mới trên Railway
   - Connect với GitHub repository
   - Chọn thư mục `server`
   - Thêm environment variables:
     ```
     GEMINI_API_KEY=your_actual_api_key
     NODE_ENV=production
     ```

4. **Lấy URL Backend:**
   - Railway sẽ cung cấp URL như: `https://your-app.railway.app`
   - Copy URL này để cấu hình frontend

### Bước 2: Deploy Frontend lên Vercel

1. **Cấu hình API URL:**
   ```bash
   cd client
   # Tạo file .env.local
   echo "REACT_APP_API_URL=https://your-app.railway.app/api" > .env.local
   ```

2. **Cập nhật vercel.json:**
   ```json
   {
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "https://your-app.railway.app/api/$1"
       }
     ]
   }
   ```

3. **Deploy lên Vercel:**
   ```bash
   # Cài đặt Vercel CLI
   npm i -g vercel
   
   # Deploy
   cd client
   vercel
   
   # Hoặc deploy qua GitHub:
   # - Push code lên GitHub
   # - Connect repository với Vercel
   # - Deploy tự động
   ```

## Phương án 2: Deploy Full-stack lên Vercel

### Bước 1: Cấu trúc lại project

1. **Tạo thư mục api/ trong root:**
   ```bash
   mkdir api
   ```

2. **Di chuyển server routes thành Vercel functions:**
   ```bash
   # Tạo các file API routes
   touch api/exercises.js
   touch api/config.js
   ```

3. **Cập nhật package.json root:**
   ```json
   {
     "scripts": {
       "build": "cd client && npm run build",
       "dev": "concurrently \"npm run server\" \"npm run client\"",
       "server": "cd server && npm run dev",
       "client": "cd client && npm start"
     }
   }
   ```

### Bước 2: Deploy

1. **Push code lên GitHub**

2. **Connect với Vercel:**
   - Truy cập [vercel.com](https://vercel.com)
   - Import repository
   - Cấu hình:
     - **Framework Preset:** Other
     - **Root Directory:** `./`
     - **Build Command:** `npm run build`
     - **Output Directory:** `client/build`

3. **Thêm Environment Variables:**
   ```
   GEMINI_API_KEY=your_actual_api_key
   ```

## Phương án 3: Deploy Backend lên Render

### Bước 1: Tạo Render Account
- Truy cập [render.com](https://render.com)
- Đăng ký tài khoản

### Bước 2: Deploy Backend
1. **Tạo Web Service mới**
2. **Connect với GitHub repository**
3. **Cấu hình:**
   - **Name:** logickids-ai-backend
   - **Root Directory:** `server`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Thêm Environment Variables:**
   ```
   GEMINI_API_KEY=your_actual_api_key
   NODE_ENV=production
   ```

### Bước 3: Deploy Frontend lên Vercel
- Tương tự như Phương án 1
- Cập nhật API URL thành Render URL

## Cấu hình CORS cho Production

### Backend (server/index.js):
```javascript
app.use(cors({
  origin: [
    'https://your-frontend-domain.vercel.app',
    'http://localhost:3000' // cho development
  ],
  credentials: true
}));
```

### Frontend (.env.local):
```env
REACT_APP_API_URL=https://your-backend-domain.railway.app/api
```

## Kiểm tra Deploy

### Backend Health Check:
```bash
curl https://your-backend-domain.railway.app/api/health
```

### Frontend:
- Truy cập URL Vercel
- Test tạo bài tập
- Kiểm tra console errors

## Troubleshooting

### Lỗi CORS:
- Kiểm tra cấu hình CORS trong backend
- Đảm bảo frontend URL được thêm vào whitelist

### Lỗi API Key:
- Kiểm tra environment variables
- Đảm bảo API key có quyền truy cập Gemini API

### Lỗi Build:
- Kiểm tra build logs trong Vercel
- Đảm bảo tất cả dependencies được cài đặt

## Chi phí

### Railway:
- **Free tier:** $5 credit/tháng
- **Pro:** $20/tháng

### Vercel:
- **Free tier:** 100GB bandwidth/tháng
- **Pro:** $20/tháng

### Render:
- **Free tier:** 750 giờ/tháng
- **Pro:** $7/tháng

## Khuyến nghị

**Phương án 1 (Vercel + Railway)** là tốt nhất vì:
- ✅ Dễ cấu hình
- ✅ Miễn phí cho dự án nhỏ
- ✅ Performance tốt
- ✅ Auto-deploy từ GitHub
- ✅ SSL tự động

---

**LogicKids AI** - Sẵn sàng deploy! 🚀✨ 