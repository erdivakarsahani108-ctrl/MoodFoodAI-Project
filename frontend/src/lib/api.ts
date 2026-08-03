import axios from 'axios';

const resolveApiBaseUrl = () => {
  const configuredBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    'http://localhost:8000/api/v1';

  if (configuredBaseUrl.endsWith('/api/v1')) {
    return configuredBaseUrl;
  }

  return `${configuredBaseUrl.replace(/\/+$/, '')}/api/v1`;
};

export const API_BASE_URL = resolveApiBaseUrl();

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window === 'undefined') {
    return config;
  }

  const token = localStorage.getItem('auth_token');
  if (token) {
    if (config.headers && typeof (config.headers as any).set === 'function') {
      (config.headers as any).set('Authorization', `Bearer ${token}`);
    } else {
      config.headers = {
        ...(config.headers ?? {}),
        Authorization: `Bearer ${token}`,
      } as any;
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('guest_mode');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

export const setAuthToken = (token: string | null) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (token) {
    localStorage.setItem('auth_token', token);
    return;
  }

  localStorage.removeItem('auth_token');
};

export const getAuthToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return localStorage.getItem('auth_token');
};

export const isGuestMode = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  return localStorage.getItem('guest_mode') === 'true';
};

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (fullName: string, email: string, mobile: string, password: string) => {
  const response = await apiClient.post('/auth/register', {
    fullName,
    email,
    mobile,
    password,
  });

  return response.data;
};

export const fetchUserProfile = async () => {
  const response = await apiClient.get('/users/me');
  return response.data;
};

export default apiClient;
