
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

interface ProfileData {
  username: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { user, loading } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function getProfile() {
      if (!user) return;

      setIsLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } else if (data) {
        setProfile(data);
        setUsername(data.username || "");
      }
      setIsLoading(false);
    }

    if (!loading) {
      getProfile();
    }
  }, [user, loading]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ username })
      .eq("id", user.id);

    if (error) {
      toast.error("Failed to update profile");
      console.error("Error updating profile:", error);
    } else {
      toast.success("Profile updated successfully");
      setProfile(prev => ({ ...prev!, username }));
    }
    setIsSaving(false);
  };

  // Redirect if not logged in
  if (!loading && !user) {
    return <Navigate to="/auth" state={{ from: "/profile" }} replace />;
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-secondary/30 to-background">
        <Container className="py-8 md:py-12 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
              <p className="text-muted-foreground">
                View and update your profile information
              </p>
            </div>
            <Separator />

            {isLoading ? (
              <div className="py-12 text-center">Loading profile...</div>
            ) : (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Your email address cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a username"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Container>
      </main>
    </>
  );
};

export default Profile;
