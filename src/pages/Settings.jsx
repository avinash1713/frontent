// // src/pages/Settings.jsx

// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { changePassword } from "../api/auth.api";

// function Settings() {
//   const { user, updateUserAccount, updateUserAvatar, updateUserCoverImage } =
//     useAuth();

//   const [activeTab, setActiveTab] = useState("profile");

//   const [formData, setFormData] = useState({
//     fullName: user?.fullName || "",
//     email: user?.email || "",
//   });

//   const [avatar, setAvatar] = useState(null);
//   const [coverImage, setCoverImage] = useState(null);

//   const [passwordData, setPasswordData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [avatarLoading, setAvatarLoading] = useState(false);
//   const [coverLoading, setCoverLoading] = useState(false);
//   const [passwordLoading, setPasswordLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleAvatarChange = (e) => {
//     setAvatar(e.target.files[0]);
//   };

//   const handleCoverImageChange = (e) => {
//     setCoverImage(e.target.files[0]);
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;

//     setPasswordData({
//       ...passwordData,
//       [name]: value,
//     });
//   };

//   const handleUpdateAccount = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const response = await updateUserAccount(formData);

//       console.log("UPDATE ACCOUNT RESPONSE:", response.data);

//       alert("Account details updated successfully");
//     } catch (error) {
//       console.log("UPDATE ACCOUNT ERROR:", error);
//       console.log("UPDATE ACCOUNT ERROR RESPONSE:", error.response?.data);

//       alert(
//         error.response?.data?.message || "Failed to update account details",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleUpdateAvatar = async (e) => {
//     e.preventDefault();

//     if (!avatar) {
//       alert("Please select an avatar");
//       return;
//     }

//     try {
//       setAvatarLoading(true);

//       const data = new FormData();

//       data.append("avatar", avatar);

//       const response = await updateUserAvatar(data);

//       console.log("UPDATE AVATAR RESPONSE:", response.data);

//       setAvatar(null);

//       alert("Avatar updated successfully");
//     } catch (error) {
//       console.log("UPDATE AVATAR ERROR:", error);
//       console.log("UPDATE AVATAR ERROR RESPONSE:", error.response?.data);

//       alert(error.response?.data?.message || "Failed to update avatar");
//     } finally {
//       setAvatarLoading(false);
//     }
//   };

//   const handleUpdateCoverImage = async (e) => {
//     e.preventDefault();

//     if (!coverImage) {
//       alert("Please select a cover image");
//       return;
//     }

//     try {
//       setCoverLoading(true);

//       const data = new FormData();

//       data.append("coverImage", coverImage);

//       const response = await updateUserCoverImage(data);

//       console.log("UPDATE COVER IMAGE RESPONSE:", response.data);

//       setCoverImage(null);

//       alert("Cover image updated successfully");
//     } catch (error) {
//       console.log("UPDATE COVER IMAGE ERROR:", error);
//       console.log("UPDATE COVER IMAGE ERROR RESPONSE:", error.response?.data);

//       alert(error.response?.data?.message || "Failed to update cover image");
//     } finally {
//       setCoverLoading(false);
//     }
//   };

//   const handleChangePassword = async (e) => {
//     e.preventDefault();

//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert("New password and confirm password do not match");
//       return;
//     }

//     try {
//       setPasswordLoading(true);

//       const response = await changePassword({
//         oldPassword: passwordData.oldPassword,
//         newPassword: passwordData.newPassword,
//       });

//       console.log("CHANGE PASSWORD RESPONSE:", response.data);

//       setPasswordData({
//         oldPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });

//       alert("Password changed successfully");
//     } catch (error) {
//       console.log("CHANGE PASSWORD ERROR:", error);
//       console.log("CHANGE PASSWORD ERROR RESPONSE:", error.response?.data);

//       alert(error.response?.data?.message || "Failed to change password");
//     } finally {
//       setPasswordLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Account Settings</h1>

//       <div>
//         <button type="button" onClick={() => setActiveTab("profile")}>
//           Profile
//         </button>

//         <button type="button" onClick={() => setActiveTab("security")}>
//           Security
//         </button>
//       </div>

//       {activeTab === "profile" && (
//         <div>
//           <h2>Profile</h2>

//           <h3>Avatar</h3>

//           <img
//             src={user?.avatar}
//             alt={user?.username}
//             style={{
//               width: "120px",
//               height: "120px",
//               borderRadius: "50%",
//               objectFit: "cover",
//             }}
//           />

//           <form onSubmit={handleUpdateAvatar}>
//             <div>
//               <label>Choose Avatar</label>

//               <input
//                 type="file"
//                 name="avatar"
//                 accept="image/*"
//                 onChange={handleAvatarChange}
//               />
//             </div>

//             <button type="submit" disabled={avatarLoading}>
//               {avatarLoading ? "Updating..." : "Update Avatar"}
//             </button>
//           </form>

//           <hr />

//           <h3>Cover Image</h3>

//           <img
//             src={user?.coverImage}
//             alt="Cover"
//             style={{
//               width: "500px",
//               height: "200px",
//               objectFit: "cover",
//             }}
//           />

//           <form onSubmit={handleUpdateCoverImage}>
//             <div>
//               <label>Choose Cover Image</label>

//               <input
//                 type="file"
//                 name="coverImage"
//                 accept="image/*"
//                 onChange={handleCoverImageChange}
//               />
//             </div>

//             <button type="submit" disabled={coverLoading}>
//               {coverLoading ? "Updating..." : "Update Cover Image"}
//             </button>
//           </form>

//           <hr />

//           <h3>Account Details</h3>

//           <form onSubmit={handleUpdateAccount}>
//             <div>
//               <label>Full Name</label>

//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div>
//               <label>Email</label>

//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <button type="submit" disabled={loading}>
//               {loading ? "Updating..." : "Update Account"}
//             </button>
//           </form>
//         </div>
//       )}

//       {activeTab === "security" && (
//         <div>
//           <h2>Security</h2>

//           <form onSubmit={handleChangePassword}>
//             <div>
//               <label>Current Password</label>

//               <input
//                 type="password"
//                 name="oldPassword"
//                 value={passwordData.oldPassword}
//                 onChange={handlePasswordChange}
//                 required
//               />
//             </div>

//             <div>
//               <label>New Password</label>

//               <input
//                 type="password"
//                 name="newPassword"
//                 value={passwordData.newPassword}
//                 onChange={handlePasswordChange}
//                 required
//               />
//             </div>

//             <div>
//               <label>Confirm New Password</label>

//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={passwordData.confirmPassword}
//                 onChange={handlePasswordChange}
//                 required
//               />
//             </div>

//             <button type="submit" disabled={passwordLoading}>
//               {passwordLoading ? "Changing..." : "Change Password"}
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Settings;

// src/pages/Settings.jsx

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { changePassword } from "../api/auth.api";

function Settings() {
  const { user, updateUserAccount, updateUserAvatar, updateUserCoverImage } =
    useAuth();

  const [activeTab, setActiveTab] = useState("profile");

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleUpdateAccount = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await updateUserAccount(formData);

      console.log("UPDATE ACCOUNT RESPONSE:", response.data);

      alert("Account details updated successfully");
    } catch (error) {
      console.log("UPDATE ACCOUNT ERROR:", error);
      console.log("UPDATE ACCOUNT ERROR RESPONSE:", error.response?.data);

      alert(
        error.response?.data?.message || "Failed to update account details",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();

    if (!avatar) {
      alert("Please select an avatar");
      return;
    }

    try {
      setAvatarLoading(true);

      const data = new FormData();

      data.append("avatar", avatar);

      const response = await updateUserAvatar(data);

      console.log("UPDATE AVATAR RESPONSE:", response.data);

      setAvatar(null);

      alert("Avatar updated successfully");
    } catch (error) {
      console.log("UPDATE AVATAR ERROR:", error);
      console.log("UPDATE AVATAR ERROR RESPONSE:", error.response?.data);

      alert(error.response?.data?.message || "Failed to update avatar");
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleUpdateCoverImage = async (e) => {
    e.preventDefault();

    if (!coverImage) {
      alert("Please select a cover image");
      return;
    }

    try {
      setCoverLoading(true);

      const data = new FormData();

      data.append("coverImage", coverImage);

      const response = await updateUserCoverImage(data);

      console.log("UPDATE COVER IMAGE RESPONSE:", response.data);

      setCoverImage(null);

      alert("Cover image updated successfully");
    } catch (error) {
      console.log("UPDATE COVER IMAGE ERROR:", error);
      console.log("UPDATE COVER IMAGE ERROR RESPONSE:", error.response?.data);

      alert(error.response?.data?.message || "Failed to update cover image");
    } finally {
      setCoverLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match");
      return;
    }

    try {
      setPasswordLoading(true);

      const response = await changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      });

      console.log("CHANGE PASSWORD RESPONSE:", response.data);

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      alert("Password changed successfully");
    } catch (error) {
      console.log("CHANGE PASSWORD ERROR:", error);
      console.log("CHANGE PASSWORD ERROR RESPONSE:", error.response?.data);

      alert(error.response?.data?.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Account Settings</h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your profile and account security.
        </p>

        <div className="mt-3 h-1 w-12 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14]" />
      </div>

      {/* ================= TABS ================= */}
      <div className="mb-8 flex border-b border-gray-800">
        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`px-5 pb-4 text-sm font-semibold transition ${
            activeTab === "profile"
              ? "border-b-2 border-[#39FF14] text-[#39FF14]"
              : "text-gray-500 hover:text-white"
          }`}
        >
          Profile
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("security")}
          className={`px-5 pb-4 text-sm font-semibold transition ${
            activeTab === "security"
              ? "border-b-2 border-[#39FF14] text-[#39FF14]"
              : "text-gray-500 hover:text-white"
          }`}
        >
          Security
        </button>
      </div>

      {/* ================= PROFILE TAB ================= */}
      {activeTab === "profile" && (
        <div className="space-y-8">
          {/* ================= AVATAR ================= */}
          <section className="rounded-xl border border-gray-800 bg-gray-950 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">
                Profile Picture
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Update your profile avatar.
              </p>
            </div>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full border-2 border-gray-800 bg-gray-900">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-[#39FF14]">
                    {user?.username?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </div>

              <form
                onSubmit={handleUpdateAvatar}
                className="flex flex-col gap-4"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Choose Avatar
                  </label>

                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="block w-full cursor-pointer rounded-lg border border-gray-700 bg-black text-sm text-gray-400 file:mr-4 file:border-0 file:bg-gray-800 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-gray-300 hover:file:bg-gray-700"
                  />
                </div>

                <button
                  type="submit"
                  disabled={avatarLoading}
                  className="w-fit rounded-lg bg-[#39FF14] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#6AFF4A] hover:shadow-[0_0_12px_rgba(57,255,20,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {avatarLoading ? "Updating..." : "Update Avatar"}
                </button>
              </form>
            </div>
          </section>

          {/* ================= COVER IMAGE ================= */}
          <section className="rounded-xl border border-gray-800 bg-gray-950 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">Cover Image</h2>

              <p className="mt-1 text-sm text-gray-500">
                Update the cover image displayed on your channel.
              </p>
            </div>

            <div className="overflow-hidden rounded-xl bg-gray-900">
              {user?.coverImage ? (
                <img
                  src={user.coverImage}
                  alt="Cover"
                  className="h-48 w-full object-cover sm:h-56"
                />
              ) : (
                <div className="flex h-48 items-center justify-center text-gray-600 sm:h-56">
                  No cover image
                </div>
              )}
            </div>

            <form
              onSubmit={handleUpdateCoverImage}
              className="mt-5 flex flex-col gap-4"
            >
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Choose Cover Image
                </label>

                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="block w-full cursor-pointer rounded-lg border border-gray-700 bg-black text-sm text-gray-400 file:mr-4 file:border-0 file:bg-gray-800 file:px-4 file:py-2.5 file:text-sm file:font-medium file:text-gray-300 hover:file:bg-gray-700"
                />
              </div>

              <button
                type="submit"
                disabled={coverLoading}
                className="w-fit rounded-lg bg-[#39FF14] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#6AFF4A] hover:shadow-[0_0_12px_rgba(57,255,20,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {coverLoading ? "Updating..." : "Update Cover Image"}
              </button>
            </form>
          </section>

          {/* ================= ACCOUNT DETAILS ================= */}
          <section className="rounded-xl border border-gray-800 bg-gray-950 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white">
                Account Details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Update your basic account information.
              </p>
            </div>

            <form
              onSubmit={handleUpdateAccount}
              className="max-w-2xl space-y-5"
            >
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
                  className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
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
                  className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#39FF14] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#6AFF4A] hover:shadow-[0_0_12px_rgba(57,255,20,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Account"}
              </button>
            </form>
          </section>
        </div>
      )}

      {/* ================= SECURITY TAB ================= */}
      {activeTab === "security" && (
        <section className="rounded-xl border border-gray-800 bg-gray-950 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Security</h2>

            <p className="mt-1 text-sm text-gray-500">
              Change your account password.
            </p>
          </div>

          <form onSubmit={handleChangePassword} className="max-w-2xl space-y-5">
            {/* Current Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Current Password
              </label>

              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                required
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                New Password
              </label>

              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Confirm New Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
                className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none transition focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14]"
              />
            </div>

            <button
              type="submit"
              disabled={passwordLoading}
              className="rounded-lg bg-[#39FF14] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#6AFF4A] hover:shadow-[0_0_12px_rgba(57,255,20,0.3)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {passwordLoading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default Settings;
