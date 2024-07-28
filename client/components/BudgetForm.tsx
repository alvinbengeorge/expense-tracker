import { useState } from "react";
import { ArrowUpCircle, DollarSign, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { postBudgets } from "@/utils/api";

const BudgetForm = () => {
  const [name, setName] = useState("");
  const [target, setTarget] = useState<number>(0);
  const [achieved, setAchieved] = useState<number>(0);
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newBudget = {
      budget_name: name,
      amount: target,
      achieved_by: achieved,
    };

    try {
      console.log(newBudget);
      const response = await postBudgets(newBudget);
      if (response.status === "success") {
        toast.success("Budget added successfully!");
        setName("");
        setTarget(0);
        setAchieved(0);
        setEndDate("");
      } else {
        toast.error("Failed to add budget.");
        console.error("Failed to add budget:", response.error);
      }
    } catch (error) {
      toast.error("Failed to add budget.");
      console.error("Failed to add budget:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded bg-[#343746] shadow-lg flex flex-col gap-5 w-full md:w-[30vw] mt-10"
    >
      <h2 className="text-xl font-bold mb-4">Add New Budget</h2>
      <div className="flex flex-col gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Budget Name</span>
          <div className="flex items-center gap-2 bg-gray-800 p-2 rounded">
            <ArrowUpCircle />
            <input
              type="text"
              className="bg-transparent border-none text-white w-full"
              placeholder="Enter budget name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Target Amount</span>
          <div className="flex items-center gap-2 bg-gray-800 p-2 rounded">
            <DollarSign />
            <input
              type="number"
              className="bg-transparent border-none text-white w-full"
              placeholder="Enter target amount"
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
            />
          </div>
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">To be achieved by</span>
          <div className="flex items-center gap-2 bg-gray-800 p-2 rounded">
            <Calendar />
            <input
              type="date"
              className="bg-transparent border-none text-white w-full"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-outline btn-secondary transition mt-4 w-full"
      >
        Add Budget
      </button>
    </form>
  );
};

export default BudgetForm;
