
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';
import { 
  Home, 
  Package, 
  User, 
  Users, 
  LogOut,
  UserPlus,
  Settings
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AppSidebar() {
  const { currentUser, logout, isAdmin } = useApp();
  
  if (!currentUser) return null;
  
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center py-4">
        <SidebarTrigger />
        <div className="flex items-center justify-center p-2">
          <Avatar className="h-14 w-14">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback className="bg-resource">{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-center mt-2">
          <h3 className="font-medium">{currentUser.name}</h3>
          <p className="text-xs text-gray-500">{currentUser.role}</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/dashboard" 
                    className={({ isActive }) => isActive ? "text-resource" : ""}
                  >
                    <Home className="mr-2 h-5 w-5" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/resources" 
                    className={({ isActive }) => isActive ? "text-resource" : ""}
                  >
                    <Package className="mr-2 h-5 w-5" />
                    <span>Resources</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {isAdmin && (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to="/users" 
                        className={({ isActive }) => isActive ? "text-resource" : ""}
                      >
                        <Users className="mr-2 h-5 w-5" />
                        <span>Users</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to="/settings" 
                        className={({ isActive }) => isActive ? "text-resource" : ""}
                      >
                        <Settings className="mr-2 h-5 w-5" />
                        <span>Settings</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <button 
          onClick={logout}
          className="flex items-center justify-center w-full p-2 text-gray-600 hover:text-resource hover:bg-resource-light rounded-md transition-colors"
        >
          <LogOut className="mr-2 h-5 w-5" />
          <span>Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
