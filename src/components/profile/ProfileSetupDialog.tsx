import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Define the available interests
const interests = [
  { id: "web-dev", label: "Web Development" },
  { id: "mobile-dev", label: "Mobile Development" },
  { id: "data-science", label: "Data Science" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "ui-ux", label: "UI/UX Design" },
  { id: "devops", label: "DevOps" },
  { id: "cloud", label: "Cloud Computing" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "blockchain", label: "Blockchain" },
  { id: "game-dev", label: "Game Development" },
];

// Define the form schema with Zod
const formSchema = z.object({
  interests: z.array(z.string()).min(1, {
    message: "Please select at least one interest.",
  }),
  goal: z.string().min(1, {
    message: "Please select a learning goal.",
  }),
  weeklyTime: z.number().min(1).max(40),
  additionalGoals: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProfileSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

export function ProfileSetupDialog({ 
  open, 
  onOpenChange,
  onComplete
}: ProfileSetupDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: [],
      goal: "",
      weeklyTime: 5,
      additionalGoals: "",
    },
  });
  
  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting profile data:", values);
      
      // Get the current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.error("No active session found");
        toast({
          title: "Authentication error",
          description: "You must be logged in to complete your profile setup.",
          variant: "destructive",
        });
        return;
      }
      
      console.log("User authenticated, user_id:", session.user.id);
      
      // Prepare the profile data
      const profileData = {
        user_id: session.user.id,
        interests: values.interests,
        primary_goal: values.goal,
        weekly_time_hours: values.weeklyTime,
        additional_goals: values.additionalGoals || null,
      };
      
      console.log("Prepared profile data:", profileData);
      
      // First try to insert a new record
      const { data: insertedData, error: insertError } = await supabase
        .from('user_profiles')
        .insert(profileData)
        .select();
      
      // If there's an error and it's because the record already exists
      if (insertError && insertError.code === '23505') { // Unique violation error code
        console.log("Profile already exists, updating instead");
        
        // Update the existing record
        const { error: updateError } = await supabase
          .from('user_profiles')
          .update({
            ...profileData,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', session.user.id);
        
        if (updateError) {
          console.error("Error updating profile:", updateError);
          throw updateError;
        }
      } else if (insertError) {
        console.error("Error inserting profile:", insertError);
        throw insertError;
      }
      
      console.log("Profile saved successfully");
      
      // Show success message
      toast({
        title: "Profile setup complete!",
        description: "Your learning preferences have been saved.",
      });
      
      // Close the dialog and call the onComplete callback
      onOpenChange(false);
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error("Error in profile setup:", error);
      toast({
        title: "Error",
        description: "Failed to save your profile data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Profile Setup</DialogTitle>
          <DialogDescription>
            Tell us about your learning preferences to get personalized recommendations.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Interests selection */}
            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <FormLabel>What are you interested in learning?</FormLabel>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {interests.map((interest) => (
                      <FormField
                        key={interest.id}
                        control={form.control}
                        name="interests"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={interest.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(interest.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, interest.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== interest.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {interest.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Primary goal */}
            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>What is your primary learning goal?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="career-change" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Career change
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="skill-improvement" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Improve existing skills
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="hobby" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Personal hobby
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="academic" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          Academic requirements
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Weekly time commitment */}
            <FormField
              control={form.control}
              name="weeklyTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How many hours can you dedicate to learning each week?</FormLabel>
                  <div className="space-y-4">
                    <FormControl>
                      <Slider
                        min={1}
                        max={40}
                        step={1}
                        defaultValue={[field.value]}
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">1 hour</span>
                      <span className="text-sm font-medium">{field.value} hours</span>
                      <span className="text-sm text-muted-foreground">40 hours</span>
                    </div>
                  </div>
                  <FormDescription>
                    This helps us recommend an appropriate learning pace.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Additional goals */}
            <FormField
              control={form.control}
              name="additionalGoals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Any specific learning goals or projects you want to achieve?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="E.g., Build a personal website, Learn React, Understand machine learning basics..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This helps us tailor recommendations to your specific needs.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="submit" 
                className="bg-gradient-primary hover:bg-gradient-primary-hover w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Preferences"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
