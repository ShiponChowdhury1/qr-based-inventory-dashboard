import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown} from "lucide-react";

const salesData = [
  { month: "Jan", avgSaleValue: 280000000, avgItemsPerSale: 180000000 },
  { month: "Feb", avgSaleValue: 260000000, avgItemsPerSale: 160000000 },
  { month: "Mar", avgSaleValue: 290000000, avgItemsPerSale: 190000000 },
  { month: "Apr", avgSaleValue: 310000000, avgItemsPerSale: 200000000 },
  { month: "May", avgSaleValue: 285000000, avgItemsPerSale: 185000000 },
  { month: "Jun", avgSaleValue: 275000000, avgItemsPerSale: 175000000 },
  { month: "Jul", avgSaleValue: 265000000, avgItemsPerSale: 220000000 },
  { month: "Aug", avgSaleValue: 295000000, avgItemsPerSale: 210000000 },
  { month: "Sep", avgSaleValue: 320000000, avgItemsPerSale: 230000000 },
  { month: "Oct", avgSaleValue: 340000000, avgItemsPerSale: 195000000 },
  { month: "Nov", avgSaleValue: 360000000, avgItemsPerSale: 240000000 },
  { month: "Dec", avgSaleValue: 380000000, avgItemsPerSale: 250000000 },
];

const formatCurrency = (value: number) => {
  return `$${(value / 1000000).toFixed(0)}M`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700">
              {entry.dataKey === "avgSaleValue"
                ? "Avg Sale Value"
                : "Avg Items per Sale"}
              :
            </span>
            <span className="text-sm font-semibold text-gray-900">
              {formatCurrency(entry.value)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function SalesChart() {
  const [timePeriod, setTimePeriod] = useState("7 days");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const timePeriods = ["7 days", "30 days", "90 days", "1 year"];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-bold text-gray-900">
          Your Sales this year
        </h1>

        {/* Time Period Selector */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-sm font-medium text-gray-700">
              {timePeriod}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              {timePeriods.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setTimePeriod(period);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150"
                >
                  {period}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">
            Average Sale Value
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">
            Average Item per sale
          </span>
        </div>
      </div>

      {/* Metrics Cards and Chart Container */}
      <div className="relative">
        {/* Chart */}
        <div className="h-64 mt-16">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={salesData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />

              <Line
                type="monotone"
                dataKey="avgSaleValue"
                stroke="#84cc16"
                strokeWidth={3}
                dot={{ fill: "#84cc16", strokeWidth: 0, r: 5 }}
                activeDot={{
                  r: 7,
                  fill: "#84cc16",
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
                animationDuration={1500}
                animationEasing="ease-out"
              />

              <Line
                type="monotone"
                dataKey="avgItemsPerSale"
                stroke="#3b82f6"
                strokeWidth={3}
                strokeDasharray="8 4"
                dot={{ fill: "#3b82f6", strokeWidth: 0, r: 5 }}
                activeDot={{
                  r: 7,
                  fill: "#3b82f6",
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default SalesChart;
