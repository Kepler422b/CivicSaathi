import React, { useState, useMemo } from "react";
import { Search, Filter, Eye, ArrowUpRight, Clock, MapPin, Tag, CheckCircle2, ChevronRight } from "lucide-react";

export const STATUS_BADGES = {
  Submitted: "bg-slate-100 text-slate-700 border-slate-300",
  Reviewed: "bg-amber-100 text-amber-800 border-amber-300",
  Routed: "bg-purple-100 text-purple-800 border-purple-300",
  "In Progress": "bg-blue-100 text-blue-800 border-blue-300",
  Completed: "bg-emerald-100 text-emerald-800 border-emerald-300",
};

export default function RequestTable({
  requests = [],
  role = "citizen",
  onSelectRequest,
  compact = false,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(requests.map((r) => r.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [requests]);

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        req.id.toLowerCase().includes(q) ||
        req.serviceName.toLowerCase().includes(q) ||
        req.citizenName.toLowerCase().includes(q) ||
        req.locality.toLowerCase().includes(q) ||
        req.description.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "All" || req.status === statusFilter;
      const matchesCategory = categoryFilter === "All" || req.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [requests, searchQuery, statusFilter, categoryFilter]);

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return iso;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Controls & Filters Bar */}
      {!compact && (
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reference ID, service, locality, or citizen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:outline-hidden focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Routed">Routed</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-700 focus:outline-hidden focus:border-blue-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <th className="py-3 px-4">Reference ID</th>
              <th className="py-3 px-4">Service & Locality</th>
              {role === "staff" && <th className="py-3 px-4">Citizen</th>}
              <th className="py-3 px-4">Assigned Department</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={role === "staff" ? 7 : 6} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center">
                    <Filter className="w-8 h-8 text-slate-300 mb-2 stroke-1" />
                    <p className="text-sm font-medium text-slate-600">No requests match the criteria</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting filters or search terms.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredRequests.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                  onClick={() => onSelectRequest && onSelectRequest(req)}
                >
                  <td className="py-3 px-4 font-mono font-bold text-[#102A43] group-hover:text-blue-600 whitespace-nowrap">
                    {req.id}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900 leading-snug">{req.serviceName}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate max-w-[180px]">{req.locality}</span>
                    </div>
                  </td>
                  {role === "staff" && (
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{req.citizenName}</div>
                      <div className="text-[10px] text-slate-400">{req.citizenPhone}</div>
                    </td>
                  )}
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md inline-block max-w-[200px] truncate">
                      {req.assignedDepartment || "Pending Routing"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {formatDate(req.createdAt)}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        STATUS_BADGES[req.status] || STATUS_BADGES.Submitted
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRequest && onSelectRequest(req);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-[#2563EB] hover:text-white transition-colors"
                    >
                      <span>{role === "staff" ? "Manage" : "Track"}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
        <span>Showing {filteredRequests.length} of {requests.length} requests</span>
        <span className="text-[11px] text-slate-400">Live Registry Sync</span>
      </div>
    </div>
  );
}
