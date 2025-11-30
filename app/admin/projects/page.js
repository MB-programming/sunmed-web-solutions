'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useProjects, useCreateProject, useUpdateProject, useDeleteProject } from '@/app/lib/hooks';
import DataTable from '@/app/Components/Common/DataTable';
import Modal from '@/app/Components/Common/Modal';
import { Input, Textarea, FileInput, Button } from '@/app/Components/Common/FormInput';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    category: '',
    client: '',
    duration: '',
  });

  // Fetch projects
  const { data: projectsData, loading, refetch } = useProjects();
  const projects = projectsData?.data || [];

  // Mutations
  const { mutate: createProject, loading: creating } = useCreateProject({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: updateProject, loading: updating } = useUpdateProject({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: deleteProject } = useDeleteProject({
    onSuccess: () => {
      refetch();
    },
  });

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || '',
        description: project.description || '',
        category: project.category || '',
        client: project.client || '',
        duration: project.duration || '',
        image: null,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        image: null,
        category: '',
        client: '',
        duration: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image: null,
      category: '',
      client: '',
      duration: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== '') {
        data.append(key, formData[key]);
      }
    });

    try {
      if (editingProject) {
        await updateProject(editingProject.id, data);
      } else {
        await createProject(data);
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (project) => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
      try {
        await deleteProject(project.id);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const columns = [
    {
      header: 'ID',
      field: 'id',
    },
    {
      header: 'Title',
      field: 'title',
    },
    {
      header: 'Category',
      field: 'category',
    },
    {
      header: 'Client',
      field: 'client',
    },
    {
      header: 'Duration',
      field: 'duration',
    },
    {
      header: 'Created At',
      field: 'created_at',
      render: (row) => new Date(row.created_at).toLocaleDateString(),
    },
  ];

  return (
    <div className="mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Icon
            className="text-main"
            icon="carbon:ibm-cloud-projects"
            width="24"
            height="24"
          />
          <h3 className="text-white text-[1.2rem] font-bold">Manage Projects</h3>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Icon icon="mdi:plus" width="20" height="20" className="inline mr-2" />
          Add New Project
        </Button>
      </div>

      {/* Table */}
      <div className="bg-background2 rounded-lg p-5">
        <DataTable
          data={projects}
          columns={columns}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter project title"
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter project description"
            rows={5}
          />

          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g., Web Development, Mobile App"
          />

          <Input
            label="Client"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            placeholder="Client name"
          />

          <Input
            label="Duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="e.g., 3 months, 6 weeks"
          />

          <FileInput
            label="Project Image"
            name="image"
            onChange={handleInputChange}
            accept="image/*"
          />

          <div className="flex items-center gap-3 mt-6">
            <Button
              type="submit"
              variant="primary"
              loading={creating || updating}
            >
              {editingProject ? 'Update Project' : 'Create Project'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Page;
