"use client";

import { useEffect, useState } from "react";
import { Signal } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NetworkSignal() {
  const [level, setLevel] = useState(3); // 0-4 for signal strength

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel(Math.floor(Math.random() * 5));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const signalLevels = [
    { label: "No Signal", color: "bg-red-500", bars: 1 },
    { label: "Weak", color: "bg-yellow-500", bars: 2 },
    { label: "Fair", color: "bg-yellow-400", bars: 3 },
    { label: "Good", color: "bg-green-500", bars: 4 },
    { label: "Strong", color: "bg-green-400", bars: 5 },
  ];

  const { label, color, bars } = signalLevels[level];


  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Signal className="h-4 w-4" />
          4G Network
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <div className="flex items-end h-6 gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className={`w-1.5 transition-all ${i < bars ? color : 'bg-muted/50'}`}
                    style={{ height: `${(i + 1) * 20}%`}}
                />
            ))}
        </div>
        <div className="text-lg font-medium">{label}</div>
      </CardContent>
    </Card>
  );
}
