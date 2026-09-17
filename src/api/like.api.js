import api from "./axios";

const toggleVideoLike = (videoId) => {
  return api.post(`/likes/toggle/v/${videoId}`);
};

export { toggleVideoLike };
