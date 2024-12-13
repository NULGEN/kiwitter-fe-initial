import axios from 'axios';

const BASE_URL = 'https://kiwitter-node-77f5acb427c1.herokuapp.com';

export const apiClient = {
  get: async (endpoint) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  post: async (endpoint, data) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  },

  delete: async (endpoint) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`${BASE_URL}${endpoint}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
};

function handleApiError(error) {
  if (error.response) {
    // Server responded with error
    return error.response.data?.message || 'Bir hata oluştu';
  }
  if (error.request) {
    // Request made but no response
    return 'Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.';
  }
  // Something else happened
  return 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.';
}


