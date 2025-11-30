'use client';

import { useApi, useApiMutation } from './useApi';
import {
  attributesService,
  benefitsService,
  booksService,
  faqsService,
  futuresService,
  servicesService,
  stepsService,
  usersService,
} from '../services';
import { projectsService } from '../services/projects';

// Attributes Hooks
export const useAttributes = (options = {}) => {
  return useApi(() => attributesService.getAll(), [], options);
};

export const useAttribute = (id, options = {}) => {
  return useApi(() => attributesService.getById(id), [id], options);
};

export const useCreateAttribute = (options = {}) => {
  return useApiMutation(attributesService.create, {
    successMessage: 'Attribute created successfully',
    ...options,
  });
};

export const useUpdateAttribute = (options = {}) => {
  return useApiMutation(attributesService.update, {
    successMessage: 'Attribute updated successfully',
    ...options,
  });
};

export const useDeleteAttribute = (options = {}) => {
  return useApiMutation(attributesService.delete, {
    successMessage: 'Attribute deleted successfully',
    ...options,
  });
};

// Benefits Hooks
export const useBenefits = (options = {}) => {
  return useApi(() => benefitsService.getAll(), [], options);
};

export const useBenefit = (id, options = {}) => {
  return useApi(() => benefitsService.getById(id), [id], options);
};

export const useCreateBenefit = (options = {}) => {
  return useApiMutation(benefitsService.create, {
    successMessage: 'Benefit created successfully',
    ...options,
  });
};

export const useUpdateBenefit = (options = {}) => {
  return useApiMutation(benefitsService.update, {
    successMessage: 'Benefit updated successfully',
    ...options,
  });
};

export const useDeleteBenefit = (options = {}) => {
  return useApiMutation(benefitsService.delete, {
    successMessage: 'Benefit deleted successfully',
    ...options,
  });
};

// Books Hooks
export const useBooks = (options = {}) => {
  return useApi(() => booksService.getAll(), [], options);
};

export const useBook = (id, options = {}) => {
  return useApi(() => booksService.getById(id), [id], options);
};

export const useCreateBook = (options = {}) => {
  return useApiMutation(booksService.create, {
    successMessage: 'Book created successfully',
    ...options,
  });
};

export const useUpdateBook = (options = {}) => {
  return useApiMutation(booksService.update, {
    successMessage: 'Book updated successfully',
    ...options,
  });
};

export const useDeleteBook = (options = {}) => {
  return useApiMutation(booksService.delete, {
    successMessage: 'Book deleted successfully',
    ...options,
  });
};

// FAQs Hooks
export const useFaqs = (options = {}) => {
  return useApi(() => faqsService.getAll(), [], options);
};

export const useFaq = (id, options = {}) => {
  return useApi(() => faqsService.getById(id), [id], options);
};

export const useCreateFaq = (options = {}) => {
  return useApiMutation(faqsService.create, {
    successMessage: 'FAQ created successfully',
    ...options,
  });
};

export const useUpdateFaq = (options = {}) => {
  return useApiMutation(faqsService.update, {
    successMessage: 'FAQ updated successfully',
    ...options,
  });
};

export const useDeleteFaq = (options = {}) => {
  return useApiMutation(faqsService.delete, {
    successMessage: 'FAQ deleted successfully',
    ...options,
  });
};

// Futures Hooks
export const useFutures = (options = {}) => {
  return useApi(() => futuresService.getAll(), [], options);
};

export const useFuture = (id, options = {}) => {
  return useApi(() => futuresService.getById(id), [id], options);
};

export const useCreateFuture = (options = {}) => {
  return useApiMutation(futuresService.create, {
    successMessage: 'Future created successfully',
    ...options,
  });
};

export const useUpdateFuture = (options = {}) => {
  return useApiMutation(futuresService.update, {
    successMessage: 'Future updated successfully',
    ...options,
  });
};

export const useDeleteFuture = (options = {}) => {
  return useApiMutation(futuresService.delete, {
    successMessage: 'Future deleted successfully',
    ...options,
  });
};

// Projects Hooks
export const useProjects = (options = {}) => {
  return useApi(() => projectsService.getAll(), [], options);
};

export const useProject = (id, options = {}) => {
  return useApi(() => projectsService.getById(id), [id], options);
};

export const useCreateProject = (options = {}) => {
  return useApiMutation(projectsService.create, {
    successMessage: 'Project created successfully',
    ...options,
  });
};

export const useUpdateProject = (options = {}) => {
  return useApiMutation(projectsService.update, {
    successMessage: 'Project updated successfully',
    ...options,
  });
};

export const useDeleteProject = (options = {}) => {
  return useApiMutation(projectsService.delete, {
    successMessage: 'Project deleted successfully',
    ...options,
  });
};

// Services Hooks
export const useServices = (options = {}) => {
  return useApi(() => servicesService.getAll(), [], options);
};

export const useService = (id, options = {}) => {
  return useApi(() => servicesService.getById(id), [id], options);
};

export const useCreateService = (options = {}) => {
  return useApiMutation(servicesService.create, {
    successMessage: 'Service created successfully',
    ...options,
  });
};

export const useUpdateService = (options = {}) => {
  return useApiMutation(servicesService.update, {
    successMessage: 'Service updated successfully',
    ...options,
  });
};

export const useDeleteService = (options = {}) => {
  return useApiMutation(servicesService.delete, {
    successMessage: 'Service deleted successfully',
    ...options,
  });
};

// Steps Hooks
export const useSteps = (options = {}) => {
  return useApi(() => stepsService.getAll(), [], options);
};

export const useStep = (id, options = {}) => {
  return useApi(() => stepsService.getById(id), [id], options);
};

export const useCreateStep = (options = {}) => {
  return useApiMutation(stepsService.create, {
    successMessage: 'Step created successfully',
    ...options,
  });
};

export const useUpdateStep = (options = {}) => {
  return useApiMutation(stepsService.update, {
    successMessage: 'Step updated successfully',
    ...options,
  });
};

export const useDeleteStep = (options = {}) => {
  return useApiMutation(stepsService.delete, {
    successMessage: 'Step deleted successfully',
    ...options,
  });
};

// Users Hooks
export const useUsers = (options = {}) => {
  return useApi(() => usersService.getAll(), [], options);
};

export const useUser = (id, options = {}) => {
  return useApi(() => usersService.getById(id), [id], options);
};

export const useCreateUser = (options = {}) => {
  return useApiMutation(usersService.create, {
    successMessage: 'User created successfully',
    ...options,
  });
};

export const useUpdateUser = (options = {}) => {
  return useApiMutation(usersService.update, {
    successMessage: 'User updated successfully',
    ...options,
  });
};

export const useDeleteUser = (options = {}) => {
  return useApiMutation(usersService.delete, {
    successMessage: 'User deleted successfully',
    ...options,
  });
};
