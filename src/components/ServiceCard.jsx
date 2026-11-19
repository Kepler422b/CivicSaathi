import React, { useState } from "react";
import {
  Lightbulb,
  Trash2,
  Droplets,
  AlertTriangle,
  Wrench,
  Trees,
  ShieldAlert,
  Sparkles,
  Clock,
  Building,
  ArrowRight,
  Info,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const ICON_MAP = {
  Lightbulb,
  Trash2,
  Droplets,
  AlertTriangle,
  Wrench,
  Trees,
  ShieldAlert,
  Sparkles,
};

export default function ServiceCard({ service, onSelectService }) {
  const [showSteps, setShowSteps] = useState(false);
  const IconComponent = ICON_MAP[service.icon] || AlertTriangle;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-300 transition-all p-5 flex flex-col justify-between group">
      <div>
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {service.category}
            </span>
            <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {service.sla}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-base font-bold text-[#102A43] group-hover:text-[#2563EB] transition-colors leading-snug">
          {service.name}
        </h3>
        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
          {service.shortDesc}
        </p>

        {/* Department Info */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
          <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate font-medium">{service.suggestedTeam}</span>
        </div>

        {/* Expandable Step-by-step instructions */}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowSteps(!showSteps)}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 py-1"
          >
            <Info className="w-3 h-3" />
            <span>{showSteps ? "Hide Resolution Steps" : "View Official Workflow"}</span>
            {showSteps ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {showSteps && (
            <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5 animate-fade-in">
              <div className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider mb-1">
                Standard Municipal Protocol:
              </div>
              {service.steps.map((st, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[11px] leading-tight">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-[#2563EB] font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <button
          onClick={() => onSelectService(service)}
          className="w-full py-2 px-3.5 rounded-xl bg-slate-900 text-white group-hover:bg-[#2563EB] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <span>Submit Request</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
