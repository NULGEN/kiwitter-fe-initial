import { useState, useEffect } from "react";
import { twitService } from "../api/services/twitService";

export function useTwits(type = 'latest') {
    const [twits, setTwits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchTwits();
    }, [type]);
  
    const fetchTwits = async () => {
      try {
        setLoading(true);
        const response = type === 'popular' 
          ? await twitService.getPopularTwits()
          : await twitService.getTwits();
        
          setTwits(response.twits || []);

      } catch (err) {
        setError(err.message || 'Twitler yüklenirken bir hata oluştu');
        setTwits([]);
      } finally {
        setLoading(false);
      }
    };
  
    const addTwit = (newTwit) => {
      setTwits(prev => [newTwit, ...prev]);
    };
  
    const removeTwit = (twitId) => {
      setTwits(prev => prev.filter(twit => twit.id !== twitId));
    };
  
    const updateTwit = (twitId, updates) => {
      setTwits(prev => prev.map(twit => 
        twit.id === twitId ? { ...twit, ...updates } : twit
      ));
    };
  
    return {
      twits,
      loading,
      error,
      refetch: fetchTwits,
      addTwit,
      removeTwit,
      updateTwit
    };
  }