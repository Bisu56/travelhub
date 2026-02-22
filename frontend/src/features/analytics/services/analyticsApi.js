import axios from "axios";

const API = "http://localhost:8080/api/admin/stats";

export const getOverviewStats = (from, to) =>
  axios.get(`${API}/overview?from=${from}&to=${to}`);

export const getRevenueStats = (period) =>
  axios.get(`${API}/revenue?period=${period}`);

export const getPopularDestinations = () =>
  axios.get(`${API}/popular-destinations`);

export const getTopAgents = () =>
  axios.get(`${API}/top-agents`);

export const getUserGrowth = () =>
  axios.get(`${API}/user-growth`);

export const getBookingTrends = () =>
  axios.get(`${API}/booking-trends`);

export const exportStats = () =>
  window.open("http://localhost:8080/api/admin/stats/export");