import { useEffect, useState } from "react";
import OrderCard from "../components/Orders/OrderCard";
import AuthApiClient from "../services/auth-api-client";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    AuthApiClient.get("/orders/")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-2 pr-4 md:py-8 md:px-4">
        <h1 className="text-2xl font-bold mb-6">Order Details</h1>
        <div className="flex justify-center items-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 pr-4 md:py-8 md:px-4">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      {orders.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No orders found.</p>
        </div>
      ) : (
        orders.map((order) => <OrderCard key={order.id} order={order} />)
      )}
    </div>
  );
};

export default Orders;
