import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getVideoById } from "../api/video.api";
import { toggleVideoLike } from "../api/like.api";
import { toggleSubscription } from "../api/subscription.api";
import { getUserPlaylists, addVideoToPlaylist } from "../api/playlist.api";
import { useAuth } from "../context/AuthContext";

function Watch() {
  const { videoId } = useParams();
  const { user } = useAuth();

  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [video, setVideo] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await getVideoById(videoId);

        console.log("VIDEO RESPONSE:", response.data);

        setVideo(response.data.data);
        setIsLiked(response.data.data.isLiked);
        setLikesCount(response.data.data.likesCount);
        setIsSubscribed(response.data.data.owner.isSubscribed);
        setSubscribersCount(response.data.data.owner.subscribersCount);

        if (user?._id) {
          const playlistsResponse = await getUserPlaylists(user._id);

          console.log("WATCH PLAYLISTS RESPONSE:", playlistsResponse.data);

          setPlaylists(playlistsResponse.data.data);
        }
      } catch (error) {
        console.log("VIDEO ERROR:", error);
        console.log("VIDEO ERROR RESPONSE:", error.response?.data);

        setError("Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId, user]);

  if (loading) {
    return <p>Loading video...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!video) {
    return <p>Video not found</p>;
  }

  const handleLike = async () => {
    try {
      const response = await toggleVideoLike(videoId);

      console.log("LIKE RESPONSE:", response.data);

      const liked = response.data.data.isLiked;

      setIsLiked(liked);

      setLikesCount((count) => (liked ? count + 1 : count - 1));
    } catch (error) {
      console.log("LIKE ERROR:", error);
      console.log("LIKE ERROR RESPONSE:", error.response?.data);
    }
  };

  const handleSubscribe = async () => {
    try {
      const response = await toggleSubscription(video.owner._id);

      console.log("SUBSCRIBE RESPONSE:", response.data);

      const subscribed = response.data.data.subscribed;

      setIsSubscribed(subscribed);

      setSubscribersCount((count) => (subscribed ? count + 1 : count - 1));
    } catch (error) {
      console.log("SUBSCRIBE ERROR:", error);
      console.log("SUBSCRIBE ERROR RESPONSE:", error.response?.data);
    }
  };

  const handleAddToPlaylist = async () => {
    try {
      const response = await addVideoToPlaylist(videoId, selectedPlaylist);

      console.log("ADD TO PLAYLIST RESPONSE:", response.data);

      setSelectedPlaylist("");
    } catch (error) {
      console.log("ADD TO PLAYLIST ERROR:", error);
      console.log("ADD TO PLAYLIST ERROR RESPONSE:", error.response?.data);
    }
  };

  return (
    <div>
      <video src={video.videoFile.url} controls width="800" />

      <h1>{video.title}</h1>

      <p>{video.description}</p>

      <p>{video.views} views</p>

      <p>
        By{" "}
        <Link to={`/channel/${video.owner.username}`}>
          {video.owner.username}
        </Link>
      </p>

      <p>{subscribersCount} subscribers</p>

      <button onClick={handleSubscribe}>
        {isSubscribed ? "Unsubscribe" : "Subscribe"}
      </button>

      <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>

      <p>{likesCount} likes</p>

      <div>
        <select
          value={selectedPlaylist}
          onChange={(e) => setSelectedPlaylist(e.target.value)}
        >
          <option value="">Select Playlist</option>

          {playlists.map((playlist) => (
            <option key={playlist._id} value={playlist._id}>
              {playlist.name}
            </option>
          ))}
        </select>

        <button onClick={handleAddToPlaylist} disabled={!selectedPlaylist}>
          Add to Playlist
        </button>
      </div>
    </div>
  );
}

export default Watch;
