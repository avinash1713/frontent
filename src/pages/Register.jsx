// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Register = () => {
//   const navigate = useNavigate();
//   const { register } = useAuth();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     fullName: "",
//     password: "",
//     avatar: null,
//     coverImage: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const data = new FormData();

//       data.append("username", formData.username);
//       data.append("email", formData.email);
//       data.append("fullName", formData.fullName);
//       data.append("password", formData.password);
//       data.append("avatar", formData.avatar);

//       if (formData.coverImage) {
//         data.append("coverImage", formData.coverImage);
//       }

//       await register(data);

//       navigate("/login");
//     } catch (error) {
//       console.log("REGISTER ERROR:", error);
//       console.log("REGISTER RESPONSE:", error.response?.data);
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username</label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Full Name</label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
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

//         <div>
//           <label>Avatar</label>
//           <input
//             type="file"
//             name="avatar"
//             accept="image/*"
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Cover Image</label>
//           <input
//             type="file"
//             name="coverImage"
//             accept="image/*"
//             onChange={handleChange}
//           />
//         </div>

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("fullName", formData.fullName);
      data.append("password", formData.password);
      data.append("avatar", formData.avatar);

      if (formData.coverImage) {
        data.append("coverImage", formData.coverImage);
      }

      await register(data);

      navigate("/login");
    } catch (error) {
      console.log("REGISTER ERROR:", error);
      console.log("REGISTER RESPONSE:", error.response?.data);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        {/* ================= REGISTER CARD ================= */}
        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>

            <p className="mt-2 text-sm text-gray-500">
              Join VideoTube and start sharing your videos
            </p>

            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
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
                placeholder="Create a password"
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
              />
            </div>

            {/* Avatar */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Avatar
              </label>

              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                required
                className="block w-full cursor-pointer rounded-lg border border-gray-700 bg-black text-sm text-gray-400 file:mr-4 file:border-0 file:bg-gray-800 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-gray-300 hover:file:bg-gray-700"
              />

              <p className="mt-2 text-xs text-gray-600">
                Choose a profile picture for your account.
              </p>
            </div>

            {/* Cover Image */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Cover Image
                <span className="ml-2 text-xs text-gray-600">(Optional)</span>
              </label>

              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleChange}
                className="block w-full cursor-pointer rounded-lg border border-gray-700 bg-black text-sm text-gray-400 file:mr-4 file:border-0 file:bg-gray-800 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-gray-300 hover:file:bg-gray-700"
              />

              <p className="mt-2 text-xs text-gray-600">
                You can add a cover image later from Settings.
              </p>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#39FF14] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#6AFF4A] hover:shadow-[0_0_14px_rgba(57,255,20,0.35)]"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium text-[#39FF14] transition hover:text-[#6AFF4A]"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
