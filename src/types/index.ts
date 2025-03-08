
export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: string; // e.g., 'document', 'equipment', 'software'
  status: 'available' | 'assigned';
  createdAt: string;
  updatedAt: string;
}

export interface UserResource {
  id: string;
  userId: string;
  resourceId: string;
  assignedAt: string;
  dueDate?: string;
}
