// components/TransactionForm.tsx
import { postExpense } from "@/app/utils/api";
import { ArrowRightLeft, IndianRupee } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const TransactionForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const newExpense = {
      name,
      amount,
      timestamp: Date.now(),
    };
    try {
      const response = await postExpense(newExpense);
      setIsLoading(false);
      toast.success("Transaction added successfully.");
      console.log(response);
      setName("");
      setAmount(0);
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to add transaction.");
      console.error("Failed to add transaction:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded bg-[#353847] shadow-lg flex flex-col gap-5 w-[30vw]"
    >
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>
      <div className="flex flex-col gap-5">
        <label className="input input-bordered flex items-center gap-2 w-fit">
          <ArrowRightLeft />
          <input
            type="text"
            className="grow"
            placeholder="Transaction Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-fit">
          <IndianRupee />
          <input
            type="number"
            className="grow"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            disabled={isLoading}
          />
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-outline btn-secondary transition w-fit"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-ring loading-md"></span>
        ) : (
          "Add"
        )}
      </button>
    </form>
  );
};

export default TransactionForm;
