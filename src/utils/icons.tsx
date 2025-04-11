
import { 
  MapPin, Castle, Tent, Mountain, Trees, Skull, 
  Anchor, Home, Building, Flag, Compass
} from "lucide-react";
import { IconOption } from "@/types";

export const getIconForType = (type: string, size: number = 24) => {
  switch (type) {
    case "location":
      return <MapPin size={size} />;
    case "castle":
      return <Castle size={size} />;
    case "camp":
      return <Tent size={size} />;
    case "mountain":
      return <Mountain size={size} />;
    case "forest":
      return <Trees size={size} />;
    case "danger":
      return <Skull size={size} />;
    case "port":
      return <Anchor size={size} />;
    case "settlement":
      return <Home size={size} />;
    case "city":
      return <Building size={size} />;
    case "landmark":
      return <Flag size={size} />;
    case "peaks":
      return <Compass size={size} />;
    default:
      return <MapPin size={size} />;
  }
};

export const getIconOptions = (): { id: string; name: string; icon: JSX.Element }[] => {
  return [
    { id: "location", name: "Location", icon: <MapPin size={24} /> },
    { id: "castle", name: "Castle", icon: <Castle size={24} /> },
    { id: "camp", name: "Camp", icon: <Tent size={24} /> },
    { id: "mountain", name: "Mountain", icon: <Mountain size={24} /> },
    { id: "forest", name: "Forest", icon: <Trees size={24} /> },
    { id: "danger", name: "Danger", icon: <Skull size={24} /> },
    { id: "port", name: "Port", icon: <Anchor size={24} /> },
    { id: "settlement", name: "Settlement", icon: <Home size={24} /> },
    { id: "city", name: "City", icon: <Building size={24} /> },
    { id: "landmark", name: "Landmark", icon: <Flag size={24} /> },
    { id: "peaks", name: "Peaks", icon: <Compass size={24} /> },
  ];
};
