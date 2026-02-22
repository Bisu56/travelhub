import axios from "axios";

const API = "http://localhost:8080/api";

export const getAgentEarnings = () =>
  axios.get(`${API}/agent/earnings`);

export const createPayoutRequest = (data) =>
  axios.post(`${API}/agent/payout-request`, data);

export const getPendingPayouts = () =>
  axios.get(`${API}/admin/payout-requests/pending`);

export const approvePayout = (id) =>
  axios.put(`${API}/admin/payout-requests/${id}/approve`);

export const calculateCommission = () =>
  axios.post(`${API}/admin/commissions/calculate`);