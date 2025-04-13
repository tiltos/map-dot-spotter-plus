
import { useState, useRef, useEffect, MouseEvent, WheelEvent } from "react";
import { useMap } from "@/context/MapContext";
import PointOfInterest from "./PointOfInterest";
import MapControls from "./MapControls";
import MapToolbar from "./MapToolbar";
import PointsList from "./PointsList"; // Add this import

const InteractiveMap = () => {
  const { points, addPoint } = useMap();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isAddingPoint, setIsAddingPoint] = useState(false);
  const [activePointId, setActivePointId] = useState<string | null>(null);

  const handleMapClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isAddingPoint || !mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();

    // Calculate the cursor's position relative to the map's current transformation
    console.log("e.clientX, clientX", e.clientX, e.clientY);
    console.log("rect", rect);

    console.log("scale", scale);

    const cursorX = (e.clientX - rect.left) / scale;
    const cursorY = (e.clientY - rect.top) / scale;

    // Convert to percentage coordinates relative to the map container
    const x = Number(((cursorX / mapRef.current.offsetWidth) * 100).toFixed(3));
    const y = Number(((cursorY / mapRef.current.offsetHeight) * 100).toFixed(3));


    if (
      window["add-point-modal"] &&
      typeof window["add-point-modal"].showModal === "function"
    ) {
      window["add-point-modal"].showModal(x, y);
    }

    setIsAddingPoint(false);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (isAddingPoint) return;
    setIsPanning(true);
    setStartPoint({ x: e.clientX - position.x, y: e.clientY - position.y });
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isPanning) return;

    // Direct position update without transition for immediate response
    setPosition({
      x: e.clientX - startPoint.x,
      y: e.clientY - startPoint.y,
    });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();

    // Get the cursor position relative to the map container
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    // Calculate position of cursor relative to the transformed map
    const cursorPosOnMapX = (cursorX - position.x) / scale;
    const cursorPosOnMapY = (cursorY - position.y) / scale;

    // Calculate scale change
    const delta = e.deltaY > 0 ? 0.8 : 1.2; // Scale factor
    const newScale = Math.min(Math.max(scale * delta, 1), 5); // Limit scale between 0.5 and 5

    // Adjust position to zoom towards the cursor position
    const newX = position.x - cursorPosOnMapX * (newScale - scale);
    const newY = position.y - cursorPosOnMapY * (newScale - scale);

    setCursorPosition({ x: e.clientX, y: e.clientY });
    setScale(newScale);
    setPosition({
      x: newX,
      y: newY,
    });
  };

  const handleSelectPoint = (pointId: string) => {
    setActivePointId(pointId === activePointId ? null : pointId);
  };

  const handleZoom = (direction: "in" | "out") => {
    setScale((prevScale) => {
      const newScale =
        direction === "in"
          ? Math.min(prevScale * 2, 5)
          : Math.max(prevScale / 2, 0.5);
      return newScale;
    });
  };

  const handleReset = () => {
    if (!mapContainerRef.current || !mapRef.current) return;

    const containerRect = mapContainerRef.current.getBoundingClientRect();
    const mapRect = mapRef.current.getBoundingClientRect();

    // Calculate the offsets to center the map
    const centerX = (containerRect.width - mapRect.width * scale) / 2;
    const centerY = (containerRect.height - mapRect.height * scale) / 2;

    setScale(1); // Reset scale to 1
    setPosition({ x: centerX, y: centerY }); // Center the map
  };

  const toggleAddPoint = () => {
    setIsAddingPoint(!isAddingPoint);
  };

  useEffect(() => {
    if (!mapContainerRef.current || !mapRef.current) return;

    const containerRect = mapContainerRef.current.getBoundingClientRect();
    const mapRect = mapRef.current.getBoundingClientRect();

    // Calculate the offsets to center the map
    const centerX = (containerRect.width - mapRect.width) / 2;
    const centerY = (containerRect.height - mapRect.height) / 2;

    setPosition({ x: centerX, y: centerY });
  }, []);

  return (
    <div className="w-full h-full overflow-hidden border border-border">
      <div
        ref={mapContainerRef}
        className={`relative w-full h-full overflow-hidden bg-sea ${
          isAddingPoint ? "cursor-crosshair" : "cursor-grab"
        } ${isPanning ? "cursor-grabbing" : ""} select-none`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleMapClick}
        onWheel={handleWheel}
      >
        <div
          ref={mapRef}
          className="absolute origin-top-left select-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            width: "1200px",
            height: "1200px",
          }}
        >
          <img
            src="/lovable-uploads/map-locations.jpg"
            alt="Skarnheim Map"
            className="w-full h-full object-contain pointer-events-none select-none"
            draggable="false"
          />

          {points.map((point) => (
            <PointOfInterest 
              key={point.id} 
              point={point} 
              scale={1 / scale}
              isActive={point.id === activePointId}
              onSelect={handleSelectPoint}
            />
          ))}
        </div>
      </div>

      <MapControls
        onZoomIn={() => handleZoom("in")}
        onZoomOut={() => handleZoom("out")}
        onReset={handleReset}
        onAddPoint={toggleAddPoint}
        isAddingPoint={isAddingPoint}
      />
      
      {/* Points list with active point */}
      <div className="absolute top-4 right-4 w-full max-w-[350px] h-[calc(100%-2rem)] pointer-events-auto z-10">
        <PointsList 
          activePointId={activePointId} 
          onSelectPoint={handleSelectPoint} 
        />
      </div>
    </div>
  );
};

export default InteractiveMap;
