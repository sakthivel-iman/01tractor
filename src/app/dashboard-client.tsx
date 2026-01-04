
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/header";
import Speedometer from "@/components/dashboard/speedometer";
import WheelSlipCard from "@/components/dashboard/wheel-slip-card";
import WorkingHoursChart from "@/components/dashboard/working-hours-chart";
import MapWidget from "@/components/dashboard/map-widget";
import { Skeleton } from "@/components/ui/skeleton";
import CameraFeed from "@/components/dashboard/camera-feed";
import GpsInfo from "@/components/dashboard/gps-info";
import NetworkSignal from "@/components/dashboard/network-signal";
import { useUser } from "@/firebase";
import { useTractorData } from "@/hooks/use-tractor-data";
import { TractorIcon } from "@/components/icons";

export default function DashboardClient() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const { latestData, isLoading: isDataLoading } = useTractorData();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace("/login");
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <TractorIcon className="w-24 h-24 animate-pulse text-primary" />
      </div>
    );
  }

  const renderSkeleton = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {/* Column 1: Wheel Slips */}
      <div className="lg:col-span-1 xl:col-span-1 flex flex-col gap-6">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
      </div>
      
      {/* Column 2: Camera and Map */}
      <div className="lg:col-span-2 xl:col-span-2 grid grid-cols-1 gap-6">
         <Skeleton className="h-64" />
         <Skeleton className="h-80" />
      </div>

      {/* Column 3: Other Info */}
      <div className="lg:col-span-3 xl:col-span-1 flex flex-col gap-6">
         <Skeleton className="h-64" />
         <Skeleton className="h-64" />
         <Skeleton className="h-24" />
         <Skeleton className="h-24" />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        {isDataLoading ? (
          renderSkeleton()
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {/* Wheel Slip Cards */}
            <div className="lg:col-span-1 xl:col-span-1 flex flex-col gap-6">
                <WheelSlipCard wheel="Rear LH" slip={latestData?.wheelSlipRearLh} />
                <WheelSlipCard wheel="Rear RH" slip={latestData?.wheelSlipRearRh} />
            </div>
            
            {/* Camera and Map */}
            <div className="lg:col-span-2 xl:col-span-2 grid grid-cols-1 gap-6">
               <CameraFeed />
               <MapWidget position={latestData ? { lat: latestData.latitude, lng: latestData.longitude } : null} />
            </div>

            {/* Other Info */}
            <div className="lg:col-span-3 xl:col-span-1 flex flex-col gap-6">
               <Speedometer speed={latestData?.speedKmph} />
               <WorkingHoursChart workingHours={latestData?.workingHours} />
               <GpsInfo position={latestData ? { lat: latestData.latitude, lng: latestData.longitude } : null} />
               <NetworkSignal />
            </div>
            
          </div>
        )}
      </main>
    </div>
  );
}
