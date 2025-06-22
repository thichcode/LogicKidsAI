import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ExerciseGenerator from './pages/ExerciseGenerator';
import ExerciseViewer from './pages/ExerciseViewer';
import AboutPage from './pages/AboutPage';
import { apiService } from './services/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        setLoading(true);
        
        // Test kết nối server
        await apiService.getSimpleHealthCheck();
        
        // Lấy cấu hình ứng dụng (không cần lưu vào state)
        await apiService.getAppConfig();
        
      } catch (err) {
        console.error('Lỗi khởi tạo ứng dụng:', err);
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi khởi tạo ứng dụng');
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">🧠</div>
          <h1 className="text-2xl font-bold text-primary-600 mb-2">LogicKids AI</h1>
          <p className="text-gray-600">Đang khởi tạo ứng dụng...</p>
          <div className="mt-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-error-600 mb-4">Không thể kết nối</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/generator" element={<ExerciseGenerator />} />
            <Route path="/viewer" element={<ExerciseViewer />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App; 