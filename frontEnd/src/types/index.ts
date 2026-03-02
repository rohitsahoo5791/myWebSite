// Curriculum Type
export interface Curriculum {
  id?: string;
  title: string;
  domain: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Project Type
export interface Project {
  id?: string;
  title: string;
  description?: string;
  curriculumId: string;
  createdAt?: string;
  updatedAt?: string;
}

// Sprint Type
export interface Sprint {
  id?: string;
  sprintNumber: number;
  projectId: string;
  title: string;
  summary?: string;
  startDate: string;
  endDate: string;
  resources?: Resource[];
  createdAt?: string;
  updatedAt?: string;
}

// Resource Type
export interface Resource {
  id?: string;
  sprintId: string;
  label: string;
  url: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
}
