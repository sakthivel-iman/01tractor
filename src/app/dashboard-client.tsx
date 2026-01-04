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

  if (isDataLoading) {
    return (
       <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <main className="flex-1 p-4 sm:p-6 md:p-8">
            <div className="p-6 space-y-4 w-full max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Skeleton className="h-64 lg:col-span-1" />
                    <Skeleton className="h-64 lg:col-span-1" />
                    <Skeleton className="h-64 lg:col-span-1" />
                </div>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <Skeleton className="h-80" />
                    <Skeleton className="h-80" />
                </div>
            </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="grid gap-6 md:gap-8 xl:grid-cols-3">
          <div className="grid gap-6 md:gap-8 xl:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              <Speedometer speed={latestData?.speedKmph} />
              <WorkingHoursChart workingHours={latestData?.workingHours} />
            </div>
             <div className="grid gap-6 md:grid-cols-2">
                <CameraFeed />
                <MapWidget position={latestData ? { lat: latestData.latitude, lng: latestData.longitude } : null} />
             </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <WheelSlipCard wheel="Rear LH" slip={latestData?.wheelSlipRearLh} />
              <WheelSlipCard wheel="Rear RH" slip={latestData?.wheelSlipRearRh} />
              <GpsInfo position={latestData ? { lat: latestData.latitude, lng: latestData.longitude } : null} />
              <NetworkSignal />
            </div>
          </div>
          <div className="xl:col-span-1">
            <div className="space-y-6">
              {/* Other widgets can go here */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
