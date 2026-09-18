import api from "./axios";

const toggleVideoLike = (videoId) => {
  return api.post(`/likes/toggle/v/${videoId}`);
};
const getLikedVideos = () => {
  return api.get("/likes/videos");
};
export { toggleVideoLike, getLikedVideos };
