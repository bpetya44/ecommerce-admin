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

const getBlogCategoryById = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`, config);
  return response.data;
};

const updateBlogCategory = async (blog) => {
  const response = await axios.put(
    `${base_url}blogcategory/${blog.id}`,
    { title: blog.data.title },
    config
  );
  return response.data;
};

const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
  return response.data;
};

const blogCategoryService = {
  getBlogCategories,
  createBlogCategory,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
};

export default blogCategoryService;
