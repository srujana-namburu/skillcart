
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { X, Menu, Bell, ChevronDown } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = false; // We'll replace this with actual auth logic later
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-xl transition-all">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="font-bold text-white">S</span>
              </span>
              <span className="font-display font-bold text-xl">
                Skill<span className="text-purple">Kart</span>
              </span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/roadmaps" 
              className={`nav-link ${isActivePath("/roadmaps") ? "nav-link-active" : ""}`}
            >
              Roadmaps
            </Link>
            <Link 
              to="/explore" 
              className={`nav-link ${isActivePath("/explore") ? "nav-link-active" : ""}`}
            >
              Explore
            </Link>
            <Link 
              to="/resources" 
              className={`nav-link ${isActivePath("/resources") ? "nav-link-active" : ""}`}
            >
              Resources
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative rounded-full animate-hover"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent flex items-center justify-center text-[10px] text-accent-foreground font-medium">
                  3
                </span>
              </Button>
              
              <div className="relative flex items-center">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 rounded-full animate-hover"
                  onClick={toggleMenu}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-primary" />
                  <span className="hidden sm:inline">Jane Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" className="btn-hover">
                  Log in
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gradient-primary hover:bg-gradient-primary-hover btn-hover">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background/95 backdrop-blur-sm animate-fade-in md:hidden">
          <nav className="container py-8">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  to="/roadmaps" 
                  className={`block p-4 rounded-lg ${isActivePath("/roadmaps") ? "bg-primary/10 text-primary" : ""}`}
                  onClick={toggleMenu}
                >
                  Roadmaps
                </Link>
              </li>
              <li>
                <Link 
                  to="/explore" 
                  className={`block p-4 rounded-lg ${isActivePath("/explore") ? "bg-primary/10 text-primary" : ""}`}
                  onClick={toggleMenu}
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link 
                  to="/resources" 
                  className={`block p-4 rounded-lg ${isActivePath("/resources") ? "bg-primary/10 text-primary" : ""}`}
                  onClick={toggleMenu}
                >
                  Resources
                </Link>
              </li>
              
              {!isAuthenticated && (
                <li className="flex flex-col gap-2 mt-4">
                  <Link to="/login" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={toggleMenu}>
                    <Button className="w-full bg-gradient-primary hover:bg-gradient-primary-hover">
                      Sign up
                    </Button>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
