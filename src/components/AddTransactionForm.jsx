import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Calendar, IndianRupee, Tag, FileText, CheckCircle2, X } from "lucide-react";

export default function AddTransactionForm({ close, editData }) {
  const { addTransaction, updateTransaction } = useContext(AppContext);

  const [formData, setFormData] = useState({
    month: "",
    income: "",
    expense: "",
    type: "",
    desc: "",
  });

  // ✅ INITIALIZE FOR EDIT
  useEffect(() => {
    if (editData) {
      setFormData({
        month: editData.month || "",
        income: editData.income || "",
        expense: editData.expense || "",
        type: editData.type || "",
        desc: editData.desc || "",
      });
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.month || !formData.type) {
      alert("Please fill required fields (Month and Category)");
      return;
    }

    if (editData) {
      await updateTransaction(editData._id, formData);
    } else {
      await addTransaction(formData);
    }
    
    close();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800">
          {editData ? "Edit Transaction" : "Add New Transaction"}
        </h3>
        <button type="button" onClick={close} className="text-slate-400 hover:text-slate-600 transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Month */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Reporting Month</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              placeholder="e.g. Apr 2025"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-600 font-medium"
              value={formData.month}
              onChange={(e) => setFormData({ ...formData, month: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Category</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-600 font-medium appearance-none cursor-pointer"
              required
            >
              <option value="">Select Category</option>
              {["Salary", "Freelance", "Housing", "Food & dining", "Transport", "Health", "Shopping", "Subscriptions", "Other"].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Income */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Income Amount</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
            <input
              type="number"
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-600 font-medium"
              value={formData.income}
              onChange={(e) => setFormData({ ...formData, income: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* Expense */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Expense Amount</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500" size={18} />
            <input
              type="number"
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-slate-600 font-medium"
              value={formData.expense}
              onChange={(e) => setFormData({ ...formData, expense: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Description</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
            <textarea
              placeholder="Describe this transaction..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-600 font-medium min-h-[100px]"
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={close}
          className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all uppercase tracking-wider text-xs"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-3 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs"
        >
          <CheckCircle2 size={16} />
          {editData ? "Update Transaction" : "Confirm Transaction"}
        </button>
      </div>
    </form>
  );
}
