import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  DollarSignIcon,
  PackageIcon,
  ClipboardCheckIcon,
  BarChart3Icon,
} from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  trend: number;
  trendLabel: string;
  icon: React.ReactNode;
  chartData?: number[];
}

const KpiCard = ({
  title = "Metric",
  value = "0",
  trend = 0,
  trendLabel = "vs last period",
  icon = <BarChart3Icon />,
  chartData = [5, 8, 12, 9, 7, 15, 10],
}: KpiCardProps) => {
  const isPositive = trend >= 0;

  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <div className="flex items-center mt-2">
              <span
                className={`flex items-center text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}
              >
                {isPositive ? (
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                )}
                {Math.abs(trend)}%
              </span>
              <span className="text-xs text-muted-foreground ml-1">
                {trendLabel}
              </span>
            </div>
          </div>
          <div className="p-2 rounded-full bg-primary/10">
            <div className="text-primary">{icon}</div>
          </div>
        </div>
        {chartData && (
          <div className="mt-4 h-10">
            <div className="flex items-end justify-between h-full">
              {chartData.map((value, index) => (
                <div
                  key={index}
                  className="bg-primary/60 rounded-sm w-2"
                  style={{
                    height: `${(value / Math.max(...chartData)) * 100}%`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface KpiCardsProps {
  cards?: KpiCardProps[];
}

const KpiCards = ({ cards }: KpiCardsProps) => {
  const defaultCards: KpiCardProps[] = [
    {
      title: "Active Projects",
      value: "24",
      trend: 12,
      trendLabel: "vs last month",
      icon: <ClipboardCheckIcon className="h-5 w-5" />,
      chartData: [5, 8, 12, 9, 7, 15, 10],
    },
    {
      title: "Pending Approvals",
      value: "18",
      trend: -4,
      trendLabel: "vs last week",
      icon: <ClipboardCheckIcon className="h-5 w-5" />,
      chartData: [8, 5, 12, 15, 10, 8, 6],
    },
    {
      title: "Inventory Value",
      value: "$1.2M",
      trend: 8,
      trendLabel: "vs last month",
      icon: <PackageIcon className="h-5 w-5" />,
      chartData: [10, 12, 15, 18, 20, 18, 22],
    },
    {
      title: "Monthly Purchases",
      value: "$345K",
      trend: -2,
      trendLabel: "vs last month",
      icon: <DollarSignIcon className="h-5 w-5" />,
      chartData: [22, 18, 16, 15, 14, 12, 10],
    },
    {
      title: "Financial Health",
      value: "92%",
      trend: 5,
      trendLabel: "vs target",
      icon: <TrendingUpIcon className="h-5 w-5" />,
      chartData: [65, 70, 75, 80, 85, 88, 92],
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="bg-background p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {displayCards.map((card, index) => (
          <KpiCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default KpiCards;
