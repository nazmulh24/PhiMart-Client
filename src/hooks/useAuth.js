import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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

  const handleAPIError = (
    error,
    defaultMessage = "Something Went Wrong! Try Again"
  ) => {
    console.log(error);

    // setErrorMsg(
    //   error?.response?.data?.detail || error?.message || defaultMessage
    // );

    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);
      return { success: false, message: errorMessage };
    }
    setErrorMsg(defaultMessage);
    setTimeout(() => setErrorMsg(""), 10000);
    return {
      success: false,
      message: defaultMessage,
    };
  };

  let successTimeoutId;

  const handleAPISuccess = (
    success,
    clearError = true,
    defaultMessage = "Operation successful"
  ) => {
    if (clearError) setErrorMsg("");
    const successMessage = success || defaultMessage;
    setSuccessMsg(successMessage);
    if (successTimeoutId) clearTimeout(successTimeoutId);
    successTimeoutId = setTimeout(() => setSuccessMsg(""), 10000);
    return { success: true, message: successMessage };
  };

  //---> Update User Profile
  const updateUserProfile = async (data) => {
    setErrorMsg("");

    try {
      await apiClient.put("/auth/users/me/", data, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });
      return handleAPISuccess("Profile updated successfully");
    } catch (error) {
      return handleAPIError(error);
    }
  };

  //---> Password Change
  const changePassword = async (data) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/set_password/", data, {
        headers: {
          Authorization: `JWT ${authTokens?.access}`,
        },
      });
      return handleAPISuccess("Password changed successfully");
    } catch (error) {
      return handleAPIError(error);
    }
  };

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

  //--> Forgot Password
  const forgotPassword = async (email) => {
    setErrorMsg("");

    try {
      await apiClient.post("/auth/users/reset_password/", { email: email });
      return handleAPISuccess(
        "Password reset link has been sent to your email address. Please check your inbox."
      );
    } catch (error) {
      return handleAPIError(error, "Failed to send reset email");
    }
  };

  //--> Reset Password
  const resetPassword = async (uid, token, newPassword) => {
    setErrorMsg("");

    try {
      await apiClient.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: newPassword,
      });
      return handleAPISuccess("Password reset successful!");
    } catch (error) {
      return handleAPIError(error, "Failed to reset password");
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
      return handleAPIError(error, "Registration Failed! Try Again");
    }
  };

  //--> Logout User
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return {
    user,
    loginUser,
    forgotPassword,
    resetPassword,
    registerUser,
    logoutUser,
    updateUserProfile,
    changePassword,
    errorMsg,
    successMsg,
  };
};

export default useAuth;
