import axios from "axios";

const API = "http://localhost:8080/api/wishlist";

export const addToWishlist = (data) =>
  axios.post(API, data);

export const removeFromWishlist = (id) =>
  axios.delete(`${API}/${id}`);

export const getWishlist = () =>
  axios.get(API);