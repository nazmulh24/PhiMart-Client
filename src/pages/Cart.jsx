import { Suspense, useEffect, useState } from "react";
import useCartContext from "../hooks/useCartContext";
import CartItemList from "../components/Cart/CartItemList";
import { set } from "react-hook-form";

const Cart = () => {
  const { cart, loading, createOrGetCart, updateCartItemQuantity } =
    useCartContext();

  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    if (!cart && !loading) createOrGetCart();

    setLocalCart(cart);
  }, [createOrGetCart, cart, loading]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
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
