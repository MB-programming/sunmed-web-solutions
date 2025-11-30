'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSteps, useCreateStep, useUpdateStep, useDeleteStep } from '@/app/lib/hooks';
import DataTable from '@/app/Components/Common/DataTable';
import Modal from '@/app/Components/Common/Modal';
import { Input, Textarea, Button } from '@/app/Components/Common/FormInput';

const StepsManagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: '',
    icon: '',
  });

  const { data: stepsData, loading, refetch } = useSteps();
  const steps = stepsData?.data || [];

  const { mutate: createStep, loading: creating } = useCreateStep({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: updateStep, loading: updating } = useUpdateStep({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: deleteStep } = useDeleteStep({
    onSuccess: () => {
      refetch();
    },
  });

  const handleOpenModal = (step = null) => {
    if (step) {
      setEditingStep(step);
      setFormData({
        title: step.title || '',
        description: step.description || '',
        order: step.order || '',
        icon: step.icon || '',
      });
    } else {
      setEditingStep(null);
      setFormData({ title: '', description: '', order: '', icon: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStep(null);
    setFormData({ title: '', description: '', order: '', icon: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStep) {
        await updateStep(editingStep.id, formData);
      } else {
        await createStep(formData);
      }
    } catch (error) {
      console.error('Error saving step:', error);
    }
  };

  const handleDelete = async (step) => {
    if (window.confirm(`Are you sure you want to delete "${step.title}"?`)) {
      try {
        await deleteStep(step.id);
      } catch (error) {
        console.error('Error deleting step:', error);
      }
    }
  };

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Order', field: 'order' },
    { header: 'Title', field: 'title' },
    {
      header: 'Description',
      render: (row) => <div className="max-w-md truncate">{row.description}</div>,
    },
    { header: 'Icon', field: 'icon' },
  ];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Icon className="text-main" icon="mdi:stairs" width="24" height="24" />
          <h3 className="text-white text-[1.2rem] font-bold">Manage Steps</h3>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Icon icon="mdi:plus" width="20" height="20" className="inline mr-2" />
          Add New Step
        </Button>
      </div>

      <div className="bg-background2 rounded-lg p-5">
        <DataTable
          data={steps}
          columns={columns}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingStep ? 'Edit Step' : 'Add New Step'}
      >
        <form onSubmit={handleSubmit}>
          <Input label="Title" name="title" value={formData.title} onChange={handleInputChange} required />
          <Textarea label="Description" name="description" value={formData.description} onChange={handleInputChange} rows={4} />
          <Input label="Order" name="order" type="number" value={formData.order} onChange={handleInputChange} placeholder="1, 2, 3..." />
          <Input label="Icon" name="icon" value={formData.icon} onChange={handleInputChange} placeholder="Icon name or class" />
          <div className="flex items-center gap-3 mt-6">
            <Button type="submit" variant="primary" loading={creating || updating}>
              {editingStep ? 'Update Step' : 'Create Step'}
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

export default StepsManagePage;
