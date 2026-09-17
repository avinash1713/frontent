import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideoById } from "../api/video.api";
import { toggleVideoLike } from "../api/like.api";

function Watch() {
  const { videoId } = useParams();

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
      } catch (error) {
        console.log("VIDEO ERROR:", error);
        console.log("VIDEO ERROR RESPONSE:", error.response?.data);

        setError("Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  if (loading) {
    return <p>Loading video...</p>;
  }

  if (error) {
    return <p>{error}</p>;
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
  return (
    <div>
      <video src={video.videoFile.url} controls width="800" />

      <h1>{video.title}</h1>

      <p>{video.description}</p>

      <p>{video.views} views</p>

      <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>

      <p>{likesCount} likes</p>
    </div>
  );
}

export default Watch;
