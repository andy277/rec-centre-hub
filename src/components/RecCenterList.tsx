
import { useState, useEffect, useCallback } from 'react';
import { Layout, Grid, Loader2, RefreshCw, ServerOff, DatabaseIcon } from 'lucide-react';
import RecCenter from './RecCenter';
import SearchFilter from './SearchFilter';
import { RecCenter as RecCenterType } from '@/types/database';
import { fetchAllCenters, filterCenters } from '@/services/recCenterService';
import { toast } from 'sonner';
import { supabase, testSupabaseConnection, getSupabaseDebugInfo } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

interface RecCenterListProps {
  initialCenters?: RecCenterType[];
}

export const RecCenterList = ({ initialCenters }: RecCenterListProps) => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [centers, setCenters] = useState<RecCenterType[]>(initialCenters || []);
  const [filteredCenters, setFilteredCenters] = useState<RecCenterType[]>(initialCenters || []);
  const [loading, setLoading] = useState(!initialCenters);
  const [error, setError] = useState<string | null>(null);
  const [connectionTested, setConnectionTested] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  
  // Function to load recreation centers with built-in retry logic
  const loadCenters = useCallback(async (isRetry = false) => {
    try {
      setLoading(true);
      setError(null);
      
      // Test Supabase connection first
      const connectionTest = await testSupabaseConnection();
      setConnectionTested(true);
      
      // Get debug info
      const debugData = getSupabaseDebugInfo();
      setDebugInfo(debugData);
      console.log("Supabase debug info:", debugData);
            
      if (!connectionTest.success) {
        console.error("Supabase connection error:", connectionTest.error, connectionTest.message);
        setError(`Failed to connect to database: ${connectionTest.message || 'Unknown error'}. Please check your network connection and refresh the page.`);
        toast.error("Database connection issue");
        setLoading(false);
        return;
      }
      
      console.log("Supabase connection successful with status:", connectionTest.status);
      
      const data = await fetchAllCenters();
      console.log("Centers fetched:", data.length);
      setCenters(data);
      setFilteredCenters(data);
      
      // Clear any previous errors since we successfully loaded data
      if (error) {
        setError(null);
        toast.success("Successfully reconnected to database");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Failed to load rec centers:", err);
      setError(`Failed to load recreation centers: ${errorMessage}. Please try again later.`);
      toast.error("Error loading data");
      
      // Auto-retry once on failure (but only if this isn't already a retry)
      if (!isRetry && retryCount < 2) {
        setRetryCount(prev => prev + 1);
        console.log(`Auto-retrying connection (attempt ${retryCount + 1})...`);
        setTimeout(() => loadCenters(true), 2000); // Wait 2 seconds before retry
      }
    } finally {
      setLoading(false);
    }
  }, [error, retryCount, initialCenters]);
  
  // Load centers on initial mount only
  useEffect(() => {
    if (!initialCenters) {
      loadCenters();
    }
  }, [initialCenters, loadCenters]);
  
  // Handle search separately without automatic execution
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    
    try {
      if (query.trim() === '') {
        setFilteredCenters(centers);
      } else {
        const filtered = await filterCenters(query);
        setFilteredCenters(filtered);
      }
    } catch (err) {
      console.error("Error filtering centers:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(`Failed to search recreation centers: ${errorMessage}. Please try again.`);
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // Function to retry loading centers
  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    loadCenters();
  };

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="flex flex-col items-center mb-6">
          <ServerOff className="h-16 w-16 text-destructive mb-4" />
          <div className="text-destructive text-lg font-semibold mb-2">{error}</div>
          <div className="text-muted-foreground mb-4 max-w-md">
            Unable to connect to the database. Please check your connection and try again.
          </div>
        </div>
        
        <Button 
          onClick={handleRetry}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry Connection (Attempt #{retryCount + 1})
        </Button>
        
        {connectionTested && (
          <div className="mt-6 text-sm text-muted-foreground max-w-md mx-auto">
            <p>If the issue persists, please check that:</p>
            <ul className="list-disc list-inside mt-2 text-left">
              <li>Your internet connection is stable</li>
              <li>Your Supabase project is online and accessible</li>
              <li>You are not using an ad blocker that might block the connection</li>
              <li>The API keys are correctly configured</li>
            </ul>
            
            {debugInfo && (
              <div className="mt-4 p-4 bg-muted rounded-md text-left">
                <p className="font-semibold mb-2">Connection Debug Info:</p>
                <p>URL: {debugInfo.url}</p>
                <p>API Key: {debugInfo.keyPreview}</p>
                <p>Browser Storage: {debugInfo.localStorageAvailable ? '✅ Available' : '❌ Unavailable'}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">Recreation Centers</h2>
          {!loading && centers.length > 0 && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Database connected
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-muted-foreground">View:</span>
          <button
            onClick={() => setLayout('grid')}
            className={`p-2 rounded-md transition-colors ${
              layout === 'grid'
                ? 'bg-secondary text-primary'
                : 'hover:bg-secondary/50 text-muted-foreground'
            }`}
            aria-label="Grid view"
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setLayout('list')}
            className={`p-2 rounded-md transition-colors ${
              layout === 'list'
                ? 'bg-secondary text-primary'
                : 'hover:bg-secondary/50 text-muted-foreground'
            }`}
            aria-label="List view"
          >
            <Layout className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <SearchFilter onSearch={handleSearch} />
      
      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading recreation centers...</p>
        </div>
      ) : filteredCenters.length === 0 ? (
        <div className="py-8 text-center">
          {searchQuery ? (
            <p className="text-lg text-muted-foreground">No centers found matching "{searchQuery}"</p>
          ) : (
            <div className="flex flex-col items-center">
              <DatabaseIcon className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-lg text-muted-foreground">No recreation centers available</p>
              <Button 
                onClick={handleRetry} 
                variant="outline" 
                className="mt-4"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reload Data
              </Button>
            </div>
          )}
          {searchQuery && (
            <button 
              onClick={() => handleSearch('')}
              className="mt-4 text-primary hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className={`grid ${
          layout === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'grid-cols-1 gap-5'
        }`}>
          {filteredCenters.map((center) => (
            <RecCenter key={center.id} center={center} layout={layout} />
          ))}
        </div>
      )}
      
      {filteredCenters.length > 0 && searchQuery && (
        <div className="text-center animate-fade-in">
          <p className="text-sm text-muted-foreground">
            Showing {filteredCenters.length} results for "{searchQuery}"
            <button 
              onClick={() => handleSearch('')}
              className="ml-2 text-primary hover:underline"
            >
              Clear
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default RecCenterList;
