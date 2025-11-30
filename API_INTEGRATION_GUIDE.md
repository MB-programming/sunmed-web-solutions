# API Integration Guide

This document explains how to use the API integration in the Sunmed Web Solutions project.

## Table of Contents
- [Overview](#overview)
- [API Configuration](#api-configuration)
- [Available Services](#available-services)
- [Using Hooks](#using-hooks)
- [Admin CRUD Pages](#admin-crud-pages)
- [Examples](#examples)

## Overview

The project uses a comprehensive API integration layer that includes:
- Axios-based HTTP client with Sanctum authentication
- Service layer for all API resources
- Custom React hooks for data fetching and mutations
- Reusable UI components (DataTable, Modal, Forms)
- Complete admin CRUD pages

## API Configuration

### Base Configuration
Location: `app/lib/Axios.js`

```javascript
import Axios from '@/app/lib/Axios';

// The base URL is already configured
// Base URL: https://sunwebsolution.com/api
```

### Authentication
The API uses Laravel Sanctum with cookie-based authentication and XSRF-TOKEN:

```javascript
import { authService } from '@/app/lib/services';

// Login
await authService.login({ email, password });

// Get current user
const user = await authService.getUser();

// Logout
await authService.logout();
```

## Available Services

All services are located in `app/lib/services/`:

### Resource Services
- `attributesService` - Manage attributes
- `benefitsService` - Manage benefits
- `booksService` - Manage bookings
- `faqsService` - Manage FAQs
- `futuresService` - Manage futures
- `projectsService` - Manage projects (with file upload)
- `servicesService` - Manage services
- `stepsService` - Manage steps
- `usersService` - Manage users

### Service Methods
Each service has the following methods:

```javascript
// Get all items
const data = await projectsService.getAll();

// Get single item
const project = await projectsService.getById(id);

// Create new item
const newProject = await projectsService.create(formData);

// Update existing item
const updatedProject = await projectsService.update(id, formData);

// Delete item
await projectsService.delete(id);
```

## Using Hooks

### Data Fetching Hooks

```javascript
import { useProjects, useProject } from '@/app/lib/hooks';

function ProjectsPage() {
  // Fetch all projects
  const { data, loading, error, refetch } = useProjects();
  const projects = data?.data || [];

  // Fetch single project
  const { data: projectData } = useProject(projectId);

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        projects.map(project => (
          <div key={project.id}>{project.title}</div>
        ))
      )}
    </div>
  );
}
```

### Mutation Hooks

```javascript
import { useCreateProject, useUpdateProject, useDeleteProject } from '@/app/lib/hooks';

function ProjectForm() {
  const { mutate: createProject, loading } = useCreateProject({
    onSuccess: (data) => {
      console.log('Project created:', data);
      // Refetch or update UI
    }
  });

  const handleSubmit = async (formData) => {
    try {
      await createProject(formData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Project'}
      </button>
    </form>
  );
}
```

### Available Hooks for Each Resource

#### Projects
- `useProjects()` - Get all projects
- `useProject(id)` - Get single project
- `useCreateProject(options)` - Create project
- `useUpdateProject(options)` - Update project
- `useDeleteProject(options)` - Delete project

#### Services
- `useServices()` - Get all services
- `useService(id)` - Get single service
- `useCreateService(options)` - Create service
- `useUpdateService(options)` - Update service
- `useDeleteService(options)` - Delete service

#### FAQs
- `useFaqs()` - Get all FAQs
- `useFaq(id)` - Get single FAQ
- `useCreateFaq(options)` - Create FAQ
- `useUpdateFaq(options)` - Update FAQ
- `useDeleteFaq(options)` - Delete FAQ

*Similar hooks exist for: Benefits, Books, Attributes, Steps, Futures, Users*

## Admin CRUD Pages

Complete admin management pages are available at:

- `/admin/projects/manage` - Manage projects
- `/admin/services/manage` - Manage services
- `/admin/faqs/manage` - Manage FAQs
- `/admin/benefits/manage` - Manage benefits
- `/admin/attributes/manage` - Manage attributes
- `/admin/books/manage` - Manage bookings
- `/admin/steps/manage` - Manage steps
- `/admin/futures/manage` - Manage futures

Each page includes:
- List view with DataTable component
- Create/Edit modal with form
- Delete functionality with confirmation
- Loading states
- Error handling

## Reusable Components

### DataTable
Location: `app/Components/Common/DataTable.js`

```javascript
import DataTable from '@/app/Components/Common/DataTable';

<DataTable
  data={items}
  columns={[
    { header: 'ID', field: 'id' },
    { header: 'Title', field: 'title' },
    {
      header: 'Custom',
      render: (row) => <span>{row.customField}</span>
    }
  ]}
  loading={loading}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onView={handleView}
/>
```

### Modal
Location: `app/Components/Common/Modal.js`

```javascript
import Modal from '@/app/Components/Common/Modal';

<Modal
  isOpen={isModalOpen}
  onClose={handleClose}
  title="Add New Item"
  size="lg"
>
  {/* Modal content */}
</Modal>
```

### Form Components
Location: `app/Components/Common/FormInput.js`

```javascript
import { Input, Textarea, Select, FileInput, Button } from '@/app/Components/Common/FormInput';

<Input
  label="Title"
  name="title"
  value={formData.title}
  onChange={handleChange}
  required
/>

<Textarea
  label="Description"
  name="description"
  value={formData.description}
  onChange={handleChange}
  rows={5}
/>

<FileInput
  label="Image"
  name="image"
  onChange={handleFileChange}
  accept="image/*"
/>

<Button
  type="submit"
  variant="primary"
  loading={loading}
>
  Submit
</Button>
```

### LoadingSpinner
Location: `app/Components/Common/LoadingSpinner.js`

```javascript
import LoadingSpinner from '@/app/Components/Common/LoadingSpinner';

<LoadingSpinner size="lg" />
```

## Examples

### Complete CRUD Example

```javascript
'use client';

import React, { useState } from 'react';
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject
} from '@/app/lib/hooks';
import DataTable from '@/app/Components/Common/DataTable';
import Modal from '@/app/Components/Common/Modal';
import { Input, Button } from '@/app/Components/Common/FormInput';

function ProjectsManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });

  // Fetch projects
  const { data, loading, refetch } = useProjects();
  const projects = data?.data || [];

  // Mutations
  const { mutate: createProject } = useCreateProject({
    onSuccess: () => {
      refetch();
      setIsModalOpen(false);
    }
  });

  const { mutate: updateProject } = useUpdateProject({
    onSuccess: () => {
      refetch();
      setIsModalOpen(false);
    }
  });

  const { mutate: deleteProject } = useDeleteProject({
    onSuccess: () => refetch()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProject) {
      updateProject(editingProject.id, formData);
    } else {
      createProject(formData);
    }
  };

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Title', field: 'title' },
    { header: 'Description', field: 'description' }
  ];

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>Add Project</Button>

      <DataTable
        data={projects}
        columns={columns}
        loading={loading}
        onEdit={(project) => {
          setEditingProject(project);
          setFormData({ title: project.title, description: project.description });
          setIsModalOpen(true);
        }}
        onDelete={(project) => {
          if (confirm('Delete this project?')) {
            deleteProject(project.id);
          }
        }}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Project">
        <form onSubmit={handleSubmit}>
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Button type="submit">Save</Button>
        </form>
      </Modal>
    </div>
  );
}
```

### File Upload Example (Projects)

```javascript
const handleFileUpload = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('image', imageFile); // File from input
  formData.append('category', category);

  await createProject(formData);
};
```

## Error Handling

All hooks automatically handle errors and display toast notifications. You can customize error handling:

```javascript
const { mutate: createProject } = useCreateProject({
  onError: (error) => {
    // Custom error handling
    if (error.response?.status === 422) {
      console.log('Validation errors:', error.response.data.errors);
    }
  }
});
```

## Testing

To test the API integration:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to admin pages:
   - http://localhost:3000/admin/projects/manage
   - http://localhost:3000/admin/services/manage
   - etc.

3. Test CRUD operations through the UI

## Notes

- All API calls automatically include XSRF-TOKEN for Sanctum authentication
- File uploads use `multipart/form-data` content type
- The API client has a 10-second timeout
- Toast notifications are shown for all mutations (success/error)
- Loading states are managed automatically by hooks

## Support

For issues or questions, please refer to the API documentation at:
https://sunwebsolution.com/docs/api#/
