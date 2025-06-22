import axios, { AxiosResponse } from 'axios';
import {
  ApiResponse,
  AgeGroup,
  ExerciseType,
  ExerciseGenerationRequest,
  ExerciseGenerationResponse,
  AppConfig,
  HealthCheck
} from '../types';

// Tạo axios instance với cấu hình mặc định
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để xử lý response
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server trả về error response
      const errorMessage = error.response.data?.error || error.response.data?.message || 'Có lỗi xảy ra';
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Không nhận được response
      return Promise.reject(new Error('Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet.'));
    } else {
      // Lỗi khác
      return Promise.reject(new Error('Có lỗi xảy ra khi gửi yêu cầu.'));
    }
  }
);

// API functions
export const apiService = {
  // Lấy danh sách độ tuổi
  async getAgeGroups(): Promise<AgeGroup[]> {
    const response = await api.get<ApiResponse<AgeGroup[]>>('/exercises?action=age-groups');
    return response.data.data || [];
  },

  // Lấy danh sách loại bài tập
  async getExerciseTypes(): Promise<ExerciseType[]> {
    const response = await api.get<ApiResponse<ExerciseType[]>>('/exercises?action=types');
    return response.data.data || [];
  },

  // Tạo bài tập mới
  async generateExercises(request: ExerciseGenerationRequest): Promise<ExerciseGenerationResponse> {
    const response = await api.post<ApiResponse<ExerciseGenerationResponse>>('/exercises?action=generate', request);
    return response.data.data!;
  },

  // Test kết nối Gemini API
  async testGeminiConnection(): Promise<{ connected: boolean; message: string }> {
    const response = await api.get<ApiResponse<{ connected: boolean; message: string }>>('/exercises?action=test-connection');
    return response.data.data!;
  },

  // Lấy cấu hình ứng dụng
  async getAppConfig(): Promise<AppConfig> {
    const response = await api.get<ApiResponse<AppConfig>>('/config?action=app');
    return response.data.data!;
  },

  // Health check
  async getHealthCheck(): Promise<HealthCheck> {
    const response = await api.get<ApiResponse<HealthCheck>>('/config?action=health');
    return response.data.data!;
  },

  // Health check đơn giản
  async getSimpleHealthCheck(): Promise<{ status: string; message: string }> {
    const response = await api.get<ApiResponse<{ status: string; message: string }>>('/health');
    return response.data.data!;
  }
};

export default apiService; 