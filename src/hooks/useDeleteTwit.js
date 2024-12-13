import { useState } from "react";
import { twitService } from "../api/services/twitService";

export function useDeleteTwit(onSuccess) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
  
    const deleteTwit = async (twitId) => {
      try {
        setIsDeleting(true);
        setError(null);
        await twitService.deleteTwit(twitId);
        if (onSuccess) onSuccess(twitId);
      } catch (err) {
        setError(err.message || 'Twit silinemedi');
        throw err;
      } finally {
        setIsDeleting(false);
      }
    };
  
    return {
      deleteTwit,
      isDeleting,
      error
    };
  }