import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);
  //console.log(response.data);
  return response.data;
};

const createColor = async (color) => {
  const response = await axios.post(`${base_url}color/`, color, config);
  //console.log(response.data);
  return response.data;
};

const getColorById = async (id) => {
  const response = await axios.get(`${base_url}color/${id}`, config);
  return response.data;
};

const updateColor = async (color) => {
  const response = await axios.put(
    `${base_url}color/${color.id}`,
    { title: color.data.title },
    config
  );
  return response.data;
};

const deleteColor = async (id) => {
  const response = await axios.delete(`${base_url}color/${id}`, config);
  return response.data;
};

const colorService = {
  getColors,
  createColor,
  getColorById,
  updateColor,
  deleteColor,
};

export default colorService;
