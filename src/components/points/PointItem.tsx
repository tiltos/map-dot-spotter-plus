import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import MapIcon from "../MapIcon";
import { PointOfInterestType } from "@/types";

interface PointItemProps {
  point: PointOfInterestType;
  isActive: boolean;
  onSelect: () => void;
  ref?: React.Ref<HTMLDivElement>;
}

const PointItem = React.forwardRef<HTMLDivElement, PointItemProps>(
  ({ point, isActive, onSelect }, ref) => {
    const handleClick = () => {
      onSelect();
    };

    return (
      <div
        ref={ref}
        className={`flex flex-col p-2 rounded-md hover:bg-accent group cursor-pointer ${
          isActive ? "bg-accent/80" : ""
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center">
          <div className={`mr-3 flex-shrink-0 ${isActive ? "scale-110" : ""}`}>
            <MapIcon icon={point.icon} name={point.name} />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate relative">
              {point.name}
              {isActive && point.icon && (
                <span className="absolute right-0 font-light text-muted-foreground capitalize">
                  {point.icon}
                </span>
              )}
            </h3>
          </div>
        </div>

        {/* Description - only shown when item is active */}
        {isActive && point.description && (
          <div className="mt-2 text-xs text-muted-foreground pl-5 pr-2 py-1 border-l-2 border-primary/40">
            <p>
              {point.description.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        )}
      </div>
    );
  }
);

PointItem.displayName = "PointItem";

export default PointItem;
