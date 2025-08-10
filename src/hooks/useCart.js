import { useCallback, useState } from "react";
import AuthApiClient from "../services/auth-api-client";

const useCart = () => {
  const [authToken, setAuthToken] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens).access : null;
  });

  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);

  //--> Create a new cart
  const createOrGetCart = useCallback(async () => {
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  }, [authToken, cartId]);

  //--> Add Item to the Cart
  const addItemToCart = useCallback(
    async (product_id, quantity) => {
      setLoading(true);

      if (!cartId) await createOrGetCart();

      try {
        const response = await AuthApiClient.post(`/carts/${cartId}/items/`, {
          product_id,
          quantity,
        });
        return response.data;
      } catch (error) {
        console.log("Error adding Items", error);
      } finally {
        setLoading(false);
      }
    },
    [cartId, createOrGetCart]
  );

  //--> Update Item Quantity
  const updateCartItemQuantity = useCallback(
    async (itemId, newQuantity) => {
      setLoading(true);

      if (!cartId) await createOrGetCart();

      try {
        const response = await AuthApiClient.patch(
          `/carts/${cartId}/items/${itemId}/`,
          {
            quantity: newQuantity,
          }
        );
        return response.data;
      } catch (error) {
        console.log("Error updating item quantity", error);
      } finally {
        setLoading(false);
      }
    },
    [cartId, createOrGetCart]
  );

  return {
    cart,
    loading,
    createOrGetCart,
    addItemToCart,
    updateCartItemQuantity,
  };
};

export default useCart;
