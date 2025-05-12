
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <span className="text-6xl font-display font-bold gradient-text">404</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-display font-bold mb-4">Page not found</h1>
          
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          
          <div className="space-y-4">
            <Link to="/">
              <Button className="min-w-[200px] bg-gradient-primary hover:bg-gradient-primary-hover">
                Return to Home
              </Button>
            </Link>
            
            <div>
              <Link to="/explore" className="text-sm text-primary hover:underline">
                Explore Skills Instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
