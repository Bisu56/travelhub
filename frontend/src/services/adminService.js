import axiosInstance from './axiosInstance'

// ─── AGENT ENDPOINTS ─────────────────────────────────────

/** Fetch all agents with PENDING status */
export const getPendingAgents = () =>
  axiosInstance.get('/admin/agents/pending')

/** Approve an agent by ID */
export const approveAgent = (id) =>
  axiosInstance.put(`/admin/agents/${id}/approve`)

/** Reject an agent by ID */
export const rejectAgent = (id) =>
  axiosInstance.put(`/admin/agents/${id}/reject`)

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
  axiosInstance.delete(`/admin/destinations/${id}`)

// ─── ANALYTICS ENDPOINTS ─────────────────────────────────

/** Get dashboard statistics */
export const getDashboardStats = () =>
  axiosInstance.get('/admin/analytics/stats')

/** Get revenue data */
export const getRevenueData = (from, to) =>
  axiosInstance.get('/admin/analytics/revenue', { params: { from, to } })

/** Get booking trends */
export const getBookingTrends = (from, to) =>
  axiosInstance.get('/admin/analytics/bookings', { params: { from, to } })

/** Get user growth data */
export const getUserGrowth = (from, to) =>
  axiosInstance.get('/admin/analytics/users', { params: { from, to } })

/** Get popular destinations */
export const getPopularDestinations = () =>
  axiosInstance.get('/admin/analytics/destinations')

/** Get top agents */
export const getTopAgents = () =>
  axiosInstance.get('/admin/analytics/top-agents')

/** Export analytics data */
export const exportAnalytics = () =>
  axiosInstance.get('/admin/analytics/export', { responseType: 'blob' })

// ─── AGENT MANAGEMENT ENDPOINTS ────────────────────────────

/** Fetch all agents (all statuses) */
export const getAllAgents = (params) =>
  axiosInstance.get('/admin/agents', { params })

/** Get agent by ID */
export const getAgentById = (id) =>
  axiosInstance.get(`/admin/agents/${id}`)

/** Suspend an agent by ID */
export const suspendAgent = (id) =>
  axiosInstance.put(`/admin/agents/${id}/suspend`)

/** Reactivate a suspended agent */
export const reactivateAgent = (id) =>
  axiosInstance.put(`/admin/agents/${id}/reactivate`)

/** Delete an agent */
export const deleteAgent = (id) =>
  axiosInstance.delete(`/admin/agents/${id}`)

// ─── USER MANAGEMENT ENDPOINTS ──────────────────────────────

/** Fetch all users */
export const getAllUsers = (params) =>
  axiosInstance.get('/admin/users', { params })

/** Get user by ID */
export const getUserById = (id) =>
  axiosInstance.get(`/admin/users/${id}`)

/** Suspend a user by ID */
export const suspendUser = (id) =>
  axiosInstance.put(`/admin/users/${id}/suspend`)

/** Reactivate a suspended user */
export const reactivateUser = (id) =>
  axiosInstance.put(`/admin/users/${id}/reactivate`)

/** Delete a user */
export const deleteUser = (id) =>
  axiosInstance.delete(`/admin/users/${id}`)