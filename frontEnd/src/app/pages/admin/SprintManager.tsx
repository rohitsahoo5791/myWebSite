import { useState, useEffect, ChangeEvent } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  fetchCurriculums,
  fetchProjects,
  fetchSprints,
  createSprint,
  updateSprint,
  deleteSprint,
} from '../../../../lib/api';
import { Curriculum, Project, Sprint } from '../../../types';
import Modal from '../../components/admin/Modal';
import ConfirmDeleteModal from '../../components/admin/ConfirmDeleteModal';
import FormInput from '../../components/admin/FormInput';
import SelectDropdown from '../../components/admin/SelectDropdown';
import LoadingSpinner from '../../components/admin/LoadingSpinner';
import Toast from '../../components/admin/Toast';

export default function SprintManager() {
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [selectedCurriculumId, setSelectedCurriculumId] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState({
    sprintNumber: '',
    title: '',
    summary: '',
    startDate: '',
    endDate: '',
    projectId: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch curriculums on mount
  useEffect(() => {
    fetchAllCurriculums();
  }, []);

  // Fetch projects when curriculum changes
  useEffect(() => {
    if (selectedCurriculumId) {
      fetchAllProjects();
    } else {
      setProjects([]);
      setSprints([]);
      setSelectedProjectId('');
    }
  }, [selectedCurriculumId]);

  // Fetch sprints when project changes
  useEffect(() => {
    if (selectedProjectId) {
      fetchAllSprints();
    } else {
      setSprints([]);
    }
  }, [selectedProjectId]);

  const fetchAllCurriculums = async () => {
    try {
      const data = await fetchCurriculums();
      setCurriculums(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch curriculums';
      setToast({ message, type: 'error' });
    }
  };

  const fetchAllProjects = async () => {
    if (!selectedCurriculumId) return;
    try {
      const data = await fetchProjects(selectedCurriculumId);
      setProjects(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch projects';
      setToast({ message, type: 'error' });
    }
  };

  const fetchAllSprints = async () => {
    if (!selectedProjectId) return;
    try {
      setLoading(true);
      const data = await fetchSprints(selectedProjectId);
      setSprints(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch sprints';
      setToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.sprintNumber) newErrors.sprintNumber = 'Sprint number is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';

    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenModal = (sprint?: Sprint) => {
    if (sprint) {
      setEditingId(sprint.id || null);
      setFormData({
        sprintNumber: sprint.sprintNumber.toString(),
        title: sprint.title,
        summary: sprint.summary || '',
        startDate: sprint.startDate ? new Date(sprint.startDate).toISOString().split('T')[0] : '',
        endDate: sprint.endDate ? new Date(sprint.endDate).toISOString().split('T')[0] : '',
        projectId: sprint.projectId,
      });
    } else {
      setEditingId(null);
      setFormData({
        sprintNumber: '',
        title: '',
        summary: '',
        startDate: '',
        endDate: '',
        projectId: selectedProjectId,
      });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      sprintNumber: '',
      title: '',
      summary: '',
      startDate: '',
      endDate: '',
      projectId: selectedProjectId,
    });
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const submitData = {
        sprintNumber: parseInt(formData.sprintNumber),
        title: formData.title || undefined,
        summary: formData.summary || undefined,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        projectId: formData.projectId,
      };

      if (editingId) {
        const updates: Partial<Sprint> = {};
        const original = sprints.find(s => s.id === editingId);
        if (original) {
          if (original.sprintNumber !== submitData.sprintNumber) updates.sprintNumber = submitData.sprintNumber;
          if ((original.title || '') !== (submitData.title || '')) updates.title = submitData.title;
          if ((original.summary || '') !== (submitData.summary || '')) updates.summary = submitData.summary;
          if (new Date(original.startDate).toISOString() !== submitData.startDate) updates.startDate = submitData.startDate;
          if (new Date(original.endDate).toISOString() !== submitData.endDate) updates.endDate = submitData.endDate;
        }
        await updateSprint(editingId, updates);
        setToast({ message: 'Sprint updated successfully', type: 'success' });
      } else {
        await createSprint(submitData);
        setToast({ message: 'Sprint created successfully', type: 'success' });
      }
      handleCloseModal();
      await fetchAllSprints();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Operation failed';
      setToast({ message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (sprint: Sprint) => {
    setDeleteItemId(sprint.id || null);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteItemId) return;

    try {
      setIsSubmitting(true);
      await deleteSprint(deleteItemId);
      setToast({ message: 'Sprint deleted successfully', type: 'success' });
      setIsDeleteModalOpen(false);
      setDeleteItemId(null);
      await fetchAllSprints();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete sprint';
      setToast({ message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Sprints</h2>
        <SelectDropdown
          label="Select Curriculum"
          value={selectedCurriculumId}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCurriculumId(e.target.value)}
          options={curriculums.map((c) => ({
            value: c.id || '',
            label: c.title,
          }))}
          required
        />
        {selectedCurriculumId && (
          <SelectDropdown
            label="Select Project"
            value={selectedProjectId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedProjectId(e.target.value)}
            options={projects.map((p) => ({
              value: p.id || '',
              label: p.title,
            }))}
            required
          />
        )}
      </div>

      {selectedProjectId && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">
              Sprints ({sprints.length})
            </h3>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Sprint
            </button>
          </div>

          {loading && sprints.length === 0 ? (
            <LoadingSpinner fullScreen={false} />
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Sprint
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Summary
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Resources
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {sprints.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                        No sprints found. Create one to get started.
                      </td>
                    </tr>
                  ) : (
                    sprints.map((sprint) => (
                      <tr key={sprint.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          #{sprint.sprintNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{sprint.title || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{sprint.summary || '-'}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(sprint.startDate)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(sprint.endDate)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {sprint.resources?.length || 0}
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button
                            onClick={() => handleOpenModal(sprint)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(sprint)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? 'Edit Sprint' : 'Create Sprint'}
        submitButton={editingId ? 'Update' : 'Create'}
        isLoading={isSubmitting}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <input
            type="hidden"
            value={formData.projectId}
          />
          <FormInput
            label="Sprint Number"
            type="number"
            value={formData.sprintNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, sprintNumber: e.target.value })}
            error={errors.sprintNumber}
            required
            min="1"
          />
          <FormInput
            label="Title (Optional)"
            value={formData.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Setup & Configuration"
          />
          <FormInput
            label="Summary (Optional)"
            value={formData.summary}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, summary: e.target.value })}
            placeholder="Brief overview of the sprint"
          />
          <FormInput
            label="Start Date"
            type="date"
            value={formData.startDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, startDate: e.target.value })}
            error={errors.startDate}
            required
          />
          <FormInput
            label="End Date"
            type="date"
            value={formData.endDate}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, endDate: e.target.value })}
            error={errors.endDate}
            required
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
        title="Delete Sprint"
        message="This action will delete the sprint and all associated resources."
        itemName={`Sprint ${sprints.find(s => s.id === deleteItemId)?.sprintNumber}`}
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
