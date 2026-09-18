import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Watch from "../pages/Watch.jsx";
import Channel from "../pages/Channel.jsx";
import History from "../pages/History.jsx";
import LikedVideos from "../pages/LikedVideos.jsx";

import Dashboard from "../pages/Dashboard.jsx";
import Playlists from "../pages/PlayLists.jsx";
import Playlist from "../pages/PlayList.jsx";

import Settings from "../pages/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/watch/:videoId" element={<Watch />} />

        <Route path="/channel/:username" element={<Channel />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/history" element={<History />} />

          <Route path="/liked-videos" element={<LikedVideos />} />

          <Route path="/playlists" element={<Playlists />} />

          <Route path="/playlist/:playlistId" element={<Playlist />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
