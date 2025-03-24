
import { useState, useEffect } from 'react';
import { Layout, Grid, Loader2 } from 'lucide-react';
import RecCenter from './RecCenter';
import SearchFilter from './SearchFilter';
import { RecCenter as RecCenterType } from '@/types/database';
import { fetchAllCenters, filterCenters } from '@/services/recCenterService';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

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
  
  // Load centers on initial mount only
  useEffect(() => {
    if (!initialCenters) {
      const loadCenters = async () => {
        try {
          setLoading(true);
          setError(null);
          
          // Check Supabase connection first
          const { data: connectionTest, error: connectionError } = await supabase
            .from('rec_centers')
            .select('count(*)', { count: 'exact', head: true });
            
          if (connectionError) {
            console.error("Supabase connection error:", connectionError);
            setError(`Failed to connect to database: ${connectionError.message}`);
            toast.error("Database connection issue. Please check your network connection.");
            setLoading(false);
            return;
          }
          
          console.log("Supabase connection successful, fetching centers...");
          const data = await fetchAllCenters();
          console.log("Centers fetched:", data.length);
          setCenters(data);
          setFilteredCenters(data);
        } catch (err) {
          console.error("Failed to load rec centers:", err);
          setError("Failed to load recreation centers. Please try again later.");
          toast.error("Error loading data");
        } finally {
          setLoading(false);
        }
      };
      
      loadCenters();
    }
  }, [initialCenters]);
  
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
      setError("Failed to search recreation centers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="text-destructive mb-4">{error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Recreation Centers</h2>
        
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
          <p className="text-lg text-muted-foreground">No centers found matching "{searchQuery}"</p>
          <button 
            onClick={() => handleSearch('')}
            className="mt-4 text-primary hover:underline"
          >
            Clear search
          </button>
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
