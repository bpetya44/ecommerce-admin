import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}upload/`, data, config);
  //console.log(response.data);
  return response.data;
};

const uploadService = {
  uploadImg,
};

export default uploadService;
