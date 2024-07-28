import { useState, useEffect } from "react";
import { Progress } from "@radix-ui/react-progress";
import { DollarSign } from "lucide-react";
import toast from "react-hot-toast";
import { getBudgets, updateBudget } from "@/utils/api"; // Ensure you import your API functions
import Loader from "./Loader";

const BudgetList = () => {
  const [budgets, setBudgets] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [updatedBudget, setUpdatedBudget] = useState({
    budget_name: "",
    amount: 0,
    achieved_by: 0,
    progress: 0,
  });

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await getBudgets();
        console.log("API Response:", response);

        if (response.status === "success") {
          setBudgets(response.data.budgets);
          console.log("Budgets:", response.data.budgets);
        } else {
          toast.error("Failed to fetch budgets.");
          console.error("Failed to fetch budgets:", response.error);
        }
      } catch (error) {
        toast.error("Failed to fetch budgets.");
        console.error("Failed to fetch budgets:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  const handleEditClick = (budget: any) => {
    setIsEditing(budget._id);
    setUpdatedBudget({
      budget_name: budget.budget_name,
      amount: budget.amount,
      achieved_by: budget.achieved_by,
      progress: budget.progress,
    });
  };

  const handleUpdate = async (budgetId: string) => {
    try {
      const response = await updateBudget(updatedBudget, budgetId);

      if (response.status === "success") {
        setBudgets(
          budgets.map((budget: any) =>
            budget._id === budgetId ? { ...budget, ...updatedBudget } : budget
          )
        );
        toast.success("Budget updated successfully.");
        setIsEditing(null);
      } else {
        toast.error("Failed to update budget.");
        console.error("Failed to update budget:", response.error);
      }
    } catch (error) {
      toast.error("Failed to update budget.");
      console.error("Failed to update budget:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedBudget({
      ...updatedBudget,
      [e.target.name]:
        e.target.name === "amount" ||
        e.target.name === "achieved_by" ||
        e.target.name === "progress"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 rounded-lg shadow-md">
        <Loader />
      </div>
    );
  }

  if (budgets.length === 0) {
    return (
      <div className="p-6 rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <DollarSign /> Budget List
        </h2>
        <p>
          No budgets found. Create your first budget to start tracking your
          expenses and savings. Setting up a budget helps you manage your
          finances more effectively, avoid overspending, and save for your
          goals.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {budgets.map((budget: any) => (
        <div
          key={budget._id}
          className="bg-[#343746] text-white p-6 rounded-lg shadow-lg flex flex-col gap-4"
        >
          {isEditing === budget._id ? (
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold">{budget.budget_name}</h2>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <label>
                    Name:
                    <input
                      type="text"
                      name="budget_name"
                      value={updatedBudget.budget_name}
                      onChange={handleChange}
                      className="bg-gray-700 text-white rounded p-1"
                    />
                  </label>
                </div>
                <div className="flex justify-between text-sm">
                  <label>
                    Achieved: ₹
                    <input
                      type="number"
                      name="progress"
                      value={updatedBudget.progress}
                      onChange={handleChange}
                      className="bg-gray-700 text-white rounded p-1"
                    />
                  </label>
                </div>
                <div className="flex justify-between text-sm">
                  <label>
                    Target: ₹
                    <input
                      type="number"
                      name="amount"
                      value={updatedBudget.amount}
                      onChange={handleChange}
                      className="bg-gray-700 text-white rounded p-1"
                    />
                  </label>
                </div>
                <div className="justify-between text-sm hidden">
                  <label>
                    Achieved By:
                    <input
                      type="number"
                      name="achieved_by"
                      value={updatedBudget.achieved_by}
                      onChange={handleChange}
                      className="bg-gray-700 text-white rounded p-1"
                    />
                  </label>
                </div>
                <button
                  onClick={() => handleUpdate(budget._id)}
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(null)}
                  className="mt-2 bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3">
                {/* <div className="text-3xl">Add an icon if available</div> */}
                <h2 className="text-2xl font-semibold">{budget.budget_name}</h2>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span>Achieved: ₹ {budget.progress}</span>
                  <span>Target: ₹ {budget.amount}</span>
                </div>
                <Progress
                  value={
                    isNaN((budget.progress / budget.amount) * 100)
                      ? 0
                      : (budget.progress / budget.amount) * 100
                  }
                  max={100}
                  className="relative h-4 bg-gray-700 rounded-full overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-green-500"
                    style={{
                      width: `${
                        isNaN((budget.progress / budget.amount) * 100)
                          ? 0
                          : (budget.progress / budget.amount) * 100
                      }%`,
                    }}
                  />
                </Progress>
                <span className="text-sm text-gray-400">
                  {isNaN((budget.progress / budget.amount) * 100)
                    ? 0
                    : Math.round((budget.progress / budget.amount) * 100)}
                  % Completed
                </span>
                <button
                  onClick={() => handleEditClick(budget)}
                  className="mt-2 bg-purple-300 hover:bg-purple-600 text-white py-1 px-3 rounded w-fit"
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BudgetList;
