import axiosInstance from "./axiosInstance";

export const getDestinations = () =>
  axiosInstance.get("/public/destinations");

export const getPackages = (params) =>
  axiosInstance.get("/public/packages", { params });

export const getPackageById = (id) =>
  axiosInstance.get(`/public/packages/${id}`);