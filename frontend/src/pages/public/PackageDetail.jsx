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

  if (loading) return (
    <div className="min-h-screen bg-cyan-50 flex items-center justify-center">
      <div className="text-cyan-600 text-lg">Loading...</div>
    </div>
  );
  
  if (!data) return (
    <div className="min-h-screen bg-cyan-50 flex items-center justify-center">
      <div className="text-cyan-600 text-lg">Package not found</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <ImageGallery images={data.images} />
        
        <div className="mt-6 flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-900">{data.title}</h1>
            <p className="text-cyan-600 mt-2 text-lg">{data.description}</p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 border border-cyan-100 min-w-[200px]">
            <p className="text-4xl font-bold text-lime-600">${data.price}</p>
            <p className="text-cyan-600 mt-1">{data.duration} days</p>
            <p className="text-cyan-500">Capacity: {data.capacity} people</p>
            <button
              className="w-full mt-4 bg-lime-500 hover:bg-lime-400 text-cyan-900 font-bold px-6 py-3 rounded-xl transition-colors"
              onClick={() => navigate(`/booking/${data.id}`)}
            >
              Book Now
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-lime-50 p-6 rounded-xl border border-lime-200">
            <h3 className="font-bold text-lime-700 text-lg mb-3">✓ Included</h3>
            <ul className="space-y-2">
              {data.included?.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-cyan-700">
                  <span className="text-lime-500">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <h3 className="font-bold text-red-700 text-lg mb-3">✗ Excluded</h3>
            <ul className="space-y-2">
              {data.excluded?.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-cyan-700">
                  <span className="text-red-500">✗</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold text-cyan-900 mb-4">Itinerary</h2>
          <ItineraryAccordion itinerary={data.itinerary} />
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
