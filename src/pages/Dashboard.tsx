
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, UserCheck, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, resources, getUserResources, isAdmin } = useApp();
  
  const userResources = currentUser ? getUserResources(currentUser.id) : [];
  const totalResources = resources.length;
  const totalAssigned = resources.filter(r => r.status === 'assigned').length;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Welcome, {currentUser?.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: My Resources */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">My Resources</CardTitle>
            <Package className="h-5 w-5 text-resource" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{userResources.length}</div>
            <CardDescription>
              Resources currently assigned to you
            </CardDescription>
            <Link to="/resources" className="text-resource text-sm inline-block mt-4 hover:underline">
              View all resources
            </Link>
          </CardContent>
        </Card>
        
        {isAdmin && (
          <>
            {/* Card 2: Total Resources (Admin only) */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">Total Resources</CardTitle>
                <FileCheck className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalResources}</div>
                <CardDescription>
                  Total resources in the system
                </CardDescription>
                <Link to="/resources" className="text-blue-500 text-sm inline-block mt-4 hover:underline">
                  Manage resources
                </Link>
              </CardContent>
            </Card>
            
            {/* Card 3: Assigned Resources (Admin only) */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-lg font-medium">Assigned Resources</CardTitle>
                <UserCheck className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalAssigned}</div>
                <CardDescription>
                  Resources currently assigned to employees
                </CardDescription>
                <div className="text-sm text-gray-500 mt-2">
                  {(totalAssigned / totalResources * 100).toFixed(0)}% of total
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold mb-4">
          {isAdmin ? "Recently Created Resources" : "My Resources"}
        </h2>
        
        {userResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isAdmin 
              ? resources.slice(0, 6).map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))
              : userResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))
            }
          </div>
        ) : (
          <p className="text-gray-500">
            {isAdmin 
              ? "No resources have been created yet." 
              : "You don't have any resources assigned to you yet."}
          </p>
        )}
        
        <div className="mt-4">
          <Link to="/resources" className="text-resource hover:underline">
            {isAdmin ? "Manage all resources" : "View all resources"}
          </Link>
        </div>
      </div>
    </div>
  );
};

const ResourceCard = ({ resource }: { resource: any }) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{resource.title}</CardTitle>
        <CardDescription className="text-xs">{resource.type}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{resource.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className={`text-xs px-2 py-1 rounded-full ${
            resource.status === 'assigned' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {resource.status}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
