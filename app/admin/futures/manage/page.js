'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFutures, useCreateFuture, useUpdateFuture, useDeleteFuture } from '@/app/lib/hooks';
import DataTable from '@/app/Components/Common/DataTable';
import Modal from '@/app/Components/Common/Modal';
import { Input, Textarea, Button } from '@/app/Components/Common/FormInput';

const FuturesManagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFuture, setEditingFuture] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    category: '',
  });

  const { data: futuresData, loading, refetch } = useFutures();
  const futures = futuresData?.data || [];

  const { mutate: createFuture, loading: creating } = useCreateFuture({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: updateFuture, loading: updating } = useUpdateFuture({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: deleteFuture } = useDeleteFuture({
    onSuccess: () => {
      refetch();
    },
  });

  const handleOpenModal = (future = null) => {
    if (future) {
      setEditingFuture(future);
      setFormData({
        title: future.title || '',
        description: future.description || '',
        icon: future.icon || '',
        category: future.category || '',
      });
    } else {
      setEditingFuture(null);
      setFormData({ title: '', description: '', icon: '', category: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFuture(null);
    setFormData({ title: '', description: '', icon: '', category: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFuture) {
        await updateFuture(editingFuture.id, formData);
      } else {
        await createFuture(formData);
      }
    } catch (error) {
      console.error('Error saving future:', error);
    }
  };

  const handleDelete = async (future) => {
    if (window.confirm(`Are you sure you want to delete "${future.title}"?`)) {
      try {
        await deleteFuture(future.id);
      } catch (error) {
        console.error('Error deleting future:', error);
      }
    }
  };

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Title', field: 'title' },
    {
      header: 'Description',
      render: (row) => <div className="max-w-md truncate">{row.description}</div>,
    },
    { header: 'Category', field: 'category' },
    { header: 'Icon', field: 'icon' },
  ];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Icon className="text-main" icon="mdi:rocket" width="24" height="24" />
          <h3 className="text-white text-[1.2rem] font-bold">Manage Futures</h3>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Icon icon="mdi:plus" width="20" height="20" className="inline mr-2" />
          Add New Future
        </Button>
      </div>

      <div className="bg-background2 rounded-lg p-5">
        <DataTable
          data={futures}
          columns={columns}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingFuture ? 'Edit Future' : 'Add New Future'}
      >
        <form onSubmit={handleSubmit}>
          <Input label="Title" name="title" value={formData.title} onChange={handleInputChange} required />
          <Textarea label="Description" name="description" value={formData.description} onChange={handleInputChange} rows={4} />
          <Input label="Category" name="category" value={formData.category} onChange={handleInputChange} />
          <Input label="Icon" name="icon" value={formData.icon} onChange={handleInputChange} placeholder="Icon name or class" />
          <div className="flex items-center gap-3 mt-6">
            <Button type="submit" variant="primary" loading={creating || updating}>
              {editingFuture ? 'Update Future' : 'Create Future'}
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

export default FuturesManagePage;
