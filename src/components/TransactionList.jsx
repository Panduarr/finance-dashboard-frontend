import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import AddTransactionForm from "./AddTransactionForm";
import { Search, Tag, Calendar, Plus, X as CloseIcon, Filter, Layers, CreditCard, ChevronRight, Inbox, Loader2, Edit3, Trash2 } from "lucide-react";

export default function Transactions() {
  const { transactions = [], role, deleteTransaction } = useContext(AppContext);

  const [selectedType, setSelectedType] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  
  // 🔄 LOAD MORE STATE
  const [visibleCount, setVisibleCount] = useState(5);
  const [loadingMore, setLoadingMore] = useState(false);

  const uniqueMonths = [...new Set(transactions.map((t) => t.month))];

  const filtered = transactions.filter((t) => {
    return (
      (selectedType === "All" || t.type === selectedType) &&
      (selectedMonth === "All" || t.month === selectedMonth) &&
      (t.desc || "").toLowerCase().includes(search.toLowerCase())
    );
  });

  // ✂️ Slice for pagination
  const pagedTransactions = filtered.slice(0, visibleCount);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 5);
      setLoadingMore(false);
    }, 600);
  };

  const handleEdit = (transaction) => {
    setEditData(transaction);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      await deleteTransaction(id);
    }
  };

  const getCategoryStyles = (type) => {
    const styles = {
      Salary: "bg-emerald-50 text-emerald-600 border-emerald-100",
      Freelance: "bg-blue-50 text-blue-600 border-blue-100",
      Housing: "bg-amber-50 text-amber-600 border-amber-100",
      "Food & dining": "bg-rose-50 text-rose-600 border-rose-100",
      Transport: "bg-indigo-50 text-indigo-600 border-indigo-100",
      Health: "bg-cyan-50 text-cyan-600 border-cyan-100",
      Shopping: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100",
      Subscriptions: "bg-violet-50 text-violet-600 border-violet-100",
    };
    return styles[type] || "bg-slate-50 text-slate-600 border-slate-100";
  };

  return (
    <div className="bg-white rounded-2xl premium-shadow border border-slate-100 overflow-hidden">
      {/* Header Section */}
      <div className="p-8 border-b border-slate-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <CreditCard size={24} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Financial Ledger</h2>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.15em]">
                Live Transactions &bull; <span className="text-blue-500">{role} Mode</span>
              </p>
            </div>
          </div>
          
          {role === "admin" && (
            <button
              onClick={() => {
                setShowForm((prev) => !prev);
                setEditData(null);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-300 uppercase tracking-widest text-[10px] shadow-sm ${
                showForm 
                  ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 hover:shadow-lg"
              }`}
            >
              {showForm ? <CloseIcon size={14} /> : <Plus size={14} />}
              {showForm ? "Cancel Entry" : "New Transaction"}
            </button>
          )}
        </div>

        {showForm && role === "admin" && (
          <div className="mb-8 p-8 bg-slate-50/50 rounded-3xl border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-500">
            <AddTransactionForm 
               editData={editData} 
               close={() => {
                 setShowForm(false);
                 setEditData(null);
               }} 
            />
          </div>
        )}

        {/* Filters Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-6 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Filter by description or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50/80 border border-transparent rounded-2xl focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-medium text-slate-600"
            />
          </div>

          <div className="lg:col-span-6 flex flex-wrap lg:justify-end gap-3">
            <div className="relative">
              <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="pl-10 pr-10 py-3 bg-slate-50/80 border border-transparent rounded-2xl focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-500/5 transition-all text-xs font-bold text-slate-500 appearance-none cursor-pointer uppercase tracking-tighter"
              >
                <option value="All">All Categories</option>
                {["Salary", "Freelance", "Housing", "Food & dining", "Transport", "Health", "Shopping", "Subscriptions", "Other"].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="pl-10 pr-10 py-3 bg-slate-50/80 border border-transparent rounded-2xl focus:bg-white focus:border-blue-100 focus:ring-4 focus:ring-blue-500/5 transition-all text-xs font-bold text-slate-500 appearance-none cursor-pointer uppercase tracking-tighter"
              >
                <option value="All">All Dates</option>
                {uniqueMonths.map((m, i) => (
                  <option key={i} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {(selectedType !== "All" || selectedMonth !== "All" || search !== "") && (
              <button
                onClick={() => {
                  setSelectedType("All");
                  setSelectedMonth("All");
                  setSearch("");
                }}
                className="px-4 py-2.5 text-rose-500 font-bold hover:bg-rose-50 rounded-xl transition-all flex items-center gap-2 text-[10px] uppercase tracking-widest"
              >
                <CloseIcon size={14} />
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/30 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-slate-50">
              <th className="pl-8 pr-6 py-5">History / Time</th>
              <th className="px-6 py-5">Narration</th>
              <th className="px-6 py-5">Classification</th>
              <th className="px-6 py-5 text-right">Value</th>
              {role === "admin" && <th className="pl-6 pr-8 py-5 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50/80">
            {pagedTransactions.length === 0 ? (
              <tr>
                <td colSpan={role === "admin" ? "5" : "4"} className="px-6 py-20">
                  <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in duration-700">
                    <div className="w-16 h-16 bg-slate-50 text-slate-200 rounded-full flex items-center justify-center">
                      <Inbox size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-slate-900 font-bold text-sm">Quiet as a mouse here</p>
                      <p className="text-slate-400 text-xs font-medium max-w-[200px] mx-auto">No records found matching your current filter set.</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              pagedTransactions.map((t, index) => (
                <tr key={t._id || index} className="hover:bg-slate-50/50 transition-all duration-300 group cursor-default animate-in fade-in slide-in-from-bottom-1 duration-300">
                  <td className="pl-8 pr-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-1.5 h-6 rounded-full ${t.income > 0 ? 'bg-emerald-400' : 'bg-rose-400'} opacity-0 group-hover:opacity-100 transition-all`} />
                      <div>
                        <span className="text-slate-900 font-bold text-sm block leading-tight">{t.month}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="max-w-xs">
                      <span className="text-slate-700 font-semibold text-sm block truncate group-hover:text-blue-600 transition-colors">{t.desc || 'No description provided'}</span>
                      <span className="text-[10px] text-slate-400 font-medium font-mono uppercase">ID: {t._id ? t._id.slice(-6).toUpperCase() : `TR${1000 + index}`}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border shadow-sm ${getCategoryStyles(t.type)}`}>
                      {t.type}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className={`font-extrabold text-sm tracking-tight ${t.income > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {t.income > 0 ? '+' : '-'} ₹{Number(Math.max(t.income, t.expense)).toLocaleString()}
                    </span>
                  </td>
                  {role === "admin" && (
                    <td className="pl-6 pr-8 py-5">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button 
                          onClick={() => handleEdit(t)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit Transaction"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(t._id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                          title="Delete Transaction"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {filtered.length > visibleCount && (
        <div className="p-5 bg-slate-50/30 border-t border-slate-50 text-center">
           <button 
             onClick={handleLoadMore}
             disabled={loadingMore}
             className="inline-flex items-center gap-2 group text-[11px] font-bold text-slate-400 hover:text-blue-600 transition-all uppercase tracking-widest disabled:opacity-50"
           >
             {loadingMore ? (
               <>
                 <Loader2 size={14} className="animate-spin" />
                 Syncing Database...
               </>
             ) : (
               <>
                 Load Full Archives ({filtered.length - visibleCount} hidden)
                 <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </>
             )}
           </button>
        </div>
      )}
    </div>
  );
}
