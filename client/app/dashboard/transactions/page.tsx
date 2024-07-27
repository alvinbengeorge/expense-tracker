"use client";
import { getExpenses } from "@/app/utils/api";
import Sidebar from "@/components/Sidebar";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import { useState, useEffect } from "react";

interface Transaction {
  id?: string;
  name: string;
  amount: number;
  timestamp: number;
}

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getExpenses();
        setTransactions(response);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, []);
  return (
    <div className="flex gap-10">
      <Sidebar />
      <div className="flex gap-5 font-bricolage min-h-screen p-10">
        {transactions && (
          <div className="w-1/2">
            <TransactionList />
          </div>
        )}

        <div className="w-1/2">
          <TransactionForm />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
