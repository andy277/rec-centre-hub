
import { Check } from 'lucide-react';
import { RecCenter } from '@/utils/data';

interface AmenitiesTabProps {
  center: RecCenter;
}

const AmenitiesTab = ({ center }: AmenitiesTabProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Amenities</h2>
      <p className="text-foreground/80 mb-6">
        {center.name} offers a wide range of amenities designed to enhance your experience. Explore the facilities available at this recreation center.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {center.amenities.map((amenity, idx) => (
          <div key={idx} className="flex items-center py-2">
            <div className="mr-3 flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <Check className="h-4 w-4" />
            </div>
            <span className="text-foreground/80">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesTab;
