import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "@/types/profile";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

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

export default function ProfileSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
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

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);

        // Check if user is authenticated
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          // Redirect to login if not authenticated
          navigate('/login');
          return;
        }

        // Fetch user profile data
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile data:", error);
          toast({
            title: "Error",
            description: "Failed to load your profile data. Please try again.",
            variant: "destructive",
          });
          return;
        }

        if (data) {
          const profileData: UserProfile = {
            id: data.id,
            user_id: data.user_id,
            interests: data.interests || [],
            primary_goal: data.primary_goal || "",
            weekly_time_hours: data.weekly_time_hours || 5,
            additional_goals: data.additional_goals || "",
            created_at: data.created_at,
            updated_at: data.updated_at
          };
          
          setProfileData(profileData);
          
          // Set form values
          form.reset({
            interests: profileData.interests,
            goal: profileData.primary_goal,
            weeklyTime: profileData.weekly_time_hours,
            additionalGoals: profileData.additional_goals || "",
          });
        } else {
          // No profile data found
          toast({
            title: "Profile not found",
            description: "Please complete your profile setup first.",
          });
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Error in fetching profile:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate, toast, form]);

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    try {
      setIsSaving(true);
      console.log("Updating profile data:", values);
      
      // Get the current user
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.error("No active session found");
        toast({
          title: "Authentication error",
          description: "You must be logged in to update your profile.",
          variant: "destructive",
        });
        return;
      }
      
      // Update the profile data
      const { error } = await supabase
        .from('user_profiles')
        .update({
          interests: values.interests,
          primary_goal: values.goal,
          weekly_time_hours: values.weeklyTime,
          additional_goals: values.additionalGoals || null,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', session.user.id);
      
      if (error) {
        console.error("Error updating profile:", error);
        toast({
          title: "Error",
          description: "Failed to update your profile. Please try again.",
          variant: "destructive",
        });
        return;
      }
      
      // Show success message
      toast({
        title: "Profile updated!",
        description: "Your learning preferences have been saved.",
      });
      
      // Update local state
      if (profileData) {
        setProfileData({
          ...profileData,
          interests: values.interests,
          primary_goal: values.goal,
          weekly_time_hours: values.weeklyTime,
          additional_goals: values.additionalGoals || null,
          updated_at: new Date().toISOString()
        });
      }
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground mb-8">
            Update your learning preferences and goals
          </p>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>
                  These settings help us personalize your learning experience
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {/* Interests */}
                    <FormField
                      control={form.control}
                      name="interests"
                      render={() => (
                        <FormItem>
                          <FormLabel>What are you interested in learning?</FormLabel>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            {interests.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="interests"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, item.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {item.label}
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
                    
                    {/* Learning goal */}
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
                                value={[field.value]}
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
                  </form>
                </Form>
              </CardContent>
              
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={form.handleSubmit(onSubmit)}
                  className="bg-gradient-primary hover:bg-gradient-primary-hover"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
