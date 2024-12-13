import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import TwitForm from "../components/twits/TwitForm";
import TwitCard from "../components/twits/TwitCard";
import {useTwits} from  "../hooks/useTwits";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Home() {
  const location = useLocation();
  const history = useHistory();
  const isPopular = new URLSearchParams(location.search).get('variant') === 'most_liked';
  const [activeTab, setActiveTab] = useState(isPopular ? 'popular' : 'latest');
  const { twits, loading, error, refetch, removeTwit, updateTwit } = useTwits(activeTab);
  
    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      if (activeTab === 'popular') {
        searchParams.set('variant', 'most_liked');
      } else {
        searchParams.delete('variant');
      }
      history.replace({ search: searchParams.toString() });
    }, [activeTab, history, location.search]);
  
    const handleTabChange = (tab) => {
      setActiveTab(tab);
      refetch();
    };
  
    const handleTwitCreated = () => {
      if (activeTab === 'latest') {
        refetch();
      }
    };
  
    const handleDelete = (twitId) => {
      removeTwit(twitId);
    };
  
    const handleLike = (twitId) => {
      const currentTwit = twits.find(t => t.id === twitId);
      if (currentTwit) {
        updateTwit(twitId, { likeCount: currentTwit.likeCount + 1 });
      }
    };
  
    return (
      <div>
      <div className="mb-6">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => handleTabChange('latest')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'latest'
                ? 'bg-lime-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Son Twitler
          </button>
          <button
            onClick={() => handleTabChange('popular')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'popular'
                ? 'bg-lime-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Son 24 Saatin En Beğenilenleri
          </button>
        </div>
        {activeTab === 'latest' && <TwitForm onTwitCreated={handleTwitCreated} />}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : twits.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          {activeTab === 'popular' 
            ? 'Son 24 saatte beğenilen twit bulunmuyor'
            : 'Henüz twit bulunmuyor'
          }
        </div>
      ) : (
        <div className="space-y-4">
          {twits.map((twit) => (
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
