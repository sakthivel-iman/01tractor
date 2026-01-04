"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/dashboard/header";
import Speedometer from "@/components/dashboard/speedometer";
import WheelSlipCard from "@/components/dashboard/wheel-slip-card";
import WorkingHoursChart from "@/components/dashboard/working-hours-chart";
import MapWidget from "@/components/dashboard/map-widget";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardClient() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    } else {
      router.replace("/login");
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="p-6 space-y-4 w-full max-w-7xl">
          <Skeleton className="h-16 w-full" />
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
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="grid gap-6 md:gap-8 xl:grid-cols-3">
          <div className="grid gap-6 md:gap-8 xl:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              <Speedometer />
              <WorkingHoursChart />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <WheelSlipCard wheel="Rear LH" />
              <WheelSlipCard wheel="Rear RH" />
            </div>
          </div>
          <div className="xl:col-span-1">
            <MapWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
