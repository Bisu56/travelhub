import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiTrash2, FiMapPin, FiCalendar } from 'react-icons/fi';
import { getWishlist, removeFromWishlist } from '../services/wishlistService';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist();
      setWishlist(res.data || []);
    } catch (error) {
      console.error('Failed to fetch wishlist', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeFromWishlist(id);
      setWishlist(wishlist.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to remove from wishlist', error);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FiHeart className="text-red-500" />
        My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <FiHeart className="mx-auto text-6xl text-gray-300 mb-4" />
          <p className="text-gray-500 mb-4">Your wishlist is empty</p>
          <Link to="/" className="text-cyan-600 hover:underline">
            Start exploring
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.image || '/placeholder.jpg'}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <span className="text-xs bg-cyan-100 text-cyan-700 px-2 py-1 rounded">
                    {item.type}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-2 flex items-center gap-1">
                  <FiMapPin /> {item.location}
                </p>
                {item.date && (
                  <p className="text-gray-500 text-sm mb-2 flex items-center gap-1">
                    <FiCalendar /> {item.date}
                  </p>
                )}
                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-lg">
                    Rs {item.price}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
                <Link
                  to={`/${item.type === 'Flight' ? 'flights' : item.type === 'Hotel' ? 'hotels' : 'packages'}/${item.itemId}`}
                  className="block mt-3 text-center bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
