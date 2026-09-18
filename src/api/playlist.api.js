import api from "./axios";

const createPlaylist = (data) => {
  return api.post("/playlist", data);
};

const getPlaylistById = (playlistId) => {
  return api.get(`/playlist/${playlistId}`);
};

const updatePlaylist = (playlistId, data) => {
  return api.patch(`/playlist/${playlistId}`, data);
};

const deletePlaylist = (playlistId) => {
  return api.delete(`/playlist/${playlistId}`);
};

const addVideoToPlaylist = (videoId, playlistId) => {
  return api.patch(`/playlist/add/${videoId}/${playlistId}`);
};

const removeVideoFromPlaylist = (videoId, playlistId) => {
  return api.patch(`/playlist/remove/${videoId}/${playlistId}`);
};

const getUserPlaylists = (userId) => {
  return api.get(`/playlist/user/${userId}`);
};

export {
  createPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  getUserPlaylists,
};
