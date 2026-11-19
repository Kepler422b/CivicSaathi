import React, { useState, useEffect } from "react";
import { PlusCircle, Search, Filter, ArrowRight, FileText, Clock, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { requestService } from "../services/requestService";
import RequestTable from "../components/RequestTable";

export default function MyRequests({ onNavigate, onSelectRequest }) {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  const loadRequests = () => {
    const all = requestService.getAllRequests();
    setRequests(all);
  };

  useEffect(() => {
    loadRequests();
    window.addEventListener("civicsaathi:data-changed", loadRequests);
    return () => window.removeEventListener("civicsaathi:data-changed", loadRequests);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#102A43]">My Civic Grievances</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track status updates, department assignments, and resolution notes for all your logged requests.
          </p>
        </div>

        <button
          onClick={() => onNavigate("submit")}
          className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-xs cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit New Request</span>
        </button>
      </div>

      {/* Main Table */}
      <RequestTable
        requests={requests}
        role="citizen"
        onSelectRequest={(req) => {
          if (onSelectRequest) onSelectRequest(req);
          onNavigate("track", { targetId: req.id });
        }}
      />
    </div>
  );
}
