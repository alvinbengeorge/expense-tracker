"use client";
import Sidebar from "@/components/Sidebar";
import Card from "@/components/Card";
import { BookOpenCheck, CopyPlus, Eraser, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const cards = [
    {
      title: "Create Transaction",
      description: <CopyPlus className="h-32 w-32 mx-auto" />,
      buttonText: "Create",
      buttonColor: "bg-purple-700",
      handleClick: () => {
        router.push("/dashboard/transactions");
      },
    },
    {
      title: "Read Transactions",
      description: <BookOpenCheck className="h-32 w-32 mx-auto" />,
      buttonText: "View",
      buttonColor: "bg-teal-500",
    },
    {
      title: "Update Transaction",
      description: <PencilLine className="h-32 w-32 mx-auto" />,
      buttonText: "Update",
      buttonColor: "bg-yellow-500",
    },
    {
      title: "Delete Transaction",
      description: <Eraser className="h-32 w-32 mx-auto" />,
      buttonText: "Delete",
      buttonColor: "bg-red-500",
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
