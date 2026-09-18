import { useEffect, useState } from "react";
import {
  publishVideo,
  getAllVideos,
  updateVideo,
  togglePublishStatus,
} from "../api/video.api";
import { useAuth } from "../context/AuthContext";
import VideoCard from "../components/VideoCard";

function Dashboard() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoFile: null,
    thumbnail: null,
  });

  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(true);
  const [videosError, setVideosError] = useState("");

  const [editingVideo, setEditingVideo] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        const response = await getAllVideos({
          userId: user._id,
        });

        console.log("MY VIDEOS RESPONSE:", response.data);

        setVideos(response.data.data.docs);
      } catch (error) {
        console.log("MY VIDEOS ERROR:", error);
        console.log("MY VIDEOS ERROR RESPONSE:", error.response?.data);

        setVideosError("Failed to load your videos");
      } finally {
        setVideosLoading(false);
      }
    };

    if (user?._id) {
      fetchMyVideos();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleEdit = (video) => {
    setEditingVideo(video);

    setEditData({
      title: video.title,
      description: video.description,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await updateVideo(editingVideo._id, editData);

      console.log("UPDATE VIDEO RESPONSE:", response.data);

      const updatedVideo = response.data.data;

      setVideos((prev) =>
        prev.map((video) =>
          video._id === editingVideo._id
            ? {
                ...video,
                title: updatedVideo.title,
                description: updatedVideo.description,
              }
            : video,
        ),
      );

      setEditingVideo(null);

      setEditData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.log("UPDATE VIDEO ERROR:", error);
      console.log("UPDATE VIDEO ERROR RESPONSE:", error.response?.data);
    }
  };

  const handlePublish = async (videoId) => {
    try {
      const response = await togglePublishStatus(videoId);

      console.log("TOGGLE PUBLISH RESPONSE:", response.data);

      const isPublished = response.data.data.isPublished;

      setVideos((prev) =>
        prev.map((video) =>
          video._id === videoId
            ? {
                ...video,
                isPublished,
              }
            : video,
        ),
      );
    } catch (error) {
      console.log("TOGGLE PUBLISH ERROR:", error);
      console.log("TOGGLE PUBLISH RESPONSE:", error.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("videoFile", formData.videoFile);
      data.append("thumbnail", formData.thumbnail);

      const response = await publishVideo(data);

      console.log("PUBLISH VIDEO RESPONSE:", response.data);

      alert("Video published successfully");

      setFormData({
        title: "",
        description: "",
        videoFile: null,
        thumbnail: null,
      });
    } catch (error) {
      console.log("PUBLISH VIDEO ERROR:", error);
      console.log("PUBLISH VIDEO RESPONSE:", error.response?.data);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Publish Video</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Video</label>

          <input
            type="file"
            name="videoFile"
            accept="video/*"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Thumbnail</label>

          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Publish Video</button>
      </form>

      <h2>My Videos</h2>

      {videosLoading && <p>Loading your videos...</p>}

      {videosError && <p>{videosError}</p>}

      {!videosLoading && !videosError && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {videos.map((video) => (
            <div key={video._id}>
              <VideoCard video={video} />

              <p>Status: {video.isPublished ? "Published" : "Unpublished"}</p>

              <button type="button" onClick={() => handlePublish(video._id)}>
                {video.isPublished ? "Unpublish" : "Publish"}
              </button>

              <button type="button" onClick={() => handleEdit(video)}>
                Edit
              </button>

              {editingVideo?._id === video._id && (
                <form onSubmit={handleUpdate}>
                  <div>
                    <label>Title</label>

                    <input
                      type="text"
                      name="title"
                      value={editData.title}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <div>
                    <label>Description</label>

                    <textarea
                      name="description"
                      value={editData.description}
                      onChange={handleEditChange}
                      required
                    />
                  </div>

                  <button type="submit">Update Video</button>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingVideo(null);
                      setEditData({
                        title: "",
                        description: "",
                      });
                    }}
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
