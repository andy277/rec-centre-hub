import { Link } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { RecCenter as RecCenterType } from "@/utils/data";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface RecCenterProps {
  center: RecCenterType;
}

export function RecCenter({ center }: RecCenterProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isFav = isFavorite(center.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(center.id);
  };

  return (
    <Link
      to={`/centers/${center.id}`}
      className="flex flex-col overflow-hidden rounded-xl border border-border/40 bg-background shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
    >
      <div className="relative">
        <img
          src={center.imageUrl}
          alt={center.name}
          className="aspect-video w-full object-cover"
        />
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold">{center.name}</h3>
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
              isFav ? "text-red-500" : "text-gray-400 hover:text-gray-600"
            )}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className={cn("h-5 w-5", isFav ? "fill-current" : "")} />
          </button>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1.5 h-4 w-4" />
          <span>{center.city}, {center.state}</span>
        </div>
        
        <div className="mt-3 flex items-center">
          <Star className="mr-1 h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium">{center.rating}</span>
          <span className="ml-1 text-xs text-muted-foreground">({center.reviews} reviews)</span>
        </div>
      </div>
    </Link>
  );
}
