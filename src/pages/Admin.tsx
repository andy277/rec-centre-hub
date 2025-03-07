
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import RecCenterManagement from "@/components/admin/RecCenterManagement";
import { Button } from "@/components/ui/button";

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();

  // If loading, show loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen bg-gradient-to-b from-secondary/30 to-background">
          <Container>
            <div className="py-12 text-center">Loading...</div>
          </Container>
        </main>
      </>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" state={{ from: "/admin" }} replace />;
  }

  // If authenticated but not admin, show unauthorized message
  if (!isAdmin) {
    return (
      <>
        <Navbar />
        <main className="pt-20 min-h-screen bg-gradient-to-b from-secondary/30 to-background">
          <Container>
            <div className="py-12 text-center">
              <h1 className="text-2xl font-bold text-destructive mb-4">Unauthorized Access</h1>
              <p className="mb-6">You do not have permission to access the admin area.</p>
              <Button asChild>
                <a href="/">Return to Home</a>
              </Button>
            </div>
          </Container>
        </main>
      </>
    );
  }

  // Admin dashboard
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-secondary/30 to-background">
        <Container className="py-8 md:py-12">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage recreation centers, programs, and users
              </p>
            </div>
            <Separator />

            <Tabs defaultValue="centers" className="space-y-6">
              <TabsList>
                <TabsTrigger value="centers">Recreation Centers</TabsTrigger>
                <TabsTrigger value="programs">Programs</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
              </TabsList>

              <TabsContent value="centers" className="space-y-6">
                <RecCenterManagement />
              </TabsContent>

              <TabsContent value="programs">
                <div className="py-6 text-center text-muted-foreground">
                  Program management coming soon
                </div>
              </TabsContent>

              <TabsContent value="users">
                <div className="py-6 text-center text-muted-foreground">
                  User management coming soon
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Admin;
