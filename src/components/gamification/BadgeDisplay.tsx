
import React from "react";
import { Badge, BadgeType } from "./Badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BadgeDisplayProps {
  badges: {
    id: string;
    type: BadgeType;
    name: string;
    description: string;
    tier?: "bronze" | "silver" | "gold";
    earned: boolean;
  }[];
  title?: string;
  description?: string;
}

export function BadgeDisplay({ badges, title = "Your Badges", description = "Achievements you've earned on your learning journey" }: BadgeDisplayProps) {
  // Group badges by earned status
  const earnedBadges = badges.filter(badge => badge.earned);
  const unearnedBadges = badges.filter(badge => !badge.earned);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {earnedBadges.length > 0 && (
            <div>
              <h3 className="mb-3 font-medium">Earned ({earnedBadges.length})</h3>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
                {earnedBadges.map(badge => (
                  <Badge
                    key={badge.id}
                    type={badge.type}
                    name={badge.name}
                    description={badge.description}
                    tier={badge.tier}
                    earned={true}
                  />
                ))}
              </div>
            </div>
          )}
          
          {unearnedBadges.length > 0 && (
            <div>
              <h3 className="mb-3 font-medium">Available ({unearnedBadges.length})</h3>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
                {unearnedBadges.map(badge => (
                  <Badge
                    key={badge.id}
                    type={badge.type}
                    name={badge.name}
                    description={badge.description}
                    tier={badge.tier}
                    earned={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
