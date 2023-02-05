import OrderItems from "@/components/order/OrderItems";
import OrderSummary from "@/components/order/OrderSummary";
import { getError } from "@/utils/error";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

const initialState = {
  loading: false,
  order: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function OrderScreen() {
  const router = useRouter();
  const orderId = router.query.id;

  const [{ loading, order, error }, dispatch] = useReducer(reducer, initialState);

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  console.log({ loading, order, error });

  const fetchOrder = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(`/api/orders/${orderId}`);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: getError(err) });
    }
  };

  useEffect(() => {
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [orderId, order]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert-error">{error}</div>;
  }

  return (
    <>
      <h1 className="mb-4 text-xl">{`Order ${orderId}`}</h1>

      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-3">
          <div className="card p-5">
            <h2 className="mb-2 text-lg">Shipping Address</h2>
            <div>
              {shippingAddress?.fullName}, {shippingAddress?.address}, {shippingAddress?.city},{" "}
              {shippingAddress?.postalCode}, {shippingAddress?.country}
            </div>

            {isDelivered ? (
              <div className="alert-success">Delivered at {deliveredAt}</div>
            ) : (
              <div className="alert-error">Not delivered</div>
            )}
          </div>

          <div className="card p-5">
            <h2 className="mb-2 text-lg">Payment Method</h2>
            <div>{paymentMethod}</div>
            {isPaid ? (
              <div className="alert-success">Paid at {paidAt}</div>
            ) : (
              <div className="alert-error">Not paid</div>
            )}
          </div>

          <OrderItems items={orderItems} />
        </div>

        <OrderSummary
          itemsPrice={itemsPrice}
          taxPrice={taxPrice}
          shippingPrice={shippingPrice}
          totalPrice={totalPrice}
          loading={loading}
        />
      </div>
    </>
  );
}

OrderScreen.auth = true;

export default OrderScreen;
