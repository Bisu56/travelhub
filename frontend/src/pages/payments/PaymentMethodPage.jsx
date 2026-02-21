import { useLocation } from "react-router-dom";
import StripeCheckoutForm from "../../components/payments/StripeCheckoutForm";
import KhaltiButton from "../../components/payments/KhaltiButton";

const PaymentMethodPage = () => {
  const { state } = useLocation(); // bookingId & amount

  return (
    <div>
      <h2>Select Payment Method</h2>

      <h3>Total: ${state.amount}</h3>

      <StripeCheckoutForm bookingId={state.bookingId} amount={state.amount} />
      <hr />
      <KhaltiButton bookingId={state.bookingId} amount={state.amount} />
    </div>
  );
};

export default PaymentMethodPage;