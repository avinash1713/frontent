// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setError("");

//       await login(formData);

//       navigate("/");
//     } catch (error) {
//       // setError(
//       //   error.response?.data?.message || "Login failed. Please try again.",
//       // );
//       console.log("LOGIN ERROR:", error);
//       console.log("LOGIN RESPONSE:", error.response?.data);

//       setError(
//         error.response?.data?.message || "Login failed. Please try again.",
//       );
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>

//       {error && <p>{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username or Email</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      await login(formData);

      navigate("/");
    } catch (error) {
      // setError(
      //   error.response?.data?.message || "Login failed. Please try again.",
      // );
      console.log("LOGIN ERROR:", error);
      console.log("LOGIN RESPONSE:", error.response?.data);

      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* ================= LOGIN CARD ================= */}
        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

            <p className="mt-2 text-sm text-gray-500">
              Login to your VideoTube account
            </p>

            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-900 bg-red-950/30 px-4 py-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username / Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Username or Email
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Enter your username or email"
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#39FF14] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#6AFF4A] hover:shadow-[0_0_14px_rgba(57,255,20,0.35)]"
            >
              Login
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="font-medium text-[#39FF14] transition hover:text-[#6AFF4A]"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
