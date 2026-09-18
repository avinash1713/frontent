// src/pages/Home.jsx

import { useEffect, useState } from "react";
import { getAllVideos } from "../api/video.api";
import VideoCard from "../components/VideoCard";

const Home = () => {
  const [videos, setVideos] = useState([]);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVideos = async (query = "", sort = "", type = "") => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllVideos({
        query,
        sortBy: sort,
        sortType: type,
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
    fetchVideos(search, sortBy, sortType);
  }, [search, sortBy, sortType]);

  const handleSearch = (e) => {
    e.preventDefault();

    setSearch(searchInput);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setSortBy("");
      setSortType("");
      return;
    }

    if (value === "newest") {
      setSortBy("createdAt");
      setSortType("desc");
    }

    if (value === "mostViewed") {
      setSortBy("views");
      setSortType("desc");
    }

    if (value === "longest") {
      setSortBy("duration");
      setSortType("desc");
    }
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

      <div>
        <label>Sort by: </label>

        <select
          value={
            sortBy === "createdAt"
              ? "newest"
              : sortBy === "views"
                ? "mostViewed"
                : sortBy === "duration"
                  ? "longest"
                  : ""
          }
          onChange={handleSortChange}
        >
          <option value="">Default</option>
          <option value="newest">Newest</option>
          <option value="mostViewed">Most Viewed</option>
          <option value="longest">Longest</option>
        </select>
      </div>

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

      {!loading && !error && videos.length === 0 && <p>No videos found.</p>}
    </div>
  );
};

export default Home;
