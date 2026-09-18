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
    <div>
      <h1>Account Settings</h1>

      <div>
        <button type="button" onClick={() => setActiveTab("profile")}>
          Profile
        </button>

        <button type="button" onClick={() => setActiveTab("security")}>
          Security
        </button>
      </div>

      {activeTab === "profile" && (
        <div>
          <h2>Profile</h2>

          <h3>Avatar</h3>

          <img
            src={user?.avatar}
            alt={user?.username}
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <form onSubmit={handleUpdateAvatar}>
            <div>
              <label>Choose Avatar</label>

              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>

            <button type="submit" disabled={avatarLoading}>
              {avatarLoading ? "Updating..." : "Update Avatar"}
            </button>
          </form>

          <hr />

          <h3>Cover Image</h3>

          <img
            src={user?.coverImage}
            alt="Cover"
            style={{
              width: "500px",
              height: "200px",
              objectFit: "cover",
            }}
          />

          <form onSubmit={handleUpdateCoverImage}>
            <div>
              <label>Choose Cover Image</label>

              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleCoverImageChange}
              />
            </div>

            <button type="submit" disabled={coverLoading}>
              {coverLoading ? "Updating..." : "Update Cover Image"}
            </button>
          </form>

          <hr />

          <h3>Account Details</h3>

          <form onSubmit={handleUpdateAccount}>
            <div>
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Account"}
            </button>
          </form>
        </div>
      )}

      {activeTab === "security" && (
        <div>
          <h2>Security</h2>

          <form onSubmit={handleChangePassword}>
            <div>
              <label>Current Password</label>

              <input
                type="password"
                name="oldPassword"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div>
              <label>New Password</label>

              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div>
              <label>Confirm New Password</label>

              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <button type="submit" disabled={passwordLoading}>
              {passwordLoading ? "Changing..." : "Change Password"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Settings;
