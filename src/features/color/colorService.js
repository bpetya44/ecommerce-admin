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

const colorService = {
  getColors: getColors,
  createColor: createColor,
};

export default colorService;
