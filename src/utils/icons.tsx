import { 
  MapPin, Castle, Tent, Mountain, Trees, Skull, 
  Anchor, Home, Building, Flag, Compass,
  HelpCircle, HomeIcon, Buildings, House
} from "lucide-react";
import { IconOption } from "@/types";

export const getIconForType = (type: string, size: number = 24) => {
  const iconProps = {
    size,
    strokeWidth: 2,
    absoluteStrokeWidth: true,
  };

  switch (type) {
    case "location":
      return <MapPin {...iconProps} />;
    case "town":
      return <Castle {...iconProps} />;
    case "delve":
      return <Tent {...iconProps} />;
    case "threat":
      return <Skull {...iconProps} />;
    case "unknown":
      return <HelpCircle {...iconProps} />;
    case "village":
      return <Buildings {...iconProps} />;
    case "hamlet":
      return <House {...iconProps} />;
    case "landmark":
      return <Flag {...iconProps} />;
    case "mountain":
      return <Mountain {...iconProps} />;
    case "forest":
      return <Trees {...iconProps} />;
    case "port":
      return <Anchor {...iconProps} />;
    case "settlement":
      return <Home {...iconProps} />;
    case "city":
      return <Building {...iconProps} />;
    case "peaks":
      return <Compass {...iconProps} />;
    default:
      return <MapPin {...iconProps} />;
  }
};

export const getIconOptions = (): { id: string; name: string; icon: JSX.Element }[] => {
  return [
    { id: "location", name: "Location", icon: <MapPin size={24} /> },
    { id: "town", name: "Town", icon: <Castle size={24} /> },
    { id: "delve", name: "Delve", icon: <Tent size={24} /> },
    { id: "threat", name: "Threat Camp", icon: <Skull size={24} /> },
    { id: "unknown", name: "Unknown", icon: <HelpCircle size={24} /> },
    { id: "village", name: "Village", icon: <Buildings size={24} /> },
    { id: "hamlet", name: "Hamlet", icon: <House size={24} /> },
    { id: "landmark", name: "Landmark", icon: <Flag size={24} /> },
    
    { id: "mountain", name: "Mountain", icon: <Mountain size={24} /> },
    { id: "forest", name: "Forest", icon: <Trees size={24} /> },
    { id: "port", name: "Port", icon: <Anchor size={24} /> },
    { id: "settlement", name: "Settlement", icon: <Home size={24} /> },
    { id: "city", name: "City", icon: <Building size={24} /> },
    { id: "peaks", name: "Peaks", icon: <Compass size={24} /> },
  ];
};
