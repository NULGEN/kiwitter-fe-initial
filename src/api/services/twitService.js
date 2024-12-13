import { apiClient } from "../helpers/apiClient";

export const twitService = {
     // Ana akış twitlerini getir (sadece ana twitler)
  getTwits: async () => {
    return await apiClient.get('/twits?type=main');
  },

    // En popüler twitleri getir (son 24 saat)
     getPopularTwits: async () => {
    // Son 24 saatin timestamp'ini hesapla
    const last24Hours = new Date();
    last24Hours.setHours(last24Hours.getHours() - 24);
    
    // ISO string formatında gönder
    return await apiClient.get(`/twits/popular?since=${last24Hours.toISOString()}&type=main`);
  },

  // Twit detayını getir
     getTwitDetail: async (twitId) => {
    return await apiClient.get(`/twits/${twitId}`);
  },

  // Yeni twit oluştur
  createTwit: async (content) => {
    return await apiClient.post('/twits', { content });
  },

  // Twite yanıt ver
  replyToTwit: async (twitId, content) => {
    return await apiClient.post(`/twits/${twitId}/replies`, { content });
  },

  // Twiti beğen
  likeTwit: async (twitId) => {
    return await apiClient.post(`/twits/${twitId}/likes`);
  },

  // Twiti sil
  deleteTwit: async (twitId) => {
    return await apiClient.delete(`/twits/${twitId}`);
  }
  
 
};