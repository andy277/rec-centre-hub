
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Plus, Pencil, Trash } from "lucide-react";
import type { RecCenter } from "@/types/database";

const initialCenterState: RecCenter = {
  id: "",
  name: "",
  description: "",
  address: "",
  city: "",
  state: "",
  postal_code: "",
  phone: "",
  email: "",
  website: "",
  hours: {
    monday: "9:00 AM - 9:00 PM",
    tuesday: "9:00 AM - 9:00 PM",
    wednesday: "9:00 AM - 9:00 PM",
    thursday: "9:00 AM - 9:00 PM",
    friday: "9:00 AM - 9:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "10:00 AM - 6:00 PM",
  },
  amenities: [],
  image_url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f",
  rating: 0,
  reviews: 0,
  coordinates: {
    lat: 0,
    lng: 0,
  },
};

const RecCenterManagement = () => {
  const [centers, setCenters] = useState<RecCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentCenter, setCurrentCenter] = useState<RecCenter>(initialCenterState);
  const [amenitiesInput, setAmenitiesInput] = useState("");

  // Load recreation centers
  useEffect(() => {
    const fetchCenters = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("rec_centers")
        .select("*")
        .order("name");

      if (error) {
        toast.error("Failed to load recreation centers");
        console.error("Error loading centers:", error);
      } else {
        // Ensure the data conforms to our RecCenter type
        const typedCenters: RecCenter[] = data?.map(center => ({
          ...center,
          // Ensure hours has the correct structure
          hours: center.hours as RecCenter['hours'],
          // Ensure coordinates has the correct structure
          coordinates: center.coordinates as RecCenter['coordinates']
        })) || [];
        
        setCenters(typedCenters);
      }
      setLoading(false);
    };

    fetchCenters();
  }, []);

  // Handle input change for center form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setCurrentCenter((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof RecCenter],
          [child]: value,
        },
      }));
    } else {
      setCurrentCenter((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle amenities input
  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmenitiesInput(e.target.value);
  };

  // Prepare center for form submission
  const prepareCenter = () => {
    return {
      ...currentCenter,
      amenities: amenitiesInput.split(",").map((item) => item.trim()),
    };
  };

  // Create a new recreation center
  const handleCreateCenter = async () => {
    try {
      setIsSaving(true);
      const centerData = prepareCenter();
      
      // Generate a random ID if not provided
      if (!centerData.id) {
        centerData.id = Math.random().toString(36).substring(2, 15);
      }

      const { data, error } = await supabase
        .from("rec_centers")
        .insert([centerData])
        .select();

      if (error) {
        toast.error("Failed to create recreation center");
        console.error("Error creating center:", error);
        return;
      }

      toast.success("Recreation center created successfully");
      // Properly type the new center
      const newCenter = {
        ...data[0],
        hours: data[0].hours as RecCenter['hours'],
        coordinates: data[0].coordinates as RecCenter['coordinates']
      };
      
      setCenters([...centers, newCenter]);
      setIsCreateDialogOpen(false);
      setCurrentCenter(initialCenterState);
      setAmenitiesInput("");
    } catch (error) {
      console.error("Error in create:", error);
      toast.error("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  // Update a recreation center
  const handleUpdateCenter = async () => {
    try {
      setIsSaving(true);
      const centerData = prepareCenter();

      const { data, error } = await supabase
        .from("rec_centers")
        .update(centerData)
        .eq("id", centerData.id)
        .select();

      if (error) {
        toast.error("Failed to update recreation center");
        console.error("Error updating center:", error);
        return;
      }

      toast.success("Recreation center updated successfully");
      // Properly type the updated center
      const updatedCenter = {
        ...data[0],
        hours: data[0].hours as RecCenter['hours'],
        coordinates: data[0].coordinates as RecCenter['coordinates']
      };
      
      setCenters(
        centers.map((c) => (c.id === centerData.id ? updatedCenter : c))
      );
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error in update:", error);
      toast.error("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  // Delete a recreation center
  const handleDeleteCenter = async (id: string) => {
    try {
      const { error } = await supabase
        .from("rec_centers")
        .delete()
        .eq("id", id);

      if (error) {
        toast.error("Failed to delete recreation center");
        console.error("Error deleting center:", error);
        return;
      }

      toast.success("Recreation center deleted successfully");
      setCenters(centers.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error in delete:", error);
      toast.error("An error occurred");
    }
  };

  // Open edit dialog with center data
  const openEditDialog = (center: RecCenter) => {
    setCurrentCenter(center);
    setAmenitiesInput(center.amenities.join(", "));
    setIsEditDialogOpen(true);
  };

  // Reset form for creating a new center
  const openCreateDialog = () => {
    setCurrentCenter(initialCenterState);
    setAmenitiesInput("");
    setIsCreateDialogOpen(true);
  };

  const renderCenterForm = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium" htmlFor="name">
          Name
        </label>
        <Input
          id="name"
          name="name"
          value={currentCenter.name}
          onChange={handleInputChange}
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="image_url">
          Image URL
        </label>
        <Input
          id="image_url"
          name="image_url"
          value={currentCenter.image_url}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="text-sm font-medium" htmlFor="description">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={currentCenter.description}
          onChange={handleInputChange}
          className="mt-1"
          rows={3}
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="text-sm font-medium" htmlFor="address">
          Address
        </label>
        <Input
          id="address"
          name="address"
          value={currentCenter.address}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="city">
          City
        </label>
        <Input
          id="city"
          name="city"
          value={currentCenter.city}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="state">
          State
        </label>
        <Input
          id="state"
          name="state"
          value={currentCenter.state}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="postal_code">
          Postal Code
        </label>
        <Input
          id="postal_code"
          name="postal_code"
          value={currentCenter.postal_code}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="phone">
          Phone
        </label>
        <Input
          id="phone"
          name="phone"
          value={currentCenter.phone}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          name="email"
          value={currentCenter.email}
          onChange={handleInputChange}
          className="mt-1"
          type="email"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium" htmlFor="website">
          Website
        </label>
        <Input
          id="website"
          name="website"
          value={currentCenter.website}
          onChange={handleInputChange}
          className="mt-1"
          type="url"
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="text-sm font-medium" htmlFor="amenities">
          Amenities (comma separated)
        </label>
        <Input
          id="amenities"
          name="amenities"
          value={amenitiesInput}
          onChange={handleAmenitiesChange}
          className="mt-1"
          placeholder="Pool, Basketball Court, Fitness Center"
        />
      </div>
    </div>
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Recreation Centers</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" /> Add Center
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Create Recreation Center</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new recreation center.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">{renderCenterForm()}</div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateCenter} 
                  disabled={isSaving || !currentCenter.name}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Create Center"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-2xl overflow-y-auto max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Edit Recreation Center</DialogTitle>
                <DialogDescription>
                  Update the details of this recreation center.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">{renderCenterForm()}</div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdateCenter} 
                  disabled={isSaving || !currentCenter.name}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Update Center"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : centers.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">
            No recreation centers found. Add one to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {centers.map((center) => (
                  <TableRow key={center.id}>
                    <TableCell className="font-medium">{center.name}</TableCell>
                    <TableCell>{center.city}</TableCell>
                    <TableCell>{center.state}</TableCell>
                    <TableCell>{center.phone}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(center)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Recreation Center</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{center.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteCenter(center.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecCenterManagement;
