import axios from "axios";

const API = "http://localhost:8080/api";

export const searchCars = (params) => {
  return axios.get(`${API}/public/cars/search`, { params });
};

export const getCarDetails = (id) => {
  return axios.get(`${API}/public/cars/${id}`);
};

export const bookCar = (data) => {
  return axios.post(`${API}/bookings/cars`, data);
};