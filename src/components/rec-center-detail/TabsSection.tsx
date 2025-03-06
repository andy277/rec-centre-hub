
import { useState } from 'react';
import { RecCenter } from '@/utils/data';
import InfoTab from './InfoTab';
import ProgramsTab from './ProgramsTab';
import AmenitiesTab from './AmenitiesTab';

interface TabsSectionProps {
  center: RecCenter;
}

const TabsSection = ({ center }: TabsSectionProps) => {
  const [activeTab, setActiveTab] = useState<'info' | 'programs' | 'amenities'>('info');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-border/50 overflow-hidden">
      <div className="border-b border-border">
        <div className="flex items-center">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-5 py-4 text-sm font-medium flex items-center transition-colors ${
              activeTab === 'info'
                ? 'border-b-2 border-primary text-primary'
                : 'text-foreground/80 hover:text-foreground hover:bg-secondary/30'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('programs')}
            className={`px-5 py-4 text-sm font-medium flex items-center transition-colors ${
              activeTab === 'programs'
                ? 'border-b-2 border-primary text-primary'
                : 'text-foreground/80 hover:text-foreground hover:bg-secondary/30'
            }`}
          >
            Programs
          </button>
          <button
            onClick={() => setActiveTab('amenities')}
            className={`px-5 py-4 text-sm font-medium flex items-center transition-colors ${
              activeTab === 'amenities'
                ? 'border-b-2 border-primary text-primary'
                : 'text-foreground/80 hover:text-foreground hover:bg-secondary/30'
            }`}
          >
            Amenities
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {activeTab === 'info' && <InfoTab center={center} />}
        {activeTab === 'programs' && <ProgramsTab center={center} />}
        {activeTab === 'amenities' && <AmenitiesTab center={center} />}
      </div>
    </div>
  );
};

export default TabsSection;
