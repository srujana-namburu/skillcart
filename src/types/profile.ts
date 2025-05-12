// Define types for user profile data
export interface UserProfile {
  id: string;
  user_id: string;
  interests: string[];
  primary_goal: string;
  weekly_time_hours: number;
  additional_goals?: string;
  created_at: string;
  updated_at: string;
}
