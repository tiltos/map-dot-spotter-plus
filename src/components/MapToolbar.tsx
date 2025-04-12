import { PlusCircle, MinusCircle, RotateCcw, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MapToolbarProps {
  scale: number;
  position: { x: number; y: number };
  cursorPosition: { x: number; y: number };
}

const MapToolbar = ({ scale, cursorPosition, position }: MapToolbarProps) => {
  return (
    <div className="text-size-xs absolute bottom-1 left-1 flex flex-col gap-2 bg-background/90 p-2 rounded-lg border border-border shadow-md">
      Scale: {scale}
      <br/ >
      Cursor: {cursorPosition.x}, {cursorPosition.y}
      <br/ >
      Position: {position.x}, {position.y}
    </div>
  );
};

export default MapToolbar;
