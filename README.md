# LogicKids AI - Nền tảng Tạo Bài Tập Logic Cho Trẻ Em

## Giới thiệu

LogicKids AI là một nền tảng web hiện đại giúp phụ huynh và giáo viên tạo ra các bộ bài tập tư duy logic đa dạng, phù hợp với từng độ tuổi của trẻ, được hỗ trợ bởi khả năng tạo nội dung của Google Gemini API.

## Tính năng chính

- 🎯 **Tạo bài tập theo độ tuổi**: Chọn độ tuổi phù hợp (2-6 tuổi)
- 🧩 **Đa dạng loại bài tập**: Tìm quy luật, nối hình, tìm điểm khác biệt, sắp xếp, đếm, tìm hình thiếu
- 🤖 **Tích hợp AI**: Sử dụng Gemini API để tạo nội dung thông minh
- 📱 **Responsive Design**: Hoạt động tốt trên desktop và tablet
- 📄 **Xuất PDF**: In và lưu bài tập dễ dàng
- 🎨 **Giao diện thân thiện**: Thiết kế tươi sáng, dễ sử dụng

## Cài đặt

### Yêu cầu hệ thống
- Node.js 18+ 
- npm hoặc yarn
- API key của Google Gemini

### Bước 1: Clone dự án
```bash
git clone <repository-url>
cd logickids-ai
```

### Bước 2: Cài đặt dependencies
```bash
npm run install-all
```

### Bước 3: Cấu hình môi trường
Tạo file `.env` trong thư mục `server`:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
NODE_ENV=development
```

### Bước 4: Chạy ứng dụng
```bash
# Chạy cả frontend và backend
npm run dev

# Hoặc chạy riêng lẻ
npm run server  # Backend
npm run client  # Frontend
```

## Cấu trúc dự án

```
logickids-ai/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   └── public/            # Static files
├── server/                # Backend Node.js app
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── config/            # Configuration files
│   └── utils/             # Utility functions
├── docs/                  # Documentation
└── package.json           # Root package.json
```

## Sử dụng

1. **Chọn độ tuổi**: Chọn độ tuổi phù hợp cho trẻ (2-3, 3-4, 4-5, 5-6 tuổi)
2. **Chọn loại bài tập**: Chọn một hoặc nhiều loại bài tập logic
3. **Cấu hình số lượng**: Chọn số lượng bài tập mong muốn
4. **Tạo bài tập**: Nhấn nút "Tạo bài tập" để AI tạo nội dung
5. **Xem trước**: Kiểm tra bài tập và đáp án
6. **Xuất PDF**: In hoặc lưu bài tập dưới dạng PDF

## API Endpoints

- `POST /api/exercises/generate` - Tạo bài tập mới
- `GET /api/exercises/types` - Lấy danh sách loại bài tập
- `GET /api/exercises/age-groups` - Lấy danh sách độ tuổi

## Công nghệ sử dụng

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React PDF

### Backend
- Node.js
- Express.js
- Google Gemini API
- CORS
- Helmet

## Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## Hỗ trợ

Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng tạo issue trong repository hoặc liên hệ team phát triển.

---

**LogicKids AI** - Giúp trẻ phát triển tư duy logic một cách thông minh và vui vẻ! 🧠✨ 