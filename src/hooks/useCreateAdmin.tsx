
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useCreateAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    const createAdminAccount = async () => {
      try {
        setLoading(true);
        
        // First, check if the user already exists
        const { data: existingUser } = await supabase.auth.admin.getUserByEmail("janedoe@gmail.com");
        
        if (!existingUser) {
          // Create the admin user
          const { data, error } = await supabase.auth.signUp({
            email: "janedoe@gmail.com",
            password: "123456",
            options: {
              data: {
                username: "Jane Doe",
              },
            },
          });
          
          if (error) {
            console.error("Error creating admin user:", error);
            return;
          }
          
          // User created, now add admin role
          if (data.user) {
            const { error: roleError } = await supabase
              .from("user_roles")
              .insert({
                user_id: data.user.id,
                role: "admin",
              });
            
            if (roleError) {
              console.error("Error assigning admin role:", roleError);
              return;
            }
            
            setCreated(true);
            toast.success("Admin account created successfully");
          }
        } else {
          // User already exists, check if they have admin role
          const { data: roleData, error: roleError } = await supabase
            .from("user_roles")
            .select("*")
            .eq("user_id", existingUser.id)
            .eq("role", "admin")
            .maybeSingle();
          
          if (roleError) {
            console.error("Error checking admin role:", roleError);
            return;
          }
          
          // If no admin role found, assign it
          if (!roleData) {
            const { error } = await supabase
              .from("user_roles")
              .insert({
                user_id: existingUser.id,
                role: "admin",
              });
            
            if (error) {
              console.error("Error assigning admin role:", error);
              return;
            }
            
            toast.success("Admin role assigned to existing user");
          } else {
            toast.info("Admin account already exists");
          }
          
          setCreated(true);
        }
      } catch (error) {
        console.error("Error in createAdminAccount:", error);
        toast.error("Failed to create admin account");
      } finally {
        setLoading(false);
      }
    };
    
    // We'll try to create the admin account when this hook is first used
    createAdminAccount();
  }, []);
  
  return { loading, created };
};

// Note: This hook is for demonstration purposes.
// In a real application, admin creation would be handled more securely.
