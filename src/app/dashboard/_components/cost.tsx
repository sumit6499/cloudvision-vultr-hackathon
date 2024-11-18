"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import { ResponsiveContainer } from "recharts";
import { CostData } from "./types";

export const Cost = ({ costData }: { costData: CostData[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Infrastructure Costs</CardTitle>
        <CardDescription>
          Breakdown of costs by infrastructure type
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={costData}>
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cost" fill="var(--primary)" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
