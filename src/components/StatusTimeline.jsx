import React from "react";
import { CheckCircle2, Clock, CircleDot, Circle, UserCheck, ShieldCheck, ArrowRight, CornerDownRight } from "lucide-react";

const STAGES = [
  { key: "Submitted", label: "Request Submitted", desc: "Citizen filed civic grievance." },
  { key: "Reviewed", label: "Desk Officer Review", desc: "Ward officer verified urgency and validity." },
  { key: "Routed", label: "Department Assigned", desc: "Routed to responsible field engineering wing." },
  { key: "In Progress", label: "Field Work In Progress", desc: "Ground maintenance crew mobilized on site." },
  { key: "Completed", label: "Resolution Completed", desc: "Work verified and closed with QA signoff." },
];

const STAGE_ORDER = {
  Submitted: 1,
  Reviewed: 2,
  Routed: 3,
  "In Progress": 4,
  Completed: 5,
};

export default function StatusTimeline({ currentStatus, history = [] }) {
  const currentStep = STAGE_ORDER[currentStatus] || 1;

  // Map history records by status
  const historyByStatus = {};
  history.forEach((h) => {
    historyByStatus[h.status] = h;
  });

  const formatTimestamp = (iso) => {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      return (
        d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
        " at " +
        d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
    } catch {
      return iso;
    }
  };

  return (
    <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
      {STAGES.map((stage, index) => {
        const stepNum = index + 1;
        const isPast = stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        const isFuture = stepNum > currentStep;
        const historyItem = historyByStatus[stage.key];

        return (
          <div key={stage.key} className="relative group">
            {/* Timeline Node Icon */}
            <div
              className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all ${
                isPast
                  ? "bg-emerald-500 text-white shadow-xs"
                  : isCurrent
                  ? "bg-[#2563EB] text-white ring-4 ring-blue-100 shadow-md animate-pulse-subtle"
                  : "bg-slate-100 text-slate-400 border border-slate-300"
              }`}
            >
              {isPast ? (
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : isCurrent ? (
                <CircleDot className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <Circle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              )}
            </div>

            {/* Content Card */}
            <div
              className={`rounded-xl p-3.5 sm:p-4 border transition-all ${
                isCurrent
                  ? "bg-blue-50/70 border-blue-200 shadow-xs"
                  : isPast
                  ? "bg-white border-slate-200"
                  : "bg-slate-50/50 border-slate-200 opacity-60"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h4
                    className={`text-sm font-bold ${
                      isCurrent
                        ? "text-blue-900"
                        : isPast
                        ? "text-slate-800"
                        : "text-slate-500"
                    }`}
                  >
                    {stage.label}
                  </h4>
                  {isCurrent && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white uppercase tracking-wider">
                      Current Stage
                    </span>
                  )}
                  {isPast && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Done
                    </span>
                  )}
                </div>

                {historyItem && historyItem.timestamp && (
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {formatTimestamp(historyItem.timestamp)}
                  </span>
                )}
              </div>

              {/* Remarks & Actor */}
              {historyItem ? (
                <div className="mt-2 text-xs">
                  <p className="text-slate-700 font-medium leading-relaxed bg-white/70 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-500 block text-[11px] font-semibold uppercase tracking-wider mb-0.5">
                      Log Remarks:
                    </span>
                    "{historyItem.remarks}"
                  </p>
                  {historyItem.updatedBy && (
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                      <UserCheck className="w-3 h-3 text-slate-400" />
                      <span>Action by: <span className="text-slate-700 font-semibold">{historyItem.updatedBy}</span></span>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-slate-500 mt-1">{stage.desc}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
