import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon/`, config);
  //console.log(response.data);
  return response.data;
};

const createCoupon = async (coupon) => {
  const response = await axios.post(`${base_url}coupon/`, coupon, config);
  //console.log(response.data);
  return response.data;
};

const getCouponById = async (id) => {
  const response = await axios.get(`${base_url}coupon/${id}`, config);
  return response.data;
};

const updateCoupon = async (coupon) => {
  const response = await axios.put(
    `${base_url}coupon/${coupon.id}`,
    {
      name: coupon.data.name,
      expiry: coupon.data.expiry,
      discount: coupon.data.discount,
    },
    config
  );
  return response.data;
};

const deleteCoupon = async (id) => {
  const response = await axios.delete(`${base_url}coupon/${id}`, config);
  return response.data;
};

const couponService = {
  getCoupons,
  createCoupon,
  getCouponById,
  updateCoupon,
  deleteCoupon,
};

export default couponService;
