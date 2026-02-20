import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPackageById } from "../../services/publicService";
import ImageGallery from "../../components/public/ImageGallery";
import ItineraryAccordion from "../../components/public/ItineraryAccordion";

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPackageById(id)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!data) return <div className="p-6">Package not found</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ImageGallery images={data.images} />
      
      <div className="mt-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-gray-600 mt-2">{data.description}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${data.price}</p>
          <p className="text-gray-500">{data.duration} days</p>
          <p className="text-gray-500">Capacity: {data.capacity} people</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="bg-green-50 p-4 rounded">
          <h3 className="font-bold text-green-700 mb-2">Included</h3>
          <ul className="list-disc list-inside">
            {data.included?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded">
          <h3 className="font-bold text-red-700 mb-2">Excluded</h3>
          <ul className="list-disc list-inside">
            {data.excluded?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Itinerary</h2>
        <ItineraryAccordion itinerary={data.itinerary} />
      </div>

      <button
        className="bg-blue-600 text-white px-6 py-2 mt-4"
        onClick={() => navigate(`/booking/${data.id}`)}
      >
        Book Now
      </button>
    </div>
  );
};

export default PackageDetail;
