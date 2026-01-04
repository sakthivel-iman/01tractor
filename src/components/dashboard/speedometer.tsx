"use client";

import { Gauge } from "lucide-react";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  PolarGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MAX_SPEED = 120;

type SpeedometerProps = {
  speed?: number;
};

export default function Speedometer({ speed = 0 }: SpeedometerProps) {
  const chartData = [{ name: "speed", value: speed, fill: "hsl(var(--primary))" }];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          Current Speed
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        <div className="h-52 w-52 relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="80%"
              outerRadius="100%"
              data={chartData}
              startAngle={210}
              endAngle={-30}
              barSize={18}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, MAX_SPEED]}
                angleAxisId={0}
                tick={false}
              />
              <PolarGrid
                gridType="circle"
                radialLines={false}
                polarRadius={[0]}
                stroke="hsl(var(--border))"
              />
              <RadialBar
                background={{ fill: "hsl(var(--muted))" }}
                dataKey="value"
                cornerRadius={10}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-headline text-6xl font-bold tracking-tighter text-primary">
              {Math.round(speed)}
            </span>
            <span className="text-muted-foreground font-medium -mt-1">km/h</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
