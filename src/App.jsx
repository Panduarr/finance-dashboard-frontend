import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TransactionsPage from "./pages/TransactionsPage";
import Insights from "./pages/Insights";


function App() {
  return (

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>

  );
}

export default App;


