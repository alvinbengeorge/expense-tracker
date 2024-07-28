import {
  getExpenses,
  postExpense,
  updateExpense,
  deleteExpense,
} from "@/utils/api";
import { ApiResponse } from "@/utils/apiClient";
import {
  Delete,
  PencilOff,
  Home,
  ShoppingCart,
  Car,
  CreditCard,
  Star,
  Heart,
  BookOpen,
  Plane,
  Wallet,
  ForkKnife,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/Loader"; // Import the Loader component

interface Transaction {
  _id?: string;
  name: string;
  amount: number;
  timestamp: number;
  category: string;
  user_id?: string;
}

interface TransactionListProps {
  initialTransactions?: Transaction[];
}

const categoryIcons: Record<string, JSX.Element> = {
  "Food and Dining": <ForkKnife />,
  Utilities: <CreditCard />,
  Transportation: <Car />,
  Housing: <Home />,
  "Health and Wellness": <Heart />,
  Entertainment: <Star />,
  Shopping: <ShoppingCart />,
  Education: <BookOpen />,
  Travel: <Plane />,
  "Financial Expenses": <Wallet />,
};

const categoryColors: Record<string, string> = {
  "Food and Dining": "bg-red-400",
  Utilities: "bg-yellow-400",
  Transportation: "bg-green-400",
  Housing: "bg-blue-400",
  "Health and Wellness": "bg-pink-400",
  Entertainment: "bg-purple-400",
  Shopping: "bg-orange-400",
  Education: "bg-teal-400",
  Travel: "bg-indigo-400",
  "Financial Expenses": "bg-gray-400",
};

const TransactionList: React.FC<TransactionListProps> = ({
  initialTransactions = [],
}) => {
  const router = useRouter();
  const [editTransactionId, setEditTransactionId] = useState<string | null>(
    null
  );
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response: ApiResponse = await getExpenses();
        if (response.status === "success") {
          setTransactions(response.data.expenses);
        } else {
          toast.error("Failed to fetch transactions.");
          console.error("Failed to fetch transactions:", response.error);
        }
      } catch (error) {
        toast.error("Failed to fetch transactions.");
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchTransactions();
  }, []);

  const updateTransaction = async (updatedTransaction: Transaction) => {
    try {
      const { user_id, _id, ...transactionData } = updatedTransaction;
      const response: ApiResponse = await updateExpense(transactionData, _id!);
      if (response.status === "success") {
        setTransactions(
          transactions.map((transaction) =>
            transaction._id === response.data._id ? response.data : transaction
          )
        );
        setCurrentTransaction(null);
        setEditTransactionId(null);
        router.refresh();
        toast.success("Transaction updated successfully.");
      } else {
        toast.error("Failed to update transaction.");
        console.error("Failed to update transaction:", response.error);
      }
    } catch (error) {
      toast.error("Failed to update transaction.");
      console.error("Failed to update transaction:", error);
    }
  };

  const deleteTransaction = async (_id: string) => {
    try {
      const response: ApiResponse = await deleteExpense(_id);
      if (response.status === "success") {
        setTransactions(
          transactions.filter((transaction) => transaction._id !== _id)
        );
        toast.success("Transaction deleted successfully.");
      } else {
        toast.error("Failed to delete transaction.");
        console.error("Failed to delete transaction:", response.error);
      }
    } catch (error) {
      toast.error("Failed to delete transaction.");
      console.error("Failed to delete transaction:", error);
    }
  };

  const startEditing = (transactionId: string) => {
    setEditTransactionId(transactionId);
  };

  const saveTransaction = (transaction: Transaction) => {
    updateTransaction(transaction);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    transaction: Transaction
  ) => {
    if (event.key === "Enter") {
      const updatedTransactions = transactions.map((t) =>
        t._id === transaction._id
          ? { ...transaction, amount: parseFloat(event.currentTarget.value) }
          : t
      );
      setTransactions(updatedTransactions);
      saveTransaction({
        ...transaction,
        amount: parseFloat(event.currentTarget.value),
      });

      setEditTransactionId(null);
    }
  };

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  if (isLoading) {
    return <Loader />; // Display the loader while data is being fetched
  }

  return (
    <div className="p-6 rounded shadow-lg bg-[#353847]">
      <Toaster />
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-slate-50">No transactions available. ☹️</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(groupedTransactions).map((category) => (
            <div
              key={category}
              className={`p-4 rounded-lg shadow-md ${categoryColors[category]}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="text-white">{categoryIcons[category]}</div>
                <h3 className="text-lg font-semibold text-white">{category}</h3>
              </div>
              <ul>
                {groupedTransactions[category].map((transaction) => (
                  <li
                    key={transaction._id}
                    className="mb-4 p-4 border rounded flex justify-between items-center bg-[#444659]"
                  >
                    <div>
                      <p className="font-bold">{transaction.name}</p>
                      {editTransactionId === transaction._id ? (
                        <input
                          type="number"
                          defaultValue={transaction.amount}
                          onBlur={(e) =>
                            saveTransaction({
                              ...transaction,
                              amount: parseFloat(e.target.value),
                            })
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, {
                              ...transaction,
                              amount: parseFloat(e.currentTarget.value),
                            })
                          }
                          placeholder="Enter new amount"
                          className="input input-bordered input-secondary w-full max-w-xs"
                        />
                      ) : (
                        <p className="text-slate-50">₹ {transaction.amount}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-7">
                      <button onClick={() => startEditing(transaction._id!)}>
                        <PencilOff className="text-yellow-200" />
                      </button>
                      <button
                        onClick={() => deleteTransaction(transaction._id!)}
                      >
                        <Delete className="text-red-400 " />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
