
import { supabase } from "@/integrations/supabase/client";
import type { RecCenter, Program } from "@/types/database";

export async function fetchAllCenters(): Promise<RecCenter[]> {
  const { data, error } = await supabase
    .from("rec_centers")
    .select("*");

  if (error) {
    console.error("Error fetching recreation centers:", error);
    throw new Error("Failed to fetch recreation centers");
  }

  return data as RecCenter[];
}

export async function fetchCenterById(id: string): Promise<RecCenter | null> {
  const { data, error } = await supabase
    .from("rec_centers")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching recreation center ${id}:`, error);
    throw new Error("Failed to fetch recreation center");
  }

  return data as RecCenter | null;
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
