// // src/pages/Home.jsx

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
        limit: 10,
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
    <div className="min-h-screen">
      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Home</h1>

        <div className="mt-2 h-1 w-12 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
      </div>

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="flex w-full max-w-3xl flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          placeholder="Search videos..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 outline-none transition focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
        />

        <button
          type="submit"
          className="rounded-lg bg-[#39FF14] px-6 py-3 font-semibold text-black transition hover:bg-[#6AFF4A] hover:shadow-[0_0_12px_#39FF14]"
        >
          Search
        </button>
      </form>

      {/* Sort */}
      <div className="mt-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
        <label className="text-sm font-medium text-gray-400">Sort by:</label>

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
          className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white outline-none transition focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
        >
          <option value="">Default</option>
          <option value="newest">Newest</option>
          <option value="mostViewed">Most Viewed</option>
          <option value="longest">Longest</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-10 flex justify-center">
          <p className="text-gray-400">Loading videos...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-10 rounded-lg border border-red-900 bg-red-950/30 p-4">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Video Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video) => (
              <VideoCard key={video._id} video={video} />
            ))}
          </div>

          {/* No Videos */}
          {videos.length === 0 && (
            <div className="mt-16 text-center">
              <p className="text-lg text-gray-400">No videos found.</p>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={!hasPrevPage}
              className="rounded-lg border border-gray-700 bg-gray-900 px-5 py-2 text-sm font-medium text-gray-300 transition hover:border-[#39FF14] hover:text-[#39FF14] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-700 disabled:hover:text-gray-300"
            >
              Previous
            </button>

            <span className="text-sm text-gray-400">
              Page <span className="font-semibold text-[#39FF14]">{page}</span>{" "}
              of {totalPages}
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={!hasNextPage}
              className="rounded-lg border border-gray-700 bg-gray-900 px-5 py-2 text-sm font-medium text-gray-300 transition hover:border-[#39FF14] hover:text-[#39FF14] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-700 disabled:hover:text-gray-300"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
