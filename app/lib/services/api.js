import Axios from "../Axios";

/**
 * Generic API service factory
 * Creates CRUD operations for any resource endpoint
 */
export const createApiService = (resource) => {
  return {
    // Get all items
    getAll: async (params = {}) => {
      try {
        const response = await Axios.get(`/${resource}`, { params });
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    // Get single item by ID
    getById: async (id) => {
      try {
        const response = await Axios.get(`/${resource}/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    // Create new item
    create: async (data, config = {}) => {
      try {
        const response = await Axios.post(`/${resource}`, data, config);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    // Update existing item
    update: async (id, data, config = {}) => {
      try {
        const response = await Axios.put(`/${resource}/${id}`, data, config);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    // Delete item
    delete: async (id) => {
      try {
        const response = await Axios.delete(`/${resource}/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  };
};

// Create services for all resources
export const attributesService = createApiService('attributes');
export const benefitsService = createApiService('benefits');
export const booksService = createApiService('books');
export const faqsService = createApiService('faqs');
export const futuresService = createApiService('futures');
export const projectsService = createApiService('projects');
export const servicesService = createApiService('services');
export const stepsService = createApiService('steps');
export const usersService = createApiService('users');
