"use client";
import { Progress } from "@radix-ui/react-progress";
import Sidebar from "@/components/Sidebar";
import BudgetForm from "@/components/BudgetForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getBudgets } from "@/utils/api";
import BudgetList from "@/components/BudgetList";

const BudgetPage = () => {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="p-10 font-bricolage min-h-screen w-full">
        <h1 className="text-4xl font-bold mb-6">Budget Tracker</h1>
        <BudgetList />
        <BudgetForm />
      </div>
    </div>
  );
};

export default BudgetPage;
