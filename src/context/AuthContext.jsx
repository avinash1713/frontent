// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateAccountDetails,
  updateAvatar,
  updateCoverImage,
} from "../api/auth.api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (data) => {
    const response = await loginUser(data);

    setUser(response.data.data);

    return response;
  };

  const register = async (formData) => {
    const response = await registerUser(formData);

    return response;
  };

  const logout = async () => {
    const response = await logoutUser();

    setUser(null);

    return response;
  };

  const updateUserAccount = async (data) => {
    const response = await updateAccountDetails(data);

    setUser(response.data.data);

    return response;
  };

  const updateUserAvatar = async (formData) => {
    const response = await updateAvatar(formData);

    setUser(response.data.data);

    return response;
  };

  const updateUserCoverImage = async (formData) => {
    const response = await updateCoverImage(formData);

    setUser(response.data.data);

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateUserAccount,
        updateUserAvatar,
        updateUserCoverImage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
