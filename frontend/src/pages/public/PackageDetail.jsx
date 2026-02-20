import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPackageById } from "../../services/publicService";
import ImageGallery from "../../components/public/ImageGallery";
import ItineraryAccordion from "../../components/public/ItineraryAccordion";

const PackageDetail = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPackageById(id)
      .then(res => setPkg(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!pkg) return <div className="p-6">Package not found</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ImageGallery images={pkg.images} />
      
      <div className="mt-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{pkg.title}</h1>
          <p className="text-gray-600 mt-2">{pkg.description}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${pkg.price}</p>
          <p className="text-gray-500">{pkg.duration} days</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Itinerary</h2>
        <ItineraryAccordion itinerary={pkg.itinerary} />
      </div>

      <div className="mt-8">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PackageDetail;
