import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createStripeIntent } from "../../services/paymentService";
import { useState } from "react";

const stripePromise = loadStripe("pk_test_your_public_key");

const CheckoutForm = ({ bookingId, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data } = await createStripeIntent({
      bookingId,
      amount
    });

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (result.error) {
      window.location.href = "/payment-failure";
    } else {
      window.location.href = "/payment-success";
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Pay with Card (Stripe)</h4>
      <CardElement />
      <button disabled={!stripe || loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const StripeCheckoutForm = (props) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm {...props} />
  </Elements>
);

export default StripeCheckoutForm;