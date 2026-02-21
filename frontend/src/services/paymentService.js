import axios from "axios";

const API = "http://localhost:8080/api";

export const createStripeIntent = (data) => {
  return axios.post(`${API}/payments/stripe/create-intent`, data);
};

export const initiateKhalti = (data) => {
  return axios.post(`${API}/payments/khalti/initiate`, data);
};

export const verifyKhalti = (data) => {
  return axios.post(`${API}/payments/khalti/verify`, data);
};