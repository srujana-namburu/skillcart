
import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Users, MessageSquare, Star } from "lucide-react";
import { LevelProgress } from "@/components/gamification/LevelProgress";
import { BadgeDisplay } from "@/components/gamification/BadgeDisplay";
import { Badge, BadgeType } from "@/components/gamification/Badge";

// Mock user data
const userData = {
  id: "1",
  name: "Jane Cooper",
  username: "jane.cooper",
  avatar: "https://i.pravatar.cc/300?u=jane",
  email: "jane.cooper@example.com",
  bio: "Full stack developer learning new skills every day. Currently focused on improving my React and Node.js knowledge.",
  location: "San Francisco, CA",
  joinedDate: "January 2025",
  following: 48,
  followers: 152,
  level: 5,
  currentXP: 1350,
  requiredXP: 2000,
  totalXP: 8750,
  streakDays: 12,
  completedResources: 87,
  completedRoadmaps: 2,
};

// Mock badges data
const userBadges = [
  {
    id: "b1",
    type: "streak" as BadgeType,
    name: "7-Day Streak",
    description: "Completed learning activities for 7 consecutive days",
    tier: "bronze" as const,
    earned: true,
  },
  {
    id: "b2",
    type: "mastery" as BadgeType,
    name: "Web Basics",
    description: "Completed the Web Development Fundamentals roadmap",
    tier: "silver" as const,
    earned: true,
  },
  {
    id: "b3",
    type: "helper" as BadgeType,
    name: "Helpful Hand",
    description: "Received 10 helpful votes on your answers",
    tier: "bronze" as const,
    earned: true,
  },
  {
    id: "b4",
    type: "contributor" as BadgeType,
    name: "Resource Curator",
    description: "Suggested 5 quality learning resources",
    tier: "bronze" as const,
    earned: true,
  },
  {
    id: "b5",
    type: "streak" as BadgeType,
    name: "30-Day Streak",
    description: "Completed learning activities for 30 consecutive days",
    tier: "silver" as const,
    earned: false,
  },
  {
    id: "b6",
    type: "mastery" as BadgeType,
    name: "React Master",
    description: "Completed the React Advanced roadmap with perfect scores",
    tier: "gold" as const,
    earned: false,
  },
];

// Mock activity feed data
const activityFeed = [
  {
    id: "a1",
    type: "roadmap-progress",
    title: "Made progress on Web Development Fundamentals",
    detail: "Completed Week 3: DOM Manipulation",
    time: "2 hours ago",
    xp: 75,
  },
  {
    id: "a2",
    type: "badge-earned",
    title: "Earned a new badge",
    detail: "Helpful Hand",
    time: "Yesterday",
    xp: 50,
  },
  {
    id: "a3",
    type: "discussion",
    title: "Posted in Web Development discussion",
    detail: "Answered a question about CSS Grid layout",
    time: "3 days ago",
    xp: 25,
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

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start mb-8 animate-fade-in">
          <div className="relative">
            <Avatar className="h-28 w-28 border-4 border-white shadow-md">
              <img src={userData.avatar} alt={userData.name} />
            </Avatar>
            <div className="absolute -right-2 -bottom-2 rounded-full bg-gradient-primary p-2">
              <Star className="h-5 w-5 text-white" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold">{userData.name}</h1>
                <p className="text-muted-foreground">@{userData.username}</p>
                
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {userData.joinedDate}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{userData.followers} Followers</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <span>Following {userData.following}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline">
                  Follow
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <p className="mt-4 max-w-2xl">{userData.bio}</p>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Stats */}
          <div className="space-y-6">
            <LevelProgress 
              level={userData.level}
              currentXP={userData.currentXP}
              requiredXP={userData.requiredXP}
            />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Stats</CardTitle>
                <CardDescription>Your learning achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Streak</span>
                    <span className="font-semibold">{userData.streakDays} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total XP</span>
                    <span className="font-semibold">{userData.totalXP} XP</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Resources Completed</span>
                    <span className="font-semibold">{userData.completedResources}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Roadmaps Completed</span>
                    <span className="font-semibold">{userData.completedRoadmaps}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recent Badges</CardTitle>
                <CardDescription>Your latest achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 justify-center">
                  {userBadges.filter(badge => badge.earned).slice(0, 3).map(badge => (
                    <Badge
                      key={badge.id}
                      type={badge.type}
                      name={badge.name}
                      description={badge.description}
                      tier={badge.tier}
                    />
                  ))}
                </div>
                <Button variant="link" className="w-full mt-2">
                  View All Badges
                </Button>
              </CardContent>
            </Card>
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
                <BadgeDisplay badges={userBadges} />
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

// Missing import added here
import { BookOpen, Award } from "lucide-react";
