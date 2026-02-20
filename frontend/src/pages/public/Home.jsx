import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDestinations } from "../../services/publicService";

const Home = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    getDestinations()
      .then(res => setDestinations(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <div className="bg-cyan-600 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Your Next Adventure
          </h1>
          <p className="text-cyan-100 text-lg mb-8 max-w-2xl mx-auto">
            Explore breathtaking destinations around the world. Book flights, hotels, and packages all in one place.
          </p>
          <Link
            to="/packages"
            className="inline-block bg-lime-500 hover:bg-lime-400 text-cyan-900 font-bold px-8 py-3 rounded-xl text-lg transition-colors shadow-lg shadow-lime-500/30"
          >
            Explore Packages
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-cyan-900 mb-8 text-center">
          Popular Destinations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map(dest => (
            <div key={dest.id} className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow border border-cyan-100">
              <img
                src={dest.image_url}
                alt={`${dest.city}, ${dest.country}`}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-cyan-900">
                  {dest.city}
                </h3>
                <p className="text-cyan-600">{dest.country}</p>
                <Link
                  to={`/packages?destination=${dest.id}`}
                  className="inline-block mt-3 text-lime-600 font-semibold hover:text-lime-700"
                >
                  View Packages →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {destinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-cyan-600">No destinations available at the moment.</p>
          </div>
        )}
      </div>

      <div className="bg-cyan-900 py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Book Your Trip?
          </h2>
          <p className="text-cyan-200 mb-6">
            Join thousands of happy travelers who booked with TravelHub
          </p>
          <Link
            to="/register"
            className="inline-block bg-lime-500 hover:bg-lime-400 text-cyan-900 font-bold px-8 py-3 rounded-xl transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
