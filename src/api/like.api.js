import api from "./axios";

const toggleVideoLike = (videoId) => {
  return api.post(`/likes/toggle/v/${videoId}`);
};

const toggleCommentLike = (commentId) => {
  return api.post(`/likes/toggle/c/${commentId}`);
};

const toggleTweetLike = (tweetId) => {
  return api.post(`/likes/toggle/t/${tweetId}`);
};

const getLikedVideos = () => {
  return api.get("/likes/videos");
};

export { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos };
