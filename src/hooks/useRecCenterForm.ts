
import { useState } from "react";
import type { RecCenter } from "@/types/database";

// Define the initial state for a new rec center
export const initialCenterState: RecCenter = {
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

export const useRecCenterForm = (initialCenter: RecCenter = initialCenterState) => {
  const [currentCenter, setCurrentCenter] = useState<RecCenter>(initialCenter);
  const [amenitiesInput, setAmenitiesInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Reset form with a new center
  const resetForm = (center: RecCenter = initialCenterState, amenitiesString: string = "") => {
    setCurrentCenter(center);
    setAmenitiesInput(amenitiesString);
  };

  // Handle input change for center form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setCurrentCenter((prev) => {
        // Create a safe copy of the nested object or use an empty object if it doesn't exist
        const parentObject = typeof prev[parent as keyof RecCenter] === 'object' 
          ? prev[parent as keyof RecCenter] 
          : {};
          
        // Make sure parentObject is indeed an object before spreading
        if (parentObject && typeof parentObject === 'object') {
          return {
            ...prev,
            [parent]: {
              ...parentObject,
              [child]: value,
            },
          };
        }
        
        // Fallback for non-object parent (shouldn't happen with our data structure)
        return {
          ...prev,
          [parent]: { [child]: value },
        };
      });
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
  const prepareCenter = (): RecCenter => {
    return {
      ...currentCenter,
      amenities: amenitiesInput.split(",").map((item) => item.trim()).filter(Boolean),
    };
  };

  return {
    currentCenter,
    amenitiesInput,
    isSaving,
    setIsSaving,
    handleInputChange,
    handleAmenitiesChange,
    prepareCenter,
    resetForm
  };
};
