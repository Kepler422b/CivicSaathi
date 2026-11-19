import React from "react";
import { AlertCircle, GraduationCap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function DisclaimerBanner() {
  const { t } = useAuth();

  return (
    <div className="bg-gradient-to-r from-amber-50 via-amber-100/70 to-amber-50 border-b border-amber-200/80 px-4 py-2 text-xs text-amber-950 flex flex-wrap items-center justify-between gap-2 shadow-xs">
      <div className="flex items-center gap-2 max-w-5xl">
        <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[11px] uppercase tracking-wider shrink-0">
          <GraduationCap className="w-3.5 h-3.5" />
          Academic Prototype
        </span>
        <span className="text-amber-900/90 leading-tight">
          {t("disclaimer.academic")}
        </span>
      </div>
      <div className="text-[11px] text-amber-800 font-medium shrink-0 flex items-center gap-1.5">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        LocalStorage Engine Active (No Paid APIs Required)
      </div>
    </div>
  );
}
