// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getPlaylistById, removeVideoFromPlaylist } from "../api/playlist.api";
// import VideoCard from "../components/VideoCard";

// function Playlist() {
//   const { playlistId } = useParams();

//   const [playlist, setPlaylist] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPlaylist = async () => {
//       try {
//         const response = await getPlaylistById(playlistId);

//         console.log("PLAYLIST RESPONSE:", response.data);
//         console.log("PLAYLIST DATA:", response.data.data);

//         setPlaylist(response.data.data);
//       } catch (error) {
//         console.log("PLAYLIST ERROR:", error);
//         console.log("PLAYLIST ERROR RESPONSE:", error.response?.data);

//         setError("Failed to load playlist");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlaylist();
//   }, [playlistId]);

//   const handleRemoveVideo = async (videoId) => {
//     try {
//       const response = await removeVideoFromPlaylist(videoId, playlistId);

//       console.log("REMOVE FROM PLAYLIST RESPONSE:", response.data);

//       setPlaylist((prev) => ({
//         ...prev,
//         videos: prev.videos.filter((video) => video._id !== videoId),
//         totalVideos: prev.totalVideos - 1,
//       }));
//     } catch (error) {
//       console.log("REMOVE FROM PLAYLIST ERROR:", error);
//       console.log("REMOVE FROM PLAYLIST ERROR RESPONSE:", error.response?.data);
//     }
//   };

//   if (loading) {
//     return <p>Loading playlist...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   if (!playlist) {
//     return <p>Playlist not found</p>;
//   }

//   return (
//     <div>
//       <h1>{playlist.name}</h1>

//       <p>{playlist.description}</p>

//       <p>{playlist.totalVideos} videos</p>

//       <p>{playlist.totalViews} views</p>

//       <h2>Videos</h2>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//           gap: "20px",
//         }}
//       >
//         {playlist.videos.map((video) => (
//           <div key={video._id}>
//             <VideoCard video={video} />

//             <button onClick={() => handleRemoveVideo(video._id)}>
//               Remove from Playlist
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Playlist;

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
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-400">Loading playlist...</p>
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

  if (!playlist) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-400">Playlist not found</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* ================= PLAYLIST HEADER ================= */}
      <section className="overflow-hidden rounded-xl border border-gray-800 bg-gray-950">
        <div className="relative min-h-56 bg-gradient-to-br from-green-950 via-gray-950 to-black p-6 sm:min-h-64 sm:p-8">
          {/* Decorative Glow */}
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#39FF14]/5 blur-3xl" />

          <div className="relative flex h-full flex-col justify-end">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#39FF14]">
              Playlist
            </p>

            <h1 className="mt-2 max-w-3xl text-3xl font-bold text-white sm:text-4xl">
              {playlist.name}
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-400">
              {playlist.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span>{playlist.totalVideos} videos</span>

              <span className="text-gray-700">•</span>

              <span>{playlist.totalViews} views</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VIDEOS ================= */}
      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Videos</h2>

            <div className="mt-2 h-1 w-10 rounded-full bg-[#39FF14]" />
          </div>

          <span className="text-sm text-gray-500">
            {playlist.totalVideos} videos
          </span>
        </div>

        {playlist.videos.length === 0 ? (
          <div className="rounded-xl bg-gray-900 py-16 text-center">
            <p className="text-gray-500">
              This playlist doesn't contain any videos yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {playlist.videos.map((video) => (
              <div key={video._id} className="min-w-0">
                <VideoCard video={video} />

                <button
                  type="button"
                  onClick={() => handleRemoveVideo(video._id)}
                  className="mt-3 w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-gray-400 transition hover:bg-red-950 hover:text-red-400"
                >
                  Remove from Playlist
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Playlist;
