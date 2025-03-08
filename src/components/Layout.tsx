
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { useApp } from '@/contexts/AppContext';
import { Navigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  adminOnly?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  requireAuth = true,
  adminOnly = false
}) => {
  const { currentUser, isAdmin } = useApp();
  
  // If authentication is required and user is not logged in, redirect to login
  if (requireAuth && !currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  // If admin access is required and user is not an admin, redirect to dashboard
  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {currentUser && <AppSidebar />}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};
