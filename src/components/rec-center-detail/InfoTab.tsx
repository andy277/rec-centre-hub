
import { Clock, Mail, Globe, Phone, MapPin } from 'lucide-react';
import { RecCenter } from '@/utils/data';

interface InfoTabProps {
  center: RecCenter;
}

const InfoTab = ({ center }: InfoTabProps) => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">About {center.name}</h2>
      <p className="text-foreground/80 mb-6">{center.description}</p>
      
      <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <Phone className="mr-3 h-5 w-5 text-primary/70" />
          <span>{center.phone}</span>
        </div>
        <div className="flex items-center">
          <Mail className="mr-3 h-5 w-5 text-primary/70" />
          <a href={`mailto:${center.email}`} className="text-primary hover:underline">{center.email}</a>
        </div>
        <div className="flex items-center">
          <Globe className="mr-3 h-5 w-5 text-primary/70" />
          <a href={center.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {center.website.replace(/^https?:\/\//, '')}
          </a>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold mb-3">Hours of Operation</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
        <div className="flex justify-between py-1 border-b border-border/50">
          <span className="font-medium">Monday</span>
          <span>{center.hours.monday}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-border/50">
          <span className="font-medium">Tuesday</span>
          <span>{center.hours.tuesday}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-border/50">
          <span className="font-medium">Wednesday</span>
          <span>{center.hours.wednesday}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-border/50">
          <span className="font-medium">Thursday</span>
          <span>{center.hours.thursday}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-border/50">
          <span className="font-medium">Friday</span>
          <span>{center.hours.friday}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-border/50">
          <span className="font-medium">Saturday</span>
          <span>{center.hours.saturday}</span>
        </div>
        <div className="flex justify-between py-1 border-b border-border/50">
          <span className="font-medium">Sunday</span>
          <span>{center.hours.sunday}</span>
        </div>
      </div>
    </div>
  );
};

export default InfoTab;
