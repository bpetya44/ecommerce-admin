import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  //console.log(response.data);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);
  //console.log(response.data);
  return response.data;
};

const getProductById = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);
  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${base_url}product/${product.id}`,
    {
      title: product.data.title,
      price: product.data.price,
      quantity: product.data.quantity,
      description: product.data.description,
      category: product.data.category,
      brand: product.data.brand,
      color: product.data.color,
      images: product.data.image,
    },
    config
  );
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);
  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};

export default productService;
