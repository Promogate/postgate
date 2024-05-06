"use client";

import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Card as TremorCard } from "@tremor/react";

const chartdata = [
  {
    name: 'Amphibians',
    'Number of threatened species': 2488,
  },
  {
    name: 'Birds',
    'Number of threatened species': 1445,
  },
  {
    name: 'Crustaceans',
    'Number of threatened species': 743,
  },
  {
    name: 'Ferns',
    'Number of threatened species': 281,
  },
  {
    name: 'Arachnids',
    'Number of threatened species': 251,
  },
  {
    name: 'Corals',
    'Number of threatened species': 232,
  },
  {
    name: 'Algae',
    'Number of threatened species': 98,
  },
];

export default function Page() {
  const dataFormatter = (number: number) => Intl.NumberFormat('us').format(number).toString();

  return (
    <section className="space-y-4 md:p-4">
      <PageHeader>
        Dashboard
      </PageHeader>
      <div className="grid grid-cols-12 gap-x-4 gap-y-4">
        <Card className="md:col-span-12 2xl:col-span-6 w-full">
          <CardHeader>
            <CardTitle>
              Cliques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={chartdata}
              index="name"
              categories={['Number of threatened species']}
              colors={["violet"]}
              valueFormatter={(number: number) =>
                Intl.NumberFormat("us").format(number).toString()
              }
              yAxisWidth={48}
              onValueChange={(v) => console.log(v)}
            />
          </CardContent>
        </Card>
        <Card className="col-span-6 w-full">
          <CardHeader>
            <CardTitle>
              Dispositivos
            </CardTitle>
          </CardHeader>
          <CardContent>

          </CardContent>
        </Card>
        <Card className="col-span-6 w-full">
          <CardHeader>
            <CardTitle>
              Canais
            </CardTitle>
          </CardHeader>
          <CardContent>

          </CardContent>
        </Card>
      </div>
    </section>
  )
}