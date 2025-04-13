// Import necessary hooks, components, and utilities
import { useMap } from "@/context/MapContext"; // Provides map-related context and functions
import { Button } from "@/components/ui/button"; // UI button component
import { ScrollArea } from "@/components/ui/scroll-area"; // Scrollable area component
import { getIconForType, getIconOptions } from "@/utils/icons"; // Utility functions for handling icons
import {
  Edit,
  X,
  Filter,
  ChevronDown,
  ChevronUp,
  Info,
  ScrollText,
} from "lucide-react"; // Icon components from lucide-react
import { useState, useEffect, useRef } from "react"; // React hooks for state, effects, and refs
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // UI select dropdown components
import MapIcon from "./MapIcon"; // Custom MapIcon component
import React from "react"; // React library
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Tab components

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
  const { points, deletePoint, setCenterPosition } = useMap(); // Access map context functions and data
  const [filter, setFilter] = useState<string>("all"); // State for filtering points
  const activePointRef = useRef<HTMLDivElement>(null); // Ref for the active point element

  // Filter points based on the selected icon type
  const filteredPoints =
    filter === "all" ? points : points.filter((point) => point.icon === filter);

  const iconOptions = getIconOptions(); // Get available icon options

  // Handle selecting a point
  const handleSelectPoint = (pointId: string) => {
    onSelectPoint(pointId); // Trigger the callback with the selected point ID

    // Find the point and center the map on it
    const point = points.find((p) => p.id === pointId);
    if (point) {
      setCenterPosition({ x: point.x, y: point.y }); // Center the map on the selected point
    }
  };

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
      className={`bg-card rounded-lg border border-border h-full flex flex-col ${
        isMobile && (activePointId ? "h-[60vh]" : "h-[60vh]")
      }`}
    >
      {/* Tabs for switching between points and info */}
      <Tabs defaultValue="points" className="w-full">
        <div
          className={`${
            !isMobile
              ? "p-4 border-b border-border"
              : "p-2 border-b border-border"
          }`}
        >
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
        </div>

        {/* Points tab content */}
        <TabsContent value="points" className="flex-1 flex flex-col">
          {/* Filter dropdown for desktop view */}
          {!isMobile && (
            <div className="flex items-center justify-between mt-2 p-4 pt-1 border-b border-border">
              <p className="text-sm text-muted-foreground">
                {filteredPoints.length} {filter}
                {filteredPoints.length !== 1 ? "s" : ""}
              </p>

              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[190px] h-8 text-xs">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    {iconOptions.map((option) => (
                      <SelectItem
                        key={option.id}
                        value={option.id}
                        className="flex items-center ml-0"
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
                  const isActive = activePointId === point.id; // Check if the point is active
                  return (
                    <div
                      key={point.id}
                      ref={isActive ? activePointRef : null} // Attach ref to the active point
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
                              e.stopPropagation(); // Prevent triggering parent click event
                              deletePoint(point.id); // Delete the point
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
                            {point.description
                              .split("\n")
                              .map((line, index) => (
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

        {/* Story tab content */}
        <TabsContent value="story" className="p-4 flex-1 ">
          <ScrollArea className="flex-1 overflow-auto">
            <div className="text-sm">
              <h3 className="font-bold mb-4 mt-0 pt-0 text-lg">The Campaign</h3>
              <blockquote className="mt-2 text-xs text-muted-foreground pl-5 pr-2 py-1 border-l-2 border-primary/40">
                In the village of Eidrholt, sheep are found gutted in the frost,
                their tongues cut out. One of the local herdsmen swears he saw a
                figure walking on the snow without leaving prints. The elders
                whisper of the Vargrkind, old spirits in wolf form who return
                when oaths are broken.
                <br />
                <br />
                Yrsa has seen them in her dreams — antlered things of bone and
                mist. A cairn lies in the forest north of here, said to be
                sealed with **song-runes** only a Dream-Singer can break…
              </blockquote>
              <p className="mt-4 mb-4">
                This campaign follows the story of the Thornborn Kin.
              </p>
              <p className="mt-4 mb-4">
                <em>
                  The name <strong>Thornborn Kin</strong> is not a boast, nor a
                  banner to rally armies. It's a memory. A scar. A choice. They
                  became kin not by birth, but by suffering.
                </em>
              </p>
              <p className="mt-4 mb-4">
                <em>
                  They wear no crest, only a braid of thorn-twine around the
                  hilt or haft of their weapons — some say it hurts to grip, and
                  that’s the point.
                </em>
              </p>
              <ul>
                <li>
                  <strong>Thoren Alvsson</strong>{" "}
                  <em>
                    Once heir to a fallen thanehold drowned in debt and fire,
                    Thoren now leads with wounded pride. His blade,
                    'Mourngleam,' is heirloom steel tarnished by betrayal.
                  </em>
                </li>
                <li>
                  <strong>Yrsa Dream-Singer</strong>{" "}
                  <em>
                    Born in a thunderstorm, her mother struck dead as she
                    screamed her first breath. Raised by spirit-singers, she
                    walks between worlds, speaking to ancestors in ash and bone.
                  </em>
                </li>
                <li>
                  <strong>Halvar the Grey</strong>{" "}
                  <em>
                    Born to a weather-worn clan that patrols the forest
                    borderlands, Halvar knows the tracks of beasts and bandits
                    alike. Few speak as plainly or shoot as cleanly.
                  </em>
                </li>
                <li>
                  <strong>Vael Ashborne</strong>{" "}
                  <em>
                    Born to a mortal woman and a forgotten winter spirit, Vael
                    is as unreadable as the shifting snow. His eyes glow faintly
                    in moonlight, and animals hesitate near him.
                  </em>
                </li>
                <li>
                  <strong>Sten Fenborn</strong>{" "}
                  <em>
                    A swamp-born hunter from the ice-fens. Sten never speaks of
                    the night his village vanished. He bears a crude bear-paw
                    talisman and sees omens in blood patterns.
                  </em>
                </li>
                <li>
                  <strong>Rurik Tallow-Eyes</strong>{" "}
                  <em>
                    Pale-eyed and soft-spoken, Rurik arrived from the east,
                    barefoot and covered in candle wax. Some say he was a
                    grave-candlemaker. Others say he still is.
                  </em>
                </li>
              </ul>
              <p className="mt-4 mb-4">
                You can read more about the campaign, the characters, locations,
                and quests on my{" "}
                <a
                  className="underline text-lightsea"
                  href="https://adjoining-era-77b.notion.site/Five-Leagues-from-the-Borderlands-1d1835c20aa3803db7cef1b1758c256a?pvs=4"
                  target="_BLANK"
                >
                  Notion page
                </a>
                .
              </p>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Info tab content */}
        <TabsContent value="info" className="p-4">
          <div className="text-sm">
            <h3 className="font-bold mb-4 mt-0 pt-0 text-lg">
              About this project
            </h3>
            <p className="mt-4 mb-4">
              Skarnheim is a hobby project created by @tiltos with help from
              Lovable. It is a fictional fantasy setting, inspired by pre-viking
              Scandinavia. It was created for a campaign of the tabletop game,{" "}
              <a
                className="underline text-lightsea"
                href="https://modiphius.net/pages/five-leagues-from-the-borderlands"
                target="_BLANK"
              >
                Five Leagues From the Borderlands
              </a>
              .
            </p>
            <p className="mt-4 mb-4">
              Tools used for creating the map (all free):
            </p>
            <ol className="list-disc pl-5">
              <li>
                <a
                  className="underline text-lightsea"
                  href="https://www.youtube.com/watch?v=Wurgiy3P_-w"
                  target="_BLANK"
                >
                  This tutorial from Kilroy's Kartography
                </a>
              </li>
              <li>
                <a
                  className="underline text-lightsea"
                  href="https://azgaar.github.io/Fantasy-Map-Generator/"
                  target="_BLANK"
                >
                  Azgaar fantasy map generator
                </a>{" "}
                to create the landmass shapes, biomes and heightmap
              </li>
              <li>
                <a
                  className="underline text-lightsea"
                  href="https://quadspinner.com/"
                  target="_BLANK"
                >
                  Gaea 2
                </a>{" "}
                to create the erosion and texture maps
              </li>
              <li>
                <a
                  className="underline text-lightsea"
                  href="https://www.blender.org/"
                  target="_BLANK"
                >
                  Blender
                </a>{" "}
                to add clouds and render the map with global lighting
              </li>
              <li>
                <a
                  className="underline text-lightsea"
                  href="https://www.photopea.com/"
                  target="_BLANK"
                >
                  Photopea
                </a>{" "}
                (free browser-based Photoshop clone) to add labeling, grading
                and visual refinement
              </li>
            </ol>
            <p className="mt-4 mb-4">
              Tools used for creating the website (all free):
            </p>
            <ol className="list-disc pl-5">
              <li>
                <a
                  className="underline text-lightsea"
                  href="https://lovable.dev/"
                  target="_BLANK"
                >
                  Lovable.dev
                </a>{" "}
                to kickstart and accelerate the project (GenAI prototyping tool)
              </li>
              <li>
                <a
                  className="underline text-lightsea"
                  href="https://www.photopea.com/"
                  target="_BLANK"
                >
                  Photopea
                </a>{" "}
                for creating map icons
              </li>
            </ol>
            <p className="mt-4 mb-4">
              This project is publicly available on{" "}
              <a
                className="underline text-lightsea"
                href="https://github.com/tiltos/map-dot-spotter-plus"
                target="_BLANK"
              >
                Github
              </a>
              .
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PointsList;
