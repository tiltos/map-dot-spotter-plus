
import { useMap } from "@/context/MapContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getIconForType, getIconOptions } from "@/utils/icons";
import { Edit, X, Filter, ChevronDown, ChevronUp, Info } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MapIcon from "./MapIcon";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PointsListProps {
  activePointId: string | null;
  onSelectPoint: (id: string) => void;
  isMobile?: boolean;
}

const PointsList = ({ activePointId, onSelectPoint, isMobile = false }: PointsListProps) => {
  const { points, deletePoint, setCenterPosition } = useMap();
  const [filter, setFilter] = useState<string>("all");
  const activePointRef = useRef<HTMLDivElement>(null);
  
  // Filter points based on selected icon type
  const filteredPoints =
    filter === "all" ? points : points.filter((point) => point.icon === filter);

  const iconOptions = getIconOptions();

  const handleSelectPoint = (pointId: string) => {
    onSelectPoint(pointId);
    
    // Find the point and center the map on it
    const point = points.find(p => p.id === pointId);
    if (point) {
      setCenterPosition({ x: point.x, y: point.y });
    }
  };

  // Scroll to active item when activePointId changes
  useEffect(() => {
    if (isMobile && activePointId && activePointRef.current) {
      activePointRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [activePointId, isMobile]);

  return (
    <div 
      className={`bg-card rounded-lg border border-border h-full flex flex-col ${
        isMobile && activePointId ? "h-[60vh]" : ""
      }`}
    >
      <Tabs defaultValue="points" className="w-full">
        <div className={`${!isMobile ? "p-4 border-b border-border" : "p-2 border-b border-border"}`}>
          <TabsList className="w-full justify-between">
            <TabsTrigger value="points" className="flex-1">
              Points of Interest
            </TabsTrigger>
            <TabsTrigger value="info" className="px-2">
              <Info size={18} />
            </TabsTrigger>
          </TabsList>
          
          {!isMobile && (
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
          )}
        </div>

        <TabsContent value="points" className="flex-1 flex flex-col">
          <ScrollArea className="flex-1">
            {filteredPoints.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                {filter === "all"
                  ? "No points added yet. Click on the map to add your first point!"
                  : "No points match the selected filter."}
              </div>
            ) : (
              <div className="space-y-1 p-1">
                {filteredPoints.map((point) => {
                  const isActive = activePointId === point.id;
                  return (
                    <div
                      key={point.id}
                      ref={isActive ? activePointRef : null}
                      className={`flex flex-col p-2 rounded-md hover:bg-accent group cursor-pointer ${
                        isActive ? "bg-accent/80" : ""
                      }`}
                      onClick={() => handleSelectPoint(point.id)}
                    >
                      <div className="flex items-center">
                        <div
                          className={`mr-3 flex-shrink-0 ${
                            isActive ? "scale-110" : ""
                          }`}
                        >
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
                      {isActive && point.description && (
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
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="info" className="p-4">
          <div className="text-sm">
            <p>
              Skarnheim is a hobby project created by @tiltos with help from Lovable. 
              It is a fictional fantasy setting, inspired by pre-viking Scandinavia. 
              It was created for a campaign of the tabletop game, Five Leagues From the Borderlands.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PointsList;
