
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { useMap } from "@/context/MapContext";
import { X } from "lucide-react";
import { getIconOptions } from "@/utils/icons";
import MapIcon from "./MapIcon";

interface AddPointFormProps {
  isEdit?: boolean;
}

const AddPointForm = ({ isEdit = false }: AddPointFormProps) => {
  const { addPoint, updatePoint } = useMap();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("location");
  const [isOpen, setIsOpen] = useState(false);
  const iconOptions = getIconOptions();
  
  // Store point data in local state instead of DOM attributes
  const [pointData, setPointData] = useState({
    id: "",
    x: 0,
    y: 0,
    name: "",
    description: "",
    icon: "location"
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEdit) {
      updatePoint(pointData.id, { name, description, icon });
    } else {
      addPoint({ 
        name, 
        description, 
        x: pointData.x, 
        y: pointData.y, 
        icon 
      });
    }
    
    // Reset form
    setName("");
    setDescription("");
    setIcon("location");
    
    // Close dialog
    setIsOpen(false);
  };
  
  // For edit mode - populate form with existing data
  useEffect(() => {
    if (isEdit && isOpen) {
      setName(pointData.name);
      setDescription(pointData.description || "");
      setIcon(pointData.icon);
    }
  }, [isEdit, isOpen, pointData]);
  
  // Public methods exposed via ref
  const openAddPointDialog = (x: number, y: number) => {
    setPointData({ id: "", x, y, name: "", description: "", icon: "location" });
    setIsOpen(true);
  };
  
  const openEditPointDialog = (id: string, name: string, description: string = "", icon: string) => {
    setPointData({ id, x: 0, y: 0, name, description, icon });
    setIsOpen(true);
  };
  
  // Expose these methods to parent components via a custom attribute on the DOM element
  useEffect(() => {
    if (!isEdit) {
      const modalId = 'add-point-modal';
      window[modalId] = {
        showModal: openAddPointDialog,
      };
    } else {
      const modalId = 'edit-point-modal';
      window[modalId] = {
        showModal: openEditPointDialog,
      };
    }
    
    // Cleanup
    return () => {
      const modalId = isEdit ? 'edit-point-modal' : 'add-point-modal';
      delete window[modalId];
    };
  }, [isEdit]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Point of Interest" : "Add New Point of Interest"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter location name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="description">coords: {pointData.x}, {pointData.y}</Label>
          </div>
          
          <div>
            <Label>Icon</Label>
            <RadioGroup 
              value={icon} 
              onValueChange={setIcon}
              className="flex flex-wrap mt-2"
            >
              {iconOptions.map(option => (
                <div key={option.id} className="flex  mt-2 items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                  <Label 
                    htmlFor={option.id} 
                    className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer border ${
                      icon === option.id ? 'border-primary bg-primary/10' : 'border-border'
                    }`}
                  >
                    <div className="w-8 h-8 mb-1 flex items-center justify-center">
                      <MapIcon icon={option.id} name={option.name} />
                    </div>
                    <span className="text-xs">{option.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{isEdit ? "Update" : "Add"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPointForm;
