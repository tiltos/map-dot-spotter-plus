
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMap } from "@/context/MapContext";
import PointsFilter from "./PointsFilter";
import PointItem from "./PointItem";
import { useRef } from "react";

interface PointsTabProps {
  activePointId: string | null;
  onSelectPoint: (id: string) => void;
  isMobile: boolean;
}

const PointsTab = ({ activePointId, onSelectPoint, isMobile }: PointsTabProps) => {
  const { points, deletePoint, setCenterPosition } = useMap();
  const [filter, setFilter] = useState<string>("all");
  const activePointRef = useRef<HTMLDivElement>(null);

  // Filter points based on the selected icon type
  const filteredPoints =
    filter === "all" ? points : points.filter((point) => point.icon === filter);

  // Handle selecting a point
  const handleSelectPoint = (pointId: string) => {
    onSelectPoint(pointId);

    // Find the point and center the map on it
    const point = points.find((p) => p.id === pointId);
    if (point) {
      setCenterPosition({ x: point.x, y: point.y });
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Filter dropdown for desktop view */}
      {!isMobile && (
        <PointsFilter 
          filter={filter} 
          setFilter={setFilter} 
          filteredPointsCount={filteredPoints.length}
        />
      )}
      
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-4">
          {filteredPoints.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              {filter === "all"
                ? "No points added yet. Click on the map to add your first point!"
                : "No points match the selected filter."}
            </div>
          ) : (
            <div className="space-y-1">
              {filteredPoints.map((point) => {
                const isActive = activePointId === point.id;
                return (
                  <PointItem
                    key={point.id}
                    ref={isActive ? activePointRef : null}
                    point={point}
                    isActive={isActive}
                    onSelect={() => handleSelectPoint(point.id)}
                    onDelete={() => deletePoint(point.id)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PointsTab;
