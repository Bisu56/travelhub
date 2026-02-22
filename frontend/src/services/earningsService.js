import axiosInstance from './axiosInstance';

export const getAgentEarnings = () =>
  axiosInstance.get('/agent/earnings');

export const getAgentSummary = () =>
  axiosInstance.get('/agent/earnings/summary');

export const createPayoutRequest = (data) =>
  axiosInstance.post('/agent/payouts', data);

export const getPayoutHistory = () =>
  axiosInstance.get('/agent/payouts');

export const getPendingPayouts = () =>
  axiosInstance.get('/admin/payouts/pending');

export const approvePayout = (id) =>
  axiosInstance.post(`/admin/payouts/${id}/approve`);

export const rejectPayout = (id) =>
  axiosInstance.post(`/admin/payouts/${id}/reject`);

export const calculateCommission = () =>
  axiosInstance.post('/admin/commissions/calculate');

export const getAllCommissions = () =>
  axiosInstance.get('/admin/commissions');

export const updateCommissionRate = (rate) =>
  axiosInstance.put('/admin/settings/commission-rate', { rate });

export const exportEarnings = () =>
  axiosInstance.get('/agent/earnings/export', { responseType: 'blob' });
