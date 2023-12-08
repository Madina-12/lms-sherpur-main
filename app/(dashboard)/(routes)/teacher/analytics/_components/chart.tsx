"use client"

import { Card } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface ChartProps {
  data: {
    title: string
    total: number
  }[]
}
const Chart = ({ data }: ChartProps) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>

          <XAxis
            dataKey="title"
            stroke="#888888"
            axisLine={false}
            tickLine={false}
            fontSize={12}
          />
          <XAxis
            stroke="#888888"
            axisLine={false}
            tickLine={false}
            fontSize={12}
            tickFormatter={value => `$${value}`}
          />
          <Bar
            dataKey="total"
            fill="#0369a1"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default Chart