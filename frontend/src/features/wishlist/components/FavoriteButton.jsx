import { useState } from "react";
import { addToWishlist, removeFromWishlist } from "../services/wishlistApi";

const FavoriteButton = ({ serviceId, serviceType }) => {
  const [fav, setFav] = useState(false);

  const toggleFavorite = async () => {
    if (!fav) {
      await addToWishlist({ service_id: serviceId, service_type: serviceType });
      setFav(true);
    } else {
      await removeFromWishlist(serviceId);
      setFav(false);
    }
  };

  return (
    <button onClick={toggleFavorite}>
      {fav ? "❤️" : "🤍"}
    </button>
  );
};

export default FavoriteButton;