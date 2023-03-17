import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}upload/`, data, config);
  //console.log(response.data);
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-image/${id}}`,

    config
  );
  //console.log(response.data);
  return response.id;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
