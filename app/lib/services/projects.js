import Axios from "../Axios";

/**
 * Projects Service with file upload support
 * Uses multipart/form-data for POST/PUT requests
 */
export const projectsService = {
  // Get all projects
  getAll: async (params = {}) => {
    try {
      const response = await Axios.get('/projects', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get single project by ID
  getById: async (id) => {
    try {
      const response = await Axios.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new project with file upload
  create: async (formData) => {
    try {
      const response = await Axios.post('/projects', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update existing project with file upload
  update: async (id, formData) => {
    try {
      const response = await Axios.post(`/projects/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete project
  delete: async (id) => {
    try {
      const response = await Axios.delete(`/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
