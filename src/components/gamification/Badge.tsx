
import React from "react";
import { 
  Trophy, Star, Flame, Award, Zap, 
  Medal, CheckCheck, Share, MessageSquare, 
  Users 
} from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export type BadgeType = 
  | "bronze" | "silver" | "gold" // Tier badges
  | "streak" | "mastery" | "helper" | "contributor" | "event" // Achievement types
  | "community" | "social"; // Social badges

interface BadgeProps {
  type: BadgeType;
  name: string;
  description: string;
  icon?: React.ElementType;
  tier?: "bronze" | "silver" | "gold";
  earned?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Badge({ 
  type, 
  name, 
  description, 
  icon, 
  tier = "bronze",
  earned = true, 
  className,
  size = "md"
}: BadgeProps) {
  // Determine which icon to use
  const BadgeIcon = icon || getBadgeIcon(type);
  
  // Determine size classes
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };
  
  // Determine background based on tier and if earned
  const bgClass = earned 
    ? tier === "gold" 
      ? "bg-gradient-gold" 
      : tier === "silver" 
        ? "bg-gradient-silver"
        : "bg-gradient-bronze"
    : "bg-gray-300 dark:bg-gray-700";
  
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={cn(
          "flex flex-col items-center gap-2",
          earned ? "cursor-pointer" : "opacity-50",
          className
        )}>
          <div className={cn(
            "relative flex items-center justify-center rounded-full p-3",
            bgClass,
            sizeClasses[size],
            earned ? "animate-badge-pop shadow-lg" : ""
          )}>
            <BadgeIcon className="h-full w-full text-white" />
            {earned && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                ✓
              </span>
            )}
          </div>
          <span className="text-center text-xs font-medium">{name}</span>
        </div>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-80 p-4">
        <div className="flex gap-4">
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            bgClass
          )}>
            <BadgeIcon className="h-6 w-6 text-white" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
            {!earned && (
              <p className="text-xs font-medium text-amber">Keep going to earn this badge!</p>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function getBadgeIcon(type: BadgeType): React.ElementType {
  switch (type) {
    case "mastery":
      return Trophy;
    case "streak":
      return Flame;
    case "helper":
      return Star;
    case "contributor":
      return Award;
    case "event":
      return Medal;
    case "bronze":
    case "silver":
    case "gold":
      return Zap;
    case "community":
      return Users;
    case "social":
      return Share;
    default:
      return Award;
  }
}
