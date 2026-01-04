"use client";

import { Compass } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type GpsInfoProps = {
    position: { lat: number, lng: number } | null;
}

export default function GpsInfo({ position }: GpsInfoProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Compass className="h-4 w-4" />
          GPS Coordinates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-semibold tracking-tighter">
            {position ? `${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}` : "N/A"}
        </div>
      </CardContent>
    </Card>
  );
}
