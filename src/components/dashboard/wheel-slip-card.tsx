"use client";

import { useEffect, useState } from "react";
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
};

export default function WheelSlipCard({ wheel }: WheelSlipCardProps) {
  const [slip, setSlip] = useState(Math.random() * 15);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlip((prev) => {
        const change = Math.random() * 4 - 2;
        const newSlip = prev + change;
        return Math.max(0, Math.min(25, newSlip));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const slipPercentage = Math.round(slip * 10) / 10;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <RotateCw className="h-5 w-5" />
          Wheel Slip
        </CardTitle>
        <CardDescription>{wheel} Wheel</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <span className="font-headline text-5xl font-bold tracking-tighter text-primary">
            {slipPercentage.toFixed(1)}
          </span>
          <span className="text-2xl text-muted-foreground font-medium">%</span>
        </div>
        <Progress value={slipPercentage * 4} className="h-3" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Normal</span>
          <span>High Slip</span>
        </div>
      </CardContent>
    </Card>
  );
}
