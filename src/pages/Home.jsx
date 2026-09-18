// src/pages/Home.jsx

import { useEffect, useState } from "react";
import { getAllVideos } from "../api/video.api";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVideos = async (query = "") => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllVideos({
        query,
      });

      console.log("VIDEOS RESPONSE:", response.data);
      console.log("VIDEOS DATA:", response.data.data);

      setVideos(response.data.data.docs);
    } catch (error) {
      console.log("VIDEOS ERROR:", error);
      console.log("VIDEOS ERROR RESPONSE:", error.response?.data);

      setError("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(search);
  }, [search]);

  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(searchInput);
  };

  return (
    <div>
      <h1>Home</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading videos...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
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
      )}
    </div>
  );
};

export default Home;
