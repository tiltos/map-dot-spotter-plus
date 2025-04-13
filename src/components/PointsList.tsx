import { useMap } from "@/context/MapContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getIconForType, getIconOptions } from "@/utils/icons";
import { Edit, X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MapIcon from "./MapIcon";
import React from "react";

interface PointsListProps {
  activePointId: string | null;
  onSelectPoint: (id: string) => void;
}

const PointsList = ({ activePointId, onSelectPoint }: PointsListProps) => {
  const { points, deletePoint } = useMap();
  const [filter, setFilter] = useState<string>("all");

  const iconOptions = getIconOptions();

  const handleSelectPoint = (pointId: string) => {
    onSelectPoint(pointId);
  };

  // Filter points based on selected icon type
  const filteredPoints =
    filter === "all" ? points : points.filter((point) => point.icon === filter);

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Points of Interest</h2>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-muted-foreground">
            {filteredPoints.length} location
            {filteredPoints.length !== 1 ? "s" : ""} marked
          </p>

          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[130px] h-8 text-xs">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {iconOptions.map((option) => (
                  <SelectItem
                    key={option.id}
                    value={option.id}
                    className="flex items-center"
                  >
                    <div className="flex items-center">
                      <span className="mr-2">
                        <MapIcon icon={option.id} name={option.name} />
                      </span>
                      <span>{option.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        {filteredPoints.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            {filter === "all"
              ? "No points added yet. Click on the map to add your first point!"
              : "No points match the selected filter."}
          </div>
        ) : (
          <div className="space-y-1 p-1">
            {filteredPoints.map((point) => (
              <div
                key={point.id}
                className={`flex flex-col p-2 rounded-md hover:bg-accent group cursor-pointer ${
                  activePointId === point.id ? "bg-accent/80" : ""
                }`}
                onClick={() => handleSelectPoint(point.id)}
              >
                <div className="flex items-center">
                  <div
                    className={`mr-3 flex-shrink-0 ${
                      activePointId === point.id ? "scale-110" : ""
                    }`}
                  >
                    <MapIcon icon={point.icon} name={point.name} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate relative">{point.name} {activePointId === point.id && point.icon && (<span className="absolute right-0 font-light text-muted-foreground capitalize">{point.icon}</span>)}</h3>
                  </div>

                  <div className="ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePoint(point.id);
                      }}
                      className="h-7 w-7 text-destructive hover:text-destructive"
                    >
                      <X size={15} />
                      <span className="sr-only">Delete {point.name}</span>
                    </Button>
                  </div>
                </div>

                {/* Description - only shown when item is active */}
                {activePointId === point.id && point.description && (
                  <div className="mt-2 text-xs text-muted-foreground pl-10 pr-2 py-1 border-l-2 border-primary/40">
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
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default PointsList;
