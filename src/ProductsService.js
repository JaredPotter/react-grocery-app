import axios from "axios";

// URL for our node express running locally
const BASE_URL = "http://localhost:3005";
// const BASE_URL = "https://grocery-api-jared.herokuapp.com";

const getProducts = () => {
  return axios.get(`${BASE_URL}/api/products`);
};

const getProduct = (productId) => {
  return axios.get(`${BASE_URL}/api/products/${productId}`);
};

const createProduct = (product, password) => {
  return axios.post(`${BASE_URL}/api/products`, product, {
    headers: {
      token: password,
    },
  });
};

const updateProduct = (productId, product, password) => {
  return axios.put(`${BASE_URL}/api/products/${productId}`, product, {
    headers: {
      token: password,
    },
  });
};

const deleteProduct = (productId, password) => {
  return axios.delete(`${BASE_URL}/api/products/${productId}`, {
    headers: {
      token: password,
    },
  });
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
