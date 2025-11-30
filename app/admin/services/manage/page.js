'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useServices, useCreateService, useUpdateService, useDeleteService } from '@/app/lib/hooks';
import DataTable from '@/app/Components/Common/DataTable';
import Modal from '@/app/Components/Common/Modal';
import { Input, Textarea, Button } from '@/app/Components/Common/FormInput';

const ServicesManagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '',
    features: '',
  });

  const { data: servicesData, loading, refetch } = useServices();
  const services = servicesData?.data || [];

  const { mutate: createService, loading: creating } = useCreateService({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: updateService, loading: updating } = useUpdateService({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: deleteService } = useDeleteService({
    onSuccess: () => {
      refetch();
    },
  });

  const handleOpenModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name || '',
        description: service.description || '',
        icon: service.icon || '',
        features: service.features || '',
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        description: '',
        icon: '',
        features: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
    setFormData({
      name: '',
      description: '',
      icon: '',
      features: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingService) {
        await updateService(editingService.id, formData);
      } else {
        await createService(formData);
      }
    } catch (error) {
      console.error('Error saving service:', error);
    }
  };

  const handleDelete = async (service) => {
    if (window.confirm(`Are you sure you want to delete "${service.name}"?`)) {
      try {
        await deleteService(service.id);
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    {
      header: 'Description',
      render: (row) => (
        <div className="max-w-xs truncate">{row.description}</div>
      ),
    },
    { header: 'Icon', field: 'icon' },
    {
      header: 'Created At',
      render: (row) => new Date(row.created_at).toLocaleDateString(),
    },
  ];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Icon className="text-main" icon="mdi:cog" width="24" height="24" />
          <h3 className="text-white text-[1.2rem] font-bold">Manage Services</h3>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Icon icon="mdi:plus" width="20" height="20" className="inline mr-2" />
          Add New Service
        </Button>
      </div>

      <div className="bg-background2 rounded-lg p-5">
        <DataTable
          data={services}
          columns={columns}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingService ? 'Edit Service' : 'Add New Service'}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Service Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter service name"
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter service description"
            rows={5}
          />

          <Input
            label="Icon"
            name="icon"
            value={formData.icon}
            onChange={handleInputChange}
            placeholder="Icon name or class"
          />

          <Textarea
            label="Features (JSON or text)"
            name="features"
            value={formData.features}
            onChange={handleInputChange}
            placeholder="Enter features"
            rows={4}
          />

          <div className="flex items-center gap-3 mt-6">
            <Button type="submit" variant="primary" loading={creating || updating}>
              {editingService ? 'Update Service' : 'Create Service'}
            </Button>
            <Button type="button" variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServicesManagePage;
