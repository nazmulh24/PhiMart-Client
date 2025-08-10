import { useEffect, useState } from "react";
import OrderCard from "../components/Orders/OrderCard";
import AuthApiClient from "../services/auth-api-client";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    AuthApiClient.get("/orders/").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="container mx-auto px-2 pr-4 md:py-8 md:px-4">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};

export default Orders;
