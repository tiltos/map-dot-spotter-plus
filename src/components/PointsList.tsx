import { useEffect, useRef } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import TabHeader from "./points/TabHeader";
import PointsTab from "./points/PointsTab";
import StoryTab from "./points/StoryTab";
import InfoTab from "./points/InfoTab";

// Define the interface for the component's props
interface PointsListProps {
  activePointId: string | null; // ID of the currently active point
  onSelectPoint: (id: string) => void; // Callback for selecting a point
  isMobile?: boolean; // Flag to indicate if the view is mobile
}

// Main component definition
const PointsList = ({
  activePointId,
  onSelectPoint,
  isMobile = false,
}: PointsListProps) => {
  const activePointRef = useRef<HTMLDivElement>(null); // Ref for the active point element

  // Scroll to the active item when activePointId changes
  useEffect(() => {
    if (isMobile && activePointId && activePointRef.current) {
      activePointRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "nearest", // Scroll to the nearest position
      });
    }
  }, [activePointId, isMobile]);

  return (
    <div
      className={`${
        isMobile
          ? activePointId
            ? "h-[60vh] absolute bottom-0 w-full "
            : "h-[30vh] absolute bottom-0 w-full "
          : "absolute top-[5rem] right-4 w-full max-w-[400px] h-[calc(100%-6rem)]"
      } pointer-events-auto z-10`}
    >
      <div
        className={`bg-card overflow-hidden rounded-lg border border-border h-full flex flex-col`}
      >
        {/* Tabs for switching between points and info */}
        <Tabs
          defaultValue="points"
          className="w-full h-full flex flex-col overflow-hidden"
        >
          <div
            className={` border-b border-border ${isMobile ? "p-2" : "p-4"}`}
          >
            <TabHeader />
          </div>

          {/* Points tab content */}
          <TabsContent value="points" className="flex-1 mt-0 overflow-hidden">
            <PointsTab
              activePointId={activePointId}
              onSelectPoint={onSelectPoint}
              isMobile={isMobile}
            />
          </TabsContent>

          {/* Story tab content */}
          <TabsContent value="story" className="flex-1 mt-0 overflow-hidden">
            <StoryTab />
          </TabsContent>

          {/* Info tab content */}
          <TabsContent value="info" className="flex-1 mt-0 overflow-hidden">
            <InfoTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PointsList;
