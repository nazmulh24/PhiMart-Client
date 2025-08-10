const CartSummary = ({ totalPrice, itemCount }) => {
  const safePrice = parseFloat(totalPrice) || 0;
  const safeItemCount = itemCount || 0;
  const shipping = safeItemCount == 0 || safePrice > 100 ? 0 : 10;
  const tax = safePrice * 0.1;
  const orderTotal = safePrice + shipping + tax;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">
              Subtotal {safeItemCount} items
            </span>
            <span>${safePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estimated Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Order Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
