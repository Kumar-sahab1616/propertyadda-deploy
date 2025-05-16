import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "wouter";
import { Property, User } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";

export default function Admin() {
  const { user, isLoading: authLoading } = useAuth();
  const [, navigate] = useRouter();
  const { toast } = useToast();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFeatured, setFilterFeatured] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, authLoading, navigate, toast]);

  // Fetch all properties
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    enabled: !!user && user.role === "admin",
  });

  // Fetch all users
  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
    enabled: !!user && user.role === "admin",
  });

  // Delete property mutation
  const deleteMutation = useMutation({
    mutationFn: async (propertyId: number) => {
      const response = await apiRequest("DELETE", `/api/properties/${propertyId}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Property deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete property.",
        variant: "destructive",
      });
    },
  });

  // Toggle featured property mutation
  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, featured }: { id: number; featured: boolean }) => {
      const response = await apiRequest("PUT", `/api/properties/${id}`, { featured });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Property updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update property.",
        variant: "destructive",
      });
    },
  });

  // Handle property deletion
  const handleDeleteProperty = () => {
    if (selectedProperty) {
      deleteMutation.mutate(selectedProperty.id);
    }
  };

  // Handle toggle featured
  const handleToggleFeatured = (property: Property) => {
    toggleFeaturedMutation.mutate({
      id: property.id,
      featured: !property.featured,
    });
  };

  // Filter and search properties
  const filteredProperties = properties?.filter((property) => {
    const matchesSearch = searchTerm
      ? property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    const matchesFeatured = filterFeatured ? property.featured : true;
    
    return matchesSearch && matchesFeatured;
  });

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null; // Will redirect via useEffect
  }

  return (
    <>
      <Helmet>
        <title>Admin Panel | PropertyAdda</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-secondary-900">Admin Panel</h1>
            <p className="text-secondary-600">Manage properties, users, and site content</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-accent-500 hover:bg-accent-600">
              <i className="fas fa-plus mr-2"></i> Add New Property
            </Button>
          </div>
        </div>

        <Tabs defaultValue="properties" className="space-y-4">
          <TabsList>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Properties Management</CardTitle>
                <CardDescription>
                  Manage all properties listed on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search by property name, location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={filterFeatured}
                      onCheckedChange={(checked) => setFilterFeatured(checked === true)}
                    />
                    <label htmlFor="featured" className="text-sm cursor-pointer">
                      Show Featured Only
                    </label>
                  </div>
                </div>
                
                {isLoading ? (
                  <p className="text-center py-8">Loading properties...</p>
                ) : filteredProperties && filteredProperties.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Property</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="text-center">Featured</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredProperties.map((property) => (
                          <TableRow key={property.id}>
                            <TableCell className="font-medium">{property.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <img
                                  src={property.images[0]}
                                  alt={property.title}
                                  className="h-10 w-10 rounded-md object-cover"
                                />
                                <div>
                                  <div className="font-medium">{property.title}</div>
                                  <div className="text-xs text-secondary-500">{property.type}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {property.locality}, {property.city}
                            </TableCell>
                            <TableCell>
                              ₹{formatCurrency(property.price)}
                              {property.status === "For Rent" && "/month"}
                            </TableCell>
                            <TableCell className="text-center">
                              <button
                                onClick={() => handleToggleFeatured(property)}
                                className={`text-lg ${
                                  property.featured ? "text-yellow-500" : "text-secondary-300"
                                }`}
                              >
                                <i className="fas fa-star"></i>
                              </button>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => navigate(`/properties/${property.id}`)}
                                >
                                  <i className="fas fa-eye text-secondary-700"></i>
                                </Button>
                                <Button size="sm" variant="outline">
                                  <i className="fas fa-edit text-primary-700"></i>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setSelectedProperty(property);
                                    setIsDeleteDialogOpen(true);
                                  }}
                                >
                                  <i className="fas fa-trash text-destructive"></i>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-secondary-500">No properties found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Users Management</CardTitle>
                <CardDescription>
                  Manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <p className="text-center py-8">Loading users...</p>
                ) : users && users.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>
                              <div className="font-medium">{user.fullName}</div>
                              <div className="text-xs text-secondary-500">@{user.username}</div>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <span 
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  user.role === "admin"
                                    ? "bg-primary-100 text-primary-800"
                                    : "bg-secondary-100 text-secondary-800"
                                }`}
                              >
                                {user.role}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button size="sm" variant="outline">
                                  <i className="fas fa-edit text-primary-700"></i>
                                </Button>
                                <Button size="sm" variant="outline">
                                  <i className="fas fa-trash text-destructive"></i>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-secondary-500">No users found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>
                  Configure website settings and content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-secondary-500">
                  Settings panel is not implemented in this demo
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Property Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedProperty && (
            <div className="flex items-center space-x-3 py-2">
              <img
                src={selectedProperty.images[0]}
                alt={selectedProperty.title}
                className="h-12 w-12 rounded-md object-cover"
              />
              <div>
                <p className="font-medium">{selectedProperty.title}</p>
                <p className="text-sm text-secondary-500">
                  {selectedProperty.locality}, {selectedProperty.city}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProperty}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete Property"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
