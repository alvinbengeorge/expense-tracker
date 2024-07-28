"use client";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import { BarChart3, PieChart, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  const cards = [
    {
      title: "Record Transactions",
      description: (
        <>
          <Wallet className="h-32 w-32 mx-auto" />
          <p className="mt-4 text-center">
            Keep track of your daily expenses and income.
          </p>
        </>
      ),
      buttonText: "Record",
      buttonColor: "bg-purple-700",
      titleColor: "text-purple-700",
      handleClick: () => {
        router.push("/dashboard/transactions");
      },
    },
    {
      title: "Create Budgets",
      description: (
        <>
          <PieChart className="h-32 w-32 mx-auto" />
          <p className="mt-4 text-center">
            Set up budgets to manage your finances effectively.
          </p>
        </>
      ),
      buttonText: "Create",
      buttonColor: "bg-teal-500",
      titleColor: "text-teal-500",
      handleClick: () => {
        router.push("/dashboard/budgets");
      },
    },
    {
      title: "Analyze Spending Habits",
      description: (
        <>
          <BarChart3 className="h-32 w-32 mx-auto" />
          <p className="mt-4 text-center">
            Analyze your spending patterns and habits over time.
          </p>
        </>
      ),
      buttonText: "Analyze",
      buttonColor: "bg-yellow-500",
      titleColor: "text-yellow-500",
      handleClick: () => {
        router.push("/dashboard/analytics");
      },
    },
  ];

  return (
    <div className="flex gap-5 font-bricolage min-h-screen">
      <Sidebar />
      <div className="p-10 flex-1">
        <h1 className="text-5xl font-bold mt-10 text-[#a991f7]">
          Hello Saanvi 👋
        </h1>
        <div className="mt-10 flex justify-center">
          <div className="carousel bg-neutral rounded-box max-w-2xl space-x-4 p-4">
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                buttonText={card.buttonText}
                buttonColor={card.buttonColor}
                onClick={card.handleClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
