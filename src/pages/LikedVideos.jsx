import { useEffect, useState } from "react";
import { getLikedVideos } from "../api/like.api";
import VideoCard from "../components/VideoCard";
function LikedVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const response = await getLikedVideos();

        console.log("LIKED VIDEOS RESPONSE:", response.data);

        setVideos(response.data.data.map((item) => item.likedVideo));
      } catch (error) {
        console.log("LIKED VIDEOS ERROR:", error);
        console.log("LIKED VIDEOS ERROR RESPONSE:", error.response?.data);

        setError("Failed to load liked videos");
      } finally {
        setLoading(false);
      }
    };

    fetchLikedVideos();
  }, []);

  if (loading) {
    return <p>Loading liked videos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Liked Videos</h1>

      <p>{videos.length} liked videos</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default LikedVideos;
