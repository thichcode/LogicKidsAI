import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Printer, Share2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Exercise } from '../types';

const ExerciseViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Trong thực tế, bạn sẽ fetch exercise từ API dựa trên ID
    // Hiện tại chúng ta sẽ tạo một exercise mẫu
    const mockExercise: Exercise = {
      id: id || '1',
      title: 'Bài tập Logic - Tìm quy luật',
      description: 'Hãy tìm quy luật trong dãy số sau:',
      type: 'pattern',
      typeName: 'Tìm quy luật',
      typeIcon: '🔢',
      content: `
        <div class="exercise-content">
          <h3>Dãy số: 2, 4, 8, 16, 32, ?</h3>
          <p>Hãy tìm số tiếp theo trong dãy số trên.</p>
          
          <div class="options">
            <label>
              <input type="radio" name="answer" value="A" />
              A. 48
            </label>
            <label>
              <input type="radio" name="answer" value="B" />
              B. 64
            </label>
            <label>
              <input type="radio" name="answer" value="C" />
              C. 56
            </label>
            <label>
              <input type="radio" name="answer" value="D" />
              D. 72
            </label>
          </div>
          
          <div class="explanation" style="display: none;">
            <h4>Giải thích:</h4>
            <p>Quy luật: Mỗi số bằng số trước đó nhân với 2</p>
            <p>2 × 2 = 4</p>
            <p>4 × 2 = 8</p>
            <p>8 × 2 = 16</p>
            <p>16 × 2 = 32</p>
            <p>32 × 2 = 64</p>
            <p><strong>Đáp án: B. 64</strong></p>
          </div>
        </div>
      `,
      difficulty: 'medium',
      ageGroup: '8-12',
      category: 'pattern',
      createdAt: new Date().toISOString()
    };

    setExercise(mockExercise);
    setLoading(false);
  }, [id]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers((prev: { [key: string]: string }) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
    toast.success('Đã nộp bài!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Tạo file PDF hoặc text để download
    const content = `
Bài tập: ${exercise?.title}
Mô tả: ${exercise?.description}

Nội dung bài tập:
${exercise?.content.replace(/<[^>]*>/g, '')}

Thời gian: ${new Date().toLocaleString('vi-VN')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bai-tap-logic-${id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: exercise?.title,
        text: exercise?.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Đã sao chép link!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải bài tập...</p>
        </div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy bài tập</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Quay lại
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={handlePrint}
                className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Printer className="w-4 h-4 mr-1" />
                In
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Download className="w-4 h-4 mr-1" />
                Tải xuống
              </button>
              <button
                onClick={handleShare}
                className="flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Chia sẻ
              </button>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{exercise.title}</h1>
          <p className="text-gray-600 mb-4">{exercise.description}</p>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Độ khó: {exercise.difficulty}</span>
            <span>Độ tuổi: {exercise.ageGroup}</span>
            <span>Danh mục: {exercise.category}</span>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: exercise.content }}
          />
          
          {!showResults && (
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Nộp bài
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        {showResults && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Kết quả</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                <strong>Chúc mừng!</strong> Bạn đã hoàn thành bài tập logic này.
              </p>
              <p className="text-green-700 mt-2">
                Hãy tiếp tục luyện tập để cải thiện kỹ năng logic của mình!
              </p>
            </div>
            
            <div className="mt-4">
              <button
                onClick={() => navigate('/generator')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mr-3"
              >
                Tạo bài tập mới
              </button>
              <button
                onClick={() => setShowResults(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Xem lại bài tập
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseViewer; 