
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Users, MessageSquare, Star, BookOpen, Award } from "lucide-react";
import { LevelProgress } from "@/components/gamification/LevelProgress";
import { BadgeDisplay } from "@/components/gamification/BadgeDisplay";
import { Badge, BadgeType } from "@/components/gamification/Badge";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Define types for our data structures
type UserData = {
  id: string;
  name: string;
  username: string;
  avatar: string;
  email: string;
  bio: string;
  location: string;
  joinedDate: string;
  following: number;
  followers: number;
  level: number;
  currentXP: number;
  requiredXP: number;
  totalXP: number;
  streakDays: number;
  completedResources: number;
  completedRoadmaps: number;
};

type ActivityItem = {
  id: string;
  type: 'roadmap-progress' | 'badge-earned' | 'discussion' | 'roadmap-started';
  title: string;
  detail: string;
  time: string;
  xp: number;
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        
        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Redirect to login if not authenticated
          navigate('/login');
          return;
        }
        
        // Fetch user data from Supabase
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userError) {
          console.error('Error fetching user data:', userError);
          // Create a default user profile using auth data
          const userEmail = session.user.email || '';
          const userName = session.user.user_metadata?.name || userEmail.split('@')[0];
          
          // Generate a deterministic avatar URL based on the user's email
          const avatarSeed = encodeURIComponent(userEmail);
          const avatarUrl = `https://i.pravatar.cc/300?u=${avatarSeed}`;
          
          // Set default user data
          setUserData({
            id: session.user.id,
            name: userName,
            username: userName.toLowerCase().replace(/\s+/g, '.'),
            avatar: avatarUrl,
            email: userEmail,
            bio: 'Learning new skills on SkillKart',
            location: '',
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            following: 0,
            followers: 0,
            level: 1,
            currentXP: 0,
            requiredXP: 100,
            totalXP: 0,
            streakDays: 0,
            completedResources: 0,
            completedRoadmaps: 0
          });
        } else if (userData) {
          // Format the user data from the database
          setUserData({
            id: session.user.id,
            name: userData.display_name || session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            username: (userData.display_name || session.user.email?.split('@')[0] || 'user').toLowerCase().replace(/\s+/g, '.'),
            avatar: userData.avatar_url || `https://i.pravatar.cc/300?u=${encodeURIComponent(session.user.email || '')}`,
            email: session.user.email || '',
            bio: userData.bio || 'Learning new skills on SkillKart',
            location: userData.location || '',
            joinedDate: new Date(userData.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            following: 0,
            followers: 0,
            level: 1,
            currentXP: userData.xp_points || 0,
            requiredXP: 100,
            totalXP: userData.xp_points || 0,
            streakDays: userData.streak_count || 0,
            completedResources: 0,
            completedRoadmaps: 0
          });
        }
        
        // Generate some badges based on user data
        const generatedBadges = [
          {
            id: "b1",
            type: "streak" as BadgeType,
            name: "7-Day Streak",
            description: "Completed learning activities for 7 consecutive days",
            tier: "bronze" as const,
            earned: (userData?.streak_count || 0) >= 7,
          },
          {
            id: "b2",
            type: "mastery" as BadgeType,
            name: "Web Basics",
            description: "Completed the Web Development Fundamentals roadmap",
            tier: "silver" as const,
            earned: false,
          },
          {
            id: "b5",
            type: "streak" as BadgeType,
            name: "30-Day Streak",
            description: "Completed learning activities for 30 consecutive days",
            tier: "silver" as const,
            earned: (userData?.streak_count || 0) >= 30,
          },
        ];
        
        setUserBadges(generatedBadges);
        
        // Generate activity feed based on user data
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const threeDaysAgo = new Date(now);
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const generatedActivity: ActivityItem[] = [
          {
            id: "a1",
            type: "roadmap-progress",
            title: "Made progress on Web Development Fundamentals",
            detail: "Completed a new section",
            time: "2 hours ago",
            xp: 75,
          },
          {
            id: "a4",
            type: "roadmap-started",
            title: "Started a new roadmap",
            detail: "Data Science Basics",
            time: "1 week ago",
            xp: 10,
          },
        ];
        
        // Add streak badge if user has a streak
        if ((userData?.streak_count || 0) >= 7) {
          generatedActivity.splice(1, 0, {
            id: "a2",
            type: "badge-earned",
            title: "Earned a new badge",
            detail: "7-Day Streak",
            time: "Yesterday",
            xp: 50,
          });
        }
        
        setActivityFeed(generatedActivity);
      } catch (error) {
        console.error('Error in profile page:', error);
        toast({
          title: "Error loading profile",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [navigate, toast]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8 animate-fade-in">
          {userData ? (
            <>
              <div className="relative">
                <Avatar className="h-28 w-28 border-4 border-white shadow-md">
                  <img src={userData.avatar} alt={userData.name} />
                </Avatar>
                {userData.level > 1 && (
                  <div className="absolute -right-2 -bottom-2 rounded-full bg-gradient-primary p-2">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">{userData.name}</h1>
                    <p className="text-muted-foreground">@{userData.username}</p>
                  </div>

                  <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={() => setIsEditing(!isEditing)}>
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>

                <div className="mt-4 space-y-2">
                  {userData.bio && (
                    <p>{userData.bio}</p>
                  )}

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    {userData.location && (
                      <div className="flex items-center gap-1">
                        <span>📍</span>
                        <span>{userData.location}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {userData.joinedDate}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>
                        <strong>{userData.following}</strong> Following
                      </span>
                      <span className="mx-1">·</span>
                      <span>
                        <strong>{userData.followers}</strong> Followers
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full text-center py-8">
              <p>Loading profile...</p>
            </div>
          )}
        </div>

        {/* Profile Content */}
        <div className="grid gap-6 lg:grid-cols-3 mt-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {userData && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Level Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <LevelProgress
                      level={userData.level}
                      currentXP={userData.currentXP}
                      requiredXP={userData.requiredXP}
                      totalXP={userData.totalXP}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Current Streak</span>
                      <span className="font-medium">{userData.streakDays} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Resources Completed</span>
                      <span className="font-medium">{userData.completedResources}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Roadmaps Completed</span>
                      <span className="font-medium">{userData.completedRoadmaps}</span>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
          
          {/* Main Content Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="mb-6 w-full">
                <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
                <TabsTrigger value="roadmaps" className="flex-1">Roadmaps</TabsTrigger>
                <TabsTrigger value="badges" className="flex-1">Badges</TabsTrigger>
                <TabsTrigger value="discussions" className="flex-1">Discussions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity" className="animate-fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {activityFeed.length > 0 ? (
                      <div className="space-y-4">
                        {activityFeed.map(activity => (
                          <div key={activity.id} className="flex items-start gap-4 py-2 border-b last:border-b-0">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                              {activity.type === 'roadmap-progress' && <BookOpen className="h-5 w-5" />}
                              {activity.type === 'badge-earned' && <Award className="h-5 w-5" />}
                              {activity.type === 'discussion' && <MessageSquare className="h-5 w-5" />}
                              {activity.type === 'roadmap-started' && <BookOpen className="h-5 w-5" />}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{activity.title}</h4>
                              <p className="text-sm text-muted-foreground">{activity.detail}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                                <span className="text-xs font-medium text-primary">+{activity.xp} XP</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center py-8 text-muted-foreground">
                        No recent activity to display
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="roadmaps">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Roadmaps</CardTitle>
                    <CardDescription>Track your learning journey progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      Your active and completed roadmaps will appear here
                    </p>
                    <Button className="w-full">
                      Browse Roadmaps
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="badges">
                {userBadges.length > 0 ? (
                  <BadgeDisplay badges={userBadges} />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Badges</CardTitle>
                      <CardDescription>Complete activities to earn badges</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center py-8 text-muted-foreground">
                        You haven't earned any badges yet
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="discussions">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Discussions</CardTitle>
                    <CardDescription>Questions you've asked and answered</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center py-8 text-muted-foreground">
                      You haven't participated in any discussions yet
                    </p>
                    <Button className="w-full">
                      Browse Discussions
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}


