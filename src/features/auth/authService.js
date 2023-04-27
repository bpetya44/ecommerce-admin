import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getTokenFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
//console.log(getTokenFromLocalStorage.token);

//axios config
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};

const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin`, user);
  //console.log(response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//get  order by id
const getOrder = async (id) => {
  const response = await axios.get(`${base_url}user/get-order/${id}`, config);
  //console.log(response.data);

  return response.data;
};

//update order status by id
const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/update-order/${data.id}`,
    { status: data.status },
    config
  );
  //console.log(response.data);

  return response.data;
};

//get All orders
const getAllOrders = async () => {
  const response = await axios.get(`${base_url}user/get-all-orders`, config);
  //console.log(response.data);

  return response.data;
};

//get monthly orders
const getMonthlyOrders = async () => {
  const response = await axios.get(`${base_url}user/get-month-income`, config);

  return response.data;
};

//get yearly orders
const getYearlyOrders = async () => {
  const response = await axios.get(`${base_url}user/get-year-orders`, config);

  return response.data;
};

const authService = {
  login,
  getOrder,
  getAllOrders,
  getMonthlyOrders,
  getYearlyOrders,
  updateOrder,
};

export default authService;
