import { useState, useContext } from "react";
import Summary from "../components/SummaryCard";
import TransactionList from "../components/TransactionList";
import Charts from "../components/Charts";
import RoleSwitcher from "../components/RoleSwitcher";
import Navbar from "../components/Navbar";
import AddTransactionForm from "../components/AddTransactionForm";
import { AppContext } from "../context/AppContext";
import { Menu, X, Wallet, Download, Plus } from "lucide-react";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const { transactions, role } = useContext(AppContext);

  const handleDownloadReport = () => {
    if (transactions.length === 0) {
      alert("No transactions to download.");
      return;
    }

    const headers = ["Month", "Description", "Category", "Income", "Expense"];
    const csvRows = [
      headers.join(","),
      ...transactions.map(t => 
        [t.month, `"${t.desc}"`, t.type, t.income, t.expense].join(",")
      )
    ];
    
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `zorvyn_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">

      {/* 🔹 MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#0f172a] text-white flex items-center justify-between p-4 z-50 premium-shadow">
        <button onClick={() => setOpen(true)} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <Wallet className="text-blue-500" size={24} />
          <h1 className="font-bold tracking-tight">Zorvyn</h1>
        </div>
        <div className="w-8" />
      </div>

      {/* 🔹 OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-72 sidebar-gradient text-white p-6 z-50 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-8 md:hidden">
          <div className="flex items-center gap-2">
            <Wallet className="text-blue-500" size={24} />
            <h2 className="font-bold text-xl">Zorvyn</h2>
          </div>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-slate-800 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3 mb-10 px-2">
           <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
             <Wallet className="text-white" size={24} />
           </div>
           <h2 className="font-extrabold text-2xl tracking-tighter">Zorvyn</h2>
        </div>

        <Navbar closeSidebar={() => setOpen(false)} />

        <div className="absolute bottom-10 left-6 right-6">
          <RoleSwitcher />
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 mt-16 md:mt-0 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-slate-500 font-medium">Welcome back, here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-3">
             <button 
               onClick={handleDownloadReport}
               className="bg-white border text-slate-700 px-4 py-2 rounded-lg font-semibold premium-shadow hover:bg-slate-50 transition-all text-sm flex items-center gap-2"
             >
               <Download size={16} />
               Download Report
             </button>
             {role === "admin" && (
               <button 
                 onClick={() => setShowAddForm(true)}
                 className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold premium-shadow hover:bg-blue-700 transition-all text-sm flex items-center gap-2"
               >
                 <Plus size={16} />
                 Add New
               </button>
             )}
          </div>
        </header>

        {showAddForm && (
          <div className="bg-white p-6 rounded-2xl premium-shadow border border-slate-100">
            <AddTransactionForm close={() => setShowAddForm(false)} />
          </div>
        )}

        {/* SUMMARY */}
        <Summary />

        {/* CHARTS */}
        <Charts />

        {/* TRANSACTIONS */}
        <TransactionList />

      </div>
    </div>
  );
}