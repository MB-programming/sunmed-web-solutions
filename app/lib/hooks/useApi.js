'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

/**
 * Custom hook for fetching data from API
 * @param {Function} apiFunction - The API service function to call
 * @param {Array} dependencies - Dependencies to trigger refetch
 * @param {Object} options - Additional options
 */
export const useApi = (apiFunction, dependencies = [], options = {}) => {
  const { immediate = true, onSuccess, onError } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction(...args);
      setData(result);

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (err) {
      setError(err);

      if (onError) {
        onError(err);
      } else {
        toast.error(err?.response?.data?.message || 'An error occurred');
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};

/**
 * Custom hook for API mutations (create, update, delete)
 * @param {Function} apiFunction - The API service function to call
 * @param {Object} options - Additional options
 */
export const useApiMutation = (apiFunction, options = {}) => {
  const { onSuccess, onError, successMessage } = options;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction(...args);

      if (successMessage) {
        toast.success(successMessage);
      }

      if (onSuccess) {
        onSuccess(result);
      }

      return result;
    } catch (err) {
      setError(err);

      if (onError) {
        onError(err);
      } else {
        // Handle validation errors
        if (err?.response?.status === 422) {
          const errors = err.response.data.errors;
          if (errors) {
            Object.values(errors).flat().forEach(error => {
              toast.error(error);
            });
          } else {
            toast.error(err.response.data.message || 'Validation error');
          }
        } else {
          toast.error(err?.response?.data?.message || 'An error occurred');
        }
      }

      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, onSuccess, onError, successMessage]);

  return {
    mutate,
    loading,
    error,
  };
};
