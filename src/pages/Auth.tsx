
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Container } from "@/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { useCreateAdmin } from "@/hooks/useCreateAdmin";

const Auth = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const from = location.state?.from || '/';

  // Create admin account if it doesn't exist
  useCreateAdmin();

  // If already logged in, redirect to home
  if (user && !loading) {
    return <Navigate to={from} replace />;
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-gradient-to-b from-secondary/30 to-background">
        <Container className="py-8 md:py-12 max-w-md mx-auto">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome to RecFit
              </h1>
              <p className="text-muted-foreground">
                Sign in or create an account to get started
              </p>
            </div>

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <SignInForm />
              </TabsContent>

              <TabsContent value="signup">
                <SignUpForm />
              </TabsContent>
            </Tabs>

            <div className="mt-4 text-sm text-center">
              <p className="text-muted-foreground">
                Admin account: <strong>janedoe@gmail.com</strong> / password: <strong>123456</strong>
              </p>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default Auth;
