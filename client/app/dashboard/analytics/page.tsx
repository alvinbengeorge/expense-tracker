"use client";
import { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import Sidebar from "@/components/Sidebar";
import Average from "@/components/Average";
import Loader from "@/components/Loader"; // Import the Loader component

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const mockData = {
  totalExpenses: 1200,
  expenseCategories: [
    { category: "Food", amount: 300 },
    { category: "Entertainment", amount: 200 },
    { category: "Transportation", amount: 150 },
    { category: "Utilities", amount: 250 },
    { category: "Other", amount: 300 },
  ],
  monthlyTrends: [
    { month: "January", amount: 100 },
    { month: "February", amount: 150 },
    { month: "March", amount: 200 },
    { month: "April", amount: 180 },
    { month: "May", amount: 250 },
    { month: "June", amount: 320 },
  ],
};

const AnalyticsPage = () => {
  const [data, setData] = useState<any>(null); // Initial state is null to indicate loading

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setData(mockData);
    }, 2000); // Simulate a 2 second delay
  }, []);

  if (!data) {
    return (
      <div className="flex gap-5">
        <Sidebar />
        <div className="p-6 sm:p-10 font-bricolage min-h-screen w-[70vw]">
          <Loader />
        </div>
      </div>
    );
  }

  const expenseCategories = data.expenseCategories.map(
    (item: any) => item.category
  );
  const expenseAmounts = data.expenseCategories.map((item: any) => item.amount);

  const monthlyLabels = data.monthlyTrends.map((item: any) => item.month);
  const monthlyAmounts = data.monthlyTrends.map((item: any) => item.amount);

  const expenseCategoryData = {
    labels: expenseCategories,
    datasets: [
      {
        label: "Expense Breakdown",
        data: expenseAmounts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const monthlyTrendData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyAmounts,
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="p-6 sm:p-10 font-bricolage min-h-screen w-[70vw]">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-[#a991f7]">
          Analytics
        </h1>
        <div className="shadow-2xl">
          <Average />
        </div>
        <div className="mb-8 mt-10 sm:mb-10 p-4 rounded-lg shadow-md bg-[#363848]">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Expense Breakdown
          </h2>
          <div className="w-full h-64">
            <Pie
              data={expenseCategoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
        <div className="p-4 rounded-lg shadow-md bg-[#363848]">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            Monthly Trends
          </h2>
          <div className="w-full h-64">
            <Line
              data={monthlyTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    beginAtZero: true,
                  },
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
