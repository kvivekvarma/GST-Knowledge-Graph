import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import GraphView from "./pages/GraphView";
import Vendors from "./pages/Vendors";
import Reconciliation from "./pages/Reconciliation";
import AuditTrail from "./pages/AuditTrail";

function App() {
  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-4 overflow-auto">
          <Routes>

            <Route path="/" element={<Dashboard />} />
            <Route path="/graph" element={<GraphView />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/reconciliation" element={<Reconciliation />} />
            <Route path="/audit" element={<AuditTrail />} />

          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;