import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  subtitle?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  subtitle,
  className,
}) => {
  return (
    <Card className={`${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${title === "Total Product" ? "text-white" : "text-muted-foreground"}`}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className={`text-2xl font-bold ${title === "Total Product" ? "text-white" : "text-gray-900"}`}>{value}</div>
          <div className="text-sm mt-1">
            <div className="flex items-center gap-1 justify-end">
              {trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span
                className={trend === "up" ? "text-green-500" : "text-red-500"}
              >
                {change}
              </span>
            </div>
            {subtitle && (
              <p className={`text-muted-foreground ml-1 text-end ${title === "Total Product" ? "text-[#F6F6F6]" : "text-muted-foreground"}`}>{subtitle}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StatsCards: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
      <StatCard
        title="Total Product"
        value="$5000"
        change="10.1%"
        trend="up"
        subtitle="from last week"
        className="hover:shadow-md transition-shadow justify-between bg-[#003366FC]"
      />
      <StatCard
        title="Total Customer"
        value="5000"
        change="+1.6%"
        trend="up"
        subtitle="from last week"
        className="hover:shadow-md transition-shadow justify-between"
      />
    </div>
  );
};

export default StatsCards;
