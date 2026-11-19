import React from "react";

export default function StatCard({ title, value, subtitle, icon: Icon, color = "blue", badge }) {
  const colorMap = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-100",
      pill: "bg-blue-100 text-blue-800",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-100",
      pill: "bg-amber-100 text-amber-800",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-100",
      pill: "bg-emerald-100 text-emerald-800",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-100",
      pill: "bg-purple-100 text-purple-800",
    },
    slate: {
      bg: "bg-slate-100",
      text: "text-slate-600",
      border: "border-slate-200",
      pill: "bg-slate-200 text-slate-800",
    },
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-xl ${scheme.bg} ${scheme.text} flex items-center justify-center shrink-0`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
          {value}
        </span>
        {badge && (
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${scheme.pill}`}>
            {badge}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-xs text-slate-500 mt-1 font-medium">{subtitle}</p>
      )}
    </div>
  );
}
