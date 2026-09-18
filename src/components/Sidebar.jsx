import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Subscriptions", path: "/subscriptions" },
    { name: "History", path: "/history" },
    { name: "Liked Videos", path: "/liked-videos" },
    { name: "Playlists", path: "/playlists" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  return (
    <aside className="fixed top-16 bottom-0 left-0 flex w-64 flex-col border-r border-green-950 bg-black p-4">
      {/* Main Navigation */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-green-950 text-[#39FF14]"
                  : "text-gray-300 hover:bg-green-950 hover:text-[#39FF14]"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

        {/* My Channel */}
        {user && (
          <NavLink
            to={`/channel/${user.username}`}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-green-950 text-[#39FF14]"
                  : "text-gray-300 hover:bg-green-950 hover:text-[#39FF14]"
              }`
            }
          >
            My Channel
          </NavLink>
        )}
      </nav>

      {/* Settings at Bottom */}
      <div className="mt-auto border-t border-green-950 pt-4">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-green-950 text-[#39FF14]"
                : "text-gray-300 hover:bg-green-950 hover:text-[#39FF14]"
            }`
          }
        >
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
