import { createContext, useContext, useEffect, useState } from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../api/auth.api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in when the application starts
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
