import axiosInstance from '../../../services/axiosInstance';

const API = '/admin/stats';

export const getOverviewStats = (from, to) =>
  axiosInstance.get(`${API}/overview`, { params: { from, to } });

export const getRevenueStats = (period) =>
  axiosInstance.get(`${API}/revenue`, { params: { period } });

export const getPopularDestinations = () =>
  axiosInstance.get(`${API}/popular-destinations`);

export const getTopAgents = () =>
  axiosInstance.get(`${API}/top-agents`);

export const getUserGrowth = () =>
  axiosInstance.get(`${API}/user-growth`);

export const getBookingTrends = () =>
  axiosInstance.get(`${API}/booking-trends`);

export const exportStats = () =>
  axiosInstance.get(`${API}/export`, { responseType: 'blob' });
