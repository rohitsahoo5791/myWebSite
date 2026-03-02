import { useState, useEffect, ChangeEvent } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  fetchCurriculums,
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../../../lib/api';
import { Curriculum, Project } from '../../../types';
import Modal from '../../components/admin/Modal';
import ConfirmDeleteModal from '../../components/admin/ConfirmDeleteModal';
import FormInput from '../../components/admin/FormInput';
import SelectDropdown from '../../components/admin/SelectDropdown';
import LoadingSpinner from '../../components/admin/LoadingSpinner';
import Toast from '../../components/admin/Toast';

export default function ProjectManager() {
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCurriculumId, setSelectedCurriculumId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    curriculumId: '',
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
    }
  }, [selectedCurriculumId]);

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
      setLoading(true);
      const data = await fetchProjects(selectedCurriculumId);
      setProjects(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch projects';
      setToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.curriculumId) newErrors.curriculumId = 'Curriculum is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingId(project.id || null);
      setFormData({
        title: project.title,
        description: project.description || '',
        curriculumId: project.curriculumId,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        curriculumId: selectedCurriculumId,
      });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', description: '', curriculumId: '' });
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      if (editingId) {
        const updates: Partial<Project> = {};
        const original = projects.find(p => p.id === editingId);
        if (original) {
          if (original.title !== formData.title) updates.title = formData.title;
          if ((original.description || '') !== formData.description) updates.description = formData.description;
        }
        await updateProject(editingId, updates);
        setToast({ message: 'Project updated successfully', type: 'success' });
      } else {
        await createProject(formData);
        setToast({ message: 'Project created successfully', type: 'success' });
      }
      handleCloseModal();
      await fetchAllProjects();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Operation failed';
      setToast({ message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (project: Project) => {
    setDeleteItemId(project.id || null);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteItemId) return;

    try {
      setIsSubmitting(true);
      await deleteProject(deleteItemId);
      setToast({ message: 'Project deleted successfully', type: 'success' });
      setIsDeleteModalOpen(false);
      setDeleteItemId(null);
      await fetchAllProjects();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete project';
      setToast({ message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Projects</h2>
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
      </div>

      {selectedCurriculumId && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">
              Projects ({projects.length})
            </h3>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Project
            </button>
          </div>

          {loading && projects.length === 0 ? (
            <LoadingSpinner fullScreen={false} />
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                        No projects found. Create one to get started.
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                          {project.description || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button
                            onClick={() => handleOpenModal(project)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(project)}
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
        title={editingId ? 'Edit Project' : 'Create Project'}
        submitButton={editingId ? 'Update' : 'Create'}
        isLoading={isSubmitting}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <SelectDropdown
            label="Curriculum"
            value={formData.curriculumId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, curriculumId: e.target.value })}
            options={curriculums.map((c) => ({
              value: c.id || '',
              label: c.title,
            }))}
            error={errors.curriculumId}
            required
          />
          <FormInput
            label="Title"
            value={formData.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
            required
          />
          <FormInput
            label="Description"
            value={formData.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, description: e.target.value })}
            error={errors.description}
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
        title="Delete Project"
        message="This action will delete the project and all associated sprints and resources."
        itemName={projects.find(p => p.id === deleteItemId)?.title || 'project'}
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
