import axios from "axios";

const API = "http://localhost:8080/api";

export const searchFlights = (params) => {
  return axios.get(`${API}/public/flights/search`, { params });
};

export const bookFlight = (data) => {
  return axios.post(`${API}/bookings/flights`, data);
};