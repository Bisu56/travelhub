import axiosInstance from '../../../services/axiosInstance';

export const getAgentEarnings = () =>
  axiosInstance.get('/agent/earnings');

export const createPayoutRequest = (data) =>
  axiosInstance.post('/agent/payout-request', data);

export const getPendingPayouts = () =>
  axiosInstance.get('/admin/payout-requests/pending');

export const approvePayout = (id) =>
  axiosInstance.put(`/admin/payout-requests/${id}/approve`);

export const rejectPayout = (id) =>
  axiosInstance.put(`/admin/payout-requests/${id}/reject`);

export const calculateCommission = () =>
  axiosInstance.post('/admin/commissions/calculate');

export const getAgentSummary = () =>
  axiosInstance.get('/agent/earnings/summary');

export const getPayoutHistory = () =>
  axiosInstance.get('/agent/payouts');

export const updateCommissionRate = (rate) =>
  axiosInstance.put('/admin/settings/commission-rate', { rate });

export const exportEarnings = () =>
  axiosInstance.get('/agent/earnings/export', { responseType: 'blob' });
