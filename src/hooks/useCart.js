import { useCallback, useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useCart = () => {
  const [authToken] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens).access : null;
  });
  const [cart, setCart] = useState({ items: [], total_price: 0 });
  const [cartId, setCartId] = useState(() => localStorage.getItem("cartId"));
  const [loading, setLoading] = useState(false);

  // Create or get existing cart
  const createOrGetCart = useCallback(
    async (setLoadingState = true) => {
      if (setLoadingState) setLoading(true);
      try {
        console.log("Auth token:", authToken);

        // Try to get existing cart first if we have cartId
        if (cartId) {
          try {
            const response = await authApiClient.get(`/carts/${cartId}/`);
            setCart(response.data);
            console.log("Existing cart loaded:", response.data);
            return response.data;
          } catch (error) {
            console.log("Cart not found, creating new one", error);
          }
        }

        // Create new cart if no existing cart found
        const response = await authApiClient.post("/carts/");
        localStorage.setItem("cartId", response.data.id);
        setCartId(response.data.id);
        setCart(response.data);
        console.log("New cart created:", response.data);
        return response.data;
      } catch (error) {
        console.log("Error creating/getting cart:", error);
      } finally {
        if (setLoadingState) setLoading(false);
      }
    },
    [authToken, cartId]
  );

  // Add items to the cart
  const AddCartItems = useCallback(
    async (product_id, quantity) => {
      setLoading(true);
      if (!cartId) await createOrGetCart();
      try {
        const response = await authApiClient.post(`/carts/${cartId}/items/`, {
          product_id,
          quantity,
        });
        // Refresh cart data to sync navbar
        await createOrGetCart(false);
        return response.data;
      } catch (error) {
        console.log("Error adding Items", error);
      } finally {
        setLoading(false);
      }
    },
    [cartId, createOrGetCart]
  );

  // Update Item quantity
  const updateCartItemQuantity = useCallback(
    async (itemId, quantity) => {
      try {
        await authApiClient.patch(`/carts/${cartId}/items/${itemId}/`, {
          quantity,
        });
        // Refresh cart data to sync navbar
        await createOrGetCart(false);
      } catch (error) {
        console.log("Error updating cart items", error);
      }
    },
    [cartId, createOrGetCart]
  );

  // Delete Cart Items
  const deleteCartItems = useCallback(
    async (itemId) => {
      try {
        await authApiClient.delete(`/carts/${cartId}/items/${itemId}/`);
        // Refresh cart data to sync navbar
        await createOrGetCart(false);
      } catch (error) {
        console.log(error);
      }
    },
    [cartId, createOrGetCart]
  );

  useEffect(() => {
    const initializeCart = async () => {
      setLoading(true);
      await createOrGetCart();
      setLoading(false);
    };
    initializeCart();
  }, [createOrGetCart]);

  return {
    cart,
    loading,
    createOrGetCart,
    AddCartItems,
    updateCartItemQuantity,
    deleteCartItems,
  };
};

export default useCart;
