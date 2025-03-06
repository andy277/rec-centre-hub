import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Container } from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { getCenterById } from '@/utils/data';
import type { RecCenter } from '@/utils/data';
import RecCenterCard from '@/components/RecCenter';

const Favorites = () => {
  const { user } = useAuth();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const [favoriteCenters, setFavoriteCenters] = useState<RecCenter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!favoritesLoading) {
      const centers = favorites.map(id => getCenterById(id)).filter(Boolean) as RecCenter[];
      setFavoriteCenters(centers);
      setLoading(false);
    }
  }, [favorites, favoritesLoading]);

  if (!user) {
    return (
      <>
        <Navbar />
        <main className="pt-20 pb-12 min-h-screen bg-gradient-to-b from-background to-secondary/20">
          <Container className="py-8 md:py-12 animate-fade-in">
            <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Sign in to view your favorites
              </h1>
              <p className="text-muted-foreground mb-6">
                Create an account or sign in to save your favorite recreation centers and access them anytime.
              </p>
              <div className="flex gap-4">
                <Button asChild variant="default">
                  <Link to="/auth?mode=signin">Sign In</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/auth?mode=signup">Create Account</Link>
                </Button>
              </div>
            </div>
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-12 min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Container className="py-8 md:py-12 animate-fade-in">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                My Favorites
              </h1>
              <p className="text-muted-foreground max-w-3xl">
                Your collection of favorite recreation centers for quick access.
              </p>
            </div>
            <Separator className="bg-gradient-to-r from-primary/20 to-primary/5" />
            
            {loading || favoritesLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Loading your favorites...</p>
              </div>
            ) : favoriteCenters.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  You haven't added any recreation centers to your favorites. Browse centers and click the heart icon to add them here.
                </p>
                <Button asChild>
                  <Link to="/centers">Browse Recreation Centers</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCenters.map((center) => (
                  <RecCenterCard key={center.id} center={center} layout="grid" />
                ))}
              </div>
            )}
          </div>
        </Container>
      </main>
    </>
  );
};

export default Favorites; 