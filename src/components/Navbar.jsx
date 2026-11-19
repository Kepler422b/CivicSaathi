import React, { useState, useEffect } from "react";
import {
  Building2,
  Globe,
  Bell,
  Sparkles,
  ArrowRightLeft,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  FileText,
  Search,
  CheckCircle2,
  Shield,
  Layers,
  Compass,
} from "lucide-react";
import { useAuth, DEMO_USERS } from "../context/AuthContext";
import { requestService } from "../services/requestService";
import NotificationDrawer from "./NotificationDrawer";

export default function Navbar({ activePage, onNavigate }) {
  const { user, role, logout, switchRole, language, setLanguage, t, setExamGuideOpen } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Sync notifications
  const updateNotifs = () => {
    if (role === "guest") return;
    const notifs = requestService.getNotificationsForRole(role);
    setUnreadCount(notifs.filter((n) => !n.read).length);
  };

  useEffect(() => {
    updateNotifs();
    window.addEventListener("civicsaathi:data-changed", updateNotifs);
    return () => window.removeEventListener("civicsaathi:data-changed", updateNotifs);
  }, [role]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en");
  };

  const handleRoleSwitch = () => {
    const nextRole = role === "staff" ? "citizen" : "staff";
    switchRole(nextRole);
    if (nextRole === "staff") {
      onNavigate("admin-dashboard");
    } else {
      onNavigate("citizen-dashboard");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate("landing")}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#102A43] via-[#1E3A8A] to-[#2563EB] flex items-center justify-center text-white shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold tracking-tight text-[#102A43]">
                    Civic<span className="text-[#2563EB]">Saathi</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 uppercase tracking-wider">
                    GovTech
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium -mt-0.5 hidden sm:block">
                  {t("tagline")}
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
            {role === "staff" ? (
              // Staff Portal Links
              <>
                <button
                  onClick={() => onNavigate("admin-dashboard")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activePage === "admin-dashboard" ? "bg-blue-50 text-[#2563EB] font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  Staff Overview
                </button>
                <button
                  onClick={() => onNavigate("admin-requests")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activePage === "admin-requests" ? "bg-blue-50 text-[#2563EB] font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  Manage Requests
                </button>
                <button
                  onClick={() => onNavigate("services")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activePage === "services" ? "bg-blue-50 text-[#2563EB] font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  Service Catalog
                </button>
                <button
                  onClick={() => onNavigate("admin-analytics")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activePage === "admin-analytics" ? "bg-blue-50 text-[#2563EB] font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  GovTech Analytics
                </button>
              </>
            ) : (
              // Citizen Portal Links
              <>
                <button
                  onClick={() => onNavigate("landing")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activePage === "landing" ? "bg-blue-50 text-[#2563EB] font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {t("nav.home")}
                </button>
                <button
                  onClick={() => onNavigate("services")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activePage === "services" ? "bg-blue-50 text-[#2563EB] font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {t("nav.exploreServices")}
                </button>
                <button
                  onClick={() => onNavigate("submit")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activePage === "submit" ? "bg-blue-50 text-[#2563EB] font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {t("nav.submitRequest")}
                </button>
                <button
                  onClick={() => onNavigate("track")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activePage === "track" ? "bg-blue-50 text-[#2563EB] font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {t("nav.trackRequest")}
                </button>
                <button
                  onClick={() => onNavigate("citizen-dashboard")}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activePage === "citizen-dashboard" ? "bg-blue-50 text-[#2563EB] font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  Citizen Portal
                </button>
              </>
            )}
          </nav>

          {/* Right Action Tools: Language, Demo Guide, Role Switcher, Notifications, Auth */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* 5-Min Exam Walkthrough Button */}
            <button
              onClick={() => setExamGuideOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold hover:bg-teal-100 transition-all shadow-xs cursor-pointer"
              title="Open the 5-Minute Evaluator Examination Guide"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-spin" style={{ animationDuration: "6s" }} />
              <span className="hidden sm:inline">5-Min</span> Exam Guide
            </button>

            {/* Quick Role Switcher */}
            <button
              onClick={handleRoleSwitch}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                role === "staff"
                  ? "bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100"
                  : "bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100"
              }`}
              title="Quickly toggle between Citizen and Staff views for demonstration"
            >
              <ArrowRightLeft className="w-3 h-3 text-slate-500" />
              <span className="hidden md:inline">Switch:</span>
              <span className="underline decoration-dotted font-bold capitalize">
                {role === "staff" ? "To Citizen" : "To Staff"}
              </span>
            </button>

            {/* Language Selector */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              title="Toggle English / Hindi"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{language === "en" ? "हिंदी" : "English"}</span>
            </button>

            {/* In-App Notifications Bell */}
            <button
              onClick={() => setNotifDrawerOpen(true)}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile / Portal Status */}
            {user ? (
              <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
                <div
                  onClick={() => onNavigate(role === "staff" ? "admin-dashboard" : "citizen-dashboard")}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-xs ${
                      role === "staff" ? "bg-amber-600" : "bg-[#2563EB]"
                    }`}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden xl:block text-left text-xs leading-tight">
                    <span className="font-semibold text-slate-800 block truncate max-w-[120px]">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-500 capitalize">
                      {role} Demo
                    </span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate("login")}
                className="px-3.5 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-xs"
              >
                {t("nav.login")}
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 text-sm font-medium">
            <button
              onClick={() => {
                onNavigate("landing");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {t("nav.home")}
            </button>
            <button
              onClick={() => {
                onNavigate("services");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {t("nav.exploreServices")}
            </button>
            <button
              onClick={() => {
                onNavigate("submit");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {t("nav.submitRequest")}
            </button>
            <button
              onClick={() => {
                onNavigate("track");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {t("nav.trackRequest")}
            </button>
            <button
              onClick={() => {
                onNavigate("citizen-dashboard");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              Citizen Dashboard
            </button>
            <button
              onClick={() => {
                onNavigate("admin-dashboard");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100"
            >
              Staff / Admin Portal
            </button>
          </div>
        )}
      </header>

      {/* In-App Notifications Drawer */}
      <NotificationDrawer
        isOpen={notifDrawerOpen}
        onClose={() => setNotifDrawerOpen(false)}
        role={role}
        onSelectRequest={(reqId) => {
          if (role === "staff") {
            onNavigate("admin-requests", { targetId: reqId });
          } else {
            onNavigate("track", { targetId: reqId });
          }
        }}
      />
    </>
  );
}
