
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useMap } from "@/context/MapContext";
import { X } from "lucide-react";
import { getIconOptions } from "@/utils/icons";

interface AddPointFormProps {
  isEdit?: boolean;
}

const AddPointForm = ({ isEdit = false }: AddPointFormProps) => {
  const { addPoint, updatePoint } = useMap();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("location");
  const iconOptions = getIconOptions();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const modal = document.getElementById(isEdit ? 'edit-point-modal' : 'add-point-modal') as HTMLDialogElement;
    
    if (isEdit) {
      const pointId = modal.dataset.pointId || "";
      updatePoint(pointId, { name, description, icon });
    } else {
      const x = parseFloat(modal.dataset.x || "0");
      const y = parseFloat(modal.dataset.y || "0");
      addPoint({ name, description, x, y, icon });
    }
    
    // Reset form
    setName("");
    setDescription("");
    setIcon("location");
    
    // Close modal
    modal.close();
  };
  
  // For edit mode - populate form with existing data
  useEffect(() => {
    if (isEdit) {
      const modal = document.getElementById('edit-point-modal') as HTMLDialogElement;
      modal.addEventListener('toggle', () => {
        if (modal.open) {
          setName(modal.dataset.pointName || "");
          setDescription(modal.dataset.pointDescription || "");
          setIcon(modal.dataset.pointIcon || "location");
        }
      });
    }
  }, [isEdit]);

  return (
    <Dialog id={isEdit ? "edit-point-modal" : "add-point-modal"}>
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
            <Label>Icon</Label>
            <RadioGroup 
              value={icon} 
              onValueChange={setIcon}
              className="grid grid-cols-4 gap-2 mt-2"
            >
              {iconOptions.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                  <Label 
                    htmlFor={option.id} 
                    className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer border ${
                      icon === option.id ? 'border-primary bg-primary/10' : 'border-border'
                    }`}
                  >
                    <div className="w-8 h-8 mb-1 flex items-center justify-center">
                      {option.icon}
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
