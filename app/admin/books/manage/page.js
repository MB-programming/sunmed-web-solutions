'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useBooks, useCreateBook, useUpdateBook, useDeleteBook } from '@/app/lib/hooks';
import DataTable from '@/app/Components/Common/DataTable';
import Modal from '@/app/Components/Common/Modal';
import { Input, Textarea, Button } from '@/app/Components/Common/FormInput';

const BooksManagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const { data: booksData, loading, refetch } = useBooks();
  const books = booksData?.data || [];

  const { mutate: createBook, loading: creating } = useCreateBook({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: updateBook, loading: updating } = useUpdateBook({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: deleteBook } = useDeleteBook({
    onSuccess: () => {
      refetch();
    },
  });

  const handleOpenModal = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        name: book.name || '',
        phone: book.phone || '',
        email: book.email || '',
        service: book.service || '',
        message: book.message || '',
      });
    } else {
      setEditingBook(null);
      setFormData({ name: '', phone: '', email: '', service: '', message: '' });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBook(null);
    setFormData({ name: '', phone: '', email: '', service: '', message: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await updateBook(editingBook.id, formData);
      } else {
        await createBook(formData);
      }
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  const handleDelete = async (book) => {
    if (window.confirm(`Are you sure you want to delete booking from "${book.name}"?`)) {
      try {
        await deleteBook(book.id);
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const columns = [
    { header: 'ID', field: 'id' },
    { header: 'Name', field: 'name' },
    { header: 'Phone', field: 'phone' },
    { header: 'Email', field: 'email' },
    { header: 'Service', field: 'service' },
    {
      header: 'Message',
      render: (row) => <div className="max-w-xs truncate">{row.message}</div>,
    },
  ];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Icon className="text-main" icon="mdi:book" width="24" height="24" />
          <h3 className="text-white text-[1.2rem] font-bold">Manage Bookings</h3>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Icon icon="mdi:plus" width="20" height="20" className="inline mr-2" />
          Add New Booking
        </Button>
      </div>

      <div className="bg-background2 rounded-lg p-5">
        <DataTable
          data={books}
          columns={columns}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingBook ? 'Edit Booking' : 'Add New Booking'}
      >
        <form onSubmit={handleSubmit}>
          <Input label="Name" name="name" value={formData.name} onChange={handleInputChange} required />
          <Input label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          <Input label="Service" name="service" value={formData.service} onChange={handleInputChange} />
          <Textarea label="Message" name="message" value={formData.message} onChange={handleInputChange} rows={4} />
          <div className="flex items-center gap-3 mt-6">
            <Button type="submit" variant="primary" loading={creating || updating}>
              {editingBook ? 'Update Booking' : 'Create Booking'}
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

export default BooksManagePage;
