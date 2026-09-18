import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistById, removeVideoFromPlaylist } from "../api/playlist.api";
import VideoCard from "../components/VideoCard";

function Playlist() {
  const { playlistId } = useParams();

  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await getPlaylistById(playlistId);

        console.log("PLAYLIST RESPONSE:", response.data);
        console.log("PLAYLIST DATA:", response.data.data);

        setPlaylist(response.data.data);
      } catch (error) {
        console.log("PLAYLIST ERROR:", error);
        console.log("PLAYLIST ERROR RESPONSE:", error.response?.data);

        setError("Failed to load playlist");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [playlistId]);

  const handleRemoveVideo = async (videoId) => {
    try {
      const response = await removeVideoFromPlaylist(videoId, playlistId);

      console.log("REMOVE FROM PLAYLIST RESPONSE:", response.data);

      setPlaylist((prev) => ({
        ...prev,
        videos: prev.videos.filter((video) => video._id !== videoId),
        totalVideos: prev.totalVideos - 1,
      }));
    } catch (error) {
      console.log("REMOVE FROM PLAYLIST ERROR:", error);
      console.log("REMOVE FROM PLAYLIST ERROR RESPONSE:", error.response?.data);
    }
  };

  if (loading) {
    return <p>Loading playlist...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!playlist) {
    return <p>Playlist not found</p>;
  }

  return (
    <div>
      <h1>{playlist.name}</h1>

      <p>{playlist.description}</p>

      <p>{playlist.totalVideos} videos</p>

      <p>{playlist.totalViews} views</p>

      <h2>Videos</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {playlist.videos.map((video) => (
          <div key={video._id}>
            <VideoCard video={video} />

            <button onClick={() => handleRemoveVideo(video._id)}>
              Remove from Playlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlist;
