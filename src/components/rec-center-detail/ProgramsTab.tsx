
import { Calendar } from 'lucide-react';
import { RecCenter, Program } from '@/utils/data';

interface ProgramsTabProps {
  center: RecCenter;
}

const ProgramsTab = ({ center }: ProgramsTabProps) => {
  const renderProgramCard = (program: Program) => (
    <div key={program.id} className="bg-white rounded-xl shadow-sm border border-border/50 p-5 hover-scale">
      <h3 className="text-lg font-semibold">{program.name}</h3>
      <p className="mt-2 text-sm text-foreground/80">{program.description}</p>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-start">
          <Calendar className="mt-0.5 mr-2 h-4 w-4 text-primary/70 flex-shrink-0" />
          <span className="text-sm">{program.schedule}</span>
        </div>
        <div className="flex items-center">
          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground/80">
            {program.ageGroup}
          </span>
        </div>
        <div className="font-medium text-primary">{program.price}</div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Programs</h2>
      <p className="text-foreground/80 mb-6">
        Check out the programs offered at {center.name}. Contact the center directly for registration details and availability.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {center.programs.map(renderProgramCard)}
      </div>
    </div>
  );
};

export default ProgramsTab;
