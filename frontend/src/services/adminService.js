import axiosInstance from './axiosInstance'

// ─── DASHBOARD ENDPOINTS ─────────────────────────────────

export const getDashboardStats = () =>
  axiosInstance.get('/dashboard/admin')

// ─── AGENT ENDPOINTS ─────────────────────────────────────

export const getPendingAgents = () =>
  axiosInstance.get('/admin/agents/pending')

export const approveAgent = (id) =>
  axiosInstance.post('/admin/agents/' + id + '/approve')

export const rejectAgent = (id) =>
  axiosInstance.post('/admin/agents/' + id + '/reject')

export const getAllAgents = () =>
  axiosInstance.get('/admin/agents/dto')

export const getAgentById = (id) =>
  axiosInstance.get('/admin/agents/' + id)

export const deleteAgent = (id) =>
  axiosInstance.delete('/admin/agents/' + id)

// ─── USER MANAGEMENT ENDPOINTS ──────────────────────────────

export const getAllUsers = () =>
  axiosInstance.get('/admin/users/dto')

export const getUserById = (id) =>
  axiosInstance.get('/admin/users/' + id)

export const deleteUser = (id) =>
  axiosInstance.delete('/admin/users/' + id)

// ─── DESTINATION ENDPOINTS ────────────────────────────────

export const getDestinations = () =>
  axiosInstance.get('/admin/destinations')

export const createDestination = (data) =>
  axiosInstance.post('/admin/destinations', data)

export const updateDestination = (id, data) =>
  axiosInstance.put('/admin/destinations/' + id, data)

export const deleteDestination = (id) =>
  axiosInstance.delete('/admin/destinations/' + id)
