import axios from "axios";

const API = "http://localhost:8080/api/reviews";

export const submitReview = (data) =>
  axios.post(API, data);

export const getServiceReviews = (serviceId) =>
  axios.get(`${API}/service/${serviceId}`);

export const voteHelpful = (reviewId) =>
  axios.post(`${API}/${reviewId}/helpful`);

export const getAllReviews = () =>
  axios.get(API);

export const moderateReview = (reviewId, status) =>
  axios.put(`/api/admin/reviews/${reviewId}/moderate`, { status });
