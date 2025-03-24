import { supabase, testSupabaseConnection } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { RecCenter, Program } from "@/types/database";

// Adds a connection check before fetching data
const ensureConnection = async () => {
  const connectionStatus = await testSupabaseConnection();
  if (!connectionStatus.success) {
    throw new Error(`Database connection failed: ${connectionStatus.message || 'Unable to connect to the database'}`);
  }
  return connectionStatus;
};

export async function fetchAllCenters(): Promise<RecCenter[]> {
  console.log("Fetching all centers from Supabase...");
  try {
    // Check connection first
    await ensureConnection();
    
    const { data, error, status } = await supabase
      .from("rec_centers")
      .select("*");

    console.log("fetchAllCenters response status:", status);
    
    if (error) {
      console.error("Error fetching recreation centers:", error);
      toast.error(`Failed to fetch recreation centers: ${error.message}`);
      throw new Error(`Failed to fetch recreation centers: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.log("No recreation centers found in the database");
      return [];
    }

    console.log(`Successfully fetched ${data?.length || 0} centers`);
    return data as RecCenter[];
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error("Unexpected error in fetchAllCenters:", err);
    toast.error(`Data fetch error: ${errorMessage}`);
    throw err;
  }
}

export async function fetchCenterById(id: string): Promise<RecCenter | null> {
  try {
    // Check connection first
    await ensureConnection();
    
    const { data, error, status } = await supabase
      .from("rec_centers")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    console.log("fetchCenterById response status:", status);
    
    if (error) {
      console.error(`Error fetching recreation center ${id}:`, error);
      toast.error(`Failed to fetch recreation center: ${error.message}`);
      throw new Error("Failed to fetch recreation center");
    }

    return data as RecCenter | null;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error(`Error in fetchCenterById:`, err);
    toast.error(`Error loading center details: ${errorMessage}`);
    throw err;
  }
}

export async function fetchCenterPrograms(centerId: string): Promise<Program[]> {
  const { data, error } = await supabase
    .from("programs")
    .select("*")
    .eq("rec_center_id", centerId);

  if (error) {
    console.error(`Error fetching programs for center ${centerId}:`, error);
    throw new Error("Failed to fetch center programs");
  }

  return data as Program[];
}

export async function filterCenters(query: string): Promise<RecCenter[]> {
  const lowerCaseQuery = query.toLowerCase();
  
  // First fetch all centers
  const { data: centers, error: centersError } = await supabase
    .from("rec_centers")
    .select("*");

  if (centersError) {
    console.error("Error fetching centers for filtering:", centersError);
    throw new Error("Failed to filter centers");
  }

  // Then fetch programs for potential program name filtering
  const { data: programs, error: programsError } = await supabase
    .from("programs")
    .select("*");

  if (programsError) {
    console.error("Error fetching programs for filtering:", programsError);
    throw new Error("Failed to fetch programs for filtering");
  }

  // Filter centers based on the query
  return (centers as RecCenter[]).filter((center) => {
    // Check center name and city
    if (
      center.name.toLowerCase().includes(lowerCaseQuery) ||
      center.city.toLowerCase().includes(lowerCaseQuery)
    ) {
      return true;
    }

    // Check amenities
    if (center.amenities.some(amenity => 
      amenity.toLowerCase().includes(lowerCaseQuery)
    )) {
      return true;
    }

    // Check programs
    const centerPrograms = programs.filter(program => program.rec_center_id === center.id);
    return centerPrograms.some(program => 
      program.name.toLowerCase().includes(lowerCaseQuery)
    );
  });
}
