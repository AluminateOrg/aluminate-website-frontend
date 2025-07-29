import React from "react";

export default function PaymentPage() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Payment Page</h1>
      <p>This is a mock payment page for admin.</p>
      <form style={{ maxWidth: 400 }}>
        <label>
          Card Number
          <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" style={{ width: "100%", marginBottom: 12 }} />
        </label>
        <label>
          Expiry Date
          <input type="text" name="expiry" placeholder="MM/YY" style={{ width: "100%", marginBottom: 12 }} />
        </label>
        <label>
          CVC
          <input type="text" name="cvc" placeholder="123" style={{ width: "100%", marginBottom: 12 }} />
        </label>
        <button type="submit" style={{ marginTop: 12 }}>Pay Now</button>
      </form>
    </main>
  );
}




