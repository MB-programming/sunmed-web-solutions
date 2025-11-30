'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useBenefits, useCreateBenefit, useUpdateBenefit, useDeleteBenefit } from '@/app/lib/hooks';
import DataTable from '@/app/Components/Common/DataTable';
import Modal from '@/app/Components/Common/Modal';
import { Input, Textarea, Button } from '@/app/Components/Common/FormInput';

const BenefitsManagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBenefit, setEditingBenefit] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
  });

  const { data: benefitsData, loading, refetch } = useBenefits();
  const benefits = benefitsData?.data || [];

  const { mutate: createBenefit, loading: creating } = useCreateBenefit({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: updateBenefit, loading: updating } = useUpdateBenefit({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: deleteBenefit } = useDeleteBenefit({
    onSuccess: () => {
      refetch();
    },
  });

  const handleOpenModal = (benefit = null) => {
    if (benefit) {
      setEditingBenefit(benefit);
      setFormData({
        title: benefit.title || '',
        description: benefit.description || '',
        icon: benefit.icon || '',
      });
    } else {
      setEditingBenefit(null);
      setFormData({
        title: '',
        description: '',
        icon: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBenefit(null);
    setFormData({
      title: '',
      description: '',
      icon: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingBenefit) {
        await updateBenefit(editingBenefit.id, formData);
      } else {
        await createBenefit(formData);
      }
    } catch (error) {
      console.error('Error saving benefit:', error);
    }
  };

  const handleDelete = async (benefit) => {
    if (window.confirm(`Are you sure you want to delete "${benefit.title}"?`)) {
      try {
        await deleteBenefit(benefit.id);
      } catch (error) {
        console.error('Error deleting benefit:', error);
      }
    }
  };

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Title', field: 'title' },
    {
      header: 'Description',
      render: (row) => (
        <div className="max-w-md truncate">{row.description}</div>
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
          <Icon className="text-main" icon="mdi:star" width="24" height="24" />
          <h3 className="text-white text-[1.2rem] font-bold">Manage Benefits</h3>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Icon icon="mdi:plus" width="20" height="20" className="inline mr-2" />
          Add New Benefit
        </Button>
      </div>

      <div className="bg-background2 rounded-lg p-5">
        <DataTable
          data={benefits}
          columns={columns}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingBenefit ? 'Edit Benefit' : 'Add New Benefit'}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Benefit Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Enter benefit title"
            required
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter benefit description"
            rows={5}
          />

          <Input
            label="Icon"
            name="icon"
            value={formData.icon}
            onChange={handleInputChange}
            placeholder="Icon name or class"
          />

          <div className="flex items-center gap-3 mt-6">
            <Button type="submit" variant="primary" loading={creating || updating}>
              {editingBenefit ? 'Update Benefit' : 'Create Benefit'}
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

export default BenefitsManagePage;
