
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateRoadmapDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (roadmap: any) => void;
}

const skillOptions = [
  { id: "web-dev", name: "Web Development" },
  { id: "data-science", name: "Data Science" },
  { id: "mobile-dev", name: "Mobile Development" },
  { id: "ui-design", name: "UI/UX Design" },
  { id: "ml-ai", name: "Machine Learning & AI" },
];

export default function CreateRoadmapDialog({ open, onOpenChange, onCreate }: CreateRoadmapDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillId, setSkillId] = useState("");
  const [totalWeeks, setTotalWeeks] = useState<string>("8");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCreate = () => {
    if (!title || !description || !skillId || !totalWeeks) return;
    
    setIsLoading(true);
    
    // Convert totalWeeks from string to number
    const totalWeeksNumber = parseInt(totalWeeks, 10);
    
    const newRoadmap = {
      title,
      description,
      skill_id: skillId,
      total_weeks: totalWeeksNumber,
    };
    
    // Simulate API delay
    setTimeout(() => {
      onCreate(newRoadmap);
      resetForm();
      setIsLoading(false);
    }, 800);
  };
  
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSkillId("");
    setTotalWeeks("8");
  };
  
  return (
    <Dialog open={open} onOpenChange={(newOpenState) => {
      if (!newOpenState) resetForm();
      onOpenChange(newOpenState);
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Learning Roadmap</DialogTitle>
          <DialogDescription>
            Design your learning journey with a structured roadmap
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Roadmap Title</Label>
            <Input
              id="title"
              placeholder="e.g., Full Stack Web Development"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe what you want to learn"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="skill">Skill Category</Label>
            <Select value={skillId} onValueChange={setSkillId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a skill category" />
              </SelectTrigger>
              <SelectContent>
                {skillOptions.map((skill) => (
                  <SelectItem key={skill.id} value={skill.id}>
                    {skill.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="weeks">Duration (weeks)</Label>
            <Select value={totalWeeks} onValueChange={setTotalWeeks}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4 weeks</SelectItem>
                <SelectItem value="8">8 weeks</SelectItem>
                <SelectItem value="12">12 weeks</SelectItem>
                <SelectItem value="16">16 weeks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreate} 
            disabled={!title || !description || !skillId || !totalWeeks || isLoading}
            className={isLoading ? "" : "bg-gradient-primary"}
          >
            {isLoading ? "Creating..." : "Create Roadmap"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
