import { Suspense, useEffect, useState } from "react";
import useCartContext from "../hooks/useCartContext";
import CartItemList from "../components/Cart/CartItemList";
import CartSummary from "../components/Cart/CartSummary";

const Cart = () => {
  const {
    cart,
    cartId,
    loading,
    createOrGetCart,
    updateCartItemQuantity,
    deleteCartItems,
  } = useCartContext();

  const [localCart, setLocalCart] = useState(
    cart || { items: [], total_price: 0 }
  );

  useEffect(() => {
    if (!cart && !loading) {
      createOrGetCart();
    }
  }, [createOrGetCart, cart, loading]);

  useEffect(() => {
    if (cart && cart.items) {
      setLocalCart(cart);
      console.log("Cart data updated from context:", cart);
    } else if (cart) {
      // Even if cart.items is empty, update localCart
      setLocalCart(cart);
      console.log("Empty cart data updated from context:", cart);
    }
  }, [cart]);

  //--> Debug log
  //   console.log("Cart context cart:", cart);
  //   console.log("Local cart:", localCart);

  if (loading) return <p>Loading...</p>;
  if (!localCart || !Array.isArray(localCart.items))
    return <p>No Cart Found</p>;

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const prevLocalCartCopy = localCart; // store a copy of localCart

    setLocalCart((prevLocalCart) => {
      const updatedItmes = prevLocalCart.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              total_price: parseFloat(
                (item.product.price * newQuantity).toFixed(2)
              ),
            }
          : item
      );

      return {
        ...prevLocalCart,
        items: updatedItmes,
        total_price: parseFloat(
          updatedItmes
            .reduce((sum, item) => sum + item.total_price, 0)
            .toFixed(2)
        ),
      };
    });

    try {
      await updateCartItemQuantity(itemId, newQuantity);
    } catch (error) {
      console.log(error);
      setLocalCart(prevLocalCartCopy); // Rollback to previous state if API fails
    }
  };

  const handleRemoveItem = async (itemId) => {
    setLocalCart((prevLocalCart) => {
      const updatedItems = prevLocalCart.items.filter(
        (item) => item.id != itemId
      );

      return {
        ...prevLocalCart,
        items: updatedItems,
        total_price: parseFloat(
          updatedItems
            .reduce((sum, item) => sum + item.total_price, 0)
            .toFixed(2)
        ),
      };
    });

    try {
      await deleteCartItems(itemId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Suspense fallback={<p>Loading...</p>}>
            <CartItemList
              items={localCart?.items || []}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
            />
          </Suspense>
        </div>
        <div>
          <CartSummary
            totalPrice={localCart?.Total_Price}
            itemCount={localCart?.items?.length}
            cartId={cartId}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
