"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, VideoOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

export default function CameraFeed() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Not Supported",
          description: "Your browser does not support camera access.",
        });
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings.",
        });
      }
    };

    getCameraPermission();
    
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [toast]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Camera Feed
        </CardTitle>
        <CardDescription>Live video stream from the tractor.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center p-0">
        {hasCameraPermission === null && <Skeleton className="w-full h-full rounded-b-xl" />}
        
        <div className="w-full h-full relative">
            <video ref={videoRef} className="w-full h-full object-cover aspect-video rounded-b-xl bg-muted" autoPlay muted playsInline />
            {hasCameraPermission === false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm rounded-b-xl">
                    <VideoOff className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground font-semibold">Camera Unavailable</p>
                </div>
            )}
        </div>
        
      </CardContent>
    </Card>
  );
}
