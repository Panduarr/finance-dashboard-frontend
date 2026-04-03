import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { Info, PieChart as PieIcon, BarChart3 } from "lucide-react";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6"];
const GRADIENTS = [
  { start: "#6366f1", end: "#818cf8" },
  { start: "#10b981", end: "#34d399" },
  { start: "#f59e0b", end: "#fbbf24" },
  { start: "#f43f5e", end: "#fb7185" },
  { start: "#8b5cf6", end: "#a78bfa" },
];

export default function Charts() {
  const { transactions } = useContext(AppContext);

  const data = transactions.map((t) => ({
    category: t.month,
    value: t.expense,
  })).slice(-6);

  const chartData = transactions.slice(-6);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-xl border border-slate-100 ring-4 ring-black/5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-50 pb-1">{label || payload[0].name}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-3 py-0.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
              <span className="text-xs font-bold text-slate-600 capitalize">{entry.name}:</span>
              <span className="text-xs font-extrabold text-slate-800 ml-auto">₹{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* PIE CHART */}
      <div className="bg-white p-6 rounded-2xl premium-shadow border border-slate-100 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg">
              <PieIcon size={18} />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Spending Breakdown</h2>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last 6 Months</span>
        </div>

        {data.length === 0 ? (
          <div className="h-[300px] flex flex-col items-center justify-center text-slate-400 gap-3 border-2 border-dashed border-slate-50 rounded-2xl">
            <Info size={32} className="text-slate-200" />
            <p className="font-medium italic text-sm">No expense history detected</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <defs>
                {GRADIENTS.map((g, i) => (
                  <linearGradient key={`grad-${i}`} id={`grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={g.start} stopOpacity={1} />
                    <stop offset="100%" stopColor={g.end} stopOpacity={1} />
                  </linearGradient>
                ))}
              </defs>
              <Pie 
                data={data} 
                dataKey="value" 
                nameKey="category" 
                innerRadius={70}
                outerRadius={100}
                paddingAngle={8}
                stroke="none"
                isAnimationActive={true}
                animationDuration={1500}
                animationBegin={200}
              >
                {data.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`url(#grad-${index % GRADIENTS.length})`} 
                    className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" align="center" iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* BAR CHART */}
      <div className="bg-white p-6 rounded-2xl premium-shadow border border-slate-100 hover:shadow-xl transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
              <BarChart3 size={18} />
            </div>
            <h2 className="text-lg font-bold text-slate-800">Financial Performance</h2>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">In vs Out</span>
        </div>

        {chartData.length === 0 ? (
          <div className="h-[300px] flex flex-col items-center justify-center text-slate-400 gap-3 border-2 border-dashed border-slate-50 rounded-2xl">
            <Info size={32} className="text-slate-200" />
            <p className="font-medium italic text-sm">No performance data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} barGap={12}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                dy={12}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                tickFormatter={(v) => `₹${v / 1000}K`} 
              />
              <Tooltip cursor={{ fill: '#f8fafc', radius: 8 }} content={<CustomTooltip />} />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '30px' }} />
              
              <Bar 
                dataKey="income" 
                name="Income" 
                fill="#10b981" 
                radius={[6, 6, 0, 0]} 
                barSize={16} 
                isAnimationActive={true}
                animationDuration={1500}
                animationBegin={500}
              />
              <Bar 
                dataKey="expense" 
                name="Expense" 
                fill="#f43f5e" 
                radius={[6, 6, 0, 0]} 
                barSize={16} 
                isAnimationActive={true}
                animationDuration={1500}
                animationBegin={800}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
