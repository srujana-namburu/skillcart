
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Pencil, BookOpen, Users, Trophy, 
  ArrowRight, CheckCheck, MessageSquare, 
  Award 
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container py-8">
        {/* Hero Section */}
        <section className="py-12 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Learn Skills with <span className="gradient-text">Purpose</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            SkillKart helps you master new skills with personalized roadmaps, 
            community support, and a rewarding learning experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-1" />
            </Button>
            <Button variant="outline" size="lg">
              Browse Roadmaps
            </Button>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 animate-slide-in">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            How SkillKart Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="overflow-hidden border-t-4 border-t-purple">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Pencil className="h-6 w-6 text-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Set Your Goals</h3>
                <p className="text-muted-foreground">
                  Define what skills you want to learn and your available time commitment
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-t-4 border-t-teal">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-teal" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Follow Roadmaps</h3>
                <p className="text-muted-foreground">
                  Access personalized learning paths with curated resources and clear milestones
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-t-4 border-t-amber">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-amber/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCheck className="h-6 w-6 text-amber" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Track Progress</h3>
                <p className="text-muted-foreground">
                  Mark your completed lessons, earn XP, and visualize your learning journey
                </p>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-t-4 border-t-purple">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">4. Master Skills</h3>
                <p className="text-muted-foreground">
                  Complete roadmaps, earn badges, and showcase your achievements
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Features Highlight */}
        <section className="py-16 bg-muted rounded-lg px-6 animate-fade-in">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            What Makes SkillKart Different
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Roadmaps</h3>
              <p className="text-muted-foreground">
                Custom learning paths based on your skill level, goals, and available time
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-muted-foreground">
                Learn together with peers, participate in discussions, and help others
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Gamified Learning</h3>
              <p className="text-muted-foreground">
                Earn XP, level up, collect badges, and stay motivated throughout your journey
              </p>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 animate-fade-in">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            What Our Learners Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <p className="italic mb-4">
                  "The roadmaps helped me go from a complete beginner to landing my first web development job in just 6 months!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-light mr-3"></div>
                  <div>
                    <p className="font-semibold">Sarah K.</p>
                    <p className="text-sm text-muted-foreground">Web Developer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <p className="italic mb-4">
                  "I love the badge system! It keeps me motivated and gives me clear goals to work towards while learning new skills."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-teal-light mr-3"></div>
                  <div>
                    <p className="font-semibold">Michael T.</p>
                    <p className="text-sm text-muted-foreground">UX Designer</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <p className="italic mb-4">
                  "The community discussions are invaluable. Whenever I get stuck, there's always someone ready to help with great advice."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-light mr-3"></div>
                  <div>
                    <p className="font-semibold">Priya M.</p>
                    <p className="text-sm text-muted-foreground">Data Scientist</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 text-center animate-slide-in">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of learners already mastering new skills on SkillKart
            </p>
            <Button size="lg" className="bg-gradient-primary">
              Create Your First Roadmap
              <ArrowRight className="ml-1" />
            </Button>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-bold">SkillKart</p>
              <p className="text-sm text-muted-foreground">© 2025 SkillKart. All rights reserved.</p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">Terms</Button>
              <Button variant="ghost" size="sm">Privacy</Button>
              <Button variant="ghost" size="sm">Contact</Button>
              <Button variant="ghost" size="sm">FAQ</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
