import { useState } from "react";
import { twitService } from "../../api/services/twitService";

export default function ReplyForm({ twitId, onReplyCreated }) {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!content.trim()) return;
  
      setIsLoading(true);
      setError('');
  
      try {
        await twitService.replyToTwit(twitId, content);
        setContent('');
        if (onReplyCreated) onReplyCreated();
      } catch (err) {
        setError(err.message || 'Yanıt gönderilirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="mb-6">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
            placeholder="Yanıtınızı yazın..."
            rows="3"
            maxLength="280"
          />
          <div className="text-right text-sm text-gray-500">
            {content.length}/280
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading || !content.trim()}
          className={`px-4 py-2 rounded-lg bg-lime-600 text-white font-semibold
            ${isLoading || !content.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-lime-700'}`}
        >
          {isLoading ? 'Gönderiliyor...' : 'Yanıtla'}
        </button>
      </form>
    );
  }


