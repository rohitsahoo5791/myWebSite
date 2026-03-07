import { useState, useEffect, ChangeEvent } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  fetchCurriculums,
  createCurriculum,
  updateCurriculum,
  deleteCurriculum,
} from '../../../../lib/api';
import { Curriculum } from '../../../types';
import Modal from '../../components/admin/Modal';
import ConfirmDeleteModal from '../../components/admin/ConfirmDeleteModal';
import FormInput from '../../components/admin/FormInput';
import LoadingSpinner from '../../components/admin/LoadingSpinner';
import Toast from '../../components/admin/Toast';

export default function CurriculumManager() {
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    domain: '',
    description: '',
    icon: '',
    color: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch all curriculums
  useEffect(() => {
    fetchAllCurriculums();
  }, []);

  const fetchAllCurriculums = async () => {
    try {
      setLoading(true);
      const data = await fetchCurriculums();
      setCurriculums(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch curriculums';
      setToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.domain.trim()) newErrors.domain = 'Domain is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenModal = (curriculum?: Curriculum) => {
    if (curriculum) {
      setEditingId(curriculum.id || null);
      setFormData({
        title: curriculum.title,
        domain: curriculum.domain,
        description: curriculum.description || '',
        icon: (curriculum as any).icon || '',
        color: (curriculum as any).color || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        domain: '',
        description: '',
        icon: '',
        color: '',
      });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', domain: '', description: '', icon: '', color: '' });
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      if (editingId) {
        // Only send changed fields
        const updates: Partial<any> = {};
        const original = curriculums.find(c => c.id === editingId) as any;
        if (original) {
          if (original.title !== formData.title) updates.title = formData.title;
          if (original.domain !== formData.domain) updates.domain = formData.domain;
          if ((original.description || '') !== formData.description) updates.description = formData.description;
          if ((original.icon || '') !== formData.icon) updates.icon = formData.icon;
          if ((original.color || '') !== formData.color) updates.color = formData.color;
        }
        await updateCurriculum(editingId, updates);
        setToast({ message: 'Curriculum updated successfully', type: 'success' });
      } else {
        await createCurriculum(formData as any);
        setToast({ message: 'Curriculum created successfully', type: 'success' });
      }
      handleCloseModal();
      await fetchAllCurriculums();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Operation failed';
      setToast({ message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (curriculum: Curriculum) => {
    setDeleteItemId(curriculum.id || null);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteItemId) return;

    try {
      setIsSubmitting(true);
      await deleteCurriculum(deleteItemId);
      setToast({ message: 'Curriculum deleted successfully', type: 'success' });
      setIsDeleteModalOpen(false);
      setDeleteItemId(null);
      await fetchAllCurriculums();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete curriculum';
      setToast({ message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && curriculums.length === 0) {
    return <LoadingSpinner fullScreen={false} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Manage Curriculums</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Curriculum
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Icon</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Domain</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {curriculums.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No curriculums found. Create one to get started.
                </td>
              </tr>
            ) : (
              curriculums.map((curriculum) => {
                const currWithIcon = curriculum as any;
                return (
                  <tr key={curriculum.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-center">
                      {currWithIcon.icon ? (
                        <span
                          className="text-2xl"
                          title={currWithIcon.icon}
                        >
                          {currWithIcon.icon}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{curriculum.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{curriculum.domain}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                      {curriculum.description || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm flex gap-2">
                    <button
                      onClick={() => handleOpenModal(curriculum)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(curriculum)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Curriculum' : 'Create Curriculum'}
        submitButton={editingId ? 'Update' : 'Create'}
        isLoading={isSubmitting}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <FormInput
            label="Title"
            value={formData.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
            required
          />
          <FormInput
            label="Domain"
            value={formData.domain}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, domain: e.target.value })}
            error={errors.domain}
            placeholder="e.g., JavaScript, React, Node.js"
            required
          />
          <FormInput
            label="Description"
            value={formData.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description of the curriculum"
          />
          <FormInput
            label="Icon (Emoji or character)"
            value={formData.icon}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="e.g., 📚 or ⚡"
          />
          <FormInput
            label="Color (Hex or color name)"
            value={formData.color}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, color: e.target.value })}
            placeholder="e.g., #3B82F6 or blue"
          />
        </div>
      </Modal>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteItemId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Curriculum"
        message="This action will delete the curriculum and all associated projects."
        itemName={curriculums.find(c => c.id === deleteItemId)?.title || 'curriculum'}
        isLoading={isSubmitting}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
