
import { Resource, User, UserResource } from '@/types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=8B5CF6&color=fff',
  },
  {
    id: '2',
    name: 'John Employee',
    email: 'john@example.com',
    role: 'employee',
    avatar: 'https://ui-avatars.com/api/?name=John+Employee&background=3B82F6&color=fff',
  },
  {
    id: '3',
    name: 'Jane Employee',
    email: 'jane@example.com',
    role: 'employee',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Employee&background=EC4899&color=fff',
  },
];

// Mock Resources
export const resources: Resource[] = [
  {
    id: '1',
    title: 'Company Laptop',
    description: 'MacBook Pro 2022 with pre-installed software',
    type: 'equipment',
    status: 'assigned',
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2023-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Employee Handbook',
    description: 'Guide to company policies and procedures',
    type: 'document',
    status: 'available',
    createdAt: '2023-01-05T00:00:00Z',
    updatedAt: '2023-01-05T00:00:00Z',
  },
  {
    id: '3',
    title: 'Adobe Creative Suite',
    description: 'Software subscription for design work',
    type: 'software',
    status: 'assigned',
    createdAt: '2023-02-01T00:00:00Z',
    updatedAt: '2023-02-10T00:00:00Z',
  },
  {
    id: '4',
    title: 'Office Key Card',
    description: 'Security access card for the main office',
    type: 'equipment',
    status: 'assigned',
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-01-15T00:00:00Z',
  },
  {
    id: '5',
    title: 'Project Management Tool Access',
    description: 'Account for company project management software',
    type: 'software',
    status: 'available',
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2023-02-15T00:00:00Z',
  },
];

// Resource assignments
export const userResources: UserResource[] = [
  {
    id: '1',
    userId: '2',
    resourceId: '1',
    assignedAt: '2023-01-15T00:00:00Z',
  },
  {
    id: '2',
    userId: '3',
    resourceId: '3',
    assignedAt: '2023-02-10T00:00:00Z',
  },
  {
    id: '3',
    userId: '2',
    resourceId: '4',
    assignedAt: '2023-01-15T00:00:00Z',
  },
];
