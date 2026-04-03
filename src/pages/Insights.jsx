import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import RoleSwitcher from "../components/RoleSwitcher";
import { Menu, X, Wallet, TrendingUp, ArrowUpRight, Lightbulb, Target } from "lucide-react";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function InsightsPage() {
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
          <h1 className="text-2xl font-bold text-slate-900">Financial Insights</h1>
          <p className="text-slate-500 font-medium">Smart analysis of your spending and savings patterns.</p>
        </header>

        <InsightsContent />
      </div>
    </div>
  );
}

function InsightsContent() {
  const { transactions = [] } = useContext(AppContext);

  // ✅ CALCULATIONS
  const insights = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    let categoryMap = {};

    transactions.forEach((t) => {
      totalIncome += t.income || 0;
      totalExpense += t.expense || 0;

      categoryMap[t.type] =
        (categoryMap[t.type] || 0) + (t.expense || 0);
    });

    const topCategory = Object.entries(categoryMap).sort(
      (a, b) => b[1] - a[1]
    )[0];

    return {
      totalIncome,
      totalExpense,
      savings: totalIncome - totalExpense,
      categoryMap,
      topCategory: topCategory ? topCategory[0] : "N/A",
    };
  }, [transactions]);

  const lastThree = [...transactions].slice(-3);

  const chartData = {
    labels: lastThree.map((t) => t.month),
    datasets: [
      {
        type: "bar",
        label: "Income",
        data: lastThree.map((t) => t.income || 0),
        backgroundColor: "#10b981",
        borderRadius: 6,
      },
      {
        type: "bar",
        label: "Expenses",
        data: lastThree.map((t) => t.expense || 0),
        backgroundColor: "#f43f5e",
        borderRadius: 6,
      },
      {
        type: "line",
        label: "Savings",
        data: lastThree.map(
          (t) => (t.income || 0) - (t.expense || 0)
        ),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { weight: '600', family: 'Inter' }
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        titleFont: { weight: 'bold' },
        cornerRadius: 8,
      }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#f1f5f9' }, ticks: { callback: (v) => `₹${v/1000}k` } }
    }
  };

  const maxCategory = Math.max(
    ...Object.values(insights.categoryMap),
    1
  );

  const getColor = (cat) => {
    const colors = {
      Housing: "#6366f1",
      Shopping: "#f97316",
      "Food & dining": "#facc15",
      Freelance: "#10b981",
      Transport: "#a855f7",
      Health: "#ec4899",
      Subscriptions: "#6366f1",
      Other: "#94a3b8",
    };
    return colors[cat] || "#6366f1";
  };

  const responses = useMemo(() => {
    const msgs = [];
    const savingsRate = (insights.savings / insights.totalIncome) * 100;

    if (savingsRate > 30) {
      msgs.push({ icon: Target, text: "Excellent savings rate! You're building wealth efficiently.", color: "text-emerald-600", bgColor: "bg-emerald-50" });
    } else if (savingsRate < 10) {
      msgs.push({ icon: Target, text: "Your savings are below the recommended 10%. Consider audit of variable expenses.", color: "text-rose-600", bgColor: "bg-rose-50" });
    }

    msgs.push({ icon: TrendingUp, text: `Highest spending detected in ${insights.topCategory}. Review if this aligns with your goals.`, color: "text-blue-600", bgColor: "bg-blue-50" });

    if (insights.totalExpense > insights.totalIncome) {
      msgs.push({ icon: Lightbulb, text: "Warning: Expenses exceed income. Priority should be given to debt reduction.", color: "text-rose-600", bgColor: "bg-rose-50" });
    }

    return msgs;
  }, [insights]);

  return (
    <div className="space-y-8">
      {/* 🔹 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InsightCard title="Total Income" value={insights.totalIncome} icon={ArrowUpRight} color="text-emerald-600" bgColor="bg-emerald-50" />
        <InsightCard title="Total Expense" value={insights.totalExpense} icon={TrendingUp} color="text-rose-600" bgColor="bg-rose-50" />
        <InsightCard title="Total Savings" value={insights.savings} icon={Target} color="text-blue-600" bgColor="bg-blue-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 🔥 TREND CHART */}
        <div className="bg-white p-6 rounded-2xl premium-shadow border border-slate-100 flex flex-col h-[450px]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Financial Performance</h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">3-Month Trend</p>
            </div>
          </div>
          <div className="flex-1">
            {transactions.length > 0 ? (
              <Bar data={chartData} options={chartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center text-slate-400 font-medium italic">No trend data available</div>
            )}
          </div>
        </div>

        {/* 🔹 CATEGORY BREAKDOWN */}
        <div className="bg-white p-6 rounded-2xl premium-shadow border border-slate-100 flex flex-col h-[450px]">
          <div className="mb-6">
             <h3 className="text-lg font-bold text-slate-800">Spending Breakdown</h3>
             <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">By Category</p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-5 pr-2 custom-scrollbar">
            {Object.entries(insights.categoryMap).map(([cat, value]) => (
              <div key={cat} className="group">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-slate-700">{cat}</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">₹{value.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${(value / maxCategory) * 100}%`,
                      backgroundColor: getColor(cat),
                    }}
                  />
                </div>
              </div>
            ))}
            {Object.keys(insights.categoryMap).length === 0 && (
                <div className="h-full flex items-center justify-center text-slate-400 font-medium italic">No category data found</div>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 OBSERVATIONS SECTION */}
      <div className="bg-white p-8 rounded-2xl premium-shadow border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
           <Lightbulb className="text-amber-500" size={24} />
           <h3 className="text-xl font-bold text-slate-900">Expert Observations</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {responses.map((msg, i) => {
            const Icon = msg.icon;
            return (
              <div key={i} className={`flex items-start gap-4 p-5 rounded-2xl ${msg.bgColor} border border-white/50`}>
                <div className={`p-2 rounded-xl bg-white shadow-sm ${msg.color}`}>
                   <Icon size={20} />
                </div>
                <p className={`text-sm font-bold leading-relaxed ${msg.color}`}>
                  {msg.text}
                </p>
              </div>
            );
          })}
          {responses.length === 0 && (
              <p className="text-slate-400 italic">No significant patterns detected yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function InsightCard({ title, value, icon: Icon, color, bgColor }) {
  return (
    <div className="bg-white p-6 rounded-2xl premium-shadow border border-slate-100 hover:shadow-lg transition-all group">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${bgColor} ${color} group-hover:scale-110 transition-all`}>
          <Icon size={24} />
        </div>
        <div>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</p>
          <h3 className={`text-xl font-bold ${color}`}>
            ₹{value.toLocaleString()}
          </h3>
        </div>
      </div>
    </div>
  );
}