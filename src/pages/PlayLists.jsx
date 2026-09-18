// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import {
//   createPlaylist,
//   getUserPlaylists,
//   updatePlaylist,
//   deletePlaylist,
// } from "../api/playlist.api";

// function Playlists() {
//   const { user } = useAuth();

//   const [editingPlaylist, setEditingPlaylist] = useState(null);
//   const [playlists, setPlaylists] = useState([]);
//   const [playlistData, setPlaylistData] = useState({
//     name: "",
//     description: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchPlaylists = async () => {
//       try {
//         const response = await getUserPlaylists(user._id);

//         console.log("PLAYLISTS RESPONSE:", response.data);

//         setPlaylists(response.data.data);
//       } catch (error) {
//         console.log("PLAYLISTS ERROR:", error);
//         console.log("PLAYLISTS ERROR RESPONSE:", error.response?.data);

//         setError("Failed to load playlists");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?._id) {
//       fetchPlaylists();
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setPlaylistData({
//       ...playlistData,
//       [name]: value,
//     });
//   };

//   const handleEdit = (playlist) => {
//     setEditingPlaylist(playlist);

//     setPlaylistData({
//       name: playlist.name,
//       description: playlist.description,
//     });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await updatePlaylist(editingPlaylist._id, playlistData);

//       console.log("UPDATE PLAYLIST RESPONSE:", response.data);

//       setPlaylists((prev) =>
//         prev.map((playlist) =>
//           playlist._id === editingPlaylist._id
//             ? {
//                 ...playlist,
//                 name: response.data.data.name,
//                 description: response.data.data.description,
//               }
//             : playlist,
//         ),
//       );

//       setEditingPlaylist(null);

//       setPlaylistData({
//         name: "",
//         description: "",
//       });
//     } catch (error) {
//       console.log("UPDATE PLAYLIST ERROR:", error);
//       console.log("UPDATE PLAYLIST ERROR RESPONSE:", error.response?.data);
//     }
//   };

//   const handleDelete = async (playlistId) => {
//     if (!window.confirm("Are you sure you want to delete this playlist?")) {
//       return;
//     }
//     try {
//       const response = await deletePlaylist(playlistId);

//       console.log("DELETE PLAYLIST RESPONSE:", response.data);

//       setPlaylists((prev) =>
//         prev.filter((playlist) => playlist._id !== playlistId),
//       );
//     } catch (error) {
//       console.log("DELETE PLAYLIST ERROR:", error);
//       console.log("DELETE PLAYLIST ERROR RESPONSE:", error.response?.data);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await createPlaylist(playlistData);

//       console.log("CREATE PLAYLIST RESPONSE:", response.data);

//       const newPlaylist = {
//         ...response.data.data,
//         totalVideos: 0,
//         totalViews: 0,
//       };

//       setPlaylists((prev) => [...prev, newPlaylist]);

//       setPlaylistData({
//         name: "",
//         description: "",
//       });
//     } catch (error) {
//       console.log("CREATE PLAYLIST ERROR:", error);
//       console.log("CREATE PLAYLIST ERROR RESPONSE:", error.response?.data);
//     }
//   };

//   if (loading) {
//     return <p>Loading playlists...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>My Playlists</h1>

//       <form onSubmit={editingPlaylist ? handleUpdate : handleSubmit}>
//         {" "}
//         <div>
//           <label>Name</label>

//           <input
//             type="text"
//             name="name"
//             value={playlistData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Description</label>

//           <textarea
//             name="description"
//             value={playlistData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">
//           {editingPlaylist ? "Update Playlist" : "Create Playlist"}
//         </button>
//         {editingPlaylist && (
//           <button
//             type="button"
//             onClick={() => {
//               setEditingPlaylist(null);
//               setPlaylistData({
//                 name: "",
//                 description: "",
//               });
//             }}
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       <p>{playlists.length} playlists</p>

//       <div>
//         {playlists.map((playlist) => (
//           <div key={playlist._id}>
//             <Link to={`/playlist/${playlist._id}`}>
//               <h2>{playlist.name}</h2>
//             </Link>

//             <p>{playlist.description}</p>

//             <p>{playlist.totalVideos} videos</p>

//             <p>{playlist.totalViews} views</p>

//             <button onClick={() => handleEdit(playlist)}>Edit</button>

//             <button onClick={() => handleDelete(playlist._id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Playlists;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  createPlaylist,
  getUserPlaylists,
  updatePlaylist,
  deletePlaylist,
} from "../api/playlist.api";

function Playlists() {
  const { user } = useAuth();

  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [playlistData, setPlaylistData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await getUserPlaylists(user._id);

        console.log("PLAYLISTS RESPONSE:", response.data);

        setPlaylists(response.data.data);
      } catch (error) {
        console.log("PLAYLISTS ERROR:", error);
        console.log("PLAYLISTS ERROR RESPONSE:", error.response?.data);

        setError("Failed to load playlists");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchPlaylists();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPlaylistData({
      ...playlistData,
      [name]: value,
    });
  };

  const handleEdit = (playlist) => {
    setEditingPlaylist(playlist);

    setPlaylistData({
      name: playlist.name,
      description: playlist.description,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await updatePlaylist(editingPlaylist._id, playlistData);

      console.log("UPDATE PLAYLIST RESPONSE:", response.data);

      setPlaylists((prev) =>
        prev.map((playlist) =>
          playlist._id === editingPlaylist._id
            ? {
                ...playlist,
                name: response.data.data.name,
                description: response.data.data.description,
              }
            : playlist,
        ),
      );

      setEditingPlaylist(null);

      setPlaylistData({
        name: "",
        description: "",
      });
    } catch (error) {
      console.log("UPDATE PLAYLIST ERROR:", error);
      console.log("UPDATE PLAYLIST ERROR RESPONSE:", error.response?.data);
    }
  };

  const handleDelete = async (playlistId) => {
    if (!window.confirm("Are you sure you want to delete this playlist?")) {
      return;
    }

    try {
      const response = await deletePlaylist(playlistId);

      console.log("DELETE PLAYLIST RESPONSE:", response.data);

      setPlaylists((prev) =>
        prev.filter((playlist) => playlist._id !== playlistId),
      );
    } catch (error) {
      console.log("DELETE PLAYLIST ERROR:", error);
      console.log("DELETE PLAYLIST ERROR RESPONSE:", error.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createPlaylist(playlistData);

      console.log("CREATE PLAYLIST RESPONSE:", response.data);

      const newPlaylist = {
        ...response.data.data,
        totalVideos: 0,
        totalViews: 0,
      };

      setPlaylists((prev) => [...prev, newPlaylist]);

      setPlaylistData({
        name: "",
        description: "",
      });
    } catch (error) {
      console.log("CREATE PLAYLIST ERROR:", error);
      console.log("CREATE PLAYLIST ERROR RESPONSE:", error.response?.data);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-400">Loading playlists...</p>
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
        <h1 className="text-3xl font-bold text-white">My Playlists</h1>

        <p className="mt-2 text-sm text-gray-500">
          Create and manage your video playlists.
        </p>

        <div className="mt-3 h-1 w-12 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
      </div>

      {/* ================= CREATE / EDIT FORM ================= */}
      <section className="rounded-xl border border-gray-800 bg-gray-950 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">
            {editingPlaylist ? "Edit Playlist" : "Create Playlist"}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {editingPlaylist
              ? "Update your playlist details."
              : "Create a new playlist for your videos."}
          </p>
        </div>

        <form
          onSubmit={editingPlaylist ? handleUpdate : handleSubmit}
          className="space-y-5"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={playlistData.name}
              onChange={handleChange}
              required
              placeholder="Enter playlist name"
              className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Description
            </label>

            <textarea
              name="description"
              value={playlistData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter playlist description"
              className="w-full resize-none rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              className="rounded-lg bg-[#39FF14] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#6AFF4A] hover:shadow-[0_0_14px_rgba(57,255,20,0.35)]"
            >
              {editingPlaylist ? "Update Playlist" : "Create Playlist"}
            </button>

            {editingPlaylist && (
              <button
                type="button"
                onClick={() => {
                  setEditingPlaylist(null);
                  setPlaylistData({
                    name: "",
                    description: "",
                  });
                }}
                className="rounded-lg bg-gray-800 px-6 py-3 text-sm font-medium text-gray-300 transition hover:bg-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* ================= PLAYLISTS ================= */}
      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Your Playlists</h2>

            <p className="mt-1 text-sm text-gray-500">
              {playlists.length} playlists
            </p>
          </div>
        </div>

        {playlists.length === 0 ? (
          <div className="rounded-xl bg-gray-900 py-16 text-center">
            <p className="text-gray-500">
              You haven't created any playlists yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="group overflow-hidden rounded-xl border border-gray-800 bg-gray-950 transition hover:border-green-900 hover:bg-gray-900"
              >
                {/* Playlist Header */}
                <Link to={`/playlist/${playlist._id}`}>
                  <div className="relative flex h-36 items-end bg-gradient-to-br from-green-950 via-gray-900 to-black p-5">
                    <div className="absolute right-4 top-4 rounded-lg bg-black/60 px-3 py-2 text-xs text-gray-400">
                      {playlist.totalVideos} videos
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#39FF14]">
                        Playlist
                      </p>

                      <h2 className="mt-1 line-clamp-2 text-lg font-bold text-white transition group-hover:text-[#39FF14]">
                        {playlist.name}
                      </h2>
                    </div>
                  </div>
                </Link>

                {/* Playlist Information */}
                <div className="p-5">
                  <p className="line-clamp-2 min-h-10 text-sm leading-5 text-gray-400">
                    {playlist.description}
                  </p>

                  <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
                    <span>{playlist.totalVideos} videos</span>

                    <span className="text-gray-700">•</span>

                    <span>{playlist.totalViews} views</span>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-2">
                    <Link
                      to={`/playlist/${playlist._id}`}
                      className="flex-1 rounded-lg bg-gray-800 px-3 py-2 text-center text-xs font-medium text-gray-300 transition hover:bg-green-950 hover:text-[#39FF14]"
                    >
                      Open
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleEdit(playlist)}
                      className="rounded-lg bg-gray-800 px-3 py-2 text-xs font-medium text-gray-300 transition hover:bg-gray-700 hover:text-[#39FF14]"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(playlist._id)}
                      className="rounded-lg bg-gray-800 px-3 py-2 text-xs font-medium text-gray-300 transition hover:bg-red-950 hover:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Playlists;
