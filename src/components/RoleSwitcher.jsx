import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { UserCircle, ShieldCheck, ShieldAlert, ChevronRight } from "lucide-react";

export default function RoleSwitcher() {
  const { role, setRole } = useContext(AppContext);

  const toggleRole = () => {
    setRole(role === "admin" ? "viewer" : "admin");
  };

  return (
    <div className="w-full space-y-3">
      {/* Profile Info */}
      <div className="flex items-center gap-3 px-4 py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
         <div className="relative">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-300 ${role === 'admin' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'}`}>
               <UserCircle size={28} />
            </div>
            <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-[#1e293b] flex items-center justify-center ${role === 'admin' ? 'bg-blue-500' : 'bg-slate-500'}`}>
               {role === 'admin' ? <ShieldCheck size={10} className="text-white" /> : <ShieldAlert size={10} className="text-white" />}
            </div>
         </div>
         <div className="flex-1 overflow-hidden">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Authenticated As</p>
            <p className="text-sm font-bold text-white truncate capitalize">{role === 'admin' ? 'Administrator' : 'Standard Viewer'}</p>
         </div>
      </div>

      {/* Custom Switcher Button */}
      <button 
        onClick={toggleRole}
        className="w-full flex items-center justify-between px-4 py-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/50 rounded-xl transition-all group"
      >
        <span className="text-xs font-bold text-slate-400 group-hover:text-white uppercase tracking-tighter transition-colors">
          Switch to {role === "admin" ? "Viewer" : "Admin"}
        </span>
        <ChevronRight size={16} className="text-slate-500 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
      </button>
    </div>
  );
}