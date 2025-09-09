import React, { useState } from "react";
import { useDriverEarningQuery } from "./DriverApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { aggregateEarnings } from "@/until/utils";

export default function Earnings() {
  const { data, isLoading, isError, error } = useDriverEarningQuery(undefined);
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  if (isError)
    return <div className="text-red-500">Error: {JSON.stringify(error)}</div>;

  // Map rides into correct format if needed
  const rides =
    data?.data?.rides.map((r: any) => ({
      date: r.date,
      amount: r.amount,
    })) || [];

  const totalEarnings = data?.data?.totalEarnings || 0;
  const totalRides = rides.length;
  const avgEarnings = totalRides ? (totalEarnings / totalRides).toFixed(2) : 0;

  const chartData = aggregateEarnings(rides, period);

  return (
    <div className="p-6 bg-green-400 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Driver Earnings Dashboard</h1>

      {/* Period Selector */}
      <div className="flex gap-2 mb-6">
        {(["daily", "weekly", "monthly"] as const).map((p) => (
          <Button
            key={p}
            variant={period === p ? "default" : "outline"}
            onClick={() => setPeriod(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </Button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <span className="text-gray-500 text-sm">Total Earnings</span>
          <div className="text-2xl font-bold text-green-600">
            ${totalEarnings}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <span className="text-gray-500 text-sm">Total Rides</span>
          <div className="text-2xl font-bold text-blue-600">{totalRides}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <span className="text-gray-500 text-sm">Avg Earnings/Ride</span>
          <div className="text-2xl font-bold text-purple-600">
            ${avgEarnings}
          </div>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Earnings Over Time ({period})
        </h2>

        {chartData.length === 0 ? (
          <p className="text-gray-500">No earnings data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="period" stroke="#374151" />
              <YAxis stroke="#374151" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#4f46e5"
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
