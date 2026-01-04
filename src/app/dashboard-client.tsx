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
import { Card } from "@/components/ui/card";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <Skeleton className="h-64 xl:col-span-1 lg:col-span-2 md:col-span-2" />
      <Skeleton className="h-64 xl:col-span-2 lg:col-span-2 md:col-span-2" />
      <Skeleton className="h-64 xl:col-span-2 lg:col-span-2 md:col-span-2" />
      <Skeleton className="h-80 xl:col-span-3 lg:col-span-4 md:col-span-2" />
      <Skeleton className="h-80 xl:col-span-2 lg:col-span-4 md:col-span-2" />
    </div>
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        {isDataLoading ? renderSkeleton() : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            
            {/* Speedometer */}
            <div className="xl:col-span-1 lg:col-span-2 md:col-span-2">
                <Speedometer speed={latestData?.speedKmph} />
            </div>

            {/* Working Hours */}
            <div className="xl:col-span-2 lg:col-span-2 md:col-span-2">
              <WorkingHoursChart workingHours={latestData?.workingHours} />
            </div>
            
            {/* Camera and Slip */}
            <div className="xl:col-span-2 lg:col-span-4 md:col-span-2 grid grid-cols-1 gap-6">
               <CameraFeed />
               <Card className="grid grid-cols-2 gap-6 p-4">
                  <WheelSlipCard wheel="Rear LH" slip={latestData?.wheelSlipRearLh} />
                  <WheelSlipCard wheel="Rear RH" slip={latestData?.wheelSlipRearRh} />
               </Card>
            </div>
            
            {/* Map */}
            <div className="xl:col-span-3 lg:col-span-4 md:col-span-2">
              <MapWidget position={latestData ? { lat: latestData.latitude, lng: latestData.longitude } : null} />
            </div>
            
            {/* GPS and Network */}
            <div className="xl:col-span-2 lg:col-span-4 md:col-span-2 flex flex-col gap-6">
               <GpsInfo position={latestData ? { lat: latestData.latitude, lng: latestData.longitude } : null} />
               <NetworkSignal />
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
