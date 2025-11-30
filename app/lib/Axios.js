import axios from "axios";

const Axios = axios.create({
  baseURL: "https://sunwebsolution.com/api",
  timeout: 10000,
  withCredentials: true, // Important for Sanctum cookie-based auth
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Request interceptor to add XSRF token
Axios.interceptors.request.use(
  (config) => {
    // Get XSRF token from cookie
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    if (token) {
      config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);

    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (status === 401) {
        // Unauthorized - redirect to login or handle auth
        console.error("Unauthorized access");
      } else if (status === 422) {
        // Validation error
        console.error("Validation error:", data);
      } else if (status === 500) {
        console.error("Server error:", data?.error || "Unknown error");
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
