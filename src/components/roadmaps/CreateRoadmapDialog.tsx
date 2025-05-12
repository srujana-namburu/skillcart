
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CreateRoadmapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (roadmap: any) => void;
}

export default function CreateRoadmapDialog({ open, onOpenChange, onCreate }: CreateRoadmapDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skill_id: "web-dev", // Default skill
    total_weeks: 8, // Default length
    icon: "code", // Default icon
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Create the roadmap
      onCreate({
        ...formData,
        total_weeks: parseInt(formData.total_weeks, 10)
      });
    } catch (error) {
      console.error("Error creating roadmap:", error);
    } finally {
      setIsLoading(false);
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        skill_id: "web-dev",
        total_weeks: 8,
        icon: "code",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Roadmap</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Web Development Fundamentals"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide a brief description of this learning path"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skill">Skill Category</Label>
            <select
              id="skill"
              name="skill_id"
              value={formData.skill_id}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="web-dev">Web Development</option>
              <option value="data-science">Data Science</option>
              <option value="mobile-dev">Mobile Development</option>
              <option value="ui-design">UI/UX Design</option>
              <option value="machine-learning">Machine Learning</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="total_weeks">Length (weeks)</Label>
            <Input
              id="total_weeks"
              name="total_weeks"
              type="number"
              min="1"
              max="52"
              value={formData.total_weeks}
              onChange={handleChange}
              required
            />
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-primary hover:bg-gradient-primary-hover"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Roadmap"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
