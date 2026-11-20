import React from "react";
import {
  Settings,
  GraduationCap,
  Layers,
  Database,
  RotateCcw,
  CheckCircle2,
  Code2,
  Server,
  Shield,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { storageService } from "../services/storageService";

export default function SettingsPage() {
  const { user, role, switchRole } = useAuth();

  const handleResetData = () => {
    if (window.confirm("Reset all requests, notifications, and ratings back to initial examination baseline?")) {
      storageService.resetDemoData();
      window.dispatchEvent(new CustomEvent("civicsaathi:data-changed"));
      alert("Demonstration records successfully reset!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
          <Settings className="w-3.5 h-3.5" />
          <span>System & Architecture Specifications</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-1">
          Project Settings & Architecture
        </h1>
        <p className="text-xs text-slate-500">
          System Configuration, Persistence & Architecture Specifications.
        </p>
      </div>

      {/* Reset Dataset Card */}
      <div className="bg-amber-50/70 border-2 border-amber-200 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-amber-700" />
            Reset Dataset to Initial Baseline
          </h3>
          <p className="text-xs text-amber-900/80 mt-1 max-w-xl leading-relaxed">
            Restores the initial sample requests (including CS-2026-1042 for Rahul Sharma), clearing any test modifications and re-establishing baseline records.
          </p>
        </div>
        <button
          onClick={handleResetData}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs shrink-0 cursor-pointer"
        >
          Reset Dataset
        </button>
      </div>

      {/* Core Civic Mission */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-[#2563EB]">
          <Building className="w-5 h-5" />
          <h3 className="text-base font-bold text-slate-900">
            Urban Service Delivery Framework
          </h3>
        </div>
        <blockquote className="p-3.5 bg-slate-50 border-l-4 border-blue-600 rounded-r-xl text-xs text-slate-700 italic leading-relaxed">
          "Investigating the interaction between urban services and citizens to unlock opportunities for transparent, accountable service delivery."
        </blockquote>
        <p className="text-xs text-slate-600 leading-relaxed">
          CivicSaathi addresses critical failure modes in traditional municipal complaint systems: lack of service discovery, opaque department assignment, untracked progress bottlenecks, and missing feedback loops. By introducing an intelligent rule-based service catalog and an immutable timestamped status history, CivicSaathi transforms civic grievances into an accountable, transparent citizen service pipeline.
        </p>
      </div>

      {/* Technology Stack Grid */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-teal-600" />
          Technology Stack
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">Frontend Framework</span>
            <span className="text-slate-500">React.js 19 + Vite 8</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">Design & Styling</span>
            <span className="text-slate-500">Tailwind CSS (GovTech Palette)</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">Iconography</span>
            <span className="text-slate-500">Lucide React</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">Data Visualization</span>
            <span className="text-slate-500">Recharts (Responsive Bar, Pie & Line)</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">Persistence Layer</span>
            <span className="text-slate-500">Client-Side Storage Engine</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-800 block">Recommendation Engine</span>
            <span className="text-slate-500">Rule-based Keyword Matching</span>
          </div>
        </div>
      </div>

      {/* Production Migration Roadmap */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-3 text-xs text-slate-600">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Server className="w-5 h-5 text-purple-600" />
          Full-Stack Backend Migration Architecture
        </h3>
        <p className="leading-relaxed">
          The code is structured around isolated services (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">storageService.js</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">requestService.js</code>, <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">analyticsService.js</code>). In a production deployment:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
          <li><strong>FastAPI / Node.js Backend:</strong> Can replace local storage calls with asynchronous REST or GraphQL endpoints (<code className="font-mono">GET /api/v1/requests</code>, <code className="font-mono">POST /api/v1/requests</code>).</li>
          <li><strong>MongoDB / PostgreSQL Database:</strong> Store request documents with geospatial GeoJSON coordinates and indexing.</li>
          <li><strong>Firebase / WebSockets:</strong> Push real-time push notifications to citizens when staff advances request status.</li>
        </ul>
      </div>
    </div>
  );
}
