import { useNavigate } from "react-router-dom";

const PaymentFailurePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Payment Failed ❌</h2>
      <button onClick={() => navigate("/payment-method")}>
        Retry Payment
      </button>
    </div>
  );
};

export default PaymentFailurePage;