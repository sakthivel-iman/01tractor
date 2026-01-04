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
import { useMemo } from "react";

const chartConfig = {
  hours: {
    label: "Working Hours",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type WorkingHoursChartProps = {
  workingHours?: number;
};

export default function WorkingHoursChart({ workingHours = 0 }: WorkingHoursChartProps) {
  const chartData = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday - 0, Monday - 1, ...
    const data = [
      { day: "Sun", hours: 0 },
      { day: "Mon", hours: 0 },
      { day: "Tue", hours: 0 },
      { day: "Wed", hours: 0 },
      { day: "Thu", hours: 0 },
      { day: "Fri", hours: 0 },
      { day: "Sat", hours: 0 },
    ];
    // This is a mock for demonstration. A real app would fetch historical data.
    data[dayOfWeek].hours = workingHours; 
    return data;
  }, [workingHours]);

  const totalHours = chartData.reduce((acc, curr) => acc + curr.hours, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-xl">
          <Clock className="h-5 w-5" />
          Working Hours
        </CardTitle>
        <CardDescription>Total operating hours this week: {totalHours.toFixed(1)}h</CardDescription>
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
