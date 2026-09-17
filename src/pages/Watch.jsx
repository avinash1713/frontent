import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVideoById } from "../api/video.api";

function Watch() {
  const { videoId } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await getVideoById(videoId);

        console.log("VIDEO RESPONSE:", response.data);

        setVideo(response.data.data);
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

  return (
    <div>
      <video src={video.videoFile.url} controls width="800" />

      <h1>{video.title}</h1>

      <p>{video.description}</p>

      <p>{video.views} views</p>
    </div>
  );
}

export default Watch;
