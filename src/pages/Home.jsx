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

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchVideos = async (
    query = "",
    sort = "",
    type = "",
    currentPage = 1,
  ) => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllVideos({
        query,
        sortBy: sort,
        sortType: type,
        page: currentPage,
        limit: 2,
      });

      console.log("VIDEOS RESPONSE:", response.data);
      console.log("VIDEOS DATA:", response.data.data);

      const data = response.data.data;

      setVideos(data.docs);
      setTotalPages(data.totalPages);
      setHasNextPage(data.hasNextPage);
      setHasPrevPage(data.hasPrevPage);
    } catch (error) {
      console.log("VIDEOS ERROR:", error);
      console.log("VIDEOS ERROR RESPONSE:", error.response?.data);

      setError("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(search, sortBy, sortType, page);
  }, [search, sortBy, sortType, page]);

  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);
    setSearch(searchInput);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;

    setPage(1);

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

  const handlePrevious = () => {
    if (hasPrevPage) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      setPage((currentPage) => currentPage + 1);
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
        <>
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

          {videos.length === 0 && <p>No videos found.</p>}

          <div>
            <button
              type="button"
              onClick={handlePrevious}
              disabled={!hasPrevPage}
            >
              Previous
            </button>

            <span>
              {" "}
              Page {page} of {totalPages}{" "}
            </span>

            <button type="button" onClick={handleNext} disabled={!hasNextPage}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
