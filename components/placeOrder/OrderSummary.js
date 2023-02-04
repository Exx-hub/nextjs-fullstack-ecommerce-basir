import React from "react";

function OrderSummary({
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
  loading,
  placeOrderHandler,
}) {
  return (
    <div className="card p-5 h-max">
      <h2 className="mb-2 text-lg">Order Summary</h2>
      <ul>
        <li>
          <div className="mb-2 flex justify-between">
            <div>Items</div>
            <div>${itemsPrice}</div>
          </div>
        </li>
        <li>
          <div className="mb-2 flex justify-between">
            <div>Tax</div>
            <div>${taxPrice}</div>
          </div>
        </li>
        <li>
          <div className="mb-2 flex justify-between">
            <div>Shipping</div>
            <div>${shippingPrice}</div>
          </div>
        </li>
        <li>
          <div className="mb-2 flex justify-between">
            <div>Total</div>
            <div>${totalPrice}</div>
          </div>
        </li>
        <li>
          <button disabled={loading} onClick={placeOrderHandler} className="primary-button w-full">
            {loading ? "Loading..." : "Place Order"}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default OrderSummary;
