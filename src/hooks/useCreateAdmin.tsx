
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useCreateAdmin = () => {
  useEffect(() => {
    const createAdminAccount = async () => {
      try {
        // Try to sign up the admin user
        const { data: userData, error: signUpError } = await supabase.auth.signUp({
          email: "janedoe@gmail.com",
          password: "123456",
          options: {
            data: {
              username: "Jane Doe",
            },
          },
        });

        if (signUpError && signUpError.message !== "User already registered") {
          console.error("Error creating admin user:", signUpError);
          return;
        }

        // Check if the user was created or already exists
        let adminUser = userData?.user;
        
        // If we didn't get a user from sign up, try to get existing user
        if (!adminUser) {
          // Try to sign in to get the user
          const { data: signInData } = await supabase.auth.signInWithPassword({
            email: "janedoe@gmail.com",
            password: "123456",
          });
          adminUser = signInData.user;
          
          // Sign out immediately if we signed in just to get the user
          if (adminUser) {
            await supabase.auth.signOut();
          }
        }

        if (adminUser) {
          // Check if user already has admin role
          const { data: existingRole } = await supabase
            .from("user_roles")
            .select("*")
            .eq("user_id", adminUser.id)
            .eq("role", "admin")
            .maybeSingle();

          // If no admin role, add it
          if (!existingRole) {
            await supabase
              .from("user_roles")
              .insert({
                user_id: adminUser.id,
                role: "admin",
              });
            
            console.log("Admin role assigned to user");
          }
        }
      } catch (error) {
        console.error("Error in admin account creation:", error);
      }
    };

    createAdminAccount();
  }, []);
};
