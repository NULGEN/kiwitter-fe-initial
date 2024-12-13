import { useParams } from "react-router-dom";
import TwitCard from "../components/twits/TwitCard";
import ReplyForm from "../components/twits/ReplyForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTwitDetail } from "../hooks/useTwitDetail";


export default function TwitDetail(){
    const {twitId} = useParams();
    const { twit, replies, loading, error, refetch, removeReply,updateTwit} = useTwitDetail(twitId);
    //const {handleDelete} = useDeleteTwit(twitId);

    const handleReplyCreated = ()=>{
        refetch();
    };

    const handleLike = (id) =>{
        if(id === twitId){
            updateTwit({likeCount: twit.likeCount+1});
        }
    };

    if(loading) return <LoadingSpinner/>;

    if(error) {
        return(
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
             {error}
            </div>

        );
    };

    if(!twit) return null;

    return (
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <TwitCard
              twit={twit}
              onDelete={handleDelete}
              onLike={handleLike}
            />
          </div>
    
          <div className="pt-4">
            <h2 className="text-xl font-semibold mb-4">Yanıtla</h2>
            <ReplyForm twitId={twitId} onReplyCreated={handleReplyCreated} />
          </div>
    
          <div className="pt-4">
            <h2 className="text-xl font-semibold mb-4">Yanıtlar</h2>
            {replies.length === 0 ? (
              <p className="text-gray-500">Henüz yanıt yok</p>
            ) : (
              <div className="space-y-4">
                {replies.map((reply) => (
                  <TwitCard
                    key={reply.id}
                    twit={reply}
                    onDelete={handleDelete}
                    onLike={handleLike}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      );






}