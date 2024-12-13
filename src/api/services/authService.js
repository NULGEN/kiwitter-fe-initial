import { apiClient } from '../helpers/apiClient';
import { storage } from '../../utils/storage';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/login', credentials);
      if (response.token) {
        storage.setToken(response.token);
        storage.setUser(response.user);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Giriş işlemi başarısız oldu');
    }
  },

  signup: async (userData) => {
    try {
      const signupData = {
        name: userData.name,
        nickname: userData.nickname,
        email: userData.email,
        password: userData.password
      };

      const response = await apiClient.post('/users/signup', signupData);
      return response;
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response?.status === 409) {
        throw new Error('Bu kullanıcı adı veya email zaten kullanımda');
      }
      throw new Error(error.message || 'Kayıt işlemi başarısız oldu');
    }
  },

  logout: () => {
    storage.removeToken();
    storage.removeUser();
  }
};