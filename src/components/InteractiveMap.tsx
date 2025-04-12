
import { useState, useRef, useEffect, MouseEvent, WheelEvent } from "react";
import { useMap } from "@/context/MapContext";
import PointOfInterest from "./PointOfInterest";
import MapControls from "./MapControls";

const InteractiveMap = () => {
  const { points, addPoint } = useMap();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  
  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isAddingPoint, setIsAddingPoint] = useState(false);
  
  const handleMapClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isAddingPoint || !mapContainerRef.current) return;
    
    const rect = mapContainerRef.current.getBoundingClientRect();
    
    const x = ((e.clientX - rect.left) / scale - position.x / scale) * 100 / mapContainerRef.current.offsetWidth;
    const y = ((e.clientY - rect.top) / scale - position.y / scale) * 100 / mapContainerRef.current.offsetHeight;
    
    if (window['add-point-modal'] && typeof window['add-point-modal'].showModal === 'function') {
      window['add-point-modal'].showModal(x, y);
    }
    
    setIsAddingPoint(false);
  };
  
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (isAddingPoint) return;
    setIsPanning(true);
    setStartPoint({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isPanning) return;
    
    // Direct position update without transition for immediate response
    setPosition({
      x: e.clientX - startPoint.x,
      y: e.clientY - startPoint.y
    });
  };
  
  const handleMouseUp = () => {
    setIsPanning(false);
  };
  
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    // Get the cursor position relative to the map container
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    // Calculate scale change
    const delta = e.deltaY > 0 ? 0.9 : 1.1; // Scale factor
    const newScale = Math.min(Math.max(scale * delta, 0.5), 5); // Limit scale between 0.5 and 5
    
    // Calculate new position to zoom towards the cursor position
    const scaleRatio = newScale / scale;
    const newX = cursorX - scaleRatio * (cursorX - position.x);
    const newY = cursorY - scaleRatio * (cursorY - position.y);
    
    setScale(newScale);
    setPosition({
      x: newX,
      y: newY
    });
  };
  
  const handleZoom = (direction: "in" | "out") => {
    setScale(prevScale => {
      const newScale = direction === "in" 
        ? Math.min(prevScale * 1.2, 5) 
        : Math.max(prevScale / 1.2, 0.5);
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
        className={`relative w-full h-full overflow-hidden bg-black ${isAddingPoint ? "cursor-crosshair" : "cursor-grab"} ${isPanning ? "cursor-grabbing" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleMapClick}
        onWheel={handleWheel}
      >
        <div
          ref={mapRef}
          className="absolute w-full h-full origin-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
        >
          <img
            src="/lovable-uploads/map-locations.jpg"
            alt="Skarnheim Map"
            className="w-full h-full object-contain pointer-events-none"
          />
          
          {points.map((point) => (
            <PointOfInterest key={point.id} point={point} scale={scale} />
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
    </div>
  );
};

export default InteractiveMap;
