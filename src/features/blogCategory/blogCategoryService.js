import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogcategory/`);
  //console.log(response.data);
  return response.data;
};
const createBlogCategory = async (data) => {
  const response = await axios.post(`${base_url}blogcategory/`, data, config);
  //console.log(response.data);
  return response.data;
};

const blogCategoryService = {
  getBlogCategories,
  createBlogCategory,
};

export default blogCategoryService;
