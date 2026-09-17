import api from "./axios";

const getAllVideos = (params = {}) => {
  return api.get("/videos", { params });
};

const getVideoById = (videoId) => {
  return api.get(`/videos/${videoId}`);
};

const publishVideo = (formData) => {
  return api.post("/videos", formData);
};

const updateVideo = (videoId, formData) => {
  return api.patch(`/videos/${videoId}`, formData);
};

const deleteVideo = (videoId) => {
  return api.delete(`/videos/${videoId}`);
};

const togglePublishStatus = (videoId) => {
  return api.patch(`/videos/toggle/publish/${videoId}`);
};

export {
  getAllVideos,
  getVideoById,
  publishVideo,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
