import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import OrderTable from "./OrderTable";
import AuthApiClient from "../../services/auth-api-client";

const OrderCard = ({ order, onCancel }) => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState(order.status);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    try {
      const response = await AuthApiClient.patch(
        `/orders/${order.id}/update_status`,
        { status: newStatus }
      );
      console.log("Status update response:", response);
      if (response.status === 200) {
        setStatus(newStatus);
      }
    } catch (error) {
      console.error(error);
      // setStatus(order.status);
    }
  };

  const handlePayment = async (orderId) => {
    try {
      const response = await AuthApiClient.post(`payment/initiate/`, {
        amount: order.total_price,
        orderId: order.id,
        numItems: order.items.length,
      });
      console.log("Payment response:", response);
      if (response.status === 200) {
        // Handle successful payment
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
      <div className="bg-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">Order #{order.id}</h2>
          <p className="text-gray-600 text-sm">Placed on {order.created_at}</p>
        </div>
        <div className="flex gap-2">
          {user.is_staff ? (
            <select
              value={status}
              onChange={handleStatusChange}
              className="select select-bordered w-full max-w-xs"
            >
              {/* [ Not Paid, Ready to Ship, Shipped, Delivered, Canceled ] */}
              <option value="Not Paid">Not Paid</option>
              <option value="Ready to Ship">Ready to Ship</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          ) : (
            <span
              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                order.status === "Not Paid" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {order.status}
            </span>
          )}
          {order.status !== "Delivered" &&
            order.status !== "Canceled" &&
            !user.is_staff && (
              <button
                onClick={() => onCancel(order.id)}
                className="text-blue-700 hover:underline"
              >
                Cancel
              </button>
            )}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-medium text-lg mb-4">Order Items</h3>
        {/* Order Items Table  */}
        <OrderTable items={order.items} />
      </div>
      <div className="border-t p-6 flex flex-col items-end">
        <div className="space-y-2 w-full max-w-[200px]">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${order.total_price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total:</span>
            <span>${order.total_price.toFixed(2)}</span>
          </div>
        </div>
        {!user.is_staff && order.status === "Not Paid" && (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            onClick={() => handlePayment(order.id)}
          >
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
