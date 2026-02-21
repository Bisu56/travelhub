import axios from "axios";

const API = "http://localhost:8080/api";

export const searchHotels = (params) => {
  return axios.get(`${API}/public/hotels/search`, { params });
};

export const getHotelDetails = (id) => {
  return axios.get(`${API}/public/hotels/${id}`);
};

export const bookHotelRoom = (data) => {
  return axios.post(`${API}/bookings/hotels`, data);
};