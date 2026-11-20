import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Bell,
  ArrowRight,
  TrendingUp,
  FileText,
  MapPin,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Star,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { requestService } from "../services/requestService";
import { serviceDirectory } from "../services/serviceDirectory";
import StatCard from "../components/StatCard";
import RequestTable from "../components/RequestTable";

export default function CitizenDashboard({ onNavigate, onSelectRequest }) {
  const { user, t } = useAuth();
  const [requests, setRequests] = useState([]);
  const [recentNotifications, setRecentNotifications] = useState([]);

  const loadData = () => {
    const all = requestService.getAllRequests();
    setRequests(all);
    const notifs = requestService.getNotificationsForRole("citizen");
    setRecentNotifications(notifs.slice(0, 4));
  };

  useEffect(() => {
    loadData();
    window.addEventListener("civicsaathi:data-changed", loadData);
    return () => window.removeEventListener("civicsaathi:data-changed", loadData);
  }, []);

  // Compute live prototype metrics
  const total = requests.length;
  const pending = requests.filter((r) => r.status === "Submitted" || r.status === "Reviewed").length;
  const inProgress = requests.filter((r) => r.status === "In Progress" || r.status === "Routed").length;
  const completed = requests.filter((r) => r.status === "Completed").length;

  const popularServices = serviceDirectory.getAllServices().slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#1E3A8A] to-[#2563EB] rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-teal-300 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            Citizen Service Hub • {user?.ward || "Ward 12 (North)"}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || "Citizen"}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
            Submit civic grievances, track field engineering assignments, and monitor turnaround times in real time.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate("submit")}
            className="px-4 py-2.5 rounded-xl bg-white text-[#102A43] hover:bg-slate-100 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-[#2563EB]" />
            <span>Submit New Request</span>
          </button>
          <button
            onClick={() => onNavigate("track")}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white font-bold text-xs border border-white/20 backdrop-blur-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Clock className="w-4 h-4 text-teal-300" />
            <span>Track by ID</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Requests"
          value={total}
          subtitle="All logged records"
          icon={FileText}
          color="slate"
          badge="Active Ward Queue"
        />
        <StatCard
          title="Pending Review"
          value={pending}
          subtitle="Submitted / Under Review"
          icon={AlertCircle}
          color="amber"
          badge="Awaiting Dispatch"
        />
        <StatCard
          title="In Progress"
          value={inProgress}
          subtitle="Field action underway"
          icon={Clock}
          color="blue"
          badge="Active Maintenance"
        />
        <StatCard
          title="Completed"
          value={completed}
          subtitle="Audited and resolved"
          icon={CheckCircle2}
          color="emerald"
          badge="Closed"
        />
      </div>

      {/* Main Grid: Recent Requests & Sidebar Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Requests Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#102A43]">Recent Civic Requests</h2>
              <p className="text-xs text-slate-500">
                Click any row to view lifecycle tracking or inspect status updates.
              </p>
            </div>
            <button
              onClick={() => onNavigate("my-requests")}
              className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1"
            >
              <span>View All ({requests.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <RequestTable
            requests={requests.slice(0, 5)}
            role="citizen"
            onSelectRequest={(req) => {
              if (onSelectRequest) onSelectRequest(req);
              onNavigate("track", { targetId: req.id });
            }}
          />
        </div>

        {/* Right Column: Quick Services & Notifications */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Service Directory Launcher */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Common Services
              </h3>
              <button
                onClick={() => onNavigate("services")}
                className="text-[11px] font-semibold text-[#2563EB] hover:underline"
              >
                Catalog →
              </button>
            </div>

            <div className="space-y-2">
              {popularServices.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => {
                    onNavigate("submit", { preselectedService: srv });
                  }}
                  className="w-full text-left p-2.5 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white flex items-center justify-center text-xs transition-colors">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800 group-hover:text-blue-700">
                        {srv.name}
                      </div>
                      <div className="text-[10px] text-slate-400">SLA: {srv.sla}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Recent In-App Alerts */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-blue-600" />
                Recent Alerts
              </h3>
              <span className="text-[10px] text-slate-400">In-App Events</span>
            </div>

            <div className="space-y-2.5">
              {recentNotifications.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 text-center">No recent alerts</p>
              ) : (
                recentNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      if (n.requestId) onNavigate("track", { targetId: n.requestId });
                    }}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 cursor-pointer text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[190px]">
                        {n.title}
                      </span>
                      {n.requestId && (
                        <span className="font-mono text-[9px] font-bold text-blue-700 bg-blue-100 px-1 rounded">
                          {n.requestId}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      {n.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
