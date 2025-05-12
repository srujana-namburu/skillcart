
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Clock, Code, Book, Flame, ArrowRight, Calendar as CalendarIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import { UserProfile } from "@/types/profile";
import { useToast } from "@/hooks/use-toast";

// Define types for Roadmap data

interface Roadmap {
  id: string;
  title: string;
  description: string;
  skill_id: string;
  total_weeks: number;
  current_week: number;
  progress: number;
  created_at: string;
  updated_at: string;
  icon: any; // This will be a component
  lastAccessed: string;
  match_score?: number; // For recommendations
  currentWeek?: number; // Alias for current_week for backward compatibility
  totalWeeks?: number; // Alias for total_weeks for backward compatibility
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(0);
  const [nextLevelXP, setNextLevelXP] = useState(250);
  const [dailyGoalProgress, setDailyGoalProgress] = useState(0);
  const [dailyGoalTarget, setDailyGoalTarget] = useState(30); // minutes
  const [streakCount, setStreakCount] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [hasProfileSetup, setHasProfileSetup] = useState(true);
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const [recommendedRoadmaps, setRecommendedRoadmaps] = useState<Roadmap[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Function to fetch recommended roadmaps based on user interests
  const fetchRecommendedRoadmaps = async (interests: string[]) => {
    try {
      if (!interests || interests.length === 0) return;
      
      // Fetch all available roadmaps
      const { data: roadmapsData, error } = await supabase
        .from('roadmaps')
        .select('*');
      
      if (error) {
        console.error('Error fetching roadmaps:', error);
        return;
      }
      
      if (!roadmapsData || roadmapsData.length === 0) return;
      
      // Calculate match score for each roadmap based on user interests
      const roadmapsWithScores = roadmapsData.map((roadmap) => {
        // Simple algorithm: check if roadmap skill_id matches any user interest
        const matchesInterest = interests.includes(roadmap.skill_id);
        
        // Assign a score based on match (can be enhanced with more sophisticated algorithms)
        const matchScore = matchesInterest ? 100 : 0;
        
        // Create a proper Roadmap object with all required fields
        const enhancedRoadmap: Roadmap = {
          id: roadmap.id,
          title: roadmap.title,
          description: roadmap.description || '',
          skill_id: roadmap.skill_id,
          total_weeks: roadmap.total_weeks,
          current_week: roadmap.current_week,
          progress: 0, // Default progress value
          created_at: roadmap.created_at,
          updated_at: roadmap.updated_at,
          match_score: matchScore,
          lastAccessed: new Date(roadmap.updated_at).toLocaleDateString(),
          currentWeek: roadmap.current_week,
          totalWeeks: roadmap.total_weeks,
          icon: getIconForSkill(roadmap.skill_id)
        };
        
        return enhancedRoadmap;
      });
      
      // Sort by match score (highest first)
      const sortedRoadmaps = roadmapsWithScores.sort((a, b) => 
        (b.match_score || 0) - (a.match_score || 0)
      );
      
      // Take top 4 recommendations
      const topRecommendations = sortedRoadmaps.slice(0, 4);
      setRecommendedRoadmaps(topRecommendations);
      
      // If user has no current roadmaps and we have recommendations, use the top recommendation
      if (currentRoadmaps.length === 0 && topRecommendations.length > 0) {
        setCurrentRoadmaps([topRecommendations[0]]);
      }
    } catch (error) {
      console.error('Error generating recommendations:', error);
    }
  };
  
  // Helper function to get icon component based on skill_id
  const getIconForSkill = (skillId: string) => {
    // Map skill IDs to icon components
    const skillIconMap: Record<string, any> = {
      'web-dev': Code,
      'data-science': Book,
      'mobile-dev': Code,
      'ui-ux': Book,
      'machine-learning': Book,
      'devops': Code,
      'cloud': Code,
      'cybersecurity': Code,
      'blockchain': Code,
      'game-dev': Code
    };
    
    return skillIconMap[skillId] || Book; // Default to Book icon
  };
  
  // Weekly progress data
  const [weeklyProgress, setWeeklyProgress] = useState([
    { name: "Mon", progress: 0 },
    { name: "Tue", progress: 0 },
    { name: "Wed", progress: 0 },
    { name: "Thu", progress: 0 },
    { name: "Fri", progress: 0 },
    { name: "Sat", progress: 0 },
    { name: "Sun", progress: 0 },
  ]);
  
  // User roadmaps
  const [currentRoadmaps, setCurrentRoadmaps] = useState<Roadmap[]>([]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Redirect to login if not authenticated
          navigate('/login');
          return;
        }
        
        // Fetch user data
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (error) {
          console.error('Error fetching user data:', error);
          return;
        }
        
        if (userData) {
          setUserName(userData.display_name || session.user.email?.split('@')[0] || 'User');
          setUserLevel(1); // Default level
          setUserXP(userData.xp_points || 0);
          setNextLevelXP(250); // Default next level XP
          setDailyGoalProgress(0); // Default daily progress
          setStreakCount(userData.streak_count || 0);
        }
        
        // Fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
          
        if (profileError) {
          console.log('User profile not found, user needs to complete profile setup');
          setHasProfileSetup(false);
          setUserProfile(null);
        } else if (profileData) {
          // Set user profile data
          const userProfile: UserProfile = {
            id: profileData.id,
            user_id: profileData.user_id,
            interests: profileData.interests || [],
            primary_goal: profileData.primary_goal || '',
            weekly_time_hours: profileData.weekly_time_hours || 5,
            additional_goals: profileData.additional_goals,
            created_at: profileData.created_at,
            updated_at: profileData.updated_at
          };
          
          setUserProfile(userProfile);
          setHasProfileSetup(true);
          
          // Adjust daily goal target based on weekly time availability
          const weeklyHours = profileData.weekly_time_hours || 5;
          const dailyMinutes = Math.round((weeklyHours * 60) / 7); // Convert to daily minutes
          setDailyGoalTarget(dailyMinutes);
          
          // Fetch recommended roadmaps based on user interests
          if (profileData.interests && profileData.interests.length > 0) {
            await fetchRecommendedRoadmaps(profileData.interests);
          }
        }
        
        // Generate more realistic weekly progress data based on current day
        try {
          const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const today = new Date();
          const currentDayIndex = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
          
          // Create progress data that's more realistic - higher on weekdays, lower on weekends
          // and with a pattern that shows increasing engagement through the week
          const weekData = days.map((day, index) => {
            // Use a deterministic approach based on user ID and current date
            const userId = session.user.id || '';
            const userIdSum = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const dateKey = today.getDate() + today.getMonth() * 30;
            const seed = (userIdSum + dateKey + index) % 100;
            
            // Create a pattern: lower on weekends (Sun=0, Sat=6), higher mid-week
            let baseValue;
            if (index === 0 || index === 6) { // Weekend
              baseValue = 20 + (seed % 20); // 20-40 minutes
            } else if (index === 3 || index === 2) { // Mid-week (Tue/Wed)
              baseValue = 40 + (seed % 20); // 40-60 minutes
            } else { // Other weekdays
              baseValue = 30 + (seed % 25); // 30-55 minutes
            }
            
            // If the day hasn't occurred yet this week, reduce the value
            const dayPosition = (index + 7 - currentDayIndex) % 7; // Days from current day
            if (dayPosition > 0) { // Future day this week
              baseValue = Math.floor(baseValue * 0.2); // Only show 20% of expected value for future days
            }
            
            return {
              name: day,
              progress: Math.floor(baseValue)
            };
          });
          
          // Rotate array so that Monday is first
          const mondayIndex = weekData.findIndex(d => d.name === 'Mon');
          const rotatedWeekData = [
            ...weekData.slice(mondayIndex),
            ...weekData.slice(0, mondayIndex)
          ];
          
          setWeeklyProgress(rotatedWeekData);
        } catch (error) {
          console.error('Error generating weekly progress data:', error);
        }
        
        // Check if user has any enrolled courses, otherwise show empty state
        try {
          // In a real application, we would fetch the user's enrolled courses from the database
          // For now, we'll simulate this by checking if the user's email contains certain keywords
          const userEmail = session.user.email || '';
          const enrolledCourses = [];
          
          // Only show courses if the user has a specific email pattern (simulating database check)
          // In a real app, this would be replaced with an actual database query
          if (userEmail.includes('dev') || userEmail.includes('code') || userEmail.includes('admin')) {
            // This user is enrolled in Web Development
            const webDevProgress = Math.floor(70 + Math.random() * 15); // 70-85%
            enrolledCourses.push({
              id: 1,
              title: "Web Development Fundamentals",
              progress: webDevProgress,
              icon: Code,
              lastAccessed: "2 hours ago",
              currentWeek: Math.ceil(webDevProgress / 12.5), // 8 weeks total, so each week is 12.5%
              totalWeeks: 8
            });
          }
          
          if (userEmail.includes('data') || userEmail.includes('science') || userEmail.includes('admin')) {
            // This user is enrolled in Data Science
            const dataProgress = Math.floor(70 + Math.random() * 15); // 70-85%
            enrolledCourses.push({
              id: 2,
              title: "Data Science Basics",
              progress: dataProgress,
              icon: Book,
              lastAccessed: "Yesterday",
              currentWeek: Math.ceil(dataProgress / 12.5),
              totalWeeks: 8
            });
          }
          
          // Set the enrolled courses, or empty array if none
          setCurrentRoadmaps(enrolledCourses);
        } catch (error) {
          console.error('Error setting roadmaps data:', error);
        }
      } catch (error) {
        console.error('Error in dashboard:', error);
        toast({
          title: "Error loading dashboard",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <header className="mb-8 animate-slide-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold mb-1">Welcome back, {userName || 'User'}!</h1>
              <p className="text-muted-foreground">
                Your learning stats and progress
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {streakCount > 0 && (
                <div className="flex items-center border rounded-full px-4 py-2">
                  <Flame className="h-5 w-5 text-amber mr-2" />
                  <span className="font-medium">{streakCount} day streak!</span>
                </div>
              )}
              
              <Button className="bg-gradient-primary hover:bg-gradient-primary-hover rounded-full">
                Resume Learning
              </Button>
            </div>
          </div>
        </header>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="animate-scale-in">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                <Clock className="inline-block mr-2 h-5 w-5" /> Daily Goal
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-medium text-primary">{Math.round((dailyGoalProgress / dailyGoalTarget) * 100)}%</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="w-full h-2 bg-muted rounded-full mb-3">
                <div 
                  className="h-2 bg-gradient-primary rounded-full"
                  style={{ width: `${Math.min(Math.round((dailyGoalProgress / dailyGoalTarget) * 100), 100)}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                {dailyGoalProgress >= dailyGoalTarget 
                  ? "Daily goal completed!" 
                  : `Complete ${dailyGoalTarget - dailyGoalProgress} more minutes to reach your daily goal`}
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-scale-in [animation-delay:100ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                <CalendarIcon className="inline-block mr-2 h-5 w-5" /> Weekly Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyProgress}
                    margin={{
                      top: 5,
                      right: 0,
                      left: -30,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="progress" fill="#5D3FD3" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-scale-in [animation-delay:200ms]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                <Calendar className="inline-block mr-2 h-5 w-5" /> Current Level
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col items-center justify-center h-[150px]">
                <div className="w-28 h-28 rounded-full border-8 border-primary/20 flex items-center justify-center mb-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{userLevel}</span>
                  </div>
                </div>
                <p className="font-medium text-center">{userLevel === 1 ? 'Beginner' : userLevel === 2 ? 'Avid Learner' : 'Expert Learner'}</p>
                <p className="text-xs text-muted-foreground text-center">
                  {nextLevelXP - userXP} XP to level {userLevel + 1}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Current Learning Section */}
        <h2 className="text-2xl font-display font-bold mt-10 mb-6">Continue Learning</h2>
        
        {currentRoadmaps.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {currentRoadmaps.map((roadmap) => (
              <Card key={roadmap.id} className="skill-card overflow-hidden">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <roadmap.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{roadmap.title}</CardTitle>
                      <CardDescription>Last accessed {roadmap.lastAccessed}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{roadmap.progress}%</span>
                    </div>
                    
                    <div className="w-full h-2 bg-muted rounded-full">
                      <div 
                        className="h-2 bg-gradient-primary rounded-full"
                        style={{ width: `${roadmap.progress}%` }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-muted-foreground">Week {roadmap.currentWeek || roadmap.current_week} of {roadmap.totalWeeks || roadmap.total_weeks}</span>
                      <Button variant="outline" size="sm" className="btn-hover">
                        Continue <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="bg-muted/30 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Book className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No courses enrolled</h3>
            <p className="text-muted-foreground mb-6">You haven't enrolled in any courses yet. Browse our roadmaps to get started on your learning journey.</p>
            <Link to="/roadmaps">
              <Button className="bg-gradient-primary hover:bg-gradient-primary-hover">
                Browse Roadmaps <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}
        
        {/* Personalized Recommendations Section */}
        {userProfile && recommendedRoadmaps.length > 0 && (
          <>
            <h2 className="text-2xl font-display font-bold mt-12 mb-2">Recommended For You</h2>
            <p className="text-muted-foreground mb-6">
              Based on your interests in {userProfile.interests.map(i => i.replace('-', ' ')).join(', ')}
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recommendedRoadmaps.map((roadmap) => (
                <Card key={roadmap.id} className="skill-card overflow-hidden border-2 hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <roadmap.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{roadmap.title}</CardTitle>
                        <CardDescription>
                          {roadmap.match_score === 100 ? (
                            <span className="text-green-600 font-medium">Perfect match!</span>
                          ) : (
                            <span>Recommended for you</span>
                          )}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{roadmap.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{roadmap.total_weeks} weeks</span>
                      <Button variant="outline" size="sm" className="btn-hover">
                        Start Learning <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
        
        {/* Profile Setup Prompt if user hasn't completed profile setup */}
        {!hasProfileSetup && (
          <Card className="mt-12 border-2 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle>Complete Your Profile Setup</CardTitle>
              <CardDescription>
                Tell us about your interests and learning goals to get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Setting up your profile helps us tailor your learning experience to your specific needs and interests.
                </p>
                <Button 
                  className="bg-gradient-primary hover:bg-gradient-primary-hover whitespace-nowrap"
                  onClick={() => setIsProfileSetupOpen(true)}
                >
                  Setup Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
