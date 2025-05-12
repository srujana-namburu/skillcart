
import { Book, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Map of icon names to icon components
const iconMap = {
  "code": Code,
  "book": Book,
};

interface RoadmapListProps {
  roadmaps: Array<{
    id: string;
    title: string;
    description: string;
    progress: number;
    icon: string;
  }>;
  selectedRoadmapId: string | null;
  onSelect: (roadmap: any) => void;
}

export default function RoadmapList({ roadmaps, selectedRoadmapId, onSelect }: RoadmapListProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold mb-4">Your Roadmaps</h2>
      
      {roadmaps.length > 0 ? (
        roadmaps.map((roadmap) => {
          // Get the icon component from the map, or default to Book
          const IconComponent = iconMap[roadmap.icon] || Book;
          const isSelected = selectedRoadmapId === roadmap.id;
          
          return (
            <Card 
              key={roadmap.id} 
              className={cn(
                "border-l-4 cursor-pointer transition-all duration-300 animate-scale-in hover:scale-[1.02]",
                isSelected 
                  ? "border-l-primary bg-accent/50 shadow-md" 
                  : "border-l-transparent hover:border-l-primary/50"
              )}
              onClick={() => onSelect(roadmap)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  isSelected ? "bg-primary/10" : "bg-secondary/80"
                )}>
                  <IconComponent className={cn(
                    "h-5 w-5", 
                    isSelected ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-1">{roadmap.title}</h3>
                  <div className="flex items-center justify-between mt-1">
                    <div className="w-full max-w-32">
                      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-primary rounded-full" 
                          style={{ width: `${roadmap.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      {roadmap.progress}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      ) : (
        <div className="p-6 text-center border rounded-md">
          <p className="text-muted-foreground">No roadmaps found</p>
          <p className="text-sm mt-1">Create your first roadmap to get started</p>
        </div>
      )}
    </div>
  );
}
