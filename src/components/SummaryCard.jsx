import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { TrendingUp, Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function Summary() {
  const { transactions } = useContext(AppContext);

  const income = transactions.reduce((a, b) => a + b.income, 0);
  const expense = transactions.reduce((a, b) => a + b.expense, 0);
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <Card 
        title="Total Revenue" 
        value={income} 
        icon={TrendingUp} 
        color="text-emerald-600" 
        bgColor="bg-emerald-50/50"
        iconColor="text-emerald-500"
        borderColor="border-emerald-100"
      />
      <Card 
        title="Current Balance" 
        value={balance} 
        icon={Wallet} 
        color="text-blue-600" 
        bgColor="bg-blue-50/50"
        iconColor="text-blue-500"
        borderColor="border-blue-100"
      />
      <Card 
        title="Monthly Income" 
        value={income} 
        icon={ArrowUpCircle} 
        color="text-indigo-600" 
        bgColor="bg-indigo-50/50"
        iconColor="text-indigo-500"
        borderColor="border-indigo-100"
      />
      <Card 
        title="Total Expenses" 
        value={expense} 
        icon={ArrowDownCircle} 
        color="text-rose-600" 
        bgColor="bg-rose-50/50"
        iconColor="text-rose-500"
        borderColor="border-rose-100"
      />
    </div>
  );
}

const Card = ({ title, value, icon: Icon, color, bgColor, iconColor, borderColor }) => (
  <div className="bg-white p-6 rounded-2xl premium-shadow border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-default">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-2.5 rounded-xl ${bgColor} ${iconColor} border ${borderColor} group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={22} className="stroke-[2.5]" />
      </div>
    </div>
    <div>
      <h2 className="text-slate-400 text-[11px] font-bold mb-1 uppercase tracking-[0.1em]">{title}</h2>
      <p className={`text-2xl font-extrabold tracking-tight ${color}`}>₹{value.toLocaleString()}</p>
    </div>
  </div>
);
