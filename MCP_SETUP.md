# MCP (Model Context Protocol) Setup cho Logic Kids AI

## 🎯 Tổng quan

Dự án này sử dụng MCP (Model Context Protocol) thay vì gọi trực tiếp Gemini API. MCP cho phép Cursor kết nối và sử dụng các tools tùy chỉnh để tạo bài tập logic cho trẻ em.

## 🚀 Cách hoạt động

### 1. MCP Server
- **File**: `api/mcp-server.js`
- **Chức năng**: Cung cấp 3 tools chính:
  - `generate_logic_exercise`: Tạo bài tập logic
  - `explain_exercise`: Giải thích bài tập
  - `validate_answer`: Kiểm tra đáp án

### 2. MCP Client
- **File**: `api/mcp-client.js`
- **Chức năng**: Kết nối với MCP server và gọi các tools

### 3. MCP Service
- **File**: `server/services/mcpService.js`
- **Chức năng**: Wrapper service để tích hợp với API routes

## 🔧 Setup MCP Server

### Bước 1: Cài đặt dependencies
```bash
npm install @modelcontextprotocol/sdk
```

### Bước 2: Chạy MCP Server
```bash
npm run mcp-server
```

### Bước 3: Test MCP Server
```bash
# Test tạo bài tập
curl -X POST http://localhost:3000/api/exercises \
  -H "Content-Type: application/json" \
  -d '{
    "ageGroupId": "6-8",
    "exerciseTypeIds": ["pattern"],
    "count": 2
  }'
```

## 🔗 Kết nối với Cursor

### Bước 1: Cấu hình Cursor
Tạo file `~/.cursor/mcp_servers.json`:

```json
{
  "mcpServers": {
    "logic-kids-ai": {
      "command": "node",
      "args": ["/path/to/your/project/api/mcp-server.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Bước 2: Restart Cursor
Khởi động lại Cursor để load MCP server.

### Bước 3: Sử dụng trong Cursor
Bây giờ bạn có thể sử dụng các tools trong Cursor:

```
@logic-kids-ai generate_logic_exercise ageGroup="6-8" exerciseType="pattern" difficulty="easy" count=3
```

## 🛠️ Tools có sẵn

### 1. generate_logic_exercise
Tạo bài tập logic cho trẻ em.

**Parameters:**
- `ageGroup`: Độ tuổi (3-5, 6-8, 9-12, 13-15)
- `exerciseType`: Loại bài tập (pattern, sequence, classification, analogy, deduction)
- `difficulty`: Độ khó (easy, medium, hard)
- `count`: Số lượng bài tập (1-10)

**Example:**
```json
{
  "ageGroup": "6-8",
  "exerciseType": "pattern",
  "difficulty": "easy",
  "count": 3
}
```

### 2. explain_exercise
Giải thích cách giải bài tập.

**Parameters:**
- `exercise`: Nội dung bài tập
- `answer`: Đáp án

### 3. validate_answer
Kiểm tra đáp án của học sinh.

**Parameters:**
- `exercise`: Nội dung bài tập
- `studentAnswer`: Đáp án của học sinh
- `correctAnswer`: Đáp án đúng

## 🌐 Deploy trên Vercel

### Bước 1: Cấu hình Vercel
MCP server sẽ chạy như một Vercel function trong thư mục `api/`.

### Bước 2: Environment Variables
Không cần API key vì MCP server tự tạo bài tập.

### Bước 3: Deploy
```bash
vercel --prod
```

## 🔍 Debug và Troubleshooting

### Kiểm tra MCP Server
```bash
# Test connection
curl http://localhost:3000/api/health

# Test MCP tools
curl -X POST http://localhost:3000/api/exercises \
  -H "Content-Type: application/json" \
  -d '{"ageGroupId": "6-8", "exerciseTypeIds": ["pattern"], "count": 1}'
```

### Logs
MCP server sẽ log các hoạt động:
```
✅ MCP Client connected successfully
🎯 Generating exercises via MCP...
✅ Exercises generated successfully
📈 Generated: 3 exercises
```

## 🎨 Tùy chỉnh

### Thêm loại bài tập mới
1. Cập nhật `exerciseTypeMap` trong `mcpService.js`
2. Thêm method tạo bài tập trong `mcp-server.js`
3. Cập nhật interface trong `types/index.ts`

### Thay đổi độ khó
Cập nhật `getDifficultyByAgeGroup()` trong `mcpService.js`

## 📚 Tài liệu tham khảo

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Cursor MCP Integration](https://cursor.sh/docs/mcp)
- [Vercel Functions](https://vercel.com/docs/functions)

## 🚀 Lợi ích của MCP

1. **Không cần API key**: Tự tạo bài tập không cần external API
2. **Tích hợp Cursor**: Sử dụng trực tiếp trong editor
3. **Tùy chỉnh cao**: Có thể thêm logic riêng
4. **Offline capable**: Hoạt động không cần internet
5. **Performance**: Nhanh hơn gọi external API 