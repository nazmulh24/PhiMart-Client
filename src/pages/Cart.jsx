import { useEffect } from "react";
import useCartContext from "../hooks/useCartContext";

const Cart = () => {
  const { cart, createOrGetCart } = useCartContext();

  useEffect(() => {
    createOrGetCart();
  }, [createOrGetCart]);

  return <div>{JSON.stringify(cart)}</div>;
};

export default Cart;
