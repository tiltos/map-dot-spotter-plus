
import { Filter } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getIconOptions } from "@/utils/icons";
import MapIcon from "../MapIcon";

interface PointsFilterProps {
  filter: string;
  setFilter: (value: string) => void;
  filteredPointsCount: number;
}

const PointsFilter = ({ filter, setFilter, filteredPointsCount }: PointsFilterProps) => {
  const iconOptions = getIconOptions();

  return (
    <div className="flex items-center justify-between mt-2 p-4 pt-1 border-b border-border">
      <p className="text-sm text-muted-foreground">
        {filteredPointsCount}{" "}
        {filter === "all" ? "location" : filter}
        {filteredPointsCount !== 1 ? "s" : ""}
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
  );
};

export default PointsFilter;
