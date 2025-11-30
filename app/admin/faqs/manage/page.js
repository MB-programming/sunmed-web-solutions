'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFaqs, useCreateFaq, useUpdateFaq, useDeleteFaq } from '@/app/lib/hooks';
import DataTable from '@/app/Components/Common/DataTable';
import Modal from '@/app/Components/Common/Modal';
import { Input, Textarea, Button } from '@/app/Components/Common/FormInput';

const FaqsManagePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: '',
  });

  const { data: faqsData, loading, refetch } = useFaqs();
  const faqs = faqsData?.data || [];

  const { mutate: createFaq, loading: creating } = useCreateFaq({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: updateFaq, loading: updating } = useUpdateFaq({
    onSuccess: () => {
      refetch();
      handleCloseModal();
    },
  });

  const { mutate: deleteFaq } = useDeleteFaq({
    onSuccess: () => {
      refetch();
    },
  });

  const handleOpenModal = (faq = null) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({
        question: faq.question || '',
        answer: faq.answer || '',
        category: faq.category || '',
      });
    } else {
      setEditingFaq(null);
      setFormData({
        question: '',
        answer: '',
        category: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingFaq(null);
    setFormData({
      question: '',
      answer: '',
      category: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingFaq) {
        await updateFaq(editingFaq.id, formData);
      } else {
        await createFaq(formData);
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleDelete = async (faq) => {
    if (window.confirm(`Are you sure you want to delete this FAQ?`)) {
      try {
        await deleteFaq(faq.id);
      } catch (error) {
        console.error('Error deleting FAQ:', error);
      }
    }
  };

  const columns = [
    { header: 'ID', field: 'id' },
    {
      header: 'Question',
      render: (row) => (
        <div className="max-w-md truncate font-semibold">{row.question}</div>
      ),
    },
    {
      header: 'Answer',
      render: (row) => (
        <div className="max-w-md truncate">{row.answer}</div>
      ),
    },
    { header: 'Category', field: 'category' },
    {
      header: 'Created At',
      render: (row) => new Date(row.created_at).toLocaleDateString(),
    },
  ];

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Icon className="text-main" icon="mdi:help-circle" width="24" height="24" />
          <h3 className="text-white text-[1.2rem] font-bold">Manage FAQs</h3>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Icon icon="mdi:plus" width="20" height="20" className="inline mr-2" />
          Add New FAQ
        </Button>
      </div>

      <div className="bg-background2 rounded-lg p-5">
        <DataTable
          data={faqs}
          columns={columns}
          loading={loading}
          onEdit={handleOpenModal}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingFaq ? 'Edit FAQ' : 'Add New FAQ'}
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Question"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            placeholder="Enter the question"
            required
          />

          <Textarea
            label="Answer"
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
            placeholder="Enter the answer"
            rows={6}
            required
          />

          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="e.g., General, Technical, Billing"
          />

          <div className="flex items-center gap-3 mt-6">
            <Button type="submit" variant="primary" loading={creating || updating}>
              {editingFaq ? 'Update FAQ' : 'Create FAQ'}
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

export default FaqsManagePage;
