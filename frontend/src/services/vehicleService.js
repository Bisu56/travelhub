import axios from "axios";

const API = "http://localhost:8080/api";

export const searchVehicles = (params) => {
  return axios.get(`${API}/public/vehicles/search`, { params });
};

export const getVehicleDetails = (id) => {
  return axios.get(`${API}/public/vehicles/${id}`);
};

export const bookVehicle = (data) => {
  return axios.post(`${API}/bookings/vehicles`, data);
};
