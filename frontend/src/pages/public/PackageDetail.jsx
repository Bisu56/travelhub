import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPackageById } from "../../services/publicService";
import ImageGallery from "../../components/public/ImageGallery";
import ItineraryAccordion from "../../components/public/ItineraryAccordion";
import { FiCalendar, FiUsers, FiArrowLeft, FiCheck, FiX } from "react-icons/fi";

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
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin"></div>
        <p className="text-cyan-600 font-medium">Loading package details...</p>
      </div>
    </div>
  );
  
  if (!data) return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-cyan-600 text-lg">Package not found</p>
        <button 
          onClick={() => navigate('/packages')}
          className="mt-4 text-cyan-600 hover:text-cyan-800 font-medium"
        >
          ← Back to Packages
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-medium mb-6 transition-colors"
        >
          <FiArrowLeft size={20} />
          Back to Packages
        </button>

        {/* Image Gallery */}
        <div className="mb-8">
          <ImageGallery images={data.images} />
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-cyan-100">
              <h1 className="text-3xl lg:text-4xl font-bold text-cyan-900 mb-4">{data.title}</h1>
              <p className="text-cyan-600 text-lg leading-relaxed">{data.description}</p>
              
              <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-cyan-100">
                <div className="flex items-center gap-2 bg-cyan-50 px-4 py-2 rounded-xl">
                  <FiCalendar className="text-cyan-600" size={20} />
                  <span className="text-cyan-700 font-medium">{data.duration} Days</span>
                </div>
                <div className="flex items-center gap-2 bg-cyan-50 px-4 py-2 rounded-xl">
                  <FiUsers className="text-cyan-600" size={20} />
                  <span className="text-cyan-700 font-medium">Max {data.capacity} People</span>
                </div>
              </div>
            </div>

            {/* Included/Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-lime-50 p-6 rounded-2xl border border-lime-200">
                <h3 className="font-bold text-lime-700 text-lg mb-4 flex items-center gap-2">
                  <FiCheck size={22} />
                  What's Included
                </h3>
                <ul className="space-y-3">
                  {data.included?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-cyan-700">
                      <FiCheck className="text-lime-500 mt-0.5 flex-shrink-0" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                <h3 className="font-bold text-red-700 text-lg mb-4 flex items-center gap-2">
                  <FiX size={22} />
                  What's Not Included
                </h3>
                <ul className="space-y-3">
                  {data.excluded?.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-cyan-700">
                      <FiX className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-cyan-100">
              <h2 className="text-2xl font-bold text-cyan-900 mb-6">Trip Itinerary</h2>
              <ItineraryAccordion itinerary={data.itinerary} />
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-cyan-100 sticky top-24">
              <div className="text-center pb-6 border-b border-cyan-100">
                <p className="text-cyan-500 text-sm uppercase tracking-wide">Starting from</p>
                <p className="text-5xl font-bold text-lime-600 mt-2">${data.price}</p>
                <p className="text-cyan-500 text-sm mt-1">per person</p>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-600">Duration</span>
                  <span className="font-semibold text-cyan-900">{data.duration} Days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-600">Group Size</span>
                  <span className="font-semibold text-cyan-900">Max {data.capacity} People</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-600">Availability</span>
                  <span className="font-semibold text-green-600">Available</span>
                </div>
              </div>

              <button
                className="w-full mt-4 bg-lime-500 hover:bg-lime-400 text-cyan-900 font-bold px-6 py-4 rounded-xl transition-all shadow-lg shadow-lime-500/30 hover:shadow-lime-500/40 hover:-translate-y-1 text-lg"
                onClick={() => navigate(`/booking/${data.id}`)}
              >
                Book Now
              </button>
              
              <p className="text-center text-cyan-400 text-xs mt-4">
                Free cancellation up to 24 hours before departure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
