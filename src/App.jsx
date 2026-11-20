import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import DisclaimerBanner from "./components/DisclaimerBanner";
import Navbar from "./components/Navbar";
import ExamDemoModal from "./components/ExamDemoModal";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import CitizenDashboard from "./pages/CitizenDashboard";
import ServiceDirectory from "./pages/ServiceDirectory";
import SubmitRequest from "./pages/SubmitRequest";
import TrackRequest from "./pages/TrackRequest";
import MyRequests from "./pages/MyRequests";
import FeedbackPage from "./pages/FeedbackPage";
import AdminDashboard from "./pages/AdminDashboard";
import RequestManagement from "./pages/RequestManagement";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import SettingsPage from "./pages/SettingsPage";

function AppContent() {
  const { user, role, switchRole } = useAuth();
  const [currentPage, setCurrentPage] = useState("landing");
  const [pageParams, setPageParams] = useState({});

  // Navigation handler
  const handleNavigate = (page, params = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Enforce simulated role guards
  useEffect(() => {
    if (currentPage.startsWith("admin-") && role !== "staff") {
      // If citizen tries to navigate to admin without switching, gently inform or switch
    }
  }, [currentPage, role]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F8FC] text-[#243447]">
      {/* Main Navbar */}
      <Navbar activePage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === "landing" && (
          <LandingPage
            onNavigate={handleNavigate}
            onSelectService={(srv) => handleNavigate("submit", { initialService: srv })}
          />
        )}

        {currentPage === "login" && (
          <LoginPage onNavigate={handleNavigate} />
        )}

        {currentPage === "citizen-dashboard" && (
          <CitizenDashboard
            onNavigate={handleNavigate}
            onSelectRequest={(req) => handleNavigate("track", { targetId: req.id })}
          />
        )}

        {currentPage === "services" && (
          <ServiceDirectory
            onNavigate={handleNavigate}
            onSelectService={(srv) => handleNavigate("submit", { initialService: srv })}
          />
        )}

        {currentPage === "submit" && (
          <SubmitRequest
            onNavigate={handleNavigate}
            initialService={pageParams.initialService || pageParams.preselectedService}
          />
        )}

        {currentPage === "track" && (
          <TrackRequest
            targetId={pageParams.targetId}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === "my-requests" && (
          <MyRequests
            onNavigate={handleNavigate}
            onSelectRequest={(req) => handleNavigate("track", { targetId: req.id })}
          />
        )}

        {currentPage === "feedback" && (
          <FeedbackPage onNavigate={handleNavigate} />
        )}

        {/* Staff / Admin Pages */}
        {currentPage === "admin-dashboard" && (
          role === "staff" ? (
            <AdminDashboard
              onNavigate={handleNavigate}
              onSelectRequest={(req) => handleNavigate("admin-requests", { targetId: req.id })}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-2xl border border-amber-200 text-center space-y-4">
              <h3 className="text-base font-bold text-amber-900">Staff Portal Access Restricted</h3>
              <p className="text-xs text-slate-600">
                You are currently in the Citizen view. Click below to switch to the Staff Demo persona.
              </p>
              <button
                onClick={() => {
                  switchRole("staff");
                  handleNavigate("admin-dashboard");
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700"
              >
                Switch to Staff Portal
              </button>
            </div>
          )
        )}

        {currentPage === "admin-requests" && (
          role === "staff" ? (
            <RequestManagement
              targetId={pageParams.targetId}
              onNavigate={handleNavigate}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-2xl border border-amber-200 text-center space-y-4">
              <h3 className="text-base font-bold text-amber-900">Staff Portal Access Restricted</h3>
              <p className="text-xs text-slate-600">
                You are currently in the Citizen view. Click below to switch to the Staff Demo persona.
              </p>
              <button
                onClick={() => {
                  switchRole("staff");
                  handleNavigate("admin-requests", pageParams);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700"
              >
                Switch to Staff Portal
              </button>
            </div>
          )
        )}

        {currentPage === "admin-analytics" && (
          <AnalyticsDashboard onNavigate={handleNavigate} />
        )}

        {currentPage === "settings" && (
          <SettingsPage />
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
