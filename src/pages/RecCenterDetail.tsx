
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCenterById, RecCenter } from '../utils/data';
import CenterHeader from '../components/rec-center-detail/CenterHeader';
import TabsSection from '../components/rec-center-detail/TabsSection';
import SidebarSection from '../components/rec-center-detail/SidebarSection';
import Footer from '../components/rec-center-detail/Footer';

const RecCenterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [center, setCenter] = useState<RecCenter | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const fetchCenter = () => {
      if (id) {
        const foundCenter = getCenterById(id);
        if (foundCenter) {
          setCenter(foundCenter);
        } else {
          navigate('/centers');
        }
      }
      
      setLoading(false);
    };
    
    fetchCenter();
  }, [id, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-lg">Loading center details...</p>
        </div>
      </div>
    );
  }
  
  if (!center) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Recreation Center Not Found</h2>
          <p className="mt-2 mb-6 text-muted-foreground">The center you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/centers" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium transition-all duration-300 hover:bg-primary/90"
          >
            Browse All Centers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <CenterHeader 
          center={center} 
          imageLoaded={imageLoaded} 
          onImageLoad={() => setImageLoaded(true)} 
        />
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <TabsSection center={center} />
            </div>
            
            <div className="md:w-1/3">
              <SidebarSection center={center} />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RecCenterDetail;
