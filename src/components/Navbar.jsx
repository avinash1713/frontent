import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    }
  };

  return (
    <nav>
      <Link to="/">VideoTube</Link>

      <div>
        {user ? (
          <>
            <span>Welcome, {user.username}</span>

            <Link to="/dashboard">Dashboard</Link>

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
