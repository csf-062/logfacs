import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "tempo-routes";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/projects";
import Purchases from "./pages/purchases";
import Inventory from "./pages/inventory";
import Suppliers from "./pages/suppliers";
import Accounting from "./pages/accounting";
import Reports from "./pages/reports";
import Settings from "./pages/settings";
import { CompanyProvider } from "./components/common/CompanySelector";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CompanyProvider>
        <>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/new" element={<Projects />} />
            <Route path="/projects/calendar" element={<Projects />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/purchases/requirements" element={<Purchases />} />
            <Route path="/purchases/orders" element={<Purchases />} />
            <Route path="/purchases/receptions" element={<Purchases />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inventory/stock" element={<Inventory />} />
            <Route path="/inventory/movements" element={<Inventory />} />
            <Route path="/inventory/warehouses" element={<Inventory />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/accounting/transactions" element={<Accounting />} />
            <Route path="/accounting/ledger" element={<Accounting />} />
            <Route path="/accounting/statements" element={<Accounting />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/operational" element={<Reports />} />
            <Route path="/reports/management" element={<Reports />} />
            <Route path="/reports/export" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/organization" element={<Settings />} />
            <Route path="/settings/users" element={<Settings />} />
            <Route path="/settings/system" element={<Settings />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </CompanyProvider>
    </Suspense>
  );
}

export default App;
