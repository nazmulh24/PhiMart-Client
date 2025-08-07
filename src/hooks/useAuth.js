import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  //--> Fetch user profile
  useEffect(() => {
    if (authTokens) {
      const fetchUserProfile = async () => {
        try {
          const response = await apiClient.get("/auth/users/me", {
            headers: {
              Authorization: `JWT ${authTokens?.access}`,
            },
          });
          //   console.log(response.data);
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, [authTokens]);

  //--> Login User
  const loginUser = async (userData) => {
    setErrorMsg("");

    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);

      // console.log(response.data);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      // setUser(response.data.user);
      // return response.data;
    } catch (error) {
      setErrorMsg(error.response.data?.detail);
    }
  };

  //--> Register User
  const registerUser = async (userData) => {
    setErrorMsg("");

    try {
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message:
          "Registration successfull. Check your email to activate your account.",
      };
    } catch (error) {
      if (error.response && error.response.data) {
        const errMsg = Object.values(error.response.data).flat().join("\n");
        setErrorMsg(errMsg);
        return { success: false, message: errMsg };
      }
      setErrorMsg("Registration failed. Please try again.");
      return {
        success: false,
        message: "Registration failed. Please try again.",
      };
    }
  };

  //--> Logout User
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return { user, loginUser, registerUser, logoutUser, errorMsg };
};

export default useAuth;
