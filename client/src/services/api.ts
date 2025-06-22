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
  (error: any) => {
    console.error('API Error:', error);
    
    let finalErrorMessage = 'Có lỗi không xác định xảy ra. Vui lòng thử lại.';

    if (error.response) {
      // Server trả về lỗi
      const errorData = error.response.data;
      if (typeof errorData?.error === 'string' && errorData.error) {
        finalErrorMessage = errorData.error;
      } else if (typeof errorData?.message === 'string' && errorData.message) {
        finalErrorMessage = errorData.message;
      } else {
        finalErrorMessage = 'Server trả về lỗi không đúng định dạng.';
      }
    } else if (error.request) {
      // Không nhận được phản hồi
      finalErrorMessage = 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối internet.';
    } else {
      // Lỗi khác khi gửi yêu cầu
      finalErrorMessage = error.message || 'Có lỗi xảy ra khi gửi yêu cầu.';
    }
    return Promise.reject(new Error(finalErrorMessage));
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