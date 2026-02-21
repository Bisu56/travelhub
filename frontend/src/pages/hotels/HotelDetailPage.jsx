import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelDetails } from "../../services/hotelService";
import RoomSelection from "../../components/hotels/RoomSelection";
import ImageCarousel from "../../components/hotels/ImageCarousel";

const HotelDetailPage = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    getHotelDetails(id).then(res => setHotel(res.data));
  }, [id]);

  if (!hotel) return <p>Loading...</p>;

  return (
    <div>
      <h2>{hotel.name}</h2>
      <ImageCarousel images={hotel.images} />
      <p>{hotel.description}</p>
      <RoomSelection rooms={hotel.rooms} />
    </div>
  );
};

export default HotelDetailPage;