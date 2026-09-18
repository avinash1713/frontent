// import { useEffect, useState } from "react";
// import { getLikedVideos } from "../api/like.api";
// import VideoCard from "../components/VideoCard";
// function LikedVideos() {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchLikedVideos = async () => {
//       try {
//         const response = await getLikedVideos();

//         console.log("LIKED VIDEOS RESPONSE:", response.data);

//         setVideos(response.data.data.map((item) => item.likedVideo));
//       } catch (error) {
//         console.log("LIKED VIDEOS ERROR:", error);
//         console.log("LIKED VIDEOS ERROR RESPONSE:", error.response?.data);

//         setError("Failed to load liked videos");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLikedVideos();
//   }, []);

//   if (loading) {
//     return <p>Loading liked videos...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>Liked Videos</h1>

//       <p>{videos.length} liked videos</p>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//           gap: "20px",
//         }}
//       >
//         {videos.map((video) => (
//           <VideoCard key={video._id} video={video} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default LikedVideos;

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
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-400">Loading liked videos...</p>
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
        <h1 className="text-3xl font-bold text-white">Liked Videos</h1>

        <p className="mt-2 text-sm text-gray-500">Videos you've liked.</p>

        <div className="mt-3 h-1 w-12 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
      </div>

      {/* ================= VIDEO COUNT ================= */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Your Liked Videos</h2>

        <span className="text-sm text-gray-500">
          {videos.length} {videos.length === 1 ? "video" : "videos"}
        </span>
      </div>

      {/* ================= VIDEOS ================= */}
      {videos.length === 0 ? (
        <div className="rounded-xl bg-gray-900 py-16 text-center">
          <p className="text-gray-500">You haven't liked any videos yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LikedVideos;
