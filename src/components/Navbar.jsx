// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.log("LOGOUT ERROR:", error);
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-green-950 bg-black">
//       <div className="flex h-full items-center justify-between px-6">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-2xl font-bold text-[#39FF14] transition hover:text-[#6AFF4A]"
//         >
//           VideoTube
//         </Link>

//         {/* Right Side */}
//         <div className="flex items-center gap-4">
//           {user ? (
//             <>
//               <span className="text-sm font-medium text-gray-300">
//                 Welcome, {user.username}
//               </span>

//               <Link
//                 to="/dashboard"
//                 className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-green-950 hover:text-[#39FF14]"
//               >
//                 Dashboard
//               </Link>

//               <Link
//                 to="/settings"
//                 className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-green-950 hover:text-[#39FF14]"
//               >
//                 Settings
//               </Link>

//               <button
//                 onClick={handleLogout}
//                 className="rounded-lg bg-[#39FF14] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#6AFF4A]"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-green-950 hover:text-[#39FF14]"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/register"
//                 className="rounded-lg bg-[#39FF14] px-4 py-2 text-sm font-semibold text-black transition hover:bg-[#6AFF4A]"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-green-950 bg-black">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-gray-300 transition hover:bg-green-950 hover:text-[#39FF14] md:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>

          <Link
            to="/"
            className="text-2xl font-bold text-[#39FF14] transition hover:text-[#6AFF4A]"
          >
            VideoTube
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            <>
              <span className="hidden text-sm font-medium text-gray-300 lg:block">
                Welcome, {user.username}
              </span>

              <Link
                to="/dashboard"
                className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-green-950 hover:text-[#39FF14] md:block"
              >
                Dashboard
              </Link>

              <Link
                to="/settings"
                className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-green-950 hover:text-[#39FF14] md:block"
              >
                Settings
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-[#39FF14] px-3 py-2 text-sm font-semibold text-black transition hover:bg-[#6AFF4A] hover:shadow-[0_0_14px_rgba(57,255,20,0.35)] md:px-4"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-green-950 hover:text-[#39FF14] md:px-4"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-[#39FF14] px-3 py-2 text-sm font-semibold text-black transition hover:bg-[#6AFF4A] md:px-4"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
