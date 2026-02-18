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