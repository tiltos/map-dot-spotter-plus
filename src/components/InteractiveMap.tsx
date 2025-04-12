import { useState, useRef, useEffect, MouseEvent, WheelEvent } from "react";
import { useMap } from "@/context/MapContext";
import PointOfInterest from "./PointOfInterest";
import MapControls from "./MapControls";
import MapToolbar from "./MapToolbar";

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

  const handleMapClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isAddingPoint || !mapContainerRef.current) return;

    const rect = mapContainerRef.current.getBoundingClientRect();

    // Calculate the cursor's position relative to the map's current transformation
    const cursorX = (e.clientX - rect.left - position.x) / scale;
    const cursorY = (e.clientY - rect.top - position.y) / scale;

    // Convert to percentage coordinates relative to the map container
    const x = (cursorX / rect.width) * 100;
    const y = (cursorY / rect.height) * 100;

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
    const delta = e.deltaY > 0 ? 0.9 : 1.1; // Scale factor
    const newScale = Math.min(Math.max(scale * delta, 0.5), 5); // Limit scale between 0.5 and 5

    // Adjust position to zoom towards the cursor position
    const newX = position.x - (cursorPosOnMapX * (newScale - scale));
    const newY = position.y - (cursorPosOnMapY * (newScale - scale));

    setCursorPosition({ x: e.clientX, y: e.clientY });
    setScale(newScale);
    setPosition({
      x: newX,
      y: newY,
    });
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
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const toggleAddPoint = () => {
    setIsAddingPoint(!isAddingPoint);
  };

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
          className="absolute w-full h-full origin-top-left select-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <img
            src="/lovable-uploads/map-locations.jpg"
            alt="Skarnheim Map"
            className="w-full h-full object-contain pointer-events-none select-none"
            draggable="false"
          />

          {points.map((point) => (
            <PointOfInterest key={point.id} point={point} scale={1 / scale} />
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
      <MapToolbar
        scale={scale}
        position={position}
        cursorPosition={cursorPosition}
      />
    </div>
  );
};

export default InteractiveMap;
