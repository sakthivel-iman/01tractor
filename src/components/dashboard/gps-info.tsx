"use client";

import { Compass } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
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
        <CardTitle className="flex items-center gap-2 font-headline text-base">
          <Compass className="h-4 w-4" />
          GPS
        </CardTitle>
        <CardDescription className="text-xs">Lat/Lng</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-medium tracking-tighter">
            {position ? `${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}` : "N/A"}
        </div>
      </CardContent>
    </Card>
  );
}
