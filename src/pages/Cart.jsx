import { Suspense, useEffect, useState } from "react";
import useCartContext from "../hooks/useCartContext";
import CartItemList from "../components/Cart/CartItemList";

const Cart = () => {
  const {
    cart,
    loading,
    createOrGetCart,
    updateCartItemQuantity,
    deleteCartItems,
  } = useCartContext();

  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    if (!cart && !loading) createOrGetCart();

    setLocalCart(cart);
  }, [createOrGetCart, cart, loading]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    const prevLocalCartCopy = { ...localCart }; //--> Create a copy of the current cart state

    setLocalCart((prevLocalCart) => {
      const updatedItems = prevLocalCart.items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      return { ...prevLocalCart, items: updatedItems };
    });

    try {
      await updateCartItemQuantity(itemId, newQuantity);
    } catch (error) {
      console.log(error);
      setLocalCart(prevLocalCartCopy); //--> Rollback to previous cart state
    }
  };

  const handleRemoveItem = async (itemId) => {
    const prevLocalCartCopy = { ...localCart }; //--> Create a copy of the current cart state

    setLocalCart((prevLocalCart) => {
      const updatedItems = prevLocalCart.items.filter(
        (item) => item.id !== itemId
      );
      return { ...prevLocalCart, items: updatedItems };
    });

    try {
      await deleteCartItems(itemId);
    } catch (error) {
      console.log(error);
      setLocalCart(prevLocalCartCopy); //--> Rollback to previous cart state
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!localCart) return <p>No Cart Found</p>;

  return (
    <div className="flex justify-between">
      <div>
        <Suspense fallback={<p>Loading...</p>}>
          <CartItemList
            items={localCart.items}
            handleUpdateQuantity={handleUpdateQuantity}
            handleRemoveItem={handleRemoveItem}
          />
        </Suspense>
      </div>
      {/* <div>
        <CartSummary
          items={cart?.items}
          totalAmount={cart?.totalAmount}
        //   handleCheckout={handleCheckout}
        />
      </div> */}
    </div>
  );
};

export default Cart;
