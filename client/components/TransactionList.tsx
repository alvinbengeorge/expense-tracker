import {
  getExpenses,
  postExpense,
  updateExpense,
  deleteExpense,
} from "@/app/utils/api";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
interface Transaction {
  id?: string;
  name: string;
  amount: number;
  timestamp: number;
}

interface TransactionListProps {
  initialTransactions?: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({
  initialTransactions = [],
}) => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getExpenses();
        setTransactions(response);
      } catch (error) {
        toast.error("Failed to fetch transactions.");
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const addTransaction = async (transaction: Transaction) => {
    try {
      const response = await postExpense(transaction);
      setTransactions([...transactions, response]);
      toast.success("Transaction added successfully.");
    } catch (error) {
      toast.error("Failed to add transaction.");
      console.error("Failed to add transaction:", error);
    }
  };

  const updateTransaction = async (updatedTransaction: Transaction) => {
    try {
      const response = await updateExpense(updatedTransaction);
      setTransactions(
        transactions.map((transaction) =>
          transaction.id === response.id ? response : transaction
        )
      );
      setCurrentTransaction(null);
      toast.success("Transaction updated successfully.");
    } catch (error) {
      toast.error("Failed to update transaction.");
      console.error("Failed to update transaction:", error);
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      await deleteExpense(id);
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id)
      );
      toast.success("Transaction deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete transaction.");
      console.error("Failed to delete transaction:", error);
    }
  };

  const editTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
  };

  return (
    <div className="p-6 rounded shadow-lg">
      <Toaster />
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <ul>
        {transactions.map((transaction: Transaction) => (
          <li
            key={transaction.id}
            className="mb-4 p-4 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{transaction.name}</p>
              <p className="text-gray-700">${transaction.amount}</p>
            </div>
            <div>
              <button
                onClick={() => editTransaction(transaction)}
                className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTransaction(transaction.id!)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
