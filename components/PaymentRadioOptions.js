import React from "react";

function PaymentRadioOptions({ selectedPaymentMethod, setSelectedPaymentMethod }) {
  const paymentOptions = ["PayPal", "Stripe", "CashOnDelivery"];
  return (
    <section>
      {paymentOptions.map((option) => (
        <div key={option} className="mb-4">
          <input
            name="paymentMethod"
            className="p-2 outline-none focus:ring-0"
            id={option}
            type="radio"
            checked={selectedPaymentMethod === option}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            value={option}
          />

          <label className="p-2" htmlFor={option}>
            {option}
          </label>
        </div>
      ))}
    </section>
  );
}

export default PaymentRadioOptions;
