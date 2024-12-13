import { useState } from "react";
import { twitService } from "../api/services/twitService";

export function useTwitDetail(twitId) {
    const [twit, setTwit] = useState(null);
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchTwitDetail();
    }, [twitId]);
  
    const fetchTwitDetail = async () => {
      try {
        setLoading(true);
        const data = await twitService.getTwitDetail(twitId);
        setTwit(data.twit);
        setReplies(data.replies || []);
      } catch (err) {
        setError(err.message || 'Twit detayı yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };
  
    const addReply = (newReply) => {
      setReplies(prev => [newReply, ...prev]);
    };
  
    const removeReply = (replyId) => {
      setReplies(prev => prev.filter(reply => reply.id !== replyId));
    };
  
    const updateTwit = (updates) => {
      setTwit(prev => ({ ...prev, ...updates }));
    };
  
    return {
      twit,
      replies,
      loading,
      error,
      refetch: fetchTwitDetail,
      addReply,
      removeReply,
      updateTwit
    };
  }