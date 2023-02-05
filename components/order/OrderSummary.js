import React from "react";

function OrderSummary({
  isPlaceOrder,
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
        {isPlaceOrder && (
          <li>
            <button
              disabled={loading}
              onClick={placeOrderHandler}
              className="primary-button w-full"
            >
              {loading ? "Please wait..." : "Place Order"}
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default OrderSummary;

//  {!isPaid && (
//                   <li>
//                     {isPending ? (
//                       <div>Loading...</div>
//                     ) : (
//                       <div className="w-full">
//                         <PayPalButtons
//                           createOrder={createOrder}
//                           onApprove={onApprove}
//                           onError={onError}
//                         ></PayPalButtons>
//                       </div>
//                     )}
//                     {loadingPay && <div>Loading...</div>}
//                   </li>
//                 )}
//                 {session.user.isAdmin && order.isPaid && !order.isDelivered && (
//                   <li>
//                     {loadingDeliver && <div>Loading...</div>}
//                     <button
//                       className="primary-button w-full"
//                       onClick={deliverOrderHandler}
//                     >
//                       Deliver Order
//                     </button>
//                   </li>
//                 )}
