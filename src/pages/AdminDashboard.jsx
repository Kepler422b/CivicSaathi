import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileText,
  Users,
  Search,
  ArrowRight,
  Filter,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { requestService } from "../services/requestService";
import { analyticsService } from "../services/analyticsService";
import StatCard from "../components/StatCard";
import RequestTable from "../components/RequestTable";

export default function AdminDashboard({ onNavigate, onSelectRequest }) {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [metrics, setMetrics] = useState(analyticsService.getMetrics());

  const loadData = () => {
    const all = requestService.getAllRequests();
    setRequests(all);
    setMetrics(analyticsService.getMetrics());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("civicsaathi:data-changed", loadData);
    return () => window.removeEventListener("civicsaathi:data-changed", loadData);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Staff Hero Banner */}
      <div className="bg-gradient-to-r from-[#102A43] via-slate-900 to-[#1E3A8A] rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Staff Administration Console • {user?.department || "Ward 12 Operations"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Municipal Operations Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            Welcome, <span className="font-semibold text-white">{user?.name}</span>. Review newly submitted citizen grievances, assign specialized engineering departments, and track resolution SLAs.
          </p>
        </div>

        {/* Quick Nav Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate("admin-requests")}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Clock className="w-4 h-4" />
            <span>Manage All Requests</span>
          </button>
          <button
            onClick={() => onNavigate("admin-analytics")}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 backdrop-blur-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <BarChart3 className="w-4 h-4 text-teal-300" />
            <span>View Analytics</span>
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Requests"
          value={metrics.total}
          subtitle="All received complaints"
          icon={FileText}
          color="slate"
        />
        <StatCard
          title="New Submissions"
          value={metrics.submitted}
          subtitle="Awaiting desk review"
          icon={AlertCircle}
          color="amber"
          badge="High Priority"
        />
        <StatCard
          title="Under Review"
          value={metrics.reviewed + (requests.filter(r => r.status === "Routed").length)}
          subtitle="Desk reviewed / Routed"
          icon={Clock}
          color="purple"
        />
        <StatCard
          title="In Progress"
          value={metrics.inProgress}
          subtitle="Crew working on site"
          icon={TrendingUp}
          color="blue"
        />
        <StatCard
          title="Completed"
          value={metrics.completed}
          subtitle={`${metrics.completionRate}% resolution rate`}
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Main Request Processing Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-[#102A43]">
              Active Grievance Queue
            </h2>
            <p className="text-xs text-slate-500">
              Click "Manage" on any request to inspect details, assign a department, or advance status.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate("admin-requests", { targetId: "CS-2026-1042" })}
              className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Case: CS-2026-1042</span>
            </button>
          </div>
        </div>

        <RequestTable
          requests={requests}
          role="staff"
          onSelectRequest={(req) => {
            if (onSelectRequest) onSelectRequest(req);
            onNavigate("admin-requests", { targetId: req.id });
          }}
        />
      </div>
    </div>
  );
}
