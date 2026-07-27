import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string, full_name: string, preferred_language: string) => {
  const response = await apiClient.post('/auth/register', {
    email,
    password,
    full_name,
    preferred_language,
  });
  return response.data;
};

export const fetchUserProfile = async (token: string) => {
  const response = await apiClient.get('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default apiClient;
