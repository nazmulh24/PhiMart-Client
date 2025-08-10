import { useState } from "react";
import apiClient from "../services/api-client";

const useCart = () => {
  const [authToken, setAuthToken] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens).access : null;
  });

  //--> Create a new cart
  const createCart = async () => {
    if (!authToken) {
      console.error("No authentication token available");
      return;
    }

    try {
      console.log(authToken);
      const response = await apiClient.post(
        "/carts/",
        {},
        {
          headers: { Authorization: `JWT ${authToken}` },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { createCart };
};

export default useCart;
