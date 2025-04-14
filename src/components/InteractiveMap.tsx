import { useState, useRef, useEffect, MouseEvent, WheelEvent, TouchEvent } from "react";
import { useMap } from "@/context/MapContext";
import PointOfInterest from "./PointOfInterest";
import MapControls from "./MapControls";
import MapToolbar from "./MapToolbar";
import PointsList from "./PointsList";
import { useIsMobile } from "@/hooks/use-mobile";

const InteractiveMap = () => {
  const { points, addPoint, centerPosition, setCenterPosition } = useMap();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isAddingPoint, setIsAddingPoint] = useState(false);
  const [activePointId, setActivePointId] = useState<string | null>(null);
  const [touchDistance, setTouchDistance] = useState<number | null>(null);

  useEffect(() => {
    if (centerPosition && mapRef.current) {
      const { x, y } = centerPosition;
      
      const targetX = (x / 100) * mapRef.current.offsetWidth;
      const targetY = (y / 100) * mapRef.current.offsetHeight;
      
      if (mapContainerRef.current) {
        const containerWidth = mapContainerRef.current.offsetWidth;
        const containerHeight = mapContainerRef.current.offsetHeight;
        
        const newX = (containerWidth / 2) - (targetX * scale);
        const newY = (containerHeight / 2) - (targetY * scale);
        
        setPosition({ x: newX, y: newY });
        setCenterPosition(null);
      }
    }
  }, [centerPosition, scale, setCenterPosition]);

  const handleMapClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isAddingPoint || !mapRef.current) return;

    const rect = mapRef.current.getBoundingClientRect();

    console.log("e.clientX, clientX", e.clientX, e.clientY);
    console.log("rect", rect);

    console.log("scale", scale);

    const cursorX = (e.clientX - rect.left) / scale;
    const cursorY = (e.clientY - rect.top) / scale;

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

    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    const cursorPosOnMapX = (cursorX - position.x) / scale;
    const cursorPosOnMapY = (cursorY - position.y) / scale;

    const delta = e.deltaY > 0 ? 0.8 : 1.2;
    const newScale = Math.min(Math.max(scale * delta, 1), 5);

    const newX = position.x - cursorPosOnMapX * (newScale - scale);
    const newY = position.y - cursorPosOnMapY * (newScale - scale);

    setCursorPosition({ x: e.clientX, y: e.clientY });
    setScale(newScale);
    setPosition({
      x: newX,
      y: newY,
    });
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (isAddingPoint) return;
    
    // For panning (single touch)
    if (e.touches.length === 1) {
      setIsPanning(true);
      setStartPoint({ 
        x: e.touches[0].clientX - position.x, 
        y: e.touches[0].clientY - position.y 
      });
    }
    // For zooming (pinch - two touches)
    else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      setTouchDistance(distance);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent scrolling while interacting with the map
    
    // For panning (single touch)
    if (e.touches.length === 1 && isPanning) {
      setPosition({
        x: e.touches[0].clientX - startPoint.x,
        y: e.touches[0].clientY - startPoint.y,
      });
    } 
    // For zooming (pinch - two touches)
    else if (e.touches.length === 2 && touchDistance !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDistance = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate pinch center point
      const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      
      if (!mapContainerRef.current) return;
      const rect = mapContainerRef.current.getBoundingClientRect();
      
      const cursorX = centerX - rect.left;
      const cursorY = centerY - rect.top;
      
      const cursorPosOnMapX = (cursorX - position.x) / scale;
      const cursorPosOnMapY = (cursorY - position.y) / scale;
      
      // Calculate zoom factor based on pinch distance change
      const zoomFactor = newDistance / touchDistance;
      const newScale = Math.min(Math.max(scale * zoomFactor, 1), 5);
      
      // Adjust position to keep the pinch center fixed
      const newX = position.x - cursorPosOnMapX * (newScale - scale);
      const newY = position.y - cursorPosOnMapY * (newScale - scale);
      
      setTouchDistance(newDistance);
      setScale(newScale);
      setPosition({
        x: newX,
        y: newY,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
    setTouchDistance(null);
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

    const centerX = (containerRect.width - mapRect.width * scale) / 2;
    const centerY = (containerRect.height - mapRect.height * scale) / 2;

    setScale(1);
    setPosition({ x: centerX, y: centerY });
  };

  const toggleAddPoint = () => {
    setIsAddingPoint(!isAddingPoint);
  };

  useEffect(() => {
    if (!mapContainerRef.current || !mapRef.current) return;

    const containerRect = mapContainerRef.current.getBoundingClientRect();
    const mapRect = mapRef.current.getBoundingClientRect();

    const centerX = (containerRect.width - mapRect.width) / 2;
    const centerY = (containerRect.height - mapRect.height) / 2;

    setPosition({ x: centerX, y: centerY });
  }, []);

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div
        ref={mapContainerRef}
        className={`relative ${isMobile ? activePointId ? 'h-[40%]' : 'h-[70%]' : 'h-full'} overflow-hidden bg-sea ${
          isAddingPoint ? "cursor-crosshair" : "cursor-grab"
        } ${isPanning ? "cursor-grabbing" : ""} select-none`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleMapClick}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <div
          ref={mapRef}
          className="absolute origin-top-left select-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            width: "1200px",
            height: "1200px",
            transition: centerPosition ? "transform 0.5s ease-in-out" : "none",
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
        <div className="absolute bottom-4 left-4">
          <img
            src="/scale.svg"
            className={`w-[150px]  pointer-events-none select-none ${isMobile ? "hidden" : "h-[12px]"}`}
            style={{
              transform: `scaleX(${scale})`,
              transformOrigin: "left bottom",
            }}
          />
        </div>
      </div>

      {!isMobile && (
        <MapControls
          onZoomIn={() => handleZoom("in")}
          onZoomOut={() => handleZoom("out")}
          onReset={handleReset}
          onAddPoint={toggleAddPoint}
          isAddingPoint={isAddingPoint}
        />
      )}

      
        <PointsList
          activePointId={activePointId}
          onSelectPoint={handleSelectPoint}
          isMobile={isMobile}
        />
      
    </div>
  );
};

export default InteractiveMap;
