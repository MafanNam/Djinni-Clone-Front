import axios from "axios";

const BASE_URL = "http://localhost:8000";
const axiosInstance = axios.create({baseURL: BASE_URL})

export const getCategories = async () => {
  return (await axiosInstance.get('/api/v1/categories')).data;
};

export const getCompanies = async () => {
  return (await axiosInstance.get('/api/v1/companies')).data
};

export const getCompany = async (id: number) => {
  return (await axiosInstance.get(`/api/v1/companies/${id}`)).data;
};