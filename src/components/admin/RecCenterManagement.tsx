
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { Loader2, Plus } from "lucide-react";
import RecCenterForm from "./RecCenterForm";
import RecCentersTable from "./RecCentersTable";
import { useRecCenters } from "@/hooks/useRecCenters";
import { useRecCenterForm, initialCenterState } from "@/hooks/useRecCenterForm";
import type { RecCenter } from "@/types/database";

const RecCenterManagement = () => {
  const { centers, loading, createCenter, updateCenter, deleteCenter } = useRecCenters();
  const { 
    currentCenter, 
    amenitiesInput, 
    isSaving, 
    setIsSaving,
    handleInputChange, 
    handleAmenitiesChange, 
    prepareCenter, 
    resetForm 
  } = useRecCenterForm();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Create a new recreation center
  const handleCreateCenter = async () => {
    try {
      setIsSaving(true);
      const centerData = prepareCenter();
      const result = await createCenter(centerData);
      
      if (result) {
        setIsCreateDialogOpen(false);
        resetForm();
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Update a recreation center
  const handleUpdateCenter = async () => {
    try {
      setIsSaving(true);
      const centerData = prepareCenter();
      const success = await updateCenter(centerData);
      
      if (success) {
        setIsEditDialogOpen(false);
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Open edit dialog with center data
  const openEditDialog = (center: RecCenter) => {
    resetForm(center, center.amenities.join(", "));
    setIsEditDialogOpen(true);
  };

  // Reset form for creating a new center
  const openCreateDialog = () => {
    resetForm();
    setIsCreateDialogOpen(true);
  };

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
              
              <div className="py-4">
                <RecCenterForm
                  center={currentCenter}
                  onInputChange={handleInputChange}
                  amenitiesInput={amenitiesInput}
                  onAmenitiesChange={handleAmenitiesChange}
                />
              </div>
              
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
              
              <div className="py-4">
                <RecCenterForm
                  center={currentCenter}
                  onInputChange={handleInputChange}
                  amenitiesInput={amenitiesInput}
                  onAmenitiesChange={handleAmenitiesChange}
                />
              </div>
              
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
          <RecCentersTable 
            centers={centers} 
            onEdit={openEditDialog} 
            onDelete={deleteCenter} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default RecCenterManagement;
