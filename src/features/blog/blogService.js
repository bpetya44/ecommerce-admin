import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/`);
  //console.log(response.data);
  return response.data;
};

//create a new blog
const createBlog = async (blog) => {
  const response = await axios.post(`${base_url}blog/`, blog, config);
  return response.data;
};

const getBlogById = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`, config);
  return response.data;
};

const updateBlog = async (blog) => {
  const response = await axios.put(
    `${base_url}blog/${blog.id}`,
    {
      title: blog.data.title,
      description: blog.data.description,
      category: blog.data.category,
      images: blog.data.images,
    },
    config
  );
  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/${id}`, config);
  return response.data;
};

const blogService = {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};

export default blogService;
