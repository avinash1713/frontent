// import { NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Sidebar = () => {
//   const { user } = useAuth();

//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "Subscriptions", path: "/subscriptions" },
//     { name: "History", path: "/history" },
//     { name: "Liked Videos", path: "/liked-videos" },
//     { name: "Playlists", path: "/playlists" },
//     { name: "Dashboard", path: "/dashboard" },
//   ];

//   return (
//     <aside className="fixed top-16 bottom-0 left-0 flex w-64 flex-col border-r border-green-950 bg-black p-4">
//       {/* Main Navigation */}
//       <nav className="space-y-2">
//         {navItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `block rounded-lg px-4 py-3 text-sm font-medium transition ${
//                 isActive
//                   ? "bg-green-950 text-[#39FF14]"
//                   : "text-gray-300 hover:bg-green-950 hover:text-[#39FF14]"
//               }`
//             }
//           >
//             {item.name}
//           </NavLink>
//         ))}

//         {/* My Channel */}
//         {user && (
//           <NavLink
//             to={`/channel/${user.username}`}
//             className={({ isActive }) =>
//               `block rounded-lg px-4 py-3 text-sm font-medium transition ${
//                 isActive
//                   ? "bg-green-950 text-[#39FF14]"
//                   : "text-gray-300 hover:bg-green-950 hover:text-[#39FF14]"
//               }`
//             }
//           >
//             My Channel
//           </NavLink>
//         )}
//       </nav>

//       {/* Settings at Bottom */}
//       <div className="mt-auto border-t border-green-950 pt-4">
//         <NavLink
//           to="/settings"
//           className={({ isActive }) =>
//             `block rounded-lg px-4 py-3 text-sm font-medium transition ${
//               isActive
//                 ? "bg-green-950 text-[#39FF14]"
//                 : "text-gray-300 hover:bg-green-950 hover:text-[#39FF14]"
//             }`
//           }
//         >
//           Settings
//         </NavLink>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Subscriptions", path: "/subscriptions" },
    { name: "History", path: "/history" },
    { name: "Liked Videos", path: "/liked-videos" },
    { name: "Playlists", path: "/playlists" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-green-950 text-[#39FF14]"
        : "text-gray-300 hover:bg-green-950 hover:text-[#39FF14]"
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-green-950 bg-black p-4 transition-transform duration-300 md:z-40 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Main Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={linkClass}
            >
              {item.name}
            </NavLink>
          ))}

          {/* My Channel */}
          {user && (
            <NavLink
              to={`/channel/${user.username}`}
              onClick={onClose}
              className={linkClass}
            >
              My Channel
            </NavLink>
          )}
        </nav>

        {/* Settings at Bottom */}
        <div className="mt-auto border-t border-green-950 pt-4">
          <NavLink to="/settings" onClick={onClose} className={linkClass}>
            Settings
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
