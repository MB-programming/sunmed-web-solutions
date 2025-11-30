'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '@/app/lib/hooks';
import DataTable from '@/app/Components/Common/DataTable';
import Modal from '@/app/Components/Common/Modal';
import { Input, Button } from '@/app/Components/Common/FormInput';

const UsersManagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const { data: usersData, loading, refetch } = useUsers();
  const users = usersData?.data || [];

  const { mutate: createUser, loading: creating } = useCreateUser({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: updateUser, loading: updating } = useUpdateUser({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: deleteUser } = useDeleteUser({
    onSuccess: () => {
      refetch();
    },
  });

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        role: user.role || '',
      });
    } else {
      setEditingUser(null);
      setFormData({ name: '', email: '', password: '', role: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({ name: '', email: '', password: '', role: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = { ...formData };
      if (editingUser && !submitData.password) {
        delete submitData.password;
      }

      if (editingUser) {
        await updateUser(editingUser.id, submitData);
      } else {
        await createUser(submitData);
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (user) => {
    if (window.confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      try {
        await deleteUser(user.id);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Email', field: 'email' },
    { header: 'Role', field: 'role' },
    {
      header: 'Created At',
      render: (row) => row.created_at ? new Date(row.created_at).toLocaleDateString() : 'N/A',
    },
  ];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Icon className="text-main" icon="ph:user-bold" width="24" height="24" />
          <h3 className="text-white text-[1.2rem] font-bold">Manage Users</h3>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Icon icon="mdi:plus" width="20" height="20" className="inline mr-2" />
          Add New User
        </Button>
      </div>

      <div className="bg-background2 rounded-lg p-5">
        <DataTable
          data={users}
          columns={columns}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter user name"
            required
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="user@example.com"
            required
          />

          <Input
            label={editingUser ? "Password (leave empty to keep current)" : "Password"}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required={!editingUser}
          />

          <Input
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            placeholder="e.g., admin, user, editor"
          />

          <div className="flex items-center gap-3 mt-6">
            <Button type="submit" variant="primary" loading={creating || updating}>
              {editingUser ? 'Update User' : 'Create User'}
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

export default UsersManagePage;
