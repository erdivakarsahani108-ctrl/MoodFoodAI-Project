import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// ==================== CONFIGURATION ====================
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
const API_TIMEOUT = 30000;

// ==================== TYPES ====================
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Food {
  id: string;
  name: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat?: number;
  fiber: number;
  moodTag: string;
  image?: string;
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  recommendedFoods: string[];
}

export interface Mood {
  id: string;
  name: string;
  emoji: string;
}

export interface DashboardStats {
  healthScore: number;
  calories: number;
  protein: number;
  water: number;
  bmi: number;
  mood: string;
  sleep: number;
  diseaseRisk: string;
}

export interface Recommendation {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fiber: number;
  moodTag: string;
  reason: string;
}

export interface AIInsightsData {
  healthScore: any;
  mood: any;
  diseaseRisks: any[];
  recommendations: any[];
  nutrition: any;
  vitamins: any[];
  water: any;
  bmi: any;
  weeklyTrends: any[];
  tips: any[];
  explanation: string;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  role: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
}

// ==================== API CLIENT ====================
class ApiClient {
  private client: AxiosInstance;
  private tokenKey = 'auth_token';

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        // Handle specific error statuses
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            // Unauthorized - clear token and redirect
            this.clearToken();
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          }
          // Extract error message from response if available
          const data = error.response.data as any;
          if (data && data.message) {
            error.message = data.message;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // ==================== TOKEN MANAGEMENT ====================
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
    }
  }

  // ==================== GENERIC REQUEST METHODS ====================
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  // ==================== AUTH API ====================
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.post<ApiResponse<LoginResponse>>('/auth/login', data);
    if (response.data.success && response.data.data.token) {
      this.setToken(response.data.data.token);
    }
    return response.data;
  }

  async register(data: RegisterRequest): Promise<ApiResponse<User>> {
    const response = await this.post<ApiResponse<User>>('/auth/register', data);
    return response.data;
  }

  async logout(): Promise<void> {
    this.clearToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  async getProfile(): Promise<ApiResponse<User>> {
    const response = await this.get<ApiResponse<User>>('/auth/profile');
    return response.data;
  }

  // ==================== DASHBOARD API ====================
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    const response = await this.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return response.data;
  }

  // ==================== AI RECOMMENDATION API ====================
  async getRecommendations(params?: { mood?: string; limit?: number }): Promise<ApiResponse<Recommendation[]>> {
    const response = await this.get<ApiResponse<Recommendation[]>>('/recommendations', { params });
    return response.data;
  }

  async getAIInsights(): Promise<ApiResponse<AIInsightsData>> {
    const response = await this.get<ApiResponse<AIInsightsData>>('/ai/insights');
    return response.data;
  }

  // ==================== FOOD API ====================
  async getFoods(params?: { search?: string; category?: string; moodTag?: string; page?: number; limit?: number }): Promise<ApiResponse<PaginatedResponse<Food>>> {
    const response = await this.get<ApiResponse<PaginatedResponse<Food>>>('/foods', { params });
    return response.data;
  }

  async getFood(id: string): Promise<ApiResponse<Food>> {
    const response = await this.get<ApiResponse<Food>>(`/foods/${id}`);
    return response.data;
  }

  async createFood(data: Omit<Food, 'id'>): Promise<ApiResponse<Food>> {
    const response = await this.post<ApiResponse<Food>>('/foods', data);
    return response.data;
  }

  async updateFood(id: string, data: Partial<Omit<Food, 'id'>>): Promise<ApiResponse<Food>> {
    const response = await this.put<ApiResponse<Food>>(`/foods/${id}`, data);
    return response.data;
  }

  async deleteFood(id: string): Promise<ApiResponse<void>> {
    const response = await this.delete<ApiResponse<void>>(`/foods/${id}`);
    return response.data;
  }

  // ==================== DISEASE API ====================
  async getDiseases(params?: { search?: string }): Promise<ApiResponse<Disease[]>> {
    const response = await this.get<ApiResponse<Disease[]>>('/diseases', { params });
    return response.data;
  }

  async getDisease(id: string): Promise<ApiResponse<Disease>> {
    const response = await this.get<ApiResponse<Disease>>(`/diseases/${id}`);
    return response.data;
  }

  async createDisease(data: Omit<Disease, 'id'>): Promise<ApiResponse<Disease>> {
    const response = await this.post<ApiResponse<Disease>>('/diseases', data);
    return response.data;
  }

  async updateDisease(id: string, data: Partial<Omit<Disease, 'id'>>): Promise<ApiResponse<Disease>> {
    const response = await this.put<ApiResponse<Disease>>(`/diseases/${id}`, data);
    return response.data;
  }

  async deleteDisease(id: string): Promise<ApiResponse<void>> {
    const response = await this.delete<ApiResponse<void>>(`/diseases/${id}`);
    return response.data;
  }

  // ==================== MOOD API ====================
  async getMoods(): Promise<ApiResponse<Mood[]>> {
    const response = await this.get<ApiResponse<Mood[]>>('/moods');
    return response.data;
  }

  async createMood(data: Omit<Mood, 'id'>): Promise<ApiResponse<Mood>> {
    const response = await this.post<ApiResponse<Mood>>('/moods', data);
    return response.data;
  }

  async updateMood(id: string, data: Partial<Omit<Mood, 'id'>>): Promise<ApiResponse<Mood>> {
    const response = await this.put<ApiResponse<Mood>>(`/moods/${id}`, data);
    return response.data;
  }

  async deleteMood(id: string): Promise<ApiResponse<void>> {
    const response = await this.delete<ApiResponse<void>>(`/moods/${id}`);
    return response.data;
  }

  // ==================== ADMIN API ====================
  async getAdminUsers(params?: { page?: number; limit?: number; search?: string }): Promise<ApiResponse<PaginatedResponse<AdminUser>>> {
    const response = await this.get<ApiResponse<PaginatedResponse<AdminUser>>>('/admin/users', { params });
    return response.data;
  }

  async getAdminUser(id: string): Promise<ApiResponse<AdminUser>> {
    const response = await this.get<ApiResponse<AdminUser>>(`/admin/users/${id}`);
    return response.data;
  }

  async updateAdminUser(id: string, data: Partial<AdminUser>): Promise<ApiResponse<AdminUser>> {
    const response = await this.put<ApiResponse<AdminUser>>(`/admin/users/${id}`, data);
    return response.data;
  }

  async deleteAdminUser(id: string): Promise<ApiResponse<void>> {
    const response = await this.delete<ApiResponse<void>>(`/admin/users/${id}`);
    return response.data;
  }

  // Admin Food Management (uses same food endpoints but with admin prefix if needed)
  // We can reuse the food methods above for admin as well, but if there are separate admin endpoints:
  async adminGetFoods(params?: any): Promise<ApiResponse<PaginatedResponse<Food>>> {
    const response = await this.get<ApiResponse<PaginatedResponse<Food>>>('/admin/foods', { params });
    return response.data;
  }

  async adminCreateFood(data: Omit<Food, 'id'>): Promise<ApiResponse<Food>> {
    const response = await this.post<ApiResponse<Food>>('/admin/foods', data);
    return response.data;
  }

  async adminUpdateFood(id: string, data: Partial<Omit<Food, 'id'>>): Promise<ApiResponse<Food>> {
    const response = await this.put<ApiResponse<Food>>(`/admin/foods/${id}`, data);
    return response.data;
  }

  async adminDeleteFood(id: string): Promise<ApiResponse<void>> {
    const response = await this.delete<ApiResponse<void>>(`/admin/foods/${id}`);
    return response.data;
  }

  // Admin Disease Management
  async adminGetDiseases(params?: any): Promise<ApiResponse<PaginatedResponse<Disease>>> {
    const response = await this.get<ApiResponse<PaginatedResponse<Disease>>>('/admin/diseases', { params });
    return response.data;
  }

  // Admin Mood Management
  async adminGetMoods(params?: any): Promise<ApiResponse<PaginatedResponse<Mood>>> {
    const response = await this.get<ApiResponse<PaginatedResponse<Mood>>>('/admin/moods', { params });
    return response.data;
  }

  // ==================== FILE UPLOAD API ====================
  async uploadFile(file: File, path?: string): Promise<ApiResponse<FileUploadResponse>> {
    const formData = new FormData();
    formData.append('file', file);
    if (path) {
      formData.append('path', path);
    }
    const response = await this.post<ApiResponse<FileUploadResponse>>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // ==================== EXPORT REPORT API ====================
  async exportReport(params?: { format?: 'pdf' | 'csv'; type?: 'insights' | 'dashboard' }): Promise<Blob> {
    const response = await this.get('/export/report', {
      params,
      responseType: 'blob',
    });
    return response.data;
  }

  // ==================== HELPER UTILITIES ====================
  static isApiError(error: any): boolean {
    return error && error.response && error.response.data && error.response.data.message;
  }

  static getErrorMessage(error: any): string {
    if (error && error.response && error.response.data && error.response.data.message) {
      return error.response.data.message;
    }
    if (error && error.message) {
      return error.message;
    }
    return 'An unknown error occurred';
  }
}

// ==================== SINGLETON INSTANCE ====================
export const api = new ApiClient();

// ==================== DEFAULT EXPORT ====================
export default api;