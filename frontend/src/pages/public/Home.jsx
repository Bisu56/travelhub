import { useEffect, useState } from "react";
import { getDestinations } from "../../services/publicService";

const Home = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    getDestinations()
      .then(res => setDestinations(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Destinations</h1>

      <div className="grid grid-cols-3 gap-6">
        {destinations.map(dest => (
          <div key={dest.id} className="bg-white shadow rounded p-4">
            <img
              src={dest.image_url}
              className="h-40 w-full object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">
              {dest.city}, {dest.country}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;