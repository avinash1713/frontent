import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  createPlaylist,
  getUserPlaylists,
  updatePlaylist,
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
    return <p>Loading playlists...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>My Playlists</h1>

      <form onSubmit={editingPlaylist ? handleUpdate : handleSubmit}>
        {" "}
        <div>
          <label>Name</label>

          <input
            type="text"
            name="name"
            value={playlistData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>

          <textarea
            name="description"
            value={playlistData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">
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
          >
            Cancel
          </button>
        )}
      </form>

      <p>{playlists.length} playlists</p>

      <div>
        {playlists.map((playlist) => (
          <div key={playlist._id}>
            <Link to={`/playlist/${playlist._id}`}>
              <h2>{playlist.name}</h2>
            </Link>

            <p>{playlist.description}</p>

            <p>{playlist.totalVideos} videos</p>

            <p>{playlist.totalViews} views</p>
            <button onClick={() => handleEdit(playlist)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Playlists;
