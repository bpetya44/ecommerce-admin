import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getEnquiries = async () => {
  const response = await axios.get(`${base_url}enquiry/`);
  //console.log(response.data);

  return response.data;
};

const getEnquiryById = async (id) => {
  const response = await axios.get(`${base_url}enquiry/${id}`, config);
  return response.data;
};

const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${base_url}enquiry/${id}`, config);
  return response.data;
};

const updateEnquiry = async (enquiry) => {
  const response = await axios.put(
    `${base_url}enquiry/${enquiry.id}`,
    { status: enquiry.data },
    config
  );
  return response.data;
};

const enquiryService = {
  getEnquiries,
  deleteEnquiry,
  getEnquiryById,
  updateEnquiry,
};

export default enquiryService;
