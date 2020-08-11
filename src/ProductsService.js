import axios from "axios";

// URL for our node express running locally
const BASE_URL = "http://localhost:3005";

const getProducts = () => {
  return axios.get(`${BASE_URL}/api/products`);
};

export { getProducts };
