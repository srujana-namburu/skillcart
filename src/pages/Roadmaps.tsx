
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import RoadmapList from "@/components/roadmaps/RoadmapList";
import RoadmapDetail from "@/components/roadmaps/RoadmapDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Plus, Trophy, Zap, Award } from "lucide-react";
import CreateRoadmapDialog from "@/components/roadmaps/CreateRoadmapDialog";
import { XPNotification } from "@/components/gamification/XPNotification";
import { LevelProgress } from "@/components/gamification/LevelProgress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, BadgeType } from "@/components/gamification/Badge";

// Mock roadmap data - would come from API/database
const mockRoadmaps = [
  {
    id: "1",
    title: "Web Development Fundamentals",
    description: "Learn the core fundamentals of modern web development",
    skill_id: "web-dev",
    total_weeks: 8,
    current_week: 3,
    progress: 35,
    created_at: "2025-04-15T10:30:00Z",
    updated_at: "2025-05-10T14:22:00Z",
    icon: "code",
  },
  {
    id: "2",
    title: "Data Science Basics",
    description: "Master the foundational concepts of data science",
    skill_id: "data-science",
    total_weeks: 12,
    current_week: 2,
    progress: 15,
    created_at: "2025-04-01T08:15:00Z",
    updated_at: "2025-05-09T16:45:00Z",
    icon: "book",
  }
];

// Mock user progress data
const userProgressData = {
  level: 2,
  currentXP: 350,
  requiredXP: 500,
  streakDays: 5,
  recentBadges: [
    {
      id: "b1",
      type: "streak" as BadgeType,
      name: "5-Day Streak",
      description: "Completed learning activities for 5 consecutive days",
      tier: "bronze" as const,
      earned: true,
    },
    {
      id: "b2",
      type: "mastery" as BadgeType,
      name: "Getting Started",
      description: "Created your first learning roadmap",
      tier: "bronze" as const,
      earned: true,
    },
  ]
};

export default function Roadmaps() {
  const [isLoading, setIsLoading] = useState(true);
  const [roadmaps, setRoadmaps] = useState([]);
  const [selectedRoadmap, setSelectedRoadmap] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [showXPNotification, setShowXPNotification] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);
  const [xpReason, setXpReason] = useState("");
  const { toast } = useToast();

  // Simulating API data fetch
  useEffect(() => {
    // This would be an actual API call in production
    const fetchRoadmaps = async () => {
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Set the mock data
        setRoadmaps(mockRoadmaps);
        
        // If there are roadmaps, select the first one by default
        if (mockRoadmaps.length > 0) {
          setSelectedRoadmap(mockRoadmaps[0]);
        }
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
        toast({
          title: "Failed to load roadmaps",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmaps();
  }, [toast]);

  const handleRoadmapSelect = (roadmap) => {
    setSelectedRoadmap(roadmap);
  };

  const handleCreateRoadmap = (newRoadmap) => {
    // In a real app, this would make an API call to create the roadmap
    const createdRoadmap = {
      ...newRoadmap,
      id: `${roadmaps.length + 1}`,
      current_week: 1,
      progress: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    setRoadmaps([...roadmaps, createdRoadmap]);
    setSelectedRoadmap(createdRoadmap);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Roadmap created!",
      description: `Your "${createdRoadmap.title}" roadmap has been created.`,
    });
    
    // Show XP notification
    setXpAmount(50);
    setXpReason("Created a new roadmap");
    setShowXPNotification(true);
  };
  
  const handleResourceComplete = () => {
    setXpAmount(25);
    setXpReason("Completed a resource");
    setShowXPNotification(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container flex-1 py-8">
        {/* XP Notification */}
        {showXPNotification && (
          <XPNotification 
            amount={xpAmount} 
            reason={xpReason} 
            onComplete={() => setShowXPNotification(false)} 
          />
        )}
      
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 animate-slide-in">
          <div>
            <h1 className="text-3xl font-display font-bold mb-1">Your Learning Roadmaps</h1>
            <p className="text-muted-foreground">
              Track your progress and continue your learning journey
            </p>
          </div>
          
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="mt-4 md:mt-0 bg-gradient-primary hover:bg-gradient-primary-hover"
          >
            <Plus className="mr-1 h-4 w-4" />
            Create Roadmap
          </Button>
          
          <CreateRoadmapDialog 
            open={isCreateDialogOpen} 
            onOpenChange={setIsCreateDialogOpen}
            onCreate={handleCreateRoadmap}
          />
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left sidebar with user progress and roadmap list */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* User Progress Card */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Compact Level Progress */}
                <LevelProgress 
                  level={userProgressData.level}
                  currentXP={userProgressData.currentXP}
                  requiredXP={userProgressData.requiredXP}
                  compact={true}
                />
                
                {/* Streak */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Streak</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{userProgressData.streakDays} days</span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber/20">
                      <Zap className="h-3 w-3 text-amber" />
                    </div>
                  </div>
                </div>
                
                {/* Recent Badges */}
                {userProgressData.recentBadges.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-medium">Recent Badges</h4>
                    <div className="flex gap-3">
                      {userProgressData.recentBadges.map(badge => (
                        <Badge
                          key={badge.id}
                          type={badge.type}
                          name={badge.name}
                          description={badge.description}
                          tier={badge.tier}
                          size="sm"
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <Button variant="link" size="sm" className="p-0">
                    View full profile
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Roadmap List */}
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-14 rounded-md" />
                <Skeleton className="h-14 rounded-md" />
                <Skeleton className="h-14 rounded-md" />
              </div>
            ) : (
              <RoadmapList 
                roadmaps={roadmaps} 
                selectedRoadmapId={selectedRoadmap?.id} 
                onSelect={handleRoadmapSelect} 
              />
            )}
          </div>
          
          {/* Main content area with roadmap details */}
          <div className="lg:col-span-8 xl:col-span-9">
            {isLoading ? (
              <div className="space-y-6">
                <Skeleton className="h-10 w-3/4 rounded-md" />
                <Skeleton className="h-24 rounded-md" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-32 rounded-md" />
                  <Skeleton className="h-32 rounded-md" />
                </div>
                <Skeleton className="h-64 rounded-md" />
              </div>
            ) : selectedRoadmap ? (
              <RoadmapDetail 
                roadmap={selectedRoadmap} 
                onResourceComplete={handleResourceComplete}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-card">
                <h3 className="text-xl font-semibold mb-2">No Roadmap Selected</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Select a roadmap from the list or create a new one to get started
                </p>
                <Button 
                  onClick={() => setIsCreateDialogOpen(true)}
                  variant="outline"
                >
                  Create Your First Roadmap
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
