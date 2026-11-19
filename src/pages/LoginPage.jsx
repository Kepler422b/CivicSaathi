import React, { useState } from "react";
import { Building2, Lock, Mail, ArrowRight, UserCheck, ShieldCheck, KeyRound, AlertCircle, Info } from "lucide-react";
import { useAuth, DEMO_USERS } from "../context/AuthContext";

export default function LoginPage({ onNavigate }) {
  const { login, t } = useAuth();
  const [selectedRole, setSelectedRole] = useState("citizen");
  const [email, setEmail] = useState("citizen@civicsaathi.demo");
  const [password, setPassword] = useState("demo123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRoleTab = (role) => {
    setSelectedRole(role);
    setError("");
    if (role === "citizen") {
      setEmail("citizen@civicsaathi.demo");
    } else {
      setEmail("staff@civicsaathi.demo");
    }
    setPassword("demo123");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password, selectedRole);
      setLoading(false);

      if (result.success) {
        if (result.user.role === "staff") {
          onNavigate("admin-dashboard");
        } else {
          onNavigate("citizen-dashboard");
        }
      } else {
        setError(result.message || "Invalid credentials.");
      }
    }, 200);
  };

  const handleQuickLogin = (role) => {
    const userRole = role === "staff" ? "staff" : "citizen";
    const res = login(
      userRole === "staff" ? "staff@civicsaathi.demo" : "citizen@civicsaathi.demo",
      "demo123",
      userRole
    );
    if (res.success) {
      if (userRole === "staff") {
        onNavigate("admin-dashboard");
      } else {
        onNavigate("citizen-dashboard");
      }
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#102A43] text-white p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center mx-auto text-teal-300 mb-3 shadow-inner">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">CivicSaathi Portal Access</h2>
          <p className="text-xs text-slate-300 mt-1">
            Choose your role to access the Citizen or Staff Municipal Portal
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="p-6">
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => handleRoleTab("citizen")}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                selectedRole === "citizen"
                  ? "bg-white text-[#2563EB] shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Citizen Portal</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleTab("staff")}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                selectedRole === "staff"
                  ? "bg-white text-amber-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Staff / Admin</span>
            </button>
          </div>

          {/* Quick Login Presets for Examiners */}
          <div className="mb-5 p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-semibold text-blue-900 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                Examiner Quick-Fill Credentials
              </span>
              <span className="font-mono text-[10px] text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                demo123
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("citizen")}
                className="py-1.5 px-2 rounded-lg bg-white border border-blue-200 text-blue-700 hover:bg-blue-100 text-[11px] font-semibold text-center transition-colors shadow-2xs"
              >
                1-Click Citizen Login
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("staff")}
                className="py-1.5 px-2 rounded-lg bg-white border border-amber-200 text-amber-800 hover:bg-amber-100 text-[11px] font-semibold text-center transition-colors shadow-2xs"
              >
                1-Click Staff Login
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Demo Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-xl text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                selectedRole === "staff"
                  ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20"
                  : "bg-[#2563EB] hover:bg-blue-700 shadow-blue-600/20"
              }`}
            >
              <span>{loading ? "Authenticating..." : `Enter ${selectedRole === "staff" ? "Staff" : "Citizen"} Portal`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center text-[11px] text-slate-400">
            For academic demonstration only. Authentication is simulated locally.
          </div>
        </div>
      </div>
    </div>
  );
}
