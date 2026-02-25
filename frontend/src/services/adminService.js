import axiosInstance from './axiosInstance'

// ─── DASHBOARD ENDPOINTS ─────────────────────────────────

/** Get admin dashboard data */
export const getDashboardStats = () =>
  axiosInstance.get('/dashboard/admin')

// ─── AGENT ENDPOINTS ─────────────────────────────────────

/** Fetch all agents with PENDING status */
export const getPendingAgents = () =>
  axiosInstance.get('/admin/agents/pending')

/** Approve an agent by ID */
export const approveAgent = (id) =>
  axiosInstance.post(`/admin/agents/${id}/approve`)

/** Reject an agent by ID */
export const rejectAgent = (id) =>
  axiosInstance.post(`/admin/agents/${id}/reject`)

/** Fetch all agents (all statuses) */
export const getAllAgents = () =>
  axiosInstance.get('/admin/agents/dto')

/** Get agent by ID */
export const getAgentById = (id) =>
  axiosInstance.get(`/admin/agents/${id}`)

/** Delete an agent */
export const deleteAgent = (id) =>
  axiosInstance.delete(`/admin/agents/${id}`)

// ─── USER MANAGEMENT ENDPOINTS ──────────────────────────────

/** Fetch all users */
export const getAllUsers = () =>
  axiosInstance.get('/admin/users/dto')

/** Get user by ID */
export const getUserById = (id) =>
  axiosInstance.get(`/admin/users/${id}`)

/** Delete a user */
export const deleteUser = (id) =>
  axiosInstance.delete(`/admin/users/${id}`)

// ─── DESTINATION ENDPOINTS ────────────────────────────────

/** Get all destinations */
export const getDestinations = () =>
  axiosInstance.get('/admin/destinations')

/** Create a new destination */
export const createDestination = (data) =>
  axiosInstance.post('/admin/destinations', data)

/** Update existing destination by ID */
export const updateDestination = (id, data) =>
  axiosInstance.put(`/admin/destinations/${id}`, data)

/** Delete destination by ID */
export const deleteDestination = (id) =>
  axiosInstance.delete(`/admin/destinations/${id}')
