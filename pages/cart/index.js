import CartComponent from "@/components/CartComponent";
import CustomHeadTag from "@/components/CustomHeadTag";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DynamicCartComponent = dynamic(() => import("@/components/CartComponent"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

function Cart() {
  return (
    <>
      <CustomHeadTag title="Cart" description="List of user's cart items" />
      <DynamicCartComponent />
    </>
  );
}

export default Cart;
