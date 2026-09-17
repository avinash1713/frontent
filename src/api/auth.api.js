import api from "./axios";

const registerUser = (formData) => {
  return api.post("/users/register", formData);
};

const loginUser = (data) => {
  return api.post("/users/login", data);
};

const logoutUser = () => {
  return api.post("/users/logout");
};

const refreshAccessToken = () => {
  return api.post("/users/refreshToken");
};

const getCurrentUser = () => {
  return api.get("/users/current-user");
};

const changePassword = (data) => {
  return api.post("/users/change-password", data);
};

const updateAccountDetails = (data) => {
  return api.patch("/users/update-account", data);
};

const updateAvatar = (formData) => {
  return api.patch("/users/update-avatar", formData);
};

const updateCoverImage = (formData) => {
  return api.patch("/users/update-cover-image", formData);
};

const getUserChannelProfile = (username) => {
  return api.get(`/users/c/${username}`);
};

const getWatchHistory = () => {
  return api.get("/users/history");
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  changePassword,
  updateAccountDetails,
  updateAvatar,
  updateCoverImage,
  getUserChannelProfile,
  getWatchHistory,
};
