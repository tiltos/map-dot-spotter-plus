
import React, { createContext, useContext, useState, ReactNode } from "react";
import { PointOfInterestType } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/components/ui/use-toast";

type MapContextType = {
  points: PointOfInterestType[];
  addPoint: (point: Omit<PointOfInterestType, "id">) => void;
  deletePoint: (id: string) => void;
  updatePoint: (id: string, point: Partial<PointOfInterestType>) => void;
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [points, setPoints] = useState<PointOfInterestType[]>([
    {
      id: "1",
      name: "Myrkholtt",
      description: "Dark, dense forest in the northern region",
      x: 35,
      y: 33,
      icon: "forest",
    },
    {
      id: "2",
      name: "Blodmark",
      description: "Rocky, barren lands with reddish soil",
      x: 40,
      y: 15,
      icon: "mountain",
    },
    {
      id: "3",
      name: "Frostbound Peaks",
      description: "Snow-capped mountain range with treacherous paths",
      x: 65,
      y: 58,
      icon: "peaks",
    },
  ]);

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
    <MapContext.Provider value={{ points, addPoint, deletePoint, updatePoint }}>
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
