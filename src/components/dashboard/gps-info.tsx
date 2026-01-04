"use client";

import { useEffect, useState } from "react";
import { Compass } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GpsInfo() {
  const [position, setPosition] = useState({ lat: 28.6139, lng: 77.2090 });

  useEffect(() => {
    const interval = setInterval(() => {
        setPosition(prev => ({
            lat: prev.lat + (Math.random() - 0.5) * 0.0001,
            lng: prev.lng + (Math.random() - 0.5) * 0.0001,
        }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
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
            {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
        </div>
      </CardContent>
    </Card>
  );
}
