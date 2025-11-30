import axios from "axios";

const Axios = axios.create({
  baseURL: "https://sunwebsolution.com/api",
  timeout: 5000,
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default Axios;
