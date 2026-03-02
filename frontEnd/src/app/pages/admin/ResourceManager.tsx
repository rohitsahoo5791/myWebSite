import { useState, useEffect, ChangeEvent } from 'react';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import {
  fetchCurriculums,
  fetchProjects,
  fetchSprints,
  fetchResources,
  createResource,
  updateResource,
  deleteResource,
} from '../../../../lib/api';
import { Curriculum, Project, Sprint, Resource } from '../../../types';
import Modal from '../../components/admin/Modal';
import ConfirmDeleteModal from '../../components/admin/ConfirmDeleteModal';
import FormInput from '../../components/admin/FormInput';
import SelectDropdown from '../../components/admin/SelectDropdown';
import LoadingSpinner from '../../components/admin/LoadingSpinner';
import Toast from '../../components/admin/Toast';

const RESOURCE_TYPES = [
  { value: 'github', label: 'GitHub' },
  { value: 'video', label: 'Video' },
  { value: 'doc', label: 'Documentation' },
  { value: 'design', label: 'Design' },
  { value: 'other', label: 'Other' },
];

export default function ResourceManager() {
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedCurriculumId, setSelectedCurriculumId] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [selectedSprintId, setSelectedSprintId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    url: '',
    type: 'other' as 'github' | 'video' | 'doc' | 'design' | 'other',
    sprintId: '',
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
      setResources([]);
      setSelectedProjectId('');
      setSelectedSprintId('');
    }
  }, [selectedCurriculumId]);

  // Fetch sprints when project changes
  useEffect(() => {
    if (selectedProjectId) {
      fetchAllSprints();
    } else {
      setSprints([]);
      setResources([]);
      setSelectedSprintId('');
    }
  }, [selectedProjectId]);

  // Fetch resources when sprint changes
  useEffect(() => {
    if (selectedSprintId) {
      fetchAllResources();
    } else {
      setResources([]);
    }
  }, [selectedSprintId]);

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
      const data = await fetchSprints(selectedProjectId);
      setSprints(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch sprints';
      setToast({ message, type: 'error' });
    }
  };

  const fetchAllResources = async () => {
    if (!selectedSprintId) return;
    try {
      setLoading(true);
      const data = await fetchResources(selectedSprintId);
      setResources(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch resources';
      setToast({ message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.label.trim()) newErrors.label = 'Label is required';
    if (!formData.url.trim()) newErrors.url = 'URL is required';

    // Basic URL validation
    try {
      new URL(formData.url);
    } catch {
      newErrors.url = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenModal = (resource?: Resource) => {
    if (resource) {
      setEditingId(resource.id || null);
      setFormData({
        label: resource.label,
        url: resource.url,
        type: (resource.type || 'other') as 'github' | 'video' | 'doc' | 'design' | 'other',
        sprintId: resource.sprintId || selectedSprintId,
      });
    } else {
      setEditingId(null);
      setFormData({
        label: '',
        url: '',
        type: 'other',
        sprintId: selectedSprintId,
      });
    }
    setErrors({});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({
      label: '',
      url: '',
      type: 'other',
      sprintId: selectedSprintId,
    });
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      if (editingId) {
        const updates: Partial<Resource> = {};
        const original = resources.find(r => r.id === editingId);
        if (original) {
          if (original.label !== formData.label) updates.label = formData.label;
          if (original.url !== formData.url) updates.url = formData.url;
          if (original.type !== formData.type) updates.type = formData.type;
        }
        await updateResource(editingId, updates);
        setToast({ message: 'Resource updated successfully', type: 'success' });
      } else {
        await createResource(formData);
        setToast({ message: 'Resource created successfully', type: 'success' });
      }
      handleCloseModal();
      await fetchAllResources();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Operation failed';
      setToast({ message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (resource: Resource) => {
    setDeleteItemId(resource.id || null);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteItemId) return;

    try {
      setIsSubmitting(true);
      await deleteResource(deleteItemId);
      setToast({ message: 'Resource deleted successfully', type: 'success' });
      setIsDeleteModalOpen(false);
      setDeleteItemId(null);
      await fetchAllResources();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete resource';
      setToast({ message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getResourceTypeLabel = (type: string) => {
    return RESOURCE_TYPES.find(t => t.value === type)?.label || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      github: 'bg-gray-100 text-gray-800',
      video: 'bg-red-100 text-red-800',
      doc: 'bg-blue-100 text-blue-800',
      design: 'bg-purple-100 text-purple-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[type] || colors.other;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Manage Resources</h2>
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
        {selectedProjectId && (
          <SelectDropdown
            label="Select Sprint"
            value={selectedSprintId}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedSprintId(e.target.value)}
            options={sprints.map((s) => ({
              value: s.id || '',
              label: `Sprint ${s.sprintNumber}${s.title ? ` - ${s.title}` : ''}`,
            }))}
            required
          />
        )}
      </div>

      {selectedProjectId && selectedSprintId && (
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700">
              Resources ({resources.length})
            </h3>
            <button
              onClick={() => handleOpenModal()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Resource
            </button>
          </div>

          {loading && resources.length === 0 ? (
            <LoadingSpinner fullScreen={false} />
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Label
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {resources.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No resources found. Add one to get started.
                      </td>
                    </tr>
                  ) : (
                    resources.map((resource) => (
                      <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {resource.label}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 truncate max-w-xs flex items-center gap-1"
                            title={resource.url}
                          >
                            {new URL(resource.url).hostname}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type || 'other')}`}>
                            {getResourceTypeLabel(resource.type || 'other')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button
                            onClick={() => handleOpenModal(resource)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(resource)}
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
        title={editingId ? 'Edit Resource' : 'Add Resource'}
        submitButton={editingId ? 'Update' : 'Add'}
        isLoading={isSubmitting}
        onSubmit={handleSubmit}
      >
        <div className="space-y-4">
          <input
            type="hidden"
            value={formData.sprintId}
          />
          <FormInput
            label="Label"
            value={formData.label}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, label: e.target.value })}
            error={errors.label}
            placeholder="e.g., Project Setup Guide"
            required
          />
          <FormInput
            label="URL"
            type="url"
            value={formData.url}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, url: e.target.value })}
            error={errors.url}
            placeholder="https://example.com"
            required
          />
          <SelectDropdown
            label="Type"
            value={formData.type}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, type: e.target.value as 'github' | 'video' | 'doc' | 'design' | 'other' })}
            options={RESOURCE_TYPES}
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
        title="Delete Resource"
        message="This resource will be permanently deleted."
        itemName={resources.find(r => r.id === deleteItemId)?.label || 'resource'}
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
