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
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

type WorkingHoursChartProps = {
  workingHours?: number;
};

export default function WorkingHoursChart({ workingHours = 0 }: WorkingHoursChartProps) {
  const chartData = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday - 0, Monday - 1, ...
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Create mock data for the week
    const data = days.map((day, index) => {
        // Mock some activity on other days for a more interesting chart
        let hours = 0;
        if (index === dayOfWeek) {
            hours = workingHours;
        } else if (index < dayOfWeek) {
            hours = 4 + Math.random() * 4; // 4 to 8 hours
        }
        return { day, hours: parseFloat(hours.toFixed(1)) };
    });

    return data;
  }, [workingHours]);

  const totalHours = chartData.reduce((acc, curr) => acc + curr.hours, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Working Hours
        </CardTitle>
        <CardDescription>Total operating hours this week: {totalHours.toFixed(1)}h</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-48 w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
             <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              unit="h"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <ChartTooltip cursor={{fill: 'hsl(var(--accent))', radius: 4}} content={<ChartTooltipContent indicator="dot" />} />
            <Bar dataKey="hours" fill="var(--color-hours)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
