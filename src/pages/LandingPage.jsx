import React from "react";
import {
  Building2,
  ArrowRight,
  Search,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Star,
  Clock,
  Sparkles,
  MapPin,
  Send,
  Users,
  Compass,
  FileCheck,
  Layers,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { serviceDirectory } from "../services/serviceDirectory";
import { analyticsService } from "../services/analyticsService";
import ServiceCard from "../components/ServiceCard";

export default function LandingPage({ onNavigate, onSelectService }) {
  const { t, setExamGuideOpen, switchRole } = useAuth();
  const services = serviceDirectory.getAllServices().slice(0, 6);
  const metrics = analyticsService.getMetrics();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#102A43] via-[#0F2337] to-[#102A43] text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-blue-950">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Civic Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold backdrop-blur-xs">
                <Building2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Smart City Citizen Service Navigator • Ward 12</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                {t("hero.title")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-sky-300 to-blue-400">
                  {t("hero.titleAccent")}
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                {t("hero.description")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate("services")}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-sm shadow-lg shadow-blue-600/25 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>{t("hero.ctaServices")}</span>
                </button>

                <button
                  onClick={() => onNavigate("track")}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/20 backdrop-blur-xs flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-teal-300" />
                  <span>{t("hero.ctaTrack")}</span>
                </button>
              </div>

              {/* Platform Highlights */}
              <div className="pt-2 text-xs text-slate-300 flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
                <span>24/7 Citizen Grievance Redressal • End-to-End Tracking • Transparent Governance</span>
              </div>
            </div>

            {/* Right Graphic / Interactive Hero Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow backdrop */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600 to-teal-400 opacity-20 blur-xl"></div>

                <div className="relative bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
                  {/* Mock Municipal Service Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Smart Urban Operations</div>
                        <div className="text-[10px] text-teal-400 font-mono">Ward 12 Municipal Portal</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Live Sync
                    </span>
                  </div>

                  {/* Active Case Preview (Rahul Sharma / CS-2026-1042) */}
                  <div className="mt-4 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-sky-400">CS-2026-1042</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        Active Public Case
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold text-white mt-1.5">Streetlight Not Working</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Reported by Rahul Sharma at Mira Road (Near Community Park).
                    </p>

                    {/* Progress steps mini bar */}
                    <div className="mt-3 grid grid-cols-5 gap-1 text-[9px] text-center font-medium">
                      <div className="py-1 rounded bg-emerald-500 text-white font-bold">Submit</div>
                      <div className="py-1 rounded bg-blue-600 text-white font-bold">Review</div>
                      <div className="py-1 rounded bg-blue-600 text-white font-bold">Route</div>
                      <div className="py-1 rounded bg-slate-700 text-slate-400">Progress</div>
                      <div className="py-1 rounded bg-slate-700 text-slate-400">Close</div>
                    </div>
                  </div>

                  {/* Metrics preview row */}
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700">
                      <div className="text-lg font-bold text-white">{metrics.total}</div>
                      <div className="text-[10px] text-slate-400">Total Logged</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700">
                      <div className="text-lg font-bold text-teal-400">{metrics.completionRate}%</div>
                      <div className="text-[10px] text-slate-400">Resolved</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700">
                      <div className="text-lg font-bold text-amber-400">4.8★</div>
                      <div className="text-[10px] text-slate-400">Satisfaction</div>
                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <button
                    onClick={() => {
                      onNavigate("track", { targetId: "CS-2026-1042" });
                    }}
                    className="mt-4 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Track CS-2026-1042 Lifecycle</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics Banner */}
      <section className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">{metrics.total}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              {t("stats.totalRequests")}
            </div>
            <div className="text-[10px] text-teal-600 font-medium mt-0.5">Municipal Operations Registry</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">{metrics.inProgress}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              {t("stats.inProgressRequests")}
            </div>
            <div className="text-[10px] text-blue-600 font-medium mt-0.5">Field Crews Deployed</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{metrics.completed}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              {t("stats.completedRequests")}
            </div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5">{metrics.completionRate}% Resolution Rate</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">{metrics.averageRating}★</div>
            <div className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">
              {t("stats.avgSatisfaction")}
            </div>
            <div className="text-[10px] text-amber-600 font-medium mt-0.5">Clarity & Ease Score</div>
          </div>
        </div>
      </section>

      {/* Popular Civic Services Directory Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Service Catalog
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-1">
              Popular Urban Civic Services
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select any civic issue to start a guided, verified request submission.
            </p>
          </div>
          <button
            onClick={() => onNavigate("services")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-blue-800 hover:underline"
          >
            <span>View All 8 Municipal Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={(s) => {
                if (onSelectService) onSelectService(s);
                onNavigate("submit");
              }}
            />
          ))}
        </div>
      </section>

      {/* How CivicSaathi Works (4 Steps) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">
              Transparent Municipal Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-1">
              How CivicSaathi Closes the Citizen-Administration Gap
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Transforming opaque municipal grievances into an accountable, transparent citizen service lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 relative">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-extrabold text-base flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Smart Discovery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Citizens describe issues in simple natural language. Intelligent rule-based matching finds the right service and responsible department immediately.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 relative">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 font-extrabold text-base flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Guided Submission</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-step validated form captures exact locality, landmarks, incident date, and optional photo. Generates a unique tracking reference ID (e.g., CS-2026-1042).
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 relative">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-extrabold text-base flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Staff Routing & Action</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Municipal officers review submissions, assign specialized teams (Streetlight, Waste, Roads), update status, and record timestamped field remarks.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-extrabold text-base flex items-center justify-center mb-4">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Real-Time Follow-up</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Citizens track real-time progression on a vertical status timeline, receive in-app notifications, and submit 5-star clarity feedback upon resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose CivicSaathi & Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
              GovTech Innovation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] leading-tight">
              Built to Solve Real Urban Service Breakdown
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Traditional municipal portals are plagued by forgotten complaints, missing status feedback, and zero inter-departmental accountability. CivicSaathi demonstrates a closed-loop citizen navigator.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">No Silent Failures</h4>
                  <p className="text-xs text-slate-500">Every request has an immutable timestamped progression history.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Intelligent Service Discovery</h4>
                  <p className="text-xs text-slate-500">Prevents misrouted complaints by recommending responsible departments upfront.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Closed-Loop Citizen Feedback</h4>
                  <p className="text-xs text-slate-500">Evaluates civic service satisfaction with clarity & ease ratings for admin analytics.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
              <ShieldCheck className="w-8 h-8 text-[#2563EB] mb-3" />
              <h4 className="text-sm font-bold text-slate-900">Role-Based Access</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Dedicated interfaces for citizens to submit and track, and staff to review, assign, and update statuses.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
              <TrendingUp className="w-8 h-8 text-teal-600 mb-3" />
              <h4 className="text-sm font-bold text-slate-900">Real-Time Analytics</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Recharts dashboards showing category volume, resolution percentages, and department bottlenecks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
              <Layers className="w-8 h-8 text-purple-600 mb-3" />
              <h4 className="text-sm font-bold text-slate-900">Clean Modular Architecture</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Organized storage and service layers ready to be swapped with FastAPI, MongoDB, or Firebase backend.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-all">
              <Star className="w-8 h-8 text-amber-500 mb-3" />
              <h4 className="text-sm font-bold text-slate-900">Dual Language Support</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                English and Hindi language selectors to broaden civic inclusivity across diverse urban demographics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Citizen Feedback Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Citizen Testimonials
            </span>
            <h2 className="text-2xl font-extrabold text-[#102A43] mt-1">
              Verified Resolution Experiences
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Actual feedback submitted by citizens after their requests reached Completed status.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "Extremely quick turnaround! The toilet block was cleaned within 24 hours of reporting and the bad odor is completely gone. Best civic platform experience."
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800">Kavita Deshmukh</span>
                  <span className="text-slate-400 block text-[10px]">Dadar Central • CS-2026-1021</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                  Resolved in 31 hrs
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "Fabulous enforcement! Not only was the debris removed, but the iron barricade has stopped trucks from coming again. Very transparent tracking."
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800">Vikram Singh</span>
                  <span className="text-slate-400 block text-[10px]">Thane West • CS-2026-1010</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                  Resolved in 46 hrs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#102A43] text-white pt-12 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800 text-xs">
            {/* Col 1 */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-base font-bold text-white">CivicSaathi</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                A Smart Citizen Service Navigator & Follow-up Platform empowering citizens and urban municipal departments with real-time transparency.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Citizen Portal
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <button onClick={() => onNavigate("services")} className="hover:text-white">
                    Explore 8 Civic Services
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("submit")} className="hover:text-white">
                    Submit a Request
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("track")} className="hover:text-white">
                    Track by Reference ID
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate("citizen-dashboard")} className="hover:text-white">
                    Citizen Dashboard
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Administrative Staff
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <button
                    onClick={() => {
                      switchRole("staff");
                      onNavigate("admin-dashboard");
                    }}
                    className="hover:text-white"
                  >
                    Staff Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      switchRole("staff");
                      onNavigate("admin-requests");
                    }}
                    className="hover:text-white"
                  >
                    Manage & Assign Requests
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      switchRole("staff");
                      onNavigate("admin-analytics");
                    }}
                    className="hover:text-white"
                  >
                    GovTech Analytics
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">
                Citizen Support & Helpdesk
              </h4>
              <p className="text-slate-400 text-[11px] leading-relaxed mb-3">
                Have questions regarding ward jurisdictions or resolution SLAs? Access our online catalog anytime.
              </p>
              <button
                onClick={() => onNavigate("services")}
                className="w-full py-2 px-3 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-semibold hover:bg-teal-500/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Browse Municipal Services</span>
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <p>© 2026 CivicSaathi. All rights reserved. Urban Governance & Citizen Services Platform.</p>
            <p className="text-teal-400 font-medium">Smart Citizen Grievance Redressal System</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
