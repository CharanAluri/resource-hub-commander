
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Package, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  UserPlus, 
  UserMinus,
  FileText,
  Laptop,
  Code
} from 'lucide-react';
import { Resource, User } from '@/types';
import { Badge } from '@/components/ui/badge';

const ResourceTypeIcons: Record<string, React.ReactNode> = {
  'document': <FileText className="h-4 w-4" />,
  'equipment': <Laptop className="h-4 w-4" />,
  'software': <Code className="h-4 w-4" />,
};

const Resources = () => {
  const { 
    resources, 
    users, 
    isAdmin, 
    currentUser, 
    addResource, 
    updateResource, 
    deleteResource, 
    assignResource, 
    unassignResource, 
    getUserResources, 
    getResourceUser 
  } = useApp();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [resourceTypeFilter, setResourceTypeFilter] = useState<string>('all');
  const [resourceStatusFilter, setResourceStatusFilter] = useState<string>('all');
  
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'document',
  });

  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<string | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [resourceToAssign, setResourceToAssign] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  
  // Filter resources based on search term and filters
  const filteredResources = resources.filter(resource => {
    // Text search
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const matchesType = resourceTypeFilter === 'all' || resource.type === resourceTypeFilter;
    
    // Status filter
    const matchesStatus = resourceStatusFilter === 'all' || resource.status === resourceStatusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // If not admin, only show resources assigned to the current user
  const displayedResources = isAdmin
    ? filteredResources
    : getUserResources(currentUser?.id || '').filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
  const handleAddResource = () => {
    if (!newResource.title || !newResource.description || !newResource.type) return;
    
    addResource({
      title: newResource.title,
      description: newResource.description,
      type: newResource.type,
      status: 'available',
    });
    
    // Reset form
    setNewResource({
      title: '',
      description: '',
      type: 'document',
    });
  };
  
  const handleUpdateResource = () => {
    if (!editingResource || !editingResource.title || !editingResource.description) return;
    
    updateResource(editingResource.id, {
      title: editingResource.title,
      description: editingResource.description,
      type: editingResource.type,
    });
    
    setEditingResource(null);
  };
  
  const handleDeleteResource = () => {
    if (resourceToDelete) {
      deleteResource(resourceToDelete);
      setResourceToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };
  
  const handleAssignResource = () => {
    if (resourceToAssign && selectedUserId) {
      assignResource(resourceToAssign, selectedUserId);
      setResourceToAssign(null);
      setSelectedUserId('');
      setIsAssignDialogOpen(false);
    }
  };
  
  const handleUnassignResource = (resourceId: string) => {
    unassignResource(resourceId);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-gray-500 mt-1">
            {isAdmin 
              ? "Manage and assign resources to employees" 
              : "View resources assigned to you"}
          </p>
        </div>
        
        {isAdmin && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-resource hover:bg-resource-dark">
                <Plus className="mr-2 h-4 w-4" /> Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogDescription>
                  Create a new resource that can be assigned to employees.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={newResource.title}
                    onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                    placeholder="Enter resource title"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={newResource.type}
                    onValueChange={(value) => setNewResource({...newResource, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={newResource.description}
                    onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                    placeholder="Enter resource description"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={handleAddResource} className="bg-resource hover:bg-resource-dark">
                  Add Resource
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search resources..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {isAdmin && (
            <div className="flex flex-col md:flex-row gap-4">
              <Select
                value={resourceTypeFilter}
                onValueChange={setResourceTypeFilter}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={resourceStatusFilter}
                onValueChange={setResourceStatusFilter}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="assigned">Assigned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        
        {displayedResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedResources.map((resource) => {
              const assignedUser = getResourceUser(resource.id);
              
              return (
                <Card key={resource.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="mr-2 bg-resource bg-opacity-10 p-2 rounded-full">
                          {ResourceTypeIcons[resource.type] || <Package className="h-4 w-4" />}
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </div>
                      
                      {isAdmin && (
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setEditingResource(resource)}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => {
                              setResourceToDelete(resource.id);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="h-8 w-8 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs capitalize">
                        {resource.type}
                      </Badge>
                      <span className="mx-2">•</span>
                      <span className={`text-xs ${
                        resource.status === 'assigned' 
                          ? 'text-green-600' 
                          : 'text-blue-600'
                      }`}>
                        {resource.status}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                    
                    {assignedUser && (
                      <div className="mt-3 bg-gray-50 p-2 rounded-md flex items-center">
                        <div className="w-6 h-6 bg-resource text-white rounded-full flex items-center justify-center text-xs mr-2">
                          {assignedUser.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-medium">Assigned to</p>
                          <p className="text-sm">{assignedUser.name}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  
                  {isAdmin && (
                    <CardFooter className="pt-0">
                      {resource.status === 'assigned' ? (
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center justify-center" 
                          onClick={() => handleUnassignResource(resource.id)}
                        >
                          <UserMinus className="mr-2 h-4 w-4" />
                          Unassign
                        </Button>
                      ) : (
                        <Button 
                          className="w-full flex items-center justify-center bg-resource hover:bg-resource-dark" 
                          onClick={() => {
                            setResourceToAssign(resource.id);
                            setIsAssignDialogOpen(true);
                          }}
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          Assign to User
                        </Button>
                      )}
                    </CardFooter>
                  )}
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-gray-300" />
            <h3 className="mt-4 text-lg font-medium">No resources found</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm 
                ? "Try adjusting your search or filters"
                : isAdmin 
                  ? "Create your first resource by clicking the 'Add Resource' button"
                  : "No resources are currently assigned to you"}
            </p>
          </div>
        )}
      </div>
      
      {/* Edit Resource Dialog */}
      <Dialog open={!!editingResource} onOpenChange={(open) => !open && setEditingResource(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Resource</DialogTitle>
            <DialogDescription>
              Update the resource details below.
            </DialogDescription>
          </DialogHeader>
          
          {editingResource && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input 
                  id="edit-title" 
                  value={editingResource.title}
                  onChange={(e) => setEditingResource({...editingResource, title: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-type">Type</Label>
                <Select
                  value={editingResource.type}
                  onValueChange={(value) => setEditingResource({...editingResource, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="software">Software</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  value={editingResource.description}
                  onChange={(e) => setEditingResource({...editingResource, description: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingResource(null)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateResource} className="bg-resource hover:bg-resource-dark">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this resource? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteResource}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Assign Resource Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Resource</DialogTitle>
            <DialogDescription>
              Select a user to assign this resource to.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="user-select">User</Label>
            <Select
              value={selectedUserId}
              onValueChange={setSelectedUserId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {users
                  .filter(user => user.role === 'employee')
                  .map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAssignResource}
              disabled={!selectedUserId}
              className="bg-resource hover:bg-resource-dark"
            >
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;
