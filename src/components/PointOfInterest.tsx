import { useState } from "react";
import { PointOfInterestType } from "@/types";
import { useMap } from "@/context/MapContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getIconForType } from "@/utils/icons";
import { X, Edit } from "lucide-react";
import MapIcon from "./MapIcon";

interface PointOfInterestProps {
  point: PointOfInterestType;
  scale: number;
}

const PointOfInterest = ({ point, scale }: PointOfInterestProps) => {
  const { deletePoint, updatePoint } = useMap();
  const [isHovering, setIsHovering] = useState(false);

  // Position styles
  const positionStyle = {
    left: `calc(${point.x}% - 40px)`,
    top: `calc(${point.y}% - 28px)`,
    transform: `scale(${scale})`,
    transformOrigin: "center",
  };

  const handleEdit = () => {
    const modal = document.getElementById(
      "edit-point-modal"
    ) as HTMLDialogElement;
    if (modal) {
      // Store the point ID in the modal's dataset
      modal.dataset.pointId = point.id;
      modal.dataset.pointName = point.name;
      modal.dataset.pointIcon = point.icon;
      modal.dataset.pointDescription = point.description || "";
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
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 w-[80px]"
            style={positionStyle}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative flex flex-col items-center">
              <div
                className="text-white drop-shadow-[0_0px_2px_rgba(0,0,0,1)]"
                style={{ width: "40px", height: "40px" }}
              >
                {/* {getIconForType(point.icon, 20)} */}
                <MapIcon icon={point.icon} name={point.name} />
              </div>

              <div
                className="text-white text-center text-[12px] pb-[10px] font-serif drop-shadow-[0px_5px_5px_rgba(0,0,0,0.5)] drop-shadow-[0px_0px_2px_rgba(0,0,0,1)]"
                style={{
                  backgroundColor: "#00000080",
                  padding: "2px 6px",
                  borderRadius: "4px",
                }}
              >
                {point.name}
              </div>

              {isHovering && (
                <div className="absolute -top-2 -right-2 flex gap-1"></div>
              )}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent scale={scale}>
          <div className="max-w-xl">
            <h3 className="text-[16px] font-bold">{point.name}</h3>
            {point.description && (
              <p className="text-sm">{point.description}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PointOfInterest;
