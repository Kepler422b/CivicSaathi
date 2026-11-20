import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Save,
  ArrowRight,
  Filter,
  Search,
  MessageSquare,
  FileText,
  Sparkles,
  ExternalLink,
  ChevronRight,
  CornerDownRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { requestService } from "../services/requestService";
import { DEPARTMENTS } from "../data/demoData";
import { serviceDirectory } from "../services/serviceDirectory";
import StatusTimeline from "../components/StatusTimeline";
import { STATUS_BADGES } from "../components/RequestTable";

const STATUS_OPTIONS = ["Submitted", "Reviewed", "Routed", "In Progress", "Completed"];

export default function RequestManagement({ targetId, onNavigate }) {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Form edit states for the selected request
  const [editStatus, setEditStatus] = useState("Submitted");
  const [editDepartment, setEditDepartment] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [staffRemarks, setStaffRemarks] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const loadRequests = () => {
    const all = requestService.getAllRequests();
    setRequests(all);

    // If targetId is provided or if something was selected, re-select
    const idToSelect = targetId || (selectedRequest ? selectedRequest.id : "CS-2026-1042");
    const found = all.find((r) => r.id === idToSelect) || all[0];
    if (found) {
      setSelectedRequest(found);
      setEditStatus(found.status);
      setEditDepartment(found.assignedDepartment || DEPARTMENTS[0]);
      setEditCategory(found.category);
    }
  };

  useEffect(() => {
    loadRequests();
    window.addEventListener("civicsaathi:data-changed", loadRequests);
    return () => window.removeEventListener("civicsaathi:data-changed", loadRequests);
  }, [targetId]);

  const handleSelectRequest = (req) => {
    setSelectedRequest(req);
    setEditStatus(req.status);
    setEditDepartment(req.assignedDepartment || DEPARTMENTS[0]);
    setEditCategory(req.category);
    setStaffRemarks("");
    setSaveSuccess(false);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    const updated = requestService.updateRequestStatus({
      id: selectedRequest.id,
      newStatus: editStatus,
      assignedDepartment: editDepartment,
      updatedCategory: editCategory,
      staffRemarks: staffRemarks.trim() || undefined,
      staffName: `${user?.name || "Staff Desk Officer"} (${user?.department || "Ward 12"})`,
    });

    if (updated) {
      setSelectedRequest(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const filteredRequests = requests.filter((r) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      r.id.toLowerCase().includes(q) ||
      r.serviceName.toLowerCase().includes(q) ||
      r.citizenName.toLowerCase().includes(q) ||
      r.locality.toLowerCase().includes(q);

    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const categories = serviceDirectory.getCategories().filter((c) => c !== "All");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Staff Administration Module</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#102A43] mt-1">
            Grievance Processing & Department Routing
          </h1>
          <p className="text-xs text-slate-500">
            Inspect citizen submissions, correct category routing, assign municipal departments, and advance workflow stages.
          </p>
        </div>

        {/* Quick select CS-2026-1042 button */}
        <button
          onClick={() => {
            const req = requests.find((r) => r.id === "CS-2026-1042");
            if (req) handleSelectRequest(req);
          }}
          className="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Quick Select: CS-2026-1042</span>
        </button>
      </div>

      {/* Main Grid: Left List (4 cols) & Right Detail Editor (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Request Queue List */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 space-y-3">
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ID, service, locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold">Queue: {filteredRequests.length}</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-1 rounded-lg border border-slate-200 text-[11px] font-medium"
              >
                <option value="All">All Statuses</option>
                {STATUS_OPTIONS.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
            {filteredRequests.map((req) => {
              const isSelected = selectedRequest?.id === req.id;
              return (
                <div
                  key={req.id}
                  onClick={() => handleSelectRequest(req)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#102A43]">
                      {req.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        STATUS_BADGES[req.status] || STATUS_BADGES.Submitted
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-800 mt-1 line-clamp-1">
                    {req.serviceName}
                  </h4>
                  <div className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-between">
                    <span className="truncate max-w-[140px]">{req.locality}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(req.createdAt).toLocaleDateString([], { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Request Management & Action Panel */}
        {selectedRequest ? (
          <div className="lg:col-span-8 space-y-6">
            {/* Top Details Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xl font-extrabold text-[#102A43]">
                    {selectedRequest.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-bold border ${
                      STATUS_BADGES[selectedRequest.status]
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {selectedRequest.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate("track", { targetId: selectedRequest.id })}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold transition-colors"
                  >
                    <span>View in Citizen Tracker</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Citizen Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Citizen Name
                  </span>
                  <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {selectedRequest.citizenName}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Contact Phone
                  </span>
                  <span className="font-medium text-slate-700 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {selectedRequest.citizenPhone}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Locality & Landmark
                  </span>
                  <span className="font-medium text-slate-700 flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    {selectedRequest.locality} ({selectedRequest.landmark})
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Citizen Problem Description
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {selectedRequest.description}
                </p>
              </div>

              {/* Attached Photo */}
              {selectedRequest.photoUrl && (
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Attached Site Photograph
                  </span>
                  <div className="rounded-xl overflow-hidden border border-slate-200 max-h-48 max-w-sm">
                    <img
                      src={selectedRequest.photoUrl}
                      alt="Site Inspection"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* ACTION & STATUS UPDATE FORM */}
            <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#102A43]">
                      Staff Action & Department Routing
                    </h3>
                    <p className="text-xs text-slate-500">
                      Changes made here immediately update the citizen's live tracking timeline.
                    </p>
                  </div>
                </div>
                {saveSuccess && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full animate-fade-in flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Changes Saved!
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveChanges} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Status Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Update Request Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Department Assignment */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Assign Department <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={editDepartment}
                      onChange={(e) => setEditDepartment(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Correction */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Service Category
                    </label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Staff Remarks */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Staff Note / Field Progress Remarks
                  </label>
                  <textarea
                    rows={2}
                    value={staffRemarks}
                    onChange={(e) => setStaffRemarks(e.target.value)}
                    placeholder={`e.g. Field crew inspected pole #4; replacement 45W LED driver ordered. Work scheduled for dusk.`}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    This note will be logged in the public lifecycle timeline with your staff timestamp.
                  </p>
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-slate-500">
                    Logged as: <strong className="text-slate-800">{user?.name}</strong>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Dispatch Changes</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Live History View */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#102A43]">
                Progression History for {selectedRequest.id}
              </h3>
              <StatusTimeline
                currentStatus={selectedRequest.status}
                history={selectedRequest.history}
              />
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 bg-white rounded-3xl p-12 border border-slate-200 text-center text-slate-400">
            <p>Select a request from the left queue to manage its workflow.</p>
          </div>
        )}
      </div>
    </div>
  );
}
