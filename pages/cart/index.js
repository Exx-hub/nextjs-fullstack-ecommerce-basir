import CartComponent from "@/components/CartComponent";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DynamicCartComponent = dynamic(() => import("@/components/CartComponent"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

function Cart() {
  return <DynamicCartComponent />;
}

export default Cart;
