import { Curriculum, Project, Sprint, Resource } from '../src/types';

const API_URL = import.meta.env.VITE_API_URL;

// Logout function callback
let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedCallback = (callback: () => void) => {
  onUnauthorized = callback;
};

// Helper function to get auth headers
function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('admin_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

// Helper function for authenticated fetch
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  // Handle 401 - Unauthorized
  if (response.status === 401) {
    localStorage.removeItem('admin_token');
    if (onUnauthorized) {
      onUnauthorized();
    }
    throw new Error('Unauthorized. Please login again.');
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || `Failed to fetch: ${response.statusText}`);
  }

  return response.json();
}

// Public API calls
export const fetchTimeline = async () => {
  return fetchWithAuth(`${API_URL}/timeline`);
};

export const fetchCurriculumFull = async (id: string) => {
  return fetchWithAuth(`${API_URL}/curriculum/${id}/full`);
};

export const fetchCurriculums = async () => {
  return fetchWithAuth(`${API_URL}/curriculum`);
};

// ============= CURRICULUM ENDPOINTS =============

export const createCurriculum = async (curriculum: Partial<Curriculum>) => {
  return fetchWithAuth(`${API_URL}/curriculum`, {
    method: 'POST',
    body: JSON.stringify(curriculum),
  });
};

export const updateCurriculum = async (id: string, curriculum: Partial<Curriculum>) => {
  return fetchWithAuth(`${API_URL}/curriculum/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(curriculum),
  });
};

export const deleteCurriculum = async (id: string) => {
  return fetchWithAuth(`${API_URL}/curriculum/${id}`, {
    method: 'DELETE',
  });
};

// ============= PROJECT ENDPOINTS =============

export const fetchProjects = async (curriculumId?: string) => {
  if (curriculumId) {
    return fetchWithAuth(`${API_URL}/project/curriculum/${curriculumId}`);
  }
  return fetchWithAuth(`${API_URL}/project`);
};

export const createProject = async (project: Partial<Project>) => {
  return fetchWithAuth(`${API_URL}/project`, {
    method: 'POST',
    body: JSON.stringify(project),
  });
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  return fetchWithAuth(`${API_URL}/project/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(project),
  });
};

export const deleteProject = async (id: string) => {
  return fetchWithAuth(`${API_URL}/project/${id}`, {
    method: 'DELETE',
  });
};

// ============= SPRINT ENDPOINTS =============

export const fetchSprints = async (projectId?: string) => {
  if (projectId) {
    return fetchWithAuth(`${API_URL}/sprint/project/${projectId}`);
  }
  return fetchWithAuth(`${API_URL}/sprint`);
};

export const createSprint = async (sprint: Partial<Sprint>) => {
  return fetchWithAuth(`${API_URL}/sprint`, {
    method: 'POST',
    body: JSON.stringify(sprint),
  });
};

export const updateSprint = async (id: string, sprint: Partial<Sprint>) => {
  return fetchWithAuth(`${API_URL}/sprint/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(sprint),
  });
};

export const deleteSprint = async (id: string) => {
  return fetchWithAuth(`${API_URL}/sprint/${id}`, {
    method: 'DELETE',
  });
};

// ============= RESOURCE ENDPOINTS =============

export const fetchResources = async (sprintId?: string) => {
  if (sprintId) {
    return fetchWithAuth(`${API_URL}/resource/sprint/${sprintId}`);
  }
  return fetchWithAuth(`${API_URL}/resource`);
};

export const createResource = async (resource: Partial<Resource>) => {
  return fetchWithAuth(`${API_URL}/resource`, {
    method: 'POST',
    body: JSON.stringify(resource),
  });
};

export const updateResource = async (id: string, resource: Partial<Resource>) => {
  return fetchWithAuth(`${API_URL}/resource/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(resource),
  });
};

export const deleteResource = async (id: string) => {
  return fetchWithAuth(`${API_URL}/resource/${id}`, {
    method: 'DELETE',
  });
};