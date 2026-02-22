import { useEffect, useState } from "react";
import { getWishlist } from "../services/wishlistApi";

const WishlistPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await getWishlist();
      setItems(res.data);
    };
    fetchWishlist();
  }, []);

  return (
    <div>
      <h2>My Wishlist</h2>
      {items.map(item => (
        <div key={item.id}>
          {item.serviceName}
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;