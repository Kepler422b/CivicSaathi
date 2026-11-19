import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  CheckCircle2,
  Clock,
  Star,
  Building,
  RotateCcw,
  Sparkles,
  Info,
} from "lucide-react";
import { analyticsService } from "../services/analyticsService";
import { storageService } from "../services/storageService";
import StatCard from "../components/StatCard";

export default function AnalyticsDashboard({ onNavigate }) {
  const [metrics, setMetrics] = useState(analyticsService.getMetrics());

  const refreshMetrics = () => {
    setMetrics(analyticsService.getMetrics());
  };

  useEffect(() => {
    refreshMetrics();
    window.addEventListener("civicsaathi:data-changed", refreshMetrics);
    return () => window.removeEventListener("civicsaathi:data-changed", refreshMetrics);
  }, []);

  const handleResetData = () => {
    if (window.confirm("Reset all requests and feedback back to initial examination baseline?")) {
      storageService.resetDemoData();
      window.dispatchEvent(new CustomEvent("civicsaathi:data-changed"));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Analytics Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>GovTech Service Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-1">
            Urban Civic Analytics & Performance
          </h1>
          <p className="text-xs text-slate-500">
            Real-time analytics computed directly from your current LocalStorage prototype dataset.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetData}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Demo Records</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered"
          value={metrics.total}
          subtitle="Total grievances logged"
          icon={BarChart3}
          color="slate"
        />
        <StatCard
          title="Completion Rate"
          value={`${metrics.completionRate}%`}
          subtitle={`${metrics.completed} of ${metrics.total} resolved`}
          icon={CheckCircle2}
          color="emerald"
          badge="High Efficiency"
        />
        <StatCard
          title="Active Backlog"
          value={metrics.pending}
          subtitle="Submitted / In progress"
          icon={Clock}
          color="amber"
          badge="SLA Monitored"
        />
        <StatCard
          title="Citizen Satisfaction"
          value={`${metrics.averageRating} ★`}
          subtitle={`From ${metrics.feedbackCount} citizen ratings`}
          icon={Star}
          color="blue"
        />
      </div>

      {/* Main Charts Row 1: Category Bar Chart & Status Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Category Breakdown (Bar Chart) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-[#102A43]">
                Requests by Service Category
              </h3>
              <p className="text-xs text-slate-500">
                Volume distribution across municipal domains.
              </p>
            </div>
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Bar Chart
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#102A43", borderRadius: 8, color: "#fff", fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Bar dataKey="total" name="Total Logged" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Resolved" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution (Pie / Donut Chart) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-[#102A43]">
                Request Status Distribution
              </h3>
              <p className="text-xs text-slate-500">
                Current lifecycle allocation.
              </p>
            </div>
            <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
              Donut Chart
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, value }) => (value > 0 ? `${name}: ${value}` : "")}
                  labelLine={false}
                >
                  {metrics.statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#102A43", borderRadius: 8, color: "#fff", fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Charts Row 2: Timeline Influx & Department Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline Line Chart */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-[#102A43]">
                Daily Request Intake & Resolution Trend
              </h3>
              <p className="text-xs text-slate-500">
                Timeline pacing of incoming vs closed civic issues.
              </p>
            </div>
            <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              Line Chart
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: "#102A43", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="received" name="Received" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Resolution Bar Chart */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-[#102A43]">
                Department-wise Request Load
              </h3>
              <p className="text-xs text-slate-500">
                Workload assigned to each municipal field department.
              </p>
            </div>
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Bar Chart
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="department" tick={{ fontSize: 9 }} interval={0} angle={-20} textAnchor="end" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: "#102A43", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                <Bar dataKey="total" name="Total Assigned" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name="Completed" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Citizen Feedback Ratings Breakdown Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-[#102A43]">
              Citizen Feedback & Satisfaction Ratings
            </h3>
            <p className="text-xs text-slate-500">
              Evaluator audit of clarity and ease of use scores submitted by citizens.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Overall Avg: {metrics.averageRating} ★
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-6 h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.feedbackChartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                <YAxis dataKey="stars" type="category" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: "#102A43", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                <Bar dataKey="count" name="Ratings Count" fill="#F59E0B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="md:col-span-6 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Recent Verified Citizen Comments:
            </h4>
            {metrics.feedbacksList.slice(0, 2).map((fb, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{fb.citizenName}</span>
                  <span className="font-mono text-[10px] text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                    {fb.requestId}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-amber-500 text-[11px] my-1 font-semibold">
                  <span>Clarity: {fb.clarityRating}★</span>
                  <span>•</span>
                  <span>Ease: {fb.easeRating}★</span>
                </div>
                <p className="text-slate-600 italic">"{fb.comments}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
