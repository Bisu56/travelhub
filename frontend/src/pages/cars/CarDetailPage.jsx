import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCarDetails } from "../../services/carService";
import RentalOptions from "../../components/cars/RentalOptions";

const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    getCarDetails(id).then(res => setCar(res.data));
  }, [id]);

  if (!car) return <p>Loading...</p>;

  return (
    <div>
      <h2>{car.make} {car.model}</h2>
      <img src={car.image_url} alt={car.model} width="400" />
      <p>Transmission: {car.transmission}</p>
      <p>Fuel: {car.fuel_type}</p>
      <p>Mileage Limit: {car.mileage_limit}</p>
      <p>Deposit: ${car.deposit_amount}</p>

      <RentalOptions car={car} />
    </div>
  );
};

export default CarDetailPage;