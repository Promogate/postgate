"use client";

import { Charts } from "@/components/charts";
import { PlanCounter } from "@/components/plan-counter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, Tooltip, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const data = [
  {
    name: 'Jan',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Fev',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Abr',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Mai',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Jun',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Jul',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Ago',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Set',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Out',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Nov',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Dez',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

const pieData = [
  {
    name: "Twitter",
    value: 200400,
  },
  {
    name: "Facebook",
    value: 205000,
  },
  {
    name: "Instagram",
    value: 23400,
  },
  {
    name: "Snapchat",
    value: 20000,
  },
  {
    name: "LinkedIn",
    value: 29078,
  },
  {
    name: "YouTube",
    value: 18900,
  },
];

const deviceData = [
  {
    name: "MacOS",
    value: 2000,
  },
  {
    name: "Windows",
    value: 15000,
  },
  {
    name: "iOS",
    value: 28000,
  },
  {
    name: "Android",
    value: 58000,
  },
];

const colors = [
  "#8884d8",
  "#FA8072",
  "#AF69EE",
  "#3DED97",
  "#3AC7EB",
  "#F9A603",
];

export default function Page() {
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-bold text-gray-800">
        Dashboard
      </h1>
      <div className="grid grid-cols-12 gap-x-4 gap-y-4">
        <Card className="md:col-span-12 2xl:col-span-6 w-full">
          <CardHeader>
            <CardTitle>
              Cliques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                width={500}
                height={320}
                data={data}
              >
                <XAxis dataKey="name" className="text-sm" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pv" stackId="a" fill="#5528ff" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-6 w-full">
          <CardHeader>
            <CardTitle>
              Dispositivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart width={730} height={250}>
                <Pie
                  data={deviceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-6 w-full">
          <CardHeader>
            <CardTitle>
              Canais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart width={730} height={250}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}