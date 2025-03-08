
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Resource, UserResource, UserRole } from '@/types';
import { users, resources, userResources } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  resources: Resource[];
  userResources: UserResource[];
  login: (email: string) => boolean;
  logout: () => void;
  addResource: (resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateResource: (id: string, updates: Partial<Resource>) => void;
  deleteResource: (id: string) => void;
  assignResource: (resourceId: string, userId: string) => void;
  unassignResource: (resourceId: string) => void;
  getUserResources: (userId: string) => Resource[];
  getResourceUser: (resourceId: string) => User | undefined;
  isAdmin: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(users);
  const [allResources, setAllResources] = useState<Resource[]>(resources);
  const [allUserResources, setAllUserResources] = useState<UserResource[]>(userResources);
  const { toast } = useToast();
  
  // Check for stored user on first load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);
  
  const login = (email: string): boolean => {
    const user = allUsers.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast({
        title: "Logged in successfully",
        description: `Welcome back, ${user.name}!`,
      });
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };
  
  const addResource = (resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newResource: Resource = {
      ...resource,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setAllResources(prev => [...prev, newResource]);
    toast({
      title: "Resource Created",
      description: `${newResource.title} has been added successfully.`,
    });
  };
  
  const updateResource = (id: string, updates: Partial<Resource>) => {
    setAllResources(prev => 
      prev.map(resource => 
        resource.id === id 
          ? { ...resource, ...updates, updatedAt: new Date().toISOString() } 
          : resource
      )
    );
    toast({
      title: "Resource Updated",
      description: `The resource has been updated successfully.`,
    });
  };
  
  const deleteResource = (id: string) => {
    // Check if resource is assigned
    const isAssigned = allUserResources.some(ur => ur.resourceId === id);
    if (isAssigned) {
      // First remove the assignment
      setAllUserResources(prev => prev.filter(ur => ur.resourceId !== id));
    }
    
    // Then delete the resource
    setAllResources(prev => prev.filter(resource => resource.id !== id));
    toast({
      title: "Resource Deleted",
      description: `The resource has been deleted.`,
    });
  };
  
  const assignResource = (resourceId: string, userId: string) => {
    // Check if resource is already assigned
    const existingAssignment = allUserResources.find(ur => ur.resourceId === resourceId);
    
    if (existingAssignment) {
      // Update existing assignment
      setAllUserResources(prev => 
        prev.map(ur => 
          ur.resourceId === resourceId 
            ? { ...ur, userId, assignedAt: new Date().toISOString() } 
            : ur
        )
      );
    } else {
      // Create new assignment
      const newAssignment: UserResource = {
        id: Date.now().toString(),
        userId,
        resourceId,
        assignedAt: new Date().toISOString(),
      };
      setAllUserResources(prev => [...prev, newAssignment]);
    }
    
    // Update resource status
    updateResource(resourceId, { status: 'assigned' });
    
    const user = allUsers.find(u => u.id === userId);
    toast({
      title: "Resource Assigned",
      description: `Resource has been assigned to ${user?.name || 'user'}.`,
    });
  };
  
  const unassignResource = (resourceId: string) => {
    // Remove assignment
    setAllUserResources(prev => prev.filter(ur => ur.resourceId !== resourceId));
    
    // Update resource status
    updateResource(resourceId, { status: 'available' });
    
    toast({
      title: "Resource Unassigned",
      description: `Resource is now available.`,
    });
  };
  
  const getUserResources = (userId: string): Resource[] => {
    const userResourceIds = allUserResources
      .filter(ur => ur.userId === userId)
      .map(ur => ur.resourceId);
      
    return allResources.filter(resource => userResourceIds.includes(resource.id));
  };
  
  const getResourceUser = (resourceId: string): User | undefined => {
    const assignment = allUserResources.find(ur => ur.resourceId === resourceId);
    if (!assignment) return undefined;
    
    return allUsers.find(user => user.id === assignment.userId);
  };
  
  return (
    <AppContext.Provider
      value={{
        currentUser,
        users: allUsers,
        resources: allResources,
        userResources: allUserResources,
        login,
        logout,
        addResource,
        updateResource,
        deleteResource,
        assignResource,
        unassignResource,
        getUserResources,
        getResourceUser,
        isAdmin: currentUser?.role === 'admin',
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
