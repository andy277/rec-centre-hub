
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { RecCenter } from "@/types/database";

export const useRecCenters = () => {
  const [centers, setCenters] = useState<RecCenter[]>([]);
  const [loading, setLoading] = useState(true);

  // Load recreation centers
  useEffect(() => {
    fetchCenters();
  }, []);

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

  // Create a new recreation center
  const createCenter = async (centerData: RecCenter) => {
    try {
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
        return null;
      }

      toast.success("Recreation center created successfully");
      // Properly type the new center
      const newCenter = {
        ...data[0],
        hours: data[0].hours as RecCenter['hours'],
        coordinates: data[0].coordinates as RecCenter['coordinates']
      };
      
      setCenters([...centers, newCenter]);
      return newCenter;
    } catch (error) {
      console.error("Error in create:", error);
      toast.error("An error occurred");
      return null;
    }
  };

  // Update a recreation center
  const updateCenter = async (centerData: RecCenter) => {
    try {
      const { data, error } = await supabase
        .from("rec_centers")
        .update(centerData)
        .eq("id", centerData.id)
        .select();

      if (error) {
        toast.error("Failed to update recreation center");
        console.error("Error updating center:", error);
        return false;
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
      return true;
    } catch (error) {
      console.error("Error in update:", error);
      toast.error("An error occurred");
      return false;
    }
  };

  // Delete a recreation center
  const deleteCenter = async (id: string) => {
    try {
      const { error } = await supabase
        .from("rec_centers")
        .delete()
        .eq("id", id);

      if (error) {
        toast.error("Failed to delete recreation center");
        console.error("Error deleting center:", error);
        return false;
      }

      toast.success("Recreation center deleted successfully");
      setCenters(centers.filter((c) => c.id !== id));
      return true;
    } catch (error) {
      console.error("Error in delete:", error);
      toast.error("An error occurred");
      return false;
    }
  };

  return {
    centers,
    loading,
    fetchCenters,
    createCenter,
    updateCenter,
    deleteCenter
  };
};
