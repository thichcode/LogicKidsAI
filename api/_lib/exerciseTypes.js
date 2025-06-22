// Cấu hình các loại bài tập logic cho trẻ em
export const exerciseTypes = [
  {
    id: 'pattern-sequence',
    name: 'Tìm quy luật dãy hình',
    description: 'Tìm hình tiếp theo trong dãy hình theo quy luật',
    icon: '🔢',
    promptTemplate: (ageGroup, count) => `
Tạo ${count} bài tập tìm quy luật dãy hình cho trẻ ${ageGroup.minAge}-${ageGroup.maxAge} tuổi.

Yêu cầu:
- Mỗi bài tập có 4-6 hình trong dãy
- Quy luật đơn giản, phù hợp với độ tuổi
- Sử dụng hình ảnh quen thuộc: con vật, đồ vật, hình học, màu sắc
- Cung cấp 3 lựa chọn cho đáp án
- Độ khó tăng dần theo tuổi

Format JSON:
{
  "exercises": [
    {
      "id": 1,
      "question": "Tìm hình tiếp theo trong dãy:",
      "sequence": ["🐱", "🐶", "🐱", "🐶", "🐱", "?"],
      "options": ["🐱", "🐶", "🐰"],
      "correctAnswer": "🐶",
      "explanation": "Quy luật: mèo - chó - mèo - chó - mèo - chó"
    }
  ]
}
    `,
    difficultyByAge: {
      '2-3': { sequenceLength: 3, complexity: 'simple' },
      '3-4': { sequenceLength: 4, complexity: 'simple' },
      '4-5': { sequenceLength: 5, complexity: 'medium' },
      '5-6': { sequenceLength: 6, complexity: 'medium' }
    }
  },
  {
    id: 'matching',
    name: 'Nối hình giống nhau',
    description: 'Nối các hình giống nhau hoặc có mối liên hệ',
    icon: '🔗',
    promptTemplate: (ageGroup, count) => `
Tạo ${count} bài tập nối hình giống nhau cho trẻ ${ageGroup.minAge}-${ageGroup.maxAge} tuổi.

Yêu cầu:
- Mỗi bài có 6-8 hình cần nối
- Các hình giống nhau hoặc có mối liên hệ logic
- Sử dụng hình ảnh quen thuộc với trẻ
- Có thể nối theo: hình dạng, màu sắc, loại đồ vật, con vật

Format JSON:
{
  "exercises": [
    {
      "id": 1,
      "question": "Nối các hình giống nhau:",
      "items": [
        {"id": "a1", "image": "🍎", "matches": "a2"},
        {"id": "a2", "image": "🍎", "matches": "a1"},
        {"id": "b1", "image": "🐱", "matches": "b2"},
        {"id": "b2", "image": "🐱", "matches": "b1"}
      ],
      "explanation": "Nối táo với táo, mèo với mèo"
    }
  ]
}
    `,
    difficultyByAge: {
      '2-3': { itemCount: 4, complexity: 'exact-match' },
      '3-4': { itemCount: 6, complexity: 'exact-match' },
      '4-5': { itemCount: 8, complexity: 'category-match' },
      '5-6': { itemCount: 10, complexity: 'category-match' }
    }
  },
  {
    id: 'spot-difference',
    name: 'Tìm điểm khác biệt',
    description: 'Tìm điểm khác biệt giữa hai hình',
    icon: '🔍',
    promptTemplate: (ageGroup, count) => `
Tạo ${count} bài tập tìm điểm khác biệt cho trẻ ${ageGroup.minAge}-${ageGroup.maxAge} tuổi.

Yêu cầu:
- Mô tả chi tiết hai hình với 3-5 điểm khác biệt
- Điểm khác biệt rõ ràng, dễ nhận biết
- Sử dụng chủ đề quen thuộc: nhà cửa, con vật, đồ chơi
- Độ khó phù hợp với độ tuổi

Format JSON:
{
  "exercises": [
    {
      "id": 1,
      "question": "Tìm điểm khác biệt giữa hai hình:",
      "image1": "Nhà có 2 cửa sổ, mái đỏ, cây xanh bên trái",
      "image2": "Nhà có 3 cửa sổ, mái đỏ, cây xanh bên phải",
      "differences": [
        "Số cửa sổ: 2 vs 3",
        "Vị trí cây: bên trái vs bên phải"
      ],
      "explanation": "Có 2 điểm khác biệt: số cửa sổ và vị trí cây"
    }
  ]
}
    `,
    difficultyByAge: {
      '2-3': { differenceCount: 2, complexity: 'obvious' },
      '3-4': { differenceCount: 3, complexity: 'obvious' },
      '4-5': { differenceCount: 4, complexity: 'moderate' },
      '5-6': { differenceCount: 5, complexity: 'moderate' }
    }
  },
  {
    id: 'sorting',
    name: 'Sắp xếp theo thứ tự',
    description: 'Sắp xếp các hình theo quy luật hoặc thứ tự logic',
    icon: '📊',
    promptTemplate: (ageGroup, count) => `
Tạo ${count} bài tập sắp xếp theo thứ tự cho trẻ ${ageGroup.minAge}-${ageGroup.maxAge} tuổi.

Yêu cầu:
- Sắp xếp theo: kích thước, màu sắc, số lượng, thứ tự thời gian
- 4-6 hình cần sắp xếp
- Quy luật rõ ràng, dễ hiểu
- Sử dụng hình ảnh quen thuộc

Format JSON:
{
  "exercises": [
    {
      "id": 1,
      "question": "Sắp xếp các hình theo kích thước từ nhỏ đến lớn:",
      "items": [
        {"id": "1", "image": "🔴", "size": "small"},
        {"id": "2", "image": "🔴", "size": "medium"},
        {"id": "3", "image": "🔴", "size": "large"}
      ],
      "correctOrder": ["1", "2", "3"],
      "explanation": "Sắp xếp theo kích thước: nhỏ → trung bình → lớn"
    }
  ]
}
    `,
    difficultyByAge: {
      '2-3': { itemCount: 3, complexity: 'size' },
      '3-4': { itemCount: 4, complexity: 'size-color' },
      '4-5': { itemCount: 5, complexity: 'multiple-criteria' },
      '5-6': { itemCount: 6, complexity: 'multiple-criteria' }
    }
  },
  {
    id: 'counting',
    name: 'Đếm và tính toán',
    description: 'Đếm số lượng và thực hiện phép tính đơn giản',
    icon: '🔢',
    promptTemplate: (ageGroup, count) => `
Tạo ${count} bài tập đếm và tính toán cho trẻ ${ageGroup.minAge}-${ageGroup.maxAge} tuổi.

Yêu cầu:
- Đếm số lượng hình ảnh
- Phép cộng/trừ đơn giản với hình ảnh
- Sử dụng hình ảnh quen thuộc: trái cây, đồ chơi, con vật
- Số lượng phù hợp với độ tuổi

Format JSON:
{
  "exercises": [
    {
      "id": 1,
      "question": "Đếm số quả táo:",
      "images": ["🍎", "🍎", "🍎"],
      "correctAnswer": 3,
      "explanation": "Có 3 quả táo"
    }
  ]
}
    `,
    difficultyByAge: {
      '2-3': { maxNumber: 5, operations: 'counting' },
      '3-4': { maxNumber: 10, operations: 'counting' },
      '4-5': { maxNumber: 15, operations: 'addition' },
      '5-6': { maxNumber: 20, operations: 'addition-subtraction' }
    }
  },
  {
    id: 'missing-piece',
    name: 'Tìm hình bị thiếu',
    description: 'Tìm hình còn thiếu để hoàn thành bộ hoặc mẫu',
    icon: '❓',
    promptTemplate: (ageGroup, count) => `
Tạo ${count} bài tập tìm hình bị thiếu cho trẻ ${ageGroup.minAge}-${ageGroup.maxAge} tuổi.

Yêu cầu:
- Hoàn thành bộ đồ vật, con vật, hình học
- Tìm hình còn thiếu trong mẫu
- Sử dụng logic đơn giản, dễ hiểu
- Cung cấp 3-4 lựa chọn

Format JSON:
{
  "exercises": [
    {
      "id": 1,
      "question": "Tìm hình còn thiếu để hoàn thành bộ:",
      "pattern": ["🔴", "🔵", "🟡", "🔴", "🔵", "?"],
      "options": ["🟡", "🔴", "🔵"],
      "correctAnswer": "🟡",
      "explanation": "Quy luật: đỏ - xanh - vàng lặp lại"
    }
  ]
}
    `,
    difficultyByAge: {
      '2-3': { patternLength: 3, complexity: 'simple' },
      '3-4': { patternLength: 4, complexity: 'simple' },
      '4-5': { patternLength: 5, complexity: 'medium' },
      '5-6': { patternLength: 6, complexity: 'medium' }
    }
  }
];

// Cấu hình độ tuổi
export const ageGroups = [
  { id: '2-3', name: '2-3 tuổi', minAge: 2, maxAge: 3, description: 'Bé mới bắt đầu học' },
  { id: '3-4', name: '3-4 tuổi', minAge: 3, maxAge: 4, description: 'Bé đang phát triển tư duy' },
  { id: '4-5', name: '4-5 tuổi', minAge: 4, maxAge: 5, description: 'Bé sẵn sàng học logic' },
  { id: '5-6', name: '5-6 tuổi', minAge: 5, maxAge: 6, description: 'Bé chuẩn bị vào lớp 1' }
];
// Note: I am removing getHealth() function because it is not defined here.
// I will create it in a separate step if needed. 