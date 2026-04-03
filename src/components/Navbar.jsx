import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Receipt, IndianRupee, PieChart } from "lucide-react";

export default function Navbar({ closeSidebar }) {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: Receipt },
    { name: "Insights", path: "/insights", icon: PieChart },
  ];

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group ${
              isActive
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Icon size={18} className={isActive ? "text-white" : "text-slate-400 group-hover:text-white"} />
            <span className="font-medium text-[15px]">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}