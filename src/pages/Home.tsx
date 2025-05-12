
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Sparkles, Code, LineChart, MoveRight, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center animate-slide-in">
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                Master Any Skill With <span className="gradient-text">Personalized</span> Learning Paths
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                SkillKart creates tailored roadmaps based on your goals, schedule, and learning style. Track progress, earn rewards, and achieve mastery faster.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-primary hover:bg-gradient-primary-hover min-w-[160px]">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/explore">
                  <Button size="lg" variant="outline" className="min-w-[160px]">
                    Explore Skills
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 flex justify-center">
                <div className="w-full max-w-4xl h-80 bg-gradient-to-b from-purple/20 to-teal/20 dark:from-purple/10 dark:to-teal/10 rounded-2xl flex items-center justify-center border animate-pulse-subtle">
                  <p className="text-lg font-medium text-muted-foreground">Interactive Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-muted/40">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold mb-4">How SkillKart Works</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our platform adapts to your learning style and schedule to provide the most effective pathway to mastery.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-xl p-6 shadow-sm border animate-scale-in">
                <div className="w-12 h-12 rounded-lg bg-purple/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Personalized Roadmaps</h3>
                <p className="text-muted-foreground">
                  AI-powered learning paths tailored to your goals, experience level, and available time commitment.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm border animate-scale-in [animation-delay:100ms]">
                <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-teal" />
                </div>
                <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Visualize your learning journey with detailed analytics and milestone achievements.
                </p>
              </div>
              
              <div className="bg-background rounded-xl p-6 shadow-sm border animate-scale-in [animation-delay:200ms]">
                <div className="w-12 h-12 rounded-lg bg-amber/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-amber" />
                </div>
                <h3 className="text-xl font-bold mb-2">Curated Resources</h3>
                <p className="text-muted-foreground">
                  Access high-quality courses, tutorials, and practice exercises vetted by industry experts.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-display font-bold mb-4">Ready to Start Your Learning Journey?</h2>
                <p className="text-lg opacity-90 mb-8">
                  Join thousands of learners who have accelerated their skill development with SkillKart's personalized approach.
                </p>
                <Link to="/signup">
                  <Button size="lg" variant="secondary" className="bg-white text-purple hover:bg-white/90">
                    Create Your Free Account <MoveRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials or Features Section */}
        <section className="py-20 bg-muted/40">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold mb-4">Why Learners Love SkillKart</h2>
                <p className="text-lg text-muted-foreground">
                  Our platform is designed to keep you motivated and on track to achieve your goals.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 animate-fade-in">
                  <CheckCircle className="h-6 w-6 text-teal flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-1">Adaptive Learning Paths</h3>
                    <p className="text-muted-foreground">
                      Our system adjusts your learning roadmap based on your progress, ensuring you're always challenged but never overwhelmed.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 animate-fade-in [animation-delay:100ms]">
                  <CheckCircle className="h-6 w-6 text-teal flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-1">Gamified Experience</h3>
                    <p className="text-muted-foreground">
                      Earn XP, unlock achievements, and maintain streaks to keep your motivation high throughout your learning journey.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 animate-fade-in [animation-delay:200ms]">
                  <CheckCircle className="h-6 w-6 text-teal flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold mb-1">Community Support</h3>
                    <p className="text-muted-foreground">
                      Connect with peers learning similar skills to share resources, provide feedback, and stay accountable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="font-bold text-white">S</span>
                </div>
                <span className="font-display font-bold text-xl">
                  Skill<span className="text-purple">Kart</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Your personalized path to skill mastery
              </p>
            </div>
            
            <div className="flex gap-8 flex-wrap justify-center">
              <div>
                <h4 className="font-medium mb-2">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/features" className="hover:text-foreground transition-colors">Features</Link></li>
                  <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
                  <li><Link to="/roadmaps" className="hover:text-foreground transition-colors">Roadmaps</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                  <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                  <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
                  <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                  <li><Link to="/cookies" className="hover:text-foreground transition-colors">Cookies</Link></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2025 SkillKart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
