
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LevelProgressProps {
  level: number;
  currentXP: number;
  requiredXP: number;
  title?: string;
  levelTitle?: string;
  compact?: boolean;
}

export function LevelProgress({
  level,
  currentXP,
  requiredXP,
  title = "Level Progress",
  levelTitle = "Avid Learner",
  compact = false
}: LevelProgressProps) {
  const progressPercentage = Math.min(Math.round((currentXP / requiredXP) * 100), 100);
  const remainingXP = requiredXP - currentXP;

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary">
          <span className="text-sm font-bold text-white">{level}</span>
        </div>
        <div className="w-full max-w-[200px]">
          <div className="mb-1 flex items-center justify-between text-xs">
            <span>{currentXP} XP</span>
            <span>{requiredXP} XP</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>Keep learning to reach the next level</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative flex items-center justify-center">
            <div className="absolute h-28 w-28 animate-pulse-subtle rounded-full bg-primary/10"></div>
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-primary">
              <span className="text-3xl font-bold text-white">{level}</span>
            </div>
          </div>
          
          <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
            {levelTitle}
          </Badge>
          
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-amber" />
                <span>{currentXP} XP</span>
              </span>
              <span>{requiredXP} XP</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-center text-xs text-muted-foreground">
              {remainingXP} XP to level {level + 1}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
