import api from "./axios";

const getVideoComments = (videoId) => {
  return api.get(`/comments/${videoId}`);
};

const addComment = (videoId, data) => {
  return api.post(`/comments/${videoId}`, data);
};

const deleteComment = (commentId) => {
  return api.delete(`/comments/c/${commentId}`);
};

const updateComment = (commentId, data) => {
  return api.patch(`/comments/c/${commentId}`, data);
};

export { getVideoComments, addComment, deleteComment, updateComment };
