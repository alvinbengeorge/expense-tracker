"use client";
import { useState } from "react";
import { ArrowUpCircle, DollarSign, Calendar, Star } from "lucide-react";
import { Progress } from "@radix-ui/react-progress";
import Sidebar from "@/components/Sidebar";
import BudgetForm from "@/components/BudgetForm";

const mockBudgets = [
  {
    id: 1,
    name: "Travel",
    target: 1500,
    achieved: 800,
    icon: <ArrowUpCircle />,
  },
  {
    id: 2,
    name: "Groceries",
    target: 500,
    achieved: 300,
    icon: <DollarSign />,
  },
  {
    id: 3,
    name: "Entertainment",
    target: 200,
    achieved: 150,
    icon: <Calendar />,
  },
  { id: 4, name: "Savings", target: 1000, achieved: 400, icon: <Star /> },
];

const BudgetPage = () => {
  const [budgets, setBudgets] = useState(mockBudgets);
  const [name, setName] = useState("");
  const [target, setTarget] = useState<number>(0);
  const [achieved, setAchieved] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBudget = {
      id: budgets.length + 1,
      name,
      target,
      achieved,
      icon: <Star />,
    };
    setBudgets([...budgets, newBudget]);
    setName("");
    setTarget(0);
    setAchieved(0);
  };

  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="p-10 font-bricolage min-h-screen w-full">
        <h1 className="text-4xl font-bold mb-6">Budget Tracker</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {budgets.map((budget) => (
            <div
              key={budget.id}
              className="bg-[#343746] text-white p-6 rounded-lg shadow-lg flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">{budget.icon}</div>
                <h2 className="text-2xl font-semibold">{budget.name}</h2>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span>Achieved: ${budget.achieved}</span>
                  <span>Target: ${budget.target}</span>
                </div>
                <Progress
                  value={(budget.achieved / budget.target) * 100}
                  max={100}
                  className="relative h-4 bg-gray-700 rounded-full overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-green-500"
                    style={{
                      width: `${(budget.achieved / budget.target) * 100}%`,
                    }}
                  />
                </Progress>
                <span className="text-sm text-gray-400">
                  {Math.round((budget.achieved / budget.target) * 100)}%
                  Completed
                </span>
              </div>
            </div>
          ))}
        </div>
        <BudgetForm />
      </div>
    </div>
  );
};

export default BudgetPage;
