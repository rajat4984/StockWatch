import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "value",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type ChartData = {
  value: number;
  date: string;
}[];

type ChartProp = {
  singleStockData: ChartData;
};

const Chart = ({ singleStockData }: ChartProp) => {
  return (
    <>
      {singleStockData && (
        <Card className="border-none">
          <CardContent className="my-5 p-0">
            <ChartContainer className="justify-start" config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={singleStockData}
                margin={{
                  left: 0,
                  right: 0,
                }}
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00b386" />
                    <stop offset="25%" stopColor="#34c8ca" />
                    <stop offset="50%" stopColor="#90d8f2" />
                    <stop offset="75%" stopColor="#d6e8fe" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>

                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={true}
                  tickMargin={15}
                />
                <YAxis
                  tickCount={10}
                  dataKey="value"
                  domain={[singleStockData[0]?.value]}
                  axisLine={false}
                  tickLine={false}
                  hide={true}
                />

                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" hideLabel />}
                />
                <Area
                  dataKey="value"
                  type="linear"
                  fill="url(#areaGradient)"
                  fillOpacity={0.4}
                  stroke="#00b386"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chart;
