import React from "react";
import Dashboard from "../../components/ui/Dashboard";
import Header from "@/components/ui/Header";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <Header title="My Dashboard"/>
      <Dashboard />
    </div>
  );
}
