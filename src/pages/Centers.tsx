
import { useState, useEffect } from "react";
import { RecCenterList } from "@/components/RecCenterList";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { RefreshCw, Database } from "lucide-react";
import { testSupabaseConnection } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Centers = () => {
  const [connectionStatus, setConnectionStatus] = useState<{success: boolean, message: string} | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  // Check Supabase connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setIsChecking(true);
        const result = await testSupabaseConnection();
        setConnectionStatus({
          success: result.success,
          message: result.message || (result.success ? 'Connected to database' : 'Failed to connect to database')
        });
        if (result.success) {
          console.log("Database connection successful");
        } else {
          console.error("Database connection failed:", result.error);
        }
      } catch (error) {
        console.error("Error checking connection:", error);
        setConnectionStatus({
          success: false,
          message: 'Error checking database connection'
        });
      } finally {
        setIsChecking(false);
      }
    };

    checkConnection();
  }, []);

  const handleRetry = async () => {
    setIsChecking(true);
    setConnectionStatus(null);
    
    try {
      const result = await testSupabaseConnection();
      setConnectionStatus({
        success: result.success,
        message: result.message || (result.success ? 'Connected to database' : 'Failed to connect to database')
      });
      
      if (result.success) {
        toast.success("Successfully connected to database");
        window.location.reload(); // Force reload the page to refresh data
      } else {
        toast.error("Failed to connect to database");
      }
    } catch (error) {
      toast.error("Error checking connection");
      setConnectionStatus({
        success: false,
        message: 'Error checking database connection'
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-12 min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Container className="py-8 md:py-12 animate-fade-in">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  Recreation Centers
                </h1>
                
                {connectionStatus && (
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    connectionStatus.success 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    <Database className="h-3 w-3" />
                    {connectionStatus.success ? 'Connected' : 'Connection issue'}
                    {!connectionStatus.success && (
                      <Button 
                        onClick={handleRetry} 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 ml-1 px-1.5 text-xs hover:bg-amber-200"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Retry
                      </Button>
                    )}
                  </div>
                )}
              </div>
              
              <p className="text-muted-foreground max-w-3xl">
                Explore our network of recreation centers offering a variety of amenities and programs for all ages and interests.
              </p>
            </div>
            <Separator className="bg-gradient-to-r from-primary/20 to-primary/5" />
            <RecCenterList />
          </div>
        </Container>
      </main>
    </>
  );
};

export default Centers;
