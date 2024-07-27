// components/BudgetList.tsx
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DollarSign, Calendar } from "lucide-react";

// Register the components used in charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for budgets
const mockBudgets = [
  {
    id: "1",
    name: "Groceries",
    amount: 500,
    spent: 150,
    endDate: "2024-08-31",
  },
  {
    id: "2",
    name: "Entertainment",
    amount: 300,
    spent: 100,
    endDate: "2024-09-30",
  },
  {
    id: "3",
    name: "Transportation",
    amount: 200,
    spent: 50,
    endDate: "2024-10-15",
  },
  {
    id: "4",
    name: "Utilities",
    amount: 400,
    spent: 200,
    endDate: "2024-11-01",
  },
  {
    id: "5",
    name: "Healthcare",
    amount: 250,
    spent: 75,
    endDate: "2024-12-31",
  },
  { id: "6", name: "Savings", amount: 600, spent: 50, endDate: "2024-12-31" },
];

const BudgetList = () => {
  const [budgets, setBudgets] = useState(mockBudgets);

  const budgetLabels = budgets.map((b) => b.name);
  const budgetProgress = budgets.map((b) => (b.spent / b.amount) * 100);

  const progressData = {
    labels: budgetLabels,
    datasets: [
      {
        label: "Budget Progress",
        data: budgetProgress,
        backgroundColor: "#36A2EB",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <DollarSign /> Budget List
      </h2>
      <ul className="space-y-4">
        {budgets.map((budget) => (
          <li
            key={budget.id}
            className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg shadow-sm bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <DollarSign />
              <span className="font-semibold">{budget.name}</span>
            </div>
            <span className="font-semibold">${budget.amount}</span>
            <span className="text-gray-600">Spent: ${budget.spent}</span>
            <div className="w-full sm:w-1/3 h-24 mt-4 sm:mt-0">
              <Bar
                data={progressData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      beginAtZero: true,
                      max: 100,
                      ticks: {
                        callback: (value) => `${value}%`,
                      },
                    },
                  },
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetList;
