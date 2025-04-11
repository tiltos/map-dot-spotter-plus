
import { useState } from "react";
import { PointOfInterestType } from "@/types";
import { useMap } from "@/context/MapContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getIconForType } from "@/utils/icons";
import { X, Edit } from "lucide-react";

interface PointOfInterestProps {
  point: PointOfInterestType;
  scale: number;
}

const PointOfInterest = ({ point, scale }: PointOfInterestProps) => {
  const { deletePoint, updatePoint } = useMap();
  const [isHovering, setIsHovering] = useState(false);
  
  // Position styles
  const positionStyle = {
    left: `${point.x}%`,
    top: `${point.y}%`,
  };
  
  const handleEdit = () => {
    const modal = document.getElementById('edit-point-modal') as HTMLDialogElement;
    if (modal) {
      // Store the point ID in the modal's dataset
      modal.dataset.pointId = point.id;
      modal.dataset.pointName = point.name;
      modal.dataset.pointIcon = point.icon;
      modal.dataset.pointDescription = point.description || '';
      modal.showModal();
    }
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deletePoint(point.id);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={positionStyle}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative flex flex-col items-center">
              <div 
                className={`rounded-full p-1 flex items-center justify-center transition-all duration-300 ${
                  isHovering ? 'bg-primary/40 scale-110' : 'bg-primary/20'
                }`}
              >
                <div className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ width: "20px", height: "20px" }}>
                  {getIconForType(point.icon, 20)}
                </div>
              </div>
              
              <div className="mt-1 text-white text-[10px] font-serif whitespace-nowrap drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                {point.name}
              </div>
              
              {isHovering && (
                <div className="absolute -top-2 -right-2 flex gap-1">
                  <button
                    onClick={handleEdit}
                    className="bg-secondary text-secondary-foreground rounded-full p-1 hover:bg-secondary/80"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/80"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div>
            <h4 className="font-bold">{point.name}</h4>
            {point.description && <p className="text-sm">{point.description}</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PointOfInterest;
