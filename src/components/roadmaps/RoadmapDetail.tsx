import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, ChevronDown, ChevronUp, CheckCircle, Circle, CheckCheck, BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// Define types for roadmap data
interface Resource {
  id: string;
  title: string;
  type: string;
  time: string;
  completed: boolean;
}

interface Step {
  id: string;
  title: string;
  status: string;
  resources: Resource[];
}

interface Week {
  id: string;
  week_number: number;
  title: string;
  description: string;
  status: string;
  xp_reward: number;
  steps: Step[];
}

interface RoadmapDetailProps {
  roadmap: {
    id: string;
    title: string;
    description: string;
    total_weeks: number;
    current_week: number;
    progress: number;
    created_at?: string; // Optional since it might not always be available
  };
  weeks?: Week[];
  onResourceComplete?: () => void;
}

export default function RoadmapDetail({ roadmap, weeks = [], onResourceComplete }: RoadmapDetailProps) {
  const [openWeeks, setOpenWeeks] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [roadmapWeeks, setRoadmapWeeks] = useState<Week[]>(weeks);

  // Fetch weeks data if not provided
  useEffect(() => {
    const fetchWeeksData = async () => {
      if (weeks.length > 0) {
        setRoadmapWeeks(weeks);
        setIsLoading(false);
        return;
      }

      try {
        // Fetch weeks data for this roadmap
        const response = await fetch(`/api/roadmaps/${roadmap.id}/weeks`);
        if (!response.ok) {
          throw new Error('Failed to fetch roadmap weeks');
        }
        const data = await response.json();
        setRoadmapWeeks(data);

        // Set the current week to be open by default
        if (data.length > 0) {
          const currentWeek = data.find(w => w.week_number === roadmap.current_week);
          if (currentWeek) {
            setOpenWeeks(prev => ({
              ...prev,
              [currentWeek.id]: true
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching roadmap weeks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeeksData();
  }, [roadmap.id, roadmap.current_week, weeks]);

  const toggleWeek = (weekId: string) => {
    setOpenWeeks(prev => ({
      ...prev,
      [weekId]: !prev[weekId]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case "in_progress":
        return <Clock className="h-5 w-5 text-amber" />;
      default:
        return <Circle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in_progress": return "In Progress";
      default: return "Not Started";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed": return "text-primary";
      case "in_progress": return "text-amber";
      default: return "text-muted-foreground";
    }
  };

  const markResourceComplete = (weekId, stepId, resourceId, isCompleted) => {
    console.log(`Resource ${resourceId} in step ${stepId} of week ${weekId} marked as ${isCompleted ? 'complete' : 'incomplete'}`);
    // In a real application, this would update the database
    
    // Call the onResourceComplete callback if provided and marking as complete
    if (isCompleted && onResourceComplete) {
      onResourceComplete();
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{roadmap.title}</h1>
        <p className="text-muted-foreground mb-4">{roadmap.description}</p>
        
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Week {roadmap.current_week} of {roadmap.total_weeks}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>Started {roadmap.created_at ? new Date(roadmap.created_at).toLocaleDateString() : "Recently"}</span>
          </div>
        </div>
        
        <div className="w-full mb-2">
          <div className="flex justify-between mb-2 text-sm">
            <span>Overall Progress</span>
            <span className="font-medium">{roadmap.progress}%</span>
          </div>
          <Progress value={roadmap.progress} className="h-2" />
        </div>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
        </div>
      ) : roadmapWeeks.length === 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">No content available for this roadmap yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {roadmapWeeks.map((week) => (
          <Collapsible
            key={week.id}
            open={openWeeks[week.id] || false}
            className={cn(
              "border rounded-lg transition-all duration-300",
              week.status === "completed" ? "border-l-4 border-l-primary" : 
              week.status === "in_progress" ? "border-l-4 border-l-amber" : ""
            )}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex justify-between items-center p-4 rounded-none"
                onClick={() => toggleWeek(week.id)}
              >
                <div className="flex items-center">
                  {getStatusIcon(week.status)}
                  <div className="ml-3 text-left">
                    <div className="font-medium">Week {week.week_number}: {week.title}</div>
                    <div className={cn("text-sm", getStatusClass(week.status))}>
                      {getStatusText(week.status)}
                    </div>
                  </div>
                </div>
                
                {openWeeks[week.id] ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </CollapsibleTrigger>
            
            <CollapsibleContent className="animate-accordion-down">
              <div className="p-4 pt-0 space-y-4">
                <p className="text-muted-foreground text-sm">{week.description}</p>
                
                <div className="ml-8 space-y-6">
                  {week.steps.map((step) => (
                    <div key={step.id} className="relative">
                      <div className="absolute left-0 top-0 -ml-8 mt-1.5 h-full">
                        <div className="h-full w-0.5 bg-border"></div>
                      </div>
                      
                      <div className="mb-2 flex items-center">
                        <div className="absolute left-0 -ml-10 mt-0.5">
                          {getStatusIcon(step.status)}
                        </div>
                        <h4 className="font-medium">{step.title}</h4>
                      </div>
                      
                      <div className="space-y-3">
                        {step.resources.map((resource) => (
                          <Card key={resource.id} className="overflow-hidden">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center">
                                <div className={cn(
                                  "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                                  "bg-secondary/80"
                                )}>
                                  {resource.type === "video" ? (
                                    <Clock className="h-5 w-5 text-muted-foreground" />
                                  ) : resource.type === "quiz" ? (
                                    <CheckCheck className="h-5 w-5 text-muted-foreground" />
                                  ) : (
                                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                                  )}
                                </div>
                                
                                <div>
                                  <h5 className="font-medium">{resource.title}</h5>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <span className="capitalize">{resource.type}</span>
                                    <span className="mx-1">•</span>
                                    <span>{resource.time}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <Button
                                variant={resource.completed ? "default" : "outline"}
                                size="sm"
                                className={resource.completed ? "bg-gradient-primary" : ""}
                                onClick={() => markResourceComplete(
                                  week.id, 
                                  step.id, 
                                  resource.id, 
                                  !resource.completed
                                )}
                              >
                                {resource.completed ? "Completed" : "Mark Complete"}
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {week.steps.length === 0 && week.status === "not_started" && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        Content will be available when you reach this week
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Reward:</span>
                    <span className="ml-1 font-medium">{week.xp_reward} XP</span>
                  </div>
                  
                  {week.status === "in_progress" && (
                    <Button size="sm" className="bg-gradient-primary">
                      Continue Learning
                    </Button>
                  )}
                  
                  {week.status === "not_started" && (
                    <Button size="sm" variant="outline">
                      Start Week
                    </Button>
                  )}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
        </div>
      )}
    </div>
  );
}
