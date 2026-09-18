// import { useEffect, useState } from "react";
// import {
//   publishVideo,
//   getAllVideos,
//   updateVideo,
//   deleteVideo,
//   togglePublishStatus,
// } from "../api/video.api";
// import { useAuth } from "../context/AuthContext";
// import VideoCard from "../components/VideoCard";

// function Dashboard() {
//   const { user } = useAuth();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     videoFile: null,
//     thumbnail: null,
//   });

//   const [videos, setVideos] = useState([]);
//   const [videosLoading, setVideosLoading] = useState(true);
//   const [videosError, setVideosError] = useState("");

//   const [editingVideo, setEditingVideo] = useState(null);

//   const [editData, setEditData] = useState({
//     title: "",
//     description: "",
//   });

//   useEffect(() => {
//     const fetchMyVideos = async () => {
//       try {
//         const response = await getAllVideos({
//           userId: user._id,
//         });

//         console.log("MY VIDEOS RESPONSE:", response.data);

//         setVideos(response.data.data.docs);
//       } catch (error) {
//         console.log("MY VIDEOS ERROR:", error);
//         console.log("MY VIDEOS ERROR RESPONSE:", error.response?.data);

//         setVideosError("Failed to load your videos");
//       } finally {
//         setVideosLoading(false);
//       }
//     };

//     if (user?._id) {
//       fetchMyVideos();
//     }
//   }, [user]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;

//     setEditData({
//       ...editData,
//       [name]: value,
//     });
//   };

//   const handleEdit = (video) => {
//     setEditingVideo(video);

//     setEditData({
//       title: video.title,
//       description: video.description,
//     });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await updateVideo(editingVideo._id, editData);

//       console.log("UPDATE VIDEO RESPONSE:", response.data);

//       const updatedVideo = response.data.data;

//       setVideos((prev) =>
//         prev.map((video) =>
//           video._id === editingVideo._id
//             ? {
//                 ...video,
//                 title: updatedVideo.title,
//                 description: updatedVideo.description,
//               }
//             : video,
//         ),
//       );

//       setEditingVideo(null);

//       setEditData({
//         title: "",
//         description: "",
//       });
//     } catch (error) {
//       console.log("UPDATE VIDEO ERROR:", error);
//       console.log("UPDATE VIDEO ERROR RESPONSE:", error.response?.data);
//     }
//   };

//   const handlePublish = async (videoId) => {
//     try {
//       const response = await togglePublishStatus(videoId);

//       console.log("TOGGLE PUBLISH RESPONSE:", response.data);

//       const isPublished = response.data.data.isPublished;

//       setVideos((prev) =>
//         prev.map((video) =>
//           video._id === videoId
//             ? {
//                 ...video,
//                 isPublished,
//               }
//             : video,
//         ),
//       );
//     } catch (error) {
//       console.log("TOGGLE PUBLISH ERROR:", error);
//       console.log("TOGGLE PUBLISH RESPONSE:", error.response?.data);
//     }
//   };

//   const handleDelete = async (videoId) => {
//     if (!window.confirm("Are you sure you want to delete this video?")) {
//       return;
//     }

//     try {
//       const response = await deleteVideo(videoId);

//       console.log("DELETE VIDEO RESPONSE:", response.data);

//       setVideos((prev) => prev.filter((video) => video._id !== videoId));
//     } catch (error) {
//       console.log("DELETE VIDEO ERROR:", error);
//       console.log("DELETE VIDEO ERROR RESPONSE:", error.response?.data);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const data = new FormData();

//       data.append("title", formData.title);
//       data.append("description", formData.description);
//       data.append("videoFile", formData.videoFile);
//       data.append("thumbnail", formData.thumbnail);

//       const response = await publishVideo(data);

//       console.log("PUBLISH VIDEO RESPONSE:", response.data);

//       setVideos((prev) => [response.data.data, ...prev]);

//       alert("Video published successfully");

//       setFormData({
//         title: "",
//         description: "",
//         videoFile: null,
//         thumbnail: null,
//       });
//     } catch (error) {
//       console.log("PUBLISH VIDEO ERROR:", error);
//       console.log("PUBLISH VIDEO RESPONSE:", error.response?.data);
//     }
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>

//       <h2>Publish Video</h2>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title</label>

//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Description</label>

//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Video</label>

//           <input
//             type="file"
//             name="videoFile"
//             accept="video/*"
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Thumbnail</label>

//           <input
//             type="file"
//             name="thumbnail"
//             accept="image/*"
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit">Publish Video</button>
//       </form>

//       <h2>My Videos</h2>

//       {videosLoading && <p>Loading your videos...</p>}

//       {videosError && <p>{videosError}</p>}

//       {!videosLoading && !videosError && (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
//             gap: "20px",
//           }}
//         >
//           {videos.map((video) => (
//             <div key={video._id}>
//               <VideoCard video={video} />

//               <p>Status: {video.isPublished ? "Published" : "Unpublished"}</p>

//               <button type="button" onClick={() => handlePublish(video._id)}>
//                 {video.isPublished ? "Unpublish" : "Publish"}
//               </button>

//               <button type="button" onClick={() => handleEdit(video)}>
//                 Edit
//               </button>

//               <button type="button" onClick={() => handleDelete(video._id)}>
//                 Delete
//               </button>

//               {editingVideo?._id === video._id && (
//                 <form onSubmit={handleUpdate}>
//                   <div>
//                     <label>Title</label>

//                     <input
//                       type="text"
//                       name="title"
//                       value={editData.title}
//                       onChange={handleEditChange}
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label>Description</label>

//                     <textarea
//                       name="description"
//                       value={editData.description}
//                       onChange={handleEditChange}
//                       required
//                     />
//                   </div>

//                   <button type="submit">Update Video</button>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       setEditingVideo(null);
//                       setEditData({
//                         title: "",
//                         description: "",
//                       });
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from "react";
import {
  publishVideo,
  getAllVideos,
  updateVideo,
  deleteVideo,
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

  const handleDelete = async (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) {
      return;
    }

    try {
      const response = await deleteVideo(videoId);

      console.log("DELETE VIDEO RESPONSE:", response.data);

      setVideos((prev) => prev.filter((video) => video._id !== videoId));
    } catch (error) {
      console.log("DELETE VIDEO ERROR:", error);
      console.log("DELETE VIDEO ERROR RESPONSE:", error.response?.data);
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

      setVideos((prev) => [response.data.data, ...prev]);

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
    <div className="mx-auto w-full max-w-7xl">
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your videos and upload new content.
        </p>

        <div className="mt-3 h-1 w-12 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
      </div>

      {/* ================= PUBLISH VIDEO ================= */}
      <section className="rounded-xl border border-gray-800 bg-gray-950 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">Publish Video</h2>

          <p className="mt-1 text-sm text-gray-500">
            Upload a new video to your channel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter video title"
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
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter video description"
              rows="5"
              className="w-full resize-none rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
            />
          </div>

          {/* Files */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Video
              </label>

              <input
                type="file"
                name="videoFile"
                accept="video/*"
                onChange={handleChange}
                required
                className="block w-full cursor-pointer rounded-lg border border-gray-700 bg-black text-sm text-gray-400 file:mr-4 file:border-0 file:bg-gray-800 file:px-4 file:py-3 file:text-sm file:font-medium file:text-gray-300 hover:file:bg-gray-700"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Thumbnail
              </label>

              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleChange}
                required
                className="block w-full cursor-pointer rounded-lg border border-gray-700 bg-black text-sm text-gray-400 file:mr-4 file:border-0 file:bg-gray-800 file:px-4 file:py-3 file:text-sm file:font-medium file:text-gray-300 hover:file:bg-gray-700"
              />
            </div>
          </div>

          {/* Publish Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="rounded-lg bg-[#39FF14] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#6AFF4A] hover:shadow-[0_0_14px_rgba(57,255,20,0.35)]"
            >
              Publish Video
            </button>
          </div>
        </form>
      </section>

      {/* ================= MY VIDEOS ================= */}
      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">My Videos</h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage videos uploaded to your channel.
            </p>
          </div>

          {!videosLoading && !videosError && (
            <span className="text-sm text-gray-500">
              {videos.length} videos
            </span>
          )}
        </div>

        {/* Loading */}
        {videosLoading && (
          <div className="rounded-xl bg-gray-900 py-16 text-center">
            <p className="text-gray-400">Loading your videos...</p>
          </div>
        )}

        {/* Error */}
        {videosError && (
          <div className="rounded-xl border border-red-900 bg-red-950/20 p-5">
            <p className="text-red-400">{videosError}</p>
          </div>
        )}

        {/* Videos */}
        {!videosLoading && !videosError && (
          <>
            {videos.length === 0 ? (
              <div className="rounded-xl bg-gray-900 py-16 text-center">
                <p className="text-gray-500">
                  You haven't uploaded any videos yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {videos.map((video) => (
                  <div key={video._id} className="min-w-0">
                    {/* Video */}
                    <VideoCard video={video} />

                    {/* Status */}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        Status
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          video.isPublished
                            ? "bg-green-950 text-[#39FF14]"
                            : "bg-gray-800 text-gray-400"
                        }`}
                      >
                        {video.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handlePublish(video._id)}
                        className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
                          video.isPublished
                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            : "bg-[#39FF14] text-black hover:bg-[#6AFF4A]"
                        }`}
                      >
                        {video.isPublished ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEdit(video)}
                        className="rounded-lg bg-gray-800 px-3 py-2 text-xs font-medium text-gray-300 transition hover:bg-gray-700 hover:text-[#39FF14]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(video._id)}
                        className="rounded-lg bg-gray-800 px-3 py-2 text-xs font-medium text-gray-300 transition hover:bg-red-950 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Edit Form */}
                    {editingVideo?._id === video._id && (
                      <form
                        onSubmit={handleUpdate}
                        className="mt-4 rounded-xl border border-gray-800 bg-gray-950 p-4"
                      >
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-300">
                            Title
                          </label>

                          <input
                            type="text"
                            name="title"
                            value={editData.title}
                            onChange={handleEditChange}
                            required
                            className="w-full rounded-lg border border-gray-700 bg-black px-3 py-2 text-sm text-white outline-none transition focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
                          />
                        </div>

                        <div className="mt-4">
                          <label className="mb-2 block text-sm font-medium text-gray-300">
                            Description
                          </label>

                          <textarea
                            name="description"
                            value={editData.description}
                            onChange={handleEditChange}
                            required
                            rows="4"
                            className="w-full resize-none rounded-lg border border-gray-700 bg-black px-3 py-2 text-sm text-white outline-none transition focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
                          />
                        </div>

                        <div className="mt-4 flex gap-2">
                          <button
                            type="submit"
                            className="rounded-lg bg-[#39FF14] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#6AFF4A]"
                          >
                            Update Video
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingVideo(null);
                              setEditData({
                                title: "",
                                description: "",
                              });
                            }}
                            className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
