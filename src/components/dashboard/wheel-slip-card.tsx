"use client";

import { RotateCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type WheelSlipCardProps = {
  wheel: "Rear LH" | "Rear RH";
  slip?: number;
};

export default function WheelSlipCard({ wheel, slip = 0 }: WheelSlipCardProps) {
  const slipPercentage = Math.round(slip * 10) / 10;
  
  let colorClass = "text-green-400";
  if (slipPercentage > 15) colorClass = "text-yellow-400";
  if (slipPercentage > 20) colorClass = "text-red-500";


  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <RotateCw className="h-4 w-4" />
          {wheel} Slip
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-baseline gap-2">
        <span className={`font-headline text-4xl font-bold tracking-tighter ${colorClass}`}>
          {slipPercentage.toFixed(1)}
        </span>
        <span className="text-xl text-muted-foreground font-medium">%</span>
      </CardContent>
    </Card>
  );
}
