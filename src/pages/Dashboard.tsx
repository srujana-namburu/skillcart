
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Clock, Code, Book, Flame, ArrowRight, Calendar as CalendarIcon } from "lucide-react";

export default function Dashboard() {
  // Sample data for the charts
  const weeklyProgress = [
    { name: "Mon", progress: 30 },
    { name: "Tue", progress: 45 },
    { name: "Wed", progress: 20 },
    { name: "Thu", progress: 60 },
    { name: "Fri", progress: 50 },
    { name: "Sat", progress: 70 },
    { name: "Sun", progress: 40 },
  ];
  
  // Sample roadmap data
  const currentRoadmaps = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      progress: 65,
      icon: Code,
      lastAccessed: "2 hours ago",
    },
    {
      id: 2,
      title: "Data Science Basics",
      progress: 30,
      icon: Book,
      lastAccessed: "Yesterday",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        <header className="mb-8 animate-slide-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold mb-1">Welcome back, Jane!</h1>
              <p className="text-muted-foreground">
                Your learning stats and progress
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-full px-4 py-2">
                <Flame className="h-5 w-5 text-amber mr-2" />
                <span className="font-medium">12 day streak!</span>
              </div>
              
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
                <span className="font-medium text-primary">45%</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="w-full h-2 bg-muted rounded-full mb-3">
                <div 
                  className="h-2 bg-gradient-primary rounded-full"
                  style={{ width: '45%' }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Complete 15 more minutes to reach your daily goal
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
                    <Tooltip />
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
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                </div>
                <p className="font-medium text-center">Avid Learner</p>
                <p className="text-xs text-muted-foreground text-center">
                  250 XP to level 3
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-display font-bold mt-10 mb-6">Continue Learning</h2>
        
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
                    <span className="text-sm text-muted-foreground">Week 3 of 8</span>
                    <Button variant="outline" size="sm" className="btn-hover">
                      Continue <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
