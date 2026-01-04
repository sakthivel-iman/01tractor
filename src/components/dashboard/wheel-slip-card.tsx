"use client";

import { RotateCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type WheelSlipCardProps = {
  wheel: "Rear LH" | "Rear RH";
  slip?: number;
};

export default function WheelSlipCard({ wheel, slip = 0 }: WheelSlipCardProps) {
  const slipPercentage = Math.round(slip * 10) / 10;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-base">
          <RotateCw className="h-4 w-4" />
          Wheel Slip
        </CardTitle>
        <CardDescription className="text-xs">{wheel}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-center">
          <span className="font-headline text-4xl font-bold tracking-tighter text-primary">
            {slipPercentage.toFixed(1)}
          </span>
          <span className="text-xl text-muted-foreground font-medium">%</span>
        </div>
        <Progress value={slipPercentage * 4} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Normal</span>
          <span>High Slip</span>
        </div>
      </CardContent>
    </Card>
  );
}
