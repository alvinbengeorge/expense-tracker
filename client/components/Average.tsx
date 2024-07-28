import { getAverage } from "@/utils/api";
import { ApiResponse } from "@/utils/apiClient";
import { BanknoteIcon, CalendarDays, Currency, Sigma } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface AverageData {
  average: number;
  total: number;
  count: number;
}

const Average = () => {
  const [averageData, setAverageData] = useState<AverageData>();
  console.log(averageData);
  useEffect(() => {
    const fetchAverage = async () => {
      try {
        const response: ApiResponse = await getAverage();
        if (response.status === "success") {
          setAverageData(response.data);
        } else {
          toast.error("Failed to fetch transactions.");
          console.error("Failed to fetch transactions:", response.error);
        }
      } catch (error) {
        toast.error("Failed to fetch transactions.");
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchAverage();
  }, []);

  return (
    <div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <BanknoteIcon size={48} />
          </div>
          <div className="stat-title">Total Amount Spent</div>
          <div className="stat-value text-primary">{averageData?.total}</div>
          <div className="stat-desc">
            Total amount spent across all transactions
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <CalendarDays size={48} />
          </div>
          <div className="stat-title">Average Amount Spent</div>
          <div className="stat-value text-secondary">
            {averageData?.average}
          </div>
          <div className="stat-desc">Average amount per month</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <Sigma size={48} />
          </div>
          <div className="stat-title">Total Transactions</div>
          <div className="stat-value">{averageData?.count}</div>
          <div className="stat-desc text-secondary">
            Total number of transactions
          </div>
        </div>
      </div>
    </div>
  );
};

export default Average;
