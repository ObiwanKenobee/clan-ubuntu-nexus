
import { ApiResponse, PaginatedResponse } from '@/types/clanTypes';
import { API_CONFIG, apiRequest } from '@/config/api';

interface Task {
  task_id: string;
  clan_id: string;
  title: string;
  description: string;
  assigned_to?: string;
  created_by: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

// Task Management
export const getTasksByClan = async (
  clanId: string,
  status?: Task['status'],
  page = 1,
  limit = 20
): Promise<ApiResponse<PaginatedResponse<Task>>> => {
  const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
  if (status) params.append('status', status);
  
  return apiRequest<PaginatedResponse<Task>>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/tasks?${params}`);
};

export const createTask = async (
  clanId: string,
  taskData: Omit<Task, 'task_id' | 'created_at' | 'updated_at'>
): Promise<ApiResponse<Task>> => {
  return apiRequest<Task>(`${API_CONFIG.ENDPOINTS.CLANS}/${clanId}/tasks`, {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
};

export const updateTask = async (
  taskId: string,
  updates: Partial<Task>
): Promise<ApiResponse<Task>> => {
  return apiRequest<Task>(`${API_CONFIG.ENDPOINTS.TASKS}/${taskId}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
};

export const assignTask = async (
  taskId: string,
  assignedTo: string
): Promise<ApiResponse<Task>> => {
  return apiRequest<Task>(`${API_CONFIG.ENDPOINTS.TASKS}/${taskId}/assign`, {
    method: 'POST',
    body: JSON.stringify({ assigned_to: assignedTo }),
  });
};

export const completeTask = async (taskId: string): Promise<ApiResponse<Task>> => {
  return apiRequest<Task>(`${API_CONFIG.ENDPOINTS.TASKS}/${taskId}/complete`, {
    method: 'POST',
  });
};

export const getTaskById = async (taskId: string): Promise<ApiResponse<Task>> => {
  return apiRequest<Task>(`${API_CONFIG.ENDPOINTS.TASKS}/${taskId}`);
};
