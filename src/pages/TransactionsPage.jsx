import { useState } from "react";
import Navbar from "../components/Navbar";
import RoleSwitcher from "../components/RoleSwitcher";
import Transactions from "../components/TransactionList";
import { Menu, X, Wallet } from "lucide-react";

export default function TransactionsPage() {
  const [open, setOpen] = useState(false);

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
        {/* MOBILE CLOSE */}
        <div className="flex justify-between items-center mb-8 md:hidden">
          <div className="flex items-center gap-2">
            <Wallet className="text-blue-500" size={24} />
            <h2 className="font-bold text-xl">Zorvyn</h2>
          </div>
          <button onClick={() => setOpen(false)} className="p-2 hover:bg-slate-800 rounded-lg">
            <X size={24} />
          </button>
        </div>

        {/* LOGO (Desktop) */}
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
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Transaction Ledger</h1>
          <p className="text-slate-500 font-medium">Detailed history of all financial activities.</p>
        </header>

        <Transactions />
      </div>
    </div>
  );
}