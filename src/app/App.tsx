import { Routes, Route, NavLink } from "react-router";
import OverviewPage from "@/pages/OverviewPage";
import CampaignsPage from "@/pages/CampaingnsPage.tsx";
import CreateCampaignPage from "@/pages/CreateCampaignPage.tsx";
import '@/App.css'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <header className="border-b bg-white">
        <nav className="mx-auto max-w-6xl flex gap-6 p-4">
          {[
            { to: "/", label: "Overview" },
            { to: "/campaigns", label: "Campaigns" },
            { to: "/create", label: "Create Campaign" },
          ].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-3 py-1 rounded-xl ${isActive ? "bg-gray-900 text-white" : "hover:bg-gray-200"}`
              }
              end
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-6">
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/campaigns" element={<CampaignsPage />} />
          <Route path="/create" element={<CreateCampaignPage />} />
        </Routes>
      </main>
    </div>
  );
}
