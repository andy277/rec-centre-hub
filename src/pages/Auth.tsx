
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const from = location.state?.from || '/';

  // Create admin account if it doesn't exist
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

        // Check if user exists or was created
        const { data: { user: adminUser } } = await supabase.auth.admin
          ? await supabase.auth.admin.getUserByEmail("janedoe@gmail.com")
          : { data: { user: userData?.user } };

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

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        toast.error(error.message || "Failed to sign in");
        setIsLoading(false);
        return;
      }

      toast.success("Signed in successfully!");
      // No need to set loading to false here as we'll redirect
    } catch (error: any) {
      toast.error(error.message || "An error occurred during sign in");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
};

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signUp(email, password, username);

      if (error) {
        toast.error(error.message || "Failed to sign up");
        setIsLoading(false);
        return;
      }

      toast.success("Signed up successfully! Check your email to confirm your account.");
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message || "An error occurred during sign up");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <label htmlFor="signup-email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="signup-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
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
          placeholder="johndoe"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="signup-password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          minLength={6}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
};

export default Auth;
