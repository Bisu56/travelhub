import axiosInstance from '../../../services/axiosInstance';

const API = '/notifications';

export const getUserNotifications = (userId) =>
  axiosInstance.get(`${API}/user/${userId}`);

export const getAllNotifications = () =>
  axiosInstance.get(API);

export const markAsRead = (id) =>
  axiosInstance.put(`${API}/${id}/read`);

export const markAllAsRead = () =>
  axiosInstance.put(`${API}/read-all`);

export const createNotification = (data) =>
  axiosInstance.post(API, data);

export const deleteNotification = (id) =>
  axiosInstance.delete(`${API}/${id}`);

export const getNotificationSettings = () =>
  axiosInstance.get(`${API}/settings`);

export const updateNotificationSettings = (data) =>
  axiosInstance.put(`${API}/settings`, data);

export const getEmailTemplates = () =>
  axiosInstance.get(`${API}/email-templates`);

export const getEmailTemplateById = (id) =>
  axiosInstance.get(`${API}/email-templates/${id}`);
