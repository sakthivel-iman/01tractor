"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { day: "Mon", hours: 8.5 },
  { day: "Tue", hours: 9.2 },
  { day: "Wed", hours: 7.8 },
  { day: "Thu", hours: 10.1 },
  { day: "Fri", hours: 9.5 },
  { day: "Sat", hours: 11.3 },
  { day: "Sun", hours: 4.2 },
];

const chartConfig = {
  hours: {
    label: "Working Hours",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function WorkingHoursChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <Clock className="h-5 w-5" />
          Working Hours
        </CardTitle>
        <CardDescription>Total operating hours this week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: -10 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              unit="h"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="hours" fill="var(--color-hours)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
