"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { MapPin, WifiOff } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { TractorIcon } from "../icons";

export default function MapWidget() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [position, setPosition] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi, India
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
        setPosition(prev => ({
            lat: prev.lat + (Math.random() - 0.5) * 0.001,
            lng: prev.lng + (Math.random() - 0.5) * 0.001,
        }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <MapPin className="h-5 w-5" />
          Live Location
        </CardTitle>
        <CardDescription>Real-time position of the tractor.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow rounded-lg overflow-hidden">
        {apiKey ? (
          <APIProvider apiKey={apiKey}>
            <div className="h-[500px] w-full rounded-lg">
              <Map
                center={position}
                zoom={15}
                mapId="tractor-map"
                disableDefaultUI={true}
                gestureHandling={'greedy'}
              >
                <AdvancedMarker position={position}>
                  <div className="p-2 bg-primary rounded-full shadow-lg">
                    <TractorIcon className="w-6 h-6 text-primary-foreground" />
                  </div>
                </AdvancedMarker>
              </Map>
            </div>
          </APIProvider>
        ) : (
          <div className="h-[500px] w-full flex flex-col items-center justify-center bg-muted rounded-lg">
            <WifiOff className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-semibold">Map Unavailable</p>
            <p className="text-muted-foreground text-sm text-center max-w-xs mt-1">
              Google Maps API Key is not configured. Please add it to your .env.local file.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
