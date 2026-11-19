import React from "react";
import { X, CheckCircle2, ArrowRight, ShieldCheck, UserCheck, Search, Send, Clock, Star, BarChart3, RotateCcw } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { storageService } from "../services/storageService";

export default function ExamDemoModal({ onNavigate }) {
  const { examGuideOpen, setExamGuideOpen, switchRole, role } = useAuth();

  if (!examGuideOpen) return null;

  const handleResetData = () => {
    if (window.confirm("Reset all requests and notifications back to initial examination seed?")) {
      storageService.resetDemoData();
      window.dispatchEvent(new CustomEvent("civicsaathi:data-changed"));
      alert("Demonstration records reset to original baseline state!");
    }
  };

  const steps = [
    {
      step: 1,
      title: "Login as Citizen (Rahul Sharma)",
      role: "Citizen",
      desc: "Authenticate as demo citizen or click 'Switch to Citizen'. Observe personalized citizen dashboard.",
      actionLabel: "Switch to Citizen",
      action: () => {
        switchRole("citizen");
        onNavigate("citizen-dashboard");
        setExamGuideOpen(false);
      },
      icon: UserCheck,
    },
    {
      step: 2,
      title: "Intelligent Service Discovery",
      role: "Citizen",
      desc: "Search 'Streetlight not working' in the directory. Notice the rule-based recommendation explanation.",
      actionLabel: "Go to Services",
      action: () => {
        onNavigate("services");
        setExamGuideOpen(false);
      },
      icon: Search,
    },
    {
      step: 3,
      title: "Guided Multi-Step Request Submission",
      role: "Citizen",
      desc: "Fill problem details, locality (Mira Road), landmark, optional photo, review and submit to generate Reference ID.",
      actionLabel: "Submit Request Form",
      action: () => {
        onNavigate("submit");
        setExamGuideOpen(false);
      },
      icon: Send,
    },
    {
      step: 4,
      title: "Switch to Staff Portal & Department Routing",
      role: "Staff",
      desc: "Switch to Staff portal. Open request CS-2026-1042. Assign 'Streetlight Maintenance Team', set status to 'In Progress', add staff remarks.",
      actionLabel: "Switch to Staff Portal",
      action: () => {
        switchRole("staff");
        onNavigate("admin-requests");
        setExamGuideOpen(false);
      },
      icon: ShieldCheck,
    },
    {
      step: 5,
      title: "Live Request Lifecycle Tracking",
      role: "Citizen",
      desc: "Return to Citizen portal and enter tracking ID 'CS-2026-1042'. View updated vertical status timeline with timestamps and staff remarks.",
      actionLabel: "Track CS-2026-1042",
      action: () => {
        switchRole("citizen");
        onNavigate("track", { targetId: "CS-2026-1042" });
        setExamGuideOpen(false);
      },
      icon: Clock,
    },
    {
      step: 6,
      title: "Close Request & Submit Feedback",
      role: "Citizen / Staff",
      desc: "Mark request as Completed in Staff view, then submit 1-5 star Clarity & Ease ratings as Citizen.",
      actionLabel: "Open Feedback",
      action: () => {
        onNavigate("track", { targetId: "CS-2026-1021" });
        setExamGuideOpen(false);
      },
      icon: Star,
    },
    {
      step: 7,
      title: "Real-time GovTech Analytics Dashboard",
      role: "Staff",
      desc: "Open Staff Analytics to view live Recharts data: Category bar charts, Status pie charts, and Citizen satisfaction ratings.",
      actionLabel: "Open Analytics",
      action: () => {
        switchRole("staff");
        onNavigate("admin-analytics");
        setExamGuideOpen(false);
      },
      icon: BarChart3,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#102A43] text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
                Semester V Idea Lab-III
              </span>
              <span className="text-xs text-slate-300">Problem Statement 7</span>
            </div>
            <h2 className="text-xl font-bold mt-1 text-white flex items-center gap-2">
              <span>Examiner Demonstration Guide (5-Min Scenario)</span>
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Follow this verified 7-step sequence to evaluate the complete citizen-to-administration civic workflow.
            </p>
          </div>
          <button
            onClick={() => setExamGuideOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 flex items-start justify-between gap-4">
            <div className="text-xs text-blue-900 leading-relaxed">
              <strong className="font-semibold block mb-0.5">Primary Demonstration Target: CS-2026-1042</strong>
              Rahul Sharma • Streetlight Not Working • Mira Road • Initial Status: <span className="font-semibold text-slate-800">Submitted</span>.
              Use this pre-seeded record to demonstrate real-time status transitions and LocalStorage sync.
            </div>
            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-blue-300 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors shadow-xs shrink-0"
              title="Reset records to default demonstration state"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          </div>

          <div className="space-y-3">
            {steps.map((st) => {
              const Icon = st.icon;
              return (
                <div
                  key={st.step}
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-white hover:bg-slate-50/70 transition-all flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-sm shrink-0">
                      {st.step}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-slate-900">{st.title}</h4>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            st.role === "Citizen"
                              ? "bg-blue-100 text-blue-800"
                              : st.role === "Staff"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-teal-100 text-teal-800"
                          }`}
                        >
                          {st.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-normal">{st.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={st.action}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-xs font-medium hover:bg-blue-700 transition-colors shrink-0 shadow-xs"
                  >
                    <span>{st.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-700">Currently active portal:</span>
            <span className="px-2 py-0.5 rounded font-semibold bg-slate-200 text-slate-800 capitalize">
              {role} Portal
            </span>
          </div>
          <button
            onClick={() => setExamGuideOpen(false)}
            className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
