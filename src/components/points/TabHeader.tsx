
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollText, Info } from "lucide-react";

const TabHeader = () => {
  return (
    <TabsList className="w-full justify-between">
      <TabsTrigger value="points" className="flex-1">
        Points of Interest
      </TabsTrigger>
      <TabsTrigger value="story" className="px-2">
        <ScrollText size={18} />
      </TabsTrigger>
      <TabsTrigger value="info" className="px-2">
        <Info size={18} />
      </TabsTrigger>
    </TabsList>
  );
};

export default TabHeader;
