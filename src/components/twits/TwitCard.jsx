import { useState } from 'react';
import { Link } from 'react-router-dom';
import { twitService } from "../../api/services/twitService";
import { storage } from '../../utils/storage';
import { useDeleteTwit } from '../../hooks/useDeleteTwit';
import {formatDate} from "../../utils/dateFormatter"

export default function TwitCard({ twit, onDelete, onLike }) {
  const [isLiking, setIsLiking] = useState(false);
  const [error, setError] = useState('');
  const currentUser = storage.getUser();
  const { deleteTwit, isDeleting, error: deleteError } = useDeleteTwit(onDelete);
  
  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    setError('');

    try {
      await twitService.likeTwit(twit.id);
      if (onLike) onLike(twit.id);
    } catch (err) {
      setError(err.message || 'Beğeni işlemi başarısız oldu');
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = () => {
         deleteTwit(twit.id);
  };

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
    {(error || deleteError) && (
      <div className="text-red-500 text-sm mb-2">{error || deleteError}</div>
    )}
    
    <div className="flex items-start space-x-3">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <Link 
            to={`/profile/${twit.user.nickname}`}
            className="font-semibold text-gray-900 hover:text-lime-700"
          >
            @{twit.user.nickname}
          </Link>
          <span className="text-sm text-gray-500">
            {formatDate(twit.createdAt)}
          </span>
        </div>
        
        <Link to={`/detail/${twit.id}`} className="block mt-2">
          <p className="text-gray-900">{twit.content}</p>
        </Link>

        <div className="mt-3 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center space-x-1 text-gray-500 hover:text-lime-700 ${
                isLiking ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              <span className="font-medium">{twit.likeCount || 0}</span>
            </button>
          </div>

          <Link 
            to={`/detail/${twit.id}`}
            className="flex items-center space-x-2 text-gray-500 hover:text-lime-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
            <span className="font-medium">{twit.replyCount || 0}</span>
          </Link>

          {(currentUser?.nickname === twit.user.nickname || currentUser?.isAdmin) && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`text-red-500 hover:text-red-700 ${
                isDeleting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);
}