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
    Authorization: `Bearer ${getTokenFromLocalStorage.token}`,
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

// //get User orders
// const getUserOrders = async () => {
//   const response = await axios.get(`${base_url}user/get-orders`, config);
//   //console.log(response.data);

//   return response.data;
// };

//get All orders
const getAllOrders = async () => {
  const response = await axios.get(`${base_url}user/get-all-orders`, config);
  //console.log(response.data);

  return response.data;
};

const authService = {
  login,
  //getUserOrders,
  getAllOrders,
};

export default authService;
