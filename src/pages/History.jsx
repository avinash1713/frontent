// import { useEffect, useState } from "react";
// import { getWatchHistory } from "../api/auth.api";
// import VideoCard from "../components/VideoCard";

// function History() {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const response = await getWatchHistory();

//         console.log("WATCH HISTORY RESPONSE:", response.data);

//         setHistory(response.data.data);
//       } catch (error) {
//         console.log("WATCH HISTORY ERROR:", error);
//         console.log("WATCH HISTORY ERROR RESPONSE:", error.response?.data);

//         setError("Failed to load watch history");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, []);

//   if (loading) {
//     return <p>Loading watch history...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>Watch History</h1>

//       <p>{history.length} videos in history</p>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//           gap: "20px",
//         }}
//       >
//         {history.map((video) => (
//           <VideoCard key={video._id} video={video} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default History;

// src/pages/History.jsx

import { useEffect, useState } from "react";
import { getWatchHistory } from "../api/auth.api";
import VideoCard from "../components/VideoCard";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getWatchHistory();

        console.log("WATCH HISTORY RESPONSE:", response.data);

        setHistory(response.data.data);
      } catch (error) {
        console.log("WATCH HISTORY ERROR:", error);
        console.log("WATCH HISTORY ERROR RESPONSE:", error.response?.data);

        setError("Failed to load watch history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-400">Loading watch history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-900 bg-red-950/20 p-5">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Watch History</h1>

        <p className="mt-2 text-sm text-gray-500">
          Videos you've watched recently.
        </p>

        <div className="mt-3 h-1 w-12 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
      </div>

      {/* ================= HISTORY COUNT ================= */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-white">Your History</h2>

        <span className="text-sm text-gray-500">
          {history.length} {history.length === 1 ? "video" : "videos"}
        </span>
      </div>

      {/* ================= VIDEOS ================= */}
      {history.length === 0 ? (
        <div className="rounded-xl bg-gray-900 px-4 py-16 text-center">
          <p className="text-gray-500">You haven't watched any videos yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {history.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
