import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "./ProtectedRoute";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Watch from "../pages/Watch.jsx";
import Channel from "../pages/Channel.jsx";
import History from "../pages/History.jsx";
import LikedVideos from "../pages/LikedVideos.jsx";

import Dashboard from "../pages/Dashboard.jsx";
// import Playlists from "../pages/Playlists.jsx";
// import Playlist from "../pages/playlist.jsx";

import Subscriptions from "../pages/Subscriptions.jsx";
import Settings from "../pages/Settings";
import Playlist from "../pages/PlayList.jsx";
import Playlists from "../pages/PlayLists.jsx";

function AppRoutes() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <BrowserRouter>
      <Navbar onMenuClick={toggleSidebar} />

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <main className="ml-0 min-h-screen bg-black pt-16 text-white md:ml-64">
        <div className="p-4 md:p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/watch/:videoId" element={<Watch />} />
            <Route path="/channel/:username" element={<Channel />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/history" element={<History />} />
              <Route path="/liked-videos" element={<LikedVideos />} />
              <Route path="/playlists" element={<Playlists />} />
              <Route path="/playlist/:playlistId" element={<Playlist />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
            </Route>
          </Routes>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default AppRoutes;
