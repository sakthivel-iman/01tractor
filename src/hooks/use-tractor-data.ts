
'use client';

import { useCollection, useFirestore, useUser, useMemoFirebase } from "@/firebase";
import { TractorTelemetry } from "@/lib/types";
import { collection, query, orderBy, limit } from "firebase/firestore";

export function useTractorData() {
  const { user } = useUser();
  const firestore = useFirestore();

  const telemetryQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, `users/${user.uid}/tractorTelemetry`),
      orderBy('timestamp', 'desc'),
      limit(1)
    );
  }, [user, firestore]);

  const { data: telemetryData, isLoading } = useCollection<TractorTelemetry>(telemetryQuery);

  const latestData = telemetryData && telemetryData.length > 0 ? telemetryData[0] : null;

  return { latestData, isLoading };
}
