
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import useItemViewStore, { CurrentViewOption } from "@/store/use-toggleview-store";
import { LayoutGridIcon, List } from "lucide-react";

export default function IconToggle() {
  const { currentView, updateCurrentView } = useItemViewStore()

  const handleToggle = (value: CurrentViewOption) => {
    if (value.trim() === "") {
      return
    }
    updateCurrentView(value)
  }

  return (
    <ToggleGroup type="single" value={currentView} onValueChange={handleToggle} className="flex gap-1">
      <ToggleGroupItem value="grid" >
        <LayoutGridIcon className={`${currentView === 'grid' ? "text-primary" : "text-gray-500"}`} />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" >
        <List className={`${currentView === 'list' ? "text-primary" : "text-gray-500"}`} />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
