
import { PlusCircle, MinusCircle, RotateCcw, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onAddPoint: () => void;
  isAddingPoint: boolean;
}

const MapControls = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onAddPoint,
  isAddingPoint,
}: MapControlsProps) => {
  return (
    <TooltipProvider>
      <div className="absolute top-4 left-4 flex flex-col gap-2 bg-background/90 p-2 rounded-lg border border-border shadow-md">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={onZoomIn}
              className="h-8 w-8"
            >
              <PlusCircle size={16} />
              <span className="sr-only">Zoom in</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Zoom in</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={onZoomOut}
              className="h-8 w-8"
            >
              <MinusCircle size={16} />
              <span className="sr-only">Zoom out</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Zoom out</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={onReset}
              className="h-8 w-8"
            >
              <RotateCcw size={16} />
              <span className="sr-only">Reset view</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Reset view</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant={isAddingPoint ? "default" : "outline"}
              onClick={onAddPoint}
              className="h-8 w-8"
            >
              <MapPin size={16} />
              <span className="sr-only">Add point</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{isAddingPoint ? "Cancel adding point" : "Add new point"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default MapControls;
