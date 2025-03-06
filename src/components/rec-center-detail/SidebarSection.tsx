
import { Heart, MapPin, Phone, Globe, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecCenter } from '@/utils/data';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';

interface SidebarSectionProps {
  center: RecCenter;
}

const SidebarSection = ({ center }: SidebarSectionProps) => {
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleFavoriteToggle = () => {
    if (center) {
      toggleFavorite(center.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border/50 p-6 sticky top-24">
      <h3 className="text-lg font-semibold mb-4">Hours Today</h3>
      <div className="flex items-center mb-6">
        <Clock className="mr-2 h-5 w-5 text-primary/70" />
        <span className="font-medium">{center.hours.monday}</span>
      </div>
      
      <h3 className="text-lg font-semibold mb-3">Location</h3>
      <address className="not-italic text-foreground/80 mb-4">
        {center.address}<br />
        {center.city}, {center.state} {center.postalCode}
      </address>
      
      <div className="aspect-video bg-secondary/30 rounded-lg mb-6 overflow-hidden">
        {/* Placeholder for map */}
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          Map view
        </div>
      </div>
      
      <div className="space-y-4">
        {user && (
          <Button
            onClick={handleFavoriteToggle}
            className={`w-full ${isFavorite(center.id) ? 'bg-red-500 hover:bg-red-600' : ''}`}
            variant={isFavorite(center.id) ? "default" : "outline"}
          >
            <Heart className={`mr-2 h-4 w-4 ${isFavorite(center.id) ? 'fill-white' : ''}`} />
            {isFavorite(center.id) ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        )}
      
        <a 
          href={`https://maps.google.com/?q=${center.address},${center.city},${center.state},${center.postalCode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-medium transition-colors"
        >
          <MapPin className="mr-2 h-4 w-4" />
          Get Directions
        </a>
        
        <a 
          href={`tel:${center.phone}`}
          className="flex items-center justify-center w-full px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-medium transition-colors"
        >
          <Phone className="mr-2 h-4 w-4" />
          Call Center
        </a>
        
        <a 
          href={center.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full px-4 py-2 rounded-lg bg-primary text-white font-medium transition-colors hover:bg-primary/90"
        >
          <Globe className="mr-2 h-4 w-4" />
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default SidebarSection;
