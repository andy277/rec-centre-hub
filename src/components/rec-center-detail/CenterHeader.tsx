
import { ArrowLeft, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RecCenter } from '@/utils/data';

interface CenterHeaderProps {
  center: RecCenter;
  imageLoaded: boolean;
  onImageLoad: () => void;
}

const CenterHeader = ({ center, imageLoaded, onImageLoad }: CenterHeaderProps) => {
  return (
    <div className="relative mb-8 h-[40vh] md:h-[50vh] overflow-hidden bg-secondary/30">
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
      <img
        src={center.imageUrl}
        alt={center.name}
        className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={onImageLoad}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
        <div className="container mx-auto">
          <Link 
            to="/centers" 
            className="inline-flex items-center text-white/90 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all centers
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{center.name}</h1>
          <div className="flex items-center mt-2 text-white/90">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{center.address}, {center.city}, {center.state} {center.postalCode}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterHeader;
