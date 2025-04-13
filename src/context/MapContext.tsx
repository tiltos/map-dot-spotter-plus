
import React, { createContext, useContext, useState, ReactNode } from "react";
import { PointOfInterestType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/components/ui/use-toast";
import pointsData from "@/data/pointsOfInterest.json";

type MapContextType = {
  points: PointOfInterestType[];
  addPoint: (point: Omit<PointOfInterestType, "id">) => void;
  deletePoint: (id: string) => void;
  updatePoint: (id: string, point: Partial<PointOfInterestType>) => void;
  centerPosition: { x: number, y: number } | null;
  setCenterPosition: (position: { x: number, y: number } | null) => void;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState<PointOfInterestType[]>(pointsData);
  const [centerPosition, setCenterPosition] = useState<{ x: number, y: number } | null>(null);

  const addPoint = (point: Omit<PointOfInterestType, "id">) => {
    const newPoint = { ...point, id: uuidv4() };
    setPoints([...points, newPoint]);
    toast({
      title: "Point of Interest Added",
      description: `${point.name} has been added to the map.`,
    });
  };

  const deletePoint = (id: string) => {
    setPoints(points.filter((point) => point.id !== id));
    toast({
      title: "Point of Interest Removed",
      description: "The location has been removed from the map.",
    });
  };

  const updatePoint = (id: string, updatedData: Partial<PointOfInterestType>) => {
    setPoints(
      points.map((point) =>
        point.id === id ? { ...point, ...updatedData } : point
      )
    );
    toast({
      title: "Point of Interest Updated",
      description: "The location has been updated.",
    });
  };

  return (
    <MapContext.Provider value={{ 
      points, 
      addPoint, 
      deletePoint, 
      updatePoint,
      centerPosition,
      setCenterPosition
    }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
