
import { useMap } from "@/context/MapContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getIconForType } from "@/utils/icons";
import { Edit, X } from "lucide-react";

const PointsList = () => {
  const { points, deletePoint } = useMap();
  
  const handleEdit = (pointId: string) => {
    const point = points.find(p => p.id === pointId);
    if (!point) return;
    
    const modal = document.getElementById('edit-point-modal') as HTMLDialogElement;
    if (modal) {
      modal.dataset.pointId = point.id;
      modal.dataset.pointName = point.name;
      modal.dataset.pointIcon = point.icon;
      modal.dataset.pointDescription = point.description || '';
      modal.showModal();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Points of Interest</h2>
        <p className="text-sm text-muted-foreground">
          {points.length} location{points.length !== 1 ? 's' : ''} marked
        </p>
      </div>
      
      <ScrollArea className="flex-1">
        {points.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            No points added yet. Click on the map to add your first point!
          </div>
        ) : (
          <div className="space-y-1 p-1">
            {points.map((point) => (
              <div
                key={point.id}
                className="flex items-center p-2 rounded-md hover:bg-accent group"
              >
                <div className="mr-3 flex-shrink-0">
                  {getIconForType(point.icon, 24)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{point.name}</h3>
                  {point.description && (
                    <p className="text-xs text-muted-foreground truncate">{point.description}</p>
                  )}
                </div>
                
                <div className="ml-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(point.id)}
                    className="h-7 w-7"
                  >
                    <Edit size={15} />
                    <span className="sr-only">Edit {point.name}</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deletePoint(point.id)}
                    className="h-7 w-7 text-destructive hover:text-destructive"
                  >
                    <X size={15} />
                    <span className="sr-only">Delete {point.name}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default PointsList;
