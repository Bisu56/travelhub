import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicleDetails } from "../../services/vehicleService";
import RentalOptions from "../../components/vehicles/RentalOptions";

const VehicleDetailPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    getVehicleDetails(id).then(res => setVehicle(res.data));
  }, [id]);

  if (!vehicle) return <p>Loading...</p>;

  return (
    <div>
      <h2>{vehicle.make} {vehicle.model}</h2>
      <img src={vehicle.image_url} alt={vehicle.model} width="400" />
      <p>Transmission: {vehicle.transmission}</p>
      <p>Fuel: {vehicle.fuel_type}</p>
      <p>Mileage Limit: {vehicle.mileage_limit}</p>
      <p>Deposit: ${vehicle.deposit_amount}</p>

      <RentalOptions vehicle={vehicle} />
    </div>
  );
};

export default VehicleDetailPage;
