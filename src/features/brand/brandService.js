import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/`);
  //console.log(response.data);
  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(`${base_url}brand/`, brand, config);
  //console.log(response.data);
  return response.data;
};

const getBrandById = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`, config);
  return response.data;
};

const updateBrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.data.title },
    config
  );
  return response.data;
};

const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}brand/${id}`, config);
  return response.data;
};

const brandService = {
  getBrands,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
};

export default brandService;
