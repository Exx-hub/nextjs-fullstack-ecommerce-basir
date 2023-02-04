import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Context } from "@/context/Context";

import CheckoutWizard from "../components/CheckoutWizard";
import CustomHeadTag from "@/components/CustomHeadTag";
import PaymentRadioOptions from "@/components/PaymentRadioOptions";

function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const { state, dispatch } = useContext(Context);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });

    router.push("/placeorder");
  };

  return (
    <>
      <CustomHeadTag title="Payment" description="Payment Screen" />
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        <PaymentRadioOptions
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
        <div className="mb-4 flex justify-between items-center">
          <button onClick={() => router.push("/shipping")} type="button" className="default-button">
            Back
          </button>
          <button type="submit" className="primary-button">
            Next
          </button>
        </div>
      </form>
    </>
  );
}

PaymentScreen.auth = true;

export default PaymentScreen;
