import { useState } from "react";
import apiClient from "../services/api-client";
import AuthApiClient from "../services/auth-api-client";

const useCart = () => {
  const [authToken, setAuthToken] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens).access : null;
  });

  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));

  //--> Create a new cart
  const createOrGetCart = async () => {
    if (!authToken) {
      console.error("No authentication token available");
      return;
    }

    try {
      console.log(authToken);
      const response = await AuthApiClient.post("/carts/");
      if (!cartId) {
        localStorage.setItem("cartId", response.data.id);
        setCartId(response.data.id);
      }
      setCart(response.data);
      //   console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //--> Add Item to the Cart
  const addItemToCart = async (product_id, quantity) => {
    if (!cartId) await createOrGetCart();

    try {
      const response = await apiClient.post(`/carts/${cartId}/items/`, {
        product_id,
        quantity,
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return { cart, createOrGetCart, addItemToCart };
};

export default useCart;
