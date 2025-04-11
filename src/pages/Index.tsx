
import { MapProvider } from "@/context/MapContext";
import InteractiveMap from "@/components/InteractiveMap";
import PointsList from "@/components/PointsList";
import AddPointForm from "@/components/AddPointForm";

const Index = () => {
  return (
    <MapProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border p-4">
          <div className="container flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wider">
              SKARNHEIM MAP EXPLORER
            </h1>
            <div className="text-sm text-muted-foreground">
              Interactive Fantasy Map
            </div>
          </div>
        </header>
        
        <main className="flex-1 container py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[calc(100vh-10rem)]">
            <div className="md:col-span-3 h-full">
              <InteractiveMap />
            </div>
            <div className="h-full overflow-y-auto">
              <PointsList />
            </div>
          </div>
        </main>
        
        {/* Add modals as controlled components instead of using ID attributes */}
        <AddPointForm />
        <AddPointForm isEdit={true} />
      </div>
    </MapProvider>
  );
};

export default Index;
