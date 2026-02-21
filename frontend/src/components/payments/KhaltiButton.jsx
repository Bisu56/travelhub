import { initiateKhalti } from "../../services/paymentService";

const KhaltiButton = ({ bookingId, amount }) => {

  const handleKhalti = async () => {
    const { data } = await initiateKhalti({
      bookingId,
      amount
    });

    window.location.href = data.payment_url;
  };

  return (
    <div>
      <h4>Pay with Khalti</h4>
      <button onClick={handleKhalti}>
        Pay with Khalti
      </button>
    </div>
  );
};

export default KhaltiButton;