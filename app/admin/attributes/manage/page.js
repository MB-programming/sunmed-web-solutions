'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useAttributes, useCreateAttribute, useUpdateAttribute, useDeleteAttribute } from '@/app/lib/hooks';
import DataTable from '@/app/Components/Common/DataTable';
import Modal from '@/app/Components/Common/Modal';
import { Input, Textarea, Button } from '@/app/Components/Common/FormInput';

const AttributesManagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    description: '',
  });

  const { data: attributesData, loading, refetch } = useAttributes();
  const attributes = attributesData?.data || [];

  const { mutate: createAttribute, loading: creating } = useCreateAttribute({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: updateAttribute, loading: updating } = useUpdateAttribute({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: deleteAttribute } = useDeleteAttribute({
    onSuccess: () => {
      refetch();
    },
  });

  const handleOpenModal = (attribute = null) => {
    if (attribute) {
      setEditingAttribute(attribute);
      setFormData({
        name: attribute.name || '',
        value: attribute.value || '',
        description: attribute.description || '',
      });
    } else {
      setEditingAttribute(null);
      setFormData({ name: '', value: '', description: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAttribute(null);
    setFormData({ name: '', value: '', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAttribute) {
        await updateAttribute(editingAttribute.id, formData);
      } else {
        await createAttribute(formData);
      }
    } catch (error) {
      console.error('Error saving attribute:', error);
    }
  };

  const handleDelete = async (attribute) => {
    if (window.confirm(`Are you sure you want to delete "${attribute.name}"?`)) {
      try {
        await deleteAttribute(attribute.id);
      } catch (error) {
        console.error('Error deleting attribute:', error);
      }
    }
  };

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Value', field: 'value' },
    {
      header: 'Description',
      render: (row) => <div className="max-w-md truncate">{row.description}</div>,
    },
  ];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Icon className="text-main" icon="mdi:tag" width="24" height="24" />
          <h3 className="text-white text-[1.2rem] font-bold">Manage Attributes</h3>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Icon icon="mdi:plus" width="20" height="20" className="inline mr-2" />
          Add New Attribute
        </Button>
      </div>

      <div className="bg-background2 rounded-lg p-5">
        <DataTable
          data={attributes}
          columns={columns}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAttribute ? 'Edit Attribute' : 'Add New Attribute'}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Attribute Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter attribute name"
            required
          />
          <Input
            label="Value"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            placeholder="Enter value"
          />
          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter description"
            rows={4}
          />
          <div className="flex items-center gap-3 mt-6">
            <Button type="submit" variant="primary" loading={creating || updating}>
              {editingAttribute ? 'Update Attribute' : 'Create Attribute'}
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

export default AttributesManagePage;
