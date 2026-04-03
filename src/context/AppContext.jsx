// import { useEffect } from "react";
// import { createContext, useState } from "react";
// import { fetchTransactions, addTransactionAPI } from "../api/transactions";

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   // const [transactions, setTransactions] = useState([
//   //   {
//   //     month: "Jan 2024",
//   //     income: 45000,
//   //     expense: 22000,
//   //     type: "Salary",
//   //     desc: "Monthly salary credited and basic expenses",
//   //   },
//   //   {
//   //     month: "Feb 2024",
//   //     income: 47000,
//   //     expense: 25000,
//   //     type: "Freelance",
//   //     desc: "Freelance income with increased spending",
//   //   },
//   //   {
//   //     month: "Mar 2024",
//   //     income: 50000,
//   //     expense: 26000,
//   //     type: "Housing",
//   //     desc: "Rent and housing maintenance costs",
//   //   },
//   //   {
//   //     month: "Apr 2024",
//   //     income: 52000,
//   //     expense: 28000,
//   //     type: "Food & dining",
//   //     desc: "Dining and grocery expenses increased",
//   //   },
//   //   {
//   //     month: "May 2024",
//   //     income: 48000,
//   //     expense: 24000,
//   //     type: "Transport",
//   //     desc: "Travel and fuel expenses",
//   //   },
//   //   {
//   //     month: "Jun 2024",
//   //     income: 55000,
//   //     expense: 30000,
//   //     type: "Health",
//   //     desc: "Medical and health-related expenses",
//   //   },

//   //   {
//   //     month: "Jul 2024",
//   //     income: 53000,
//   //     expense: 27000,
//   //     type: "Shopping",
//   //     desc: "Clothing and online shopping",
//   //   },
//   //   {
//   //     month: "Aug 2024",
//   //     income: 60000,
//   //     expense: 32000,
//   //     type: "Subscriptions",
//   //     desc: "OTT and software subscriptions",
//   //   },
//   //   {
//   //     month: "Sep 2024",
//   //     income: 58000,
//   //     expense: 29000,
//   //     type: "Other",
//   //     desc: "Miscellaneous expenses",
//   //   },
//   //   {
//   //     month: "Oct 2024",
//   //     income: 62000,
//   //     expense: 34000,
//   //     type: "Housing",
//   //     desc: "Rent and utilities increased",
//   //   },
//   //   {
//   //     month: "Nov 2024",
//   //     income: 65000,
//   //     expense: 36000,
//   //     type: "Shopping",
//   //     desc: "Festival shopping expenses",
//   //   },
//   //   {
//   //     month: "Dec 2024",
//   //     income: 70000,
//   //     expense: 40000,
//   //     type: "Food & dining",
//   //     desc: "Year-end dining and celebrations",
//   //   },

//   //   {
//   //     month: "Jan 2025",
//   //     income: 48000,
//   //     expense: 23000,
//   //     type: "Salary",
//   //     desc: "Stable salary with controlled expenses",
//   //   },
//   //   {
//   //     month: "Feb 2025",
//   //     income: 50000,
//   //     expense: 26000,
//   //     type: "Freelance",
//   //     desc: "Extra freelance income this month",
//   //   },
//   //   {
//   //     month: "Mar 2025",
//   //     income: 52000,
//   //     expense: 28000,
//   //     type: "Transport",
//   //     desc: "Increased travel costs",
//   //   },
//   //   {
//   //     month: "Apr 2025",
//   //     income: 55000,
//   //     expense: 30000,
//   //     type: "Health",
//   //     desc: "Medical expenses increased",
//   //   },
//   //   {
//   //     month: "May 2025",
//   //     income: 53000,
//   //     expense: 27000,
//   //     type: "Subscriptions",
//   //     desc: "Renewal of yearly subscriptions",
//   //   },
//   //   {
//   //     month: "Jun 2025",
//   //     income: 60000,
//   //     expense: 32000,
//   //     type: "Other",
//   //     desc: "Miscellaneous spending",
//   //   },

//   //   {
//   //     month: "Jul 2025",
//   //     income: 62000,
//   //     expense: 34000,
//   //     type: "Shopping",
//   //     desc: "Electronics purchase",
//   //   },
//   //   {
//   //     month: "Aug 2025",
//   //     income: 65000,
//   //     expense: 36000,
//   //     type: "Food & dining",
//   //     desc: "Frequent dining expenses",
//   //   },
//   //   {
//   //     month: "Sep 2025",
//   //     income: 68000,
//   //     expense: 38000,
//   //     type: "Housing",
//   //     desc: "Rent increase",
//   //   },
//   //   {
//   //     month: "Oct 2025",
//   //     income: 70000,
//   //     expense: 40000,
//   //     type: "Transport",
//   //     desc: "Vehicle maintenance costs",
//   //   },
//   //   {
//   //     month: "Nov 2025",
//   //     income: 72000,
//   //     expense: 42000,
//   //     type: "Shopping",
//   //     desc: "Festive sales shopping",
//   //   },
//   //   {
//   //     month: "Dec 2025",
//   //     income: 75000,
//   //     expense: 45000,
//   //     type: "Food & dining",
//   //     desc: "Holiday season expenses",
//   //   },

//   //   {
//   //     month: "Jan 2026",
//   //     income: 50000,
//   //     expense: 25000,
//   //     type: "Salary",
//   //     desc: "Start of year stable income",
//   //   },
//   //   {
//   //     month: "Feb 2026",
//   //     income: 52000,
//   //     expense: 27000,
//   //     type: "Health",
//   //     desc: "Health checkups and medicine",
//   //   },
//   //   {
//   //     month: "Mar 2026",
//   //     income: 54000,
//   //     expense: 29000,
//   //     type: "Transport",
//   //     desc: "Travel-related expenses",
//   //   },
//   //   {
//   //     month: "Apr 2026",
//   //     income: 75000,
//   //     expense: 14700,
//   //     type: "Freelance",
//   //     desc: "High freelance income, low expenses",
//   //   },
//   //   {
//   //     month: "May 2026",
//   //     income: 30000,
//   //     expense: 10000,
//   //     type: "Other",
//   //     desc: "Low activity month",
//   //   },
//   //   {
//   //     month: "Jun 2026",
//   //     income: 58000,
//   //     expense: 31000,
//   //     type: "Subscriptions",
//   //     desc: "Subscription renewals",
//   //   },
//   // ]);
//   const [transactions, setTransactions] = useState([]);
//   const [role, setRole] = useState("viewer");
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchTransactions()
//       .then((data) => setTransactions(data.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const addTransaction = async (newData) => {
//     const data = await addTransactionAPI(newData);

//     setTransactions((prev) => [...prev, data.data]);
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         transactions,
//         setTransactions,
//         role,
//         setRole,
//         search,
//         setSearch,
//         addTransaction,
//       }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };
import { useEffect, createContext, useState } from "react";
import { fetchTransactions, addTransactionAPI, updateTransactionAPI, deleteTransactionAPI } from "../api/transactions";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");

  // ✅ Fetch all transactions
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();

        console.log("API RESPONSE:", data); // 🔍 debug

        // ✅ Handles both cases (array OR {data: []})
        setTransactions(Array.isArray(data) ? data : data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    loadTransactions();
  }, []);

  // ✅ Add transaction
  const addTransaction = async (newData) => {
    try {
      const res = await addTransactionAPI(newData);
      if (res?.data) {
        setTransactions((prev) => [res.data, ...prev]);
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  // ✅ Update (Edit) transaction
  const updateTransaction = async (id, updatedData) => {
    try {
      const res = await updateTransactionAPI(id, updatedData);
      if (res?.data) {
        setTransactions((prev) => 
          prev.map(t => (t._id === id ? res.data : t))
        );
      }
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  // ✅ Delete transaction
  const deleteTransaction = async (id) => {
    try {
      await deleteTransactionAPI(id);
      setTransactions((prev) => prev.filter(t => t._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        search,
        setSearch,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
