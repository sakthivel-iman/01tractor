"use client";

import { useEffect, useState } from "react";
import { Signal, SignalHigh, SignalLow, SignalMedium, SignalZero } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const signalLevels = [
    { Icon: SignalZero, label: "No Signal", color: "text-destructive" },
    { Icon: SignalLow, label: "Weak", color: "text-amber-500" },
    { Icon: SignalMedium, label: "Good", color: "text-primary" },
    { Icon: SignalHigh, label: "Strong", color: "text-green-500" },
];

export default function NetworkSignal() {
  const [level, setLevel] = useState(3); // 0-3 for signal strength

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel(Math.floor(Math.random() * 4));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { Icon, label, color } = signalLevels[level];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 font-headline text-base">
          <Signal className="h-4 w-4" />
          4G Signal
        </CardTitle>
        <CardDescription className="text-xs">Network Connectivity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Icon className={`h-8 w-8 ${color}`} />
          <div className="text-lg font-medium">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}
