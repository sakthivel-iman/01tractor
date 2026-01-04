"use client";

import { useEffect, useState } from "react";
import { Gauge } from "lucide-react";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MAX_SPEED = 120;

export default function Speedometer() {
  const [speed, setSpeed] = useState(45);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed((prev) => {
        const change = Math.random() * 10 - 5;
        const newSpeed = prev + change;
        return Math.max(0, Math.min(MAX_SPEED, newSpeed));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const chartData = [{ name: "speed", value: speed, fill: "var(--color-chart-1)" }];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <Gauge className="h-5 w-5" />
          Current Speed
        </CardTitle>
        <CardDescription>Tractor's actual speed in real-time.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-48 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="75%"
              outerRadius="100%"
              data={chartData}
              startAngle={180}
              endAngle={0}
              barSize={20}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, MAX_SPEED]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background={{ fill: "hsl(var(--muted))" }}
                dataKey="value"
                cornerRadius={10}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-headline text-5xl font-bold tracking-tighter text-primary">
              {Math.round(speed)}
            </span>
            <span className="text-muted-foreground font-medium">km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
