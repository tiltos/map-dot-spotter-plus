
import { useState } from "react";
import { PointOfInterestType } from "@/types";
import { useMap } from "@/context/MapContext";
import { X, Edit } from "lucide-react";
import MapIcon from "./MapIcon";

interface PointOfInterestProps {
  point: PointOfInterestType;
  scale: number;
  isActive: boolean;
  onSelect: (id: string) => void;
}

const PointOfInterest = ({ point, scale, isActive, onSelect }: PointOfInterestProps) => {
  const { deletePoint } = useMap();
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
      modal.dataset.pointId = point.id;
      modal.dataset.pointName = point.name;
      modal.dataset.pointIcon = point.icon;
      modal.dataset.pointDescription = point.description || "";
      modal.showModal();
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(point.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deletePoint(point.id);
  };

  return (
    <div
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 w-[80px] cursor-pointer ${
        isActive ? "z-20" : "z-10"
      }`}
      style={positionStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <div className="relative flex flex-col items-center">
        <div
          className={`${
            isActive ? "scale-125 transition-transform" : ""
          } text-white drop-shadow-[0_0px_2px_rgba(0,0,0,1)]`}
          style={{ width: "40px", height: "40px" }}
        >
          <MapIcon icon={point.icon} name={point.name} />
        </div>

        <div
          className={`${
            isActive ? "bg-primary/90" : "bg-black/50"
          } text-white text-center text-[12px] pb-[10px] font-serif drop-shadow-[0px_5px_5px_rgba(0,0,0,0.5)] drop-shadow-[0px_0px_2px_rgba(0,0,0,1)]`}
          style={{
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
  );
};

export default PointOfInterest;
