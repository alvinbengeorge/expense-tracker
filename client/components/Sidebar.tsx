"use client";
import { GanttChartIcon, Grid2X2, PiggyBank, ShoppingBag } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    logo: <Grid2X2 className="text-white" />,
  },
  {
    name: "Transactions",
    href: "/dashboard/transactions",
    logo: <ShoppingBag className="text-white w-5 h-5" />,
  },
  {
    name: "Budgets",
    href: "/dashboard/budgets",
    logo: <PiggyBank className="text-white w-5 h-5" />,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    logo: <GanttChartIcon className="text-white w-5 h-5" />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <div className="shadow-2xl min-h-screen  bg-[#353847] text-white w-[15vw] flex flex-col justify-between items-start">
      <div className="p-4 min-h-screen h-full flex flex-col justify-between gap-20">
        <ul className="mt-56">
          {links.map((link, index) => (
            <li key={index} className="mb-5 rounded-2xl">
              <a
                href={link.href}
                className={`flex flex-row gap-3 py-3 px-4 text-xs md:text-lg p-2 rounded-lg duration-300 transition-all ${
                  isActive(link.href)
                    ? "bg-[#a991f7] text-white"
                    : "hover:bg-[#414558]"
                }`}
              >
                {link.logo}
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
