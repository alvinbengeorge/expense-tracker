"use client";
import Sidebar from "@/components/Sidebar";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";

const TransactionsPage = () => {
  return (
    <div className="flex gap-10">
      <Sidebar />
      <div className="flex flex-col gap-5 justify-evenly w-full font-bricolage min-h-screen p-10">
        <div className="w-1/2">
          <TransactionForm />
        </div>

        <TransactionList />
      </div>
    </div>
  );
};

export default TransactionsPage;
