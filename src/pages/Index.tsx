
import { MapProvider } from "@/context/MapContext";
import InteractiveMap from "@/components/InteractiveMap";
import PointsList from "@/components/PointsList";
import AddPointForm from "@/components/AddPointForm";

const Index = () => {
  return (
    <MapProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border p-4 z-10 bg-background">
          <div className="container flex justify-center items-center">
            <h1 className="text-2xl font-bold tracking-wider">
              SKARNHEIM
            </h1>
          </div>
        </header>
        
        <main className="flex-1 relative">
          {/* Map takes full width/height */}
          <div className="absolute inset-0">
            <InteractiveMap />
          </div>
          
          {/* Points list overlay */}
          <div className="absolute top-4 right-4 w-full max-w-[350px] h-[calc(100%-2rem)] pointer-events-auto z-10">
            <PointsList />
          </div>
        </main>
        
        <AddPointForm />
        <AddPointForm isEdit={true} />
      </div>
    </MapProvider>
  );
};

export default Index;
