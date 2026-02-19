import axiosInstance from './axiosInstance'

export const createPackage = (data) =>
  axiosInstance.post('/agent/packages', data)

export const getMyPackages = () =>
  axiosInstance.get('/agent/packages')

export const getPackageById = (id) =>
  axiosInstance.get(`/agent/packages/${id}`)

export const updatePackage = (id, data) =>
  axiosInstance.put(`/agent/packages/${id}`, data)

export const deletePackage = (id) =>
  axiosInstance.delete(`/agent/packages/${id}`)
