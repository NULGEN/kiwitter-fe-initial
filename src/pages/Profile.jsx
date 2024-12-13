import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TwitCard from "../components/twits/TwitCard"
import { twitService } from '../api/services/twitService';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Profile() {
  const { nick } = useParams();
  const [userTwits, setUserTwits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserTwits();
  }, [nick]);

  const fetchUserTwits = async () => {
    try {
      setLoading(true);
      const data = await twitService.getUserTwits(nick);
      setUserTwits(data);
    } catch (err) {
      setError(err.message || 'Twitler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (twitId) => {
    setUserTwits(prev => prev.filter(twit => twit.id !== twitId));
  };

  const handleLike = (twitId) => {
    setUserTwits(prev =>
      prev.map(twit =>
        twit.id === twitId
          ? { ...twit, likeCount: twit.likeCount + 1 }
          : twit
      )
    );
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">@{nick}</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {userTwits.map((twit) => (
            <TwitCard
              key={twit.id}
              twit={twit}
              onDelete={handleDelete}
              onLike={handleLike}
            />
          ))}
        </div>
      )}
    </div>
  );
}