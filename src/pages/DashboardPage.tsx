import React from "react";
import SalesChart from "../components/charts/SalesChart";
import StatsCards from "../components/cards/StatasCard";
import { OrdersTable } from "../components/tables/OrdersTable";

const DashboardPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <StatsCards />
      </div>
      <OrdersTable />
    </div>
  );
};

export default DashboardPage;
