import React, { useState, useEffect } from "react";
import {
  Search,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building,
  MapPin,
  Calendar,
  User,
  Star,
  MessageSquare,
  ShieldAlert,
  Send,
  ArrowRight,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { requestService } from "../services/requestService";
import StatusTimeline from "../components/StatusTimeline";
import { STATUS_BADGES } from "../components/RequestTable";

export default function TrackRequest({ targetId, onNavigate }) {
  const { t } = useAuth();
  const [searchInput, setSearchInput] = useState(targetId || "CS-2026-1042");
  const [activeRequest, setActiveRequest] = useState(null);
  const [searchError, setSearchError] = useState("");

  // Feedback states
  const [clarityRating, setClarityRating] = useState(5);
  const [easeRating, setEaseRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const fetchRequest = (idToFetch) => {
    if (!idToFetch || !idToFetch.trim()) {
      setSearchError("Please enter a reference tracking ID.");
      setActiveRequest(null);
      return;
    }

    const found = requestService.getRequestById(idToFetch.trim());
    if (found) {
      setActiveRequest(found);
      setSearchError("");
      setFeedbackSuccess(false);
    } else {
      setActiveRequest(null);
      setSearchError(t("track.notFound"));
    }
  };

  useEffect(() => {
    if (targetId) {
      setSearchInput(targetId);
      fetchRequest(targetId);
    } else {
      fetchRequest("CS-2026-1042");
    }

    const handleSync = () => {
      if (searchInput) {
        const refreshed = requestService.getRequestById(searchInput);
        if (refreshed) {
          setActiveRequest(refreshed);
        }
      }
    };

    window.addEventListener("civicsaathi:data-changed", handleSync);
    return () => window.removeEventListener("civicsaathi:data-changed", handleSync);
  }, [targetId]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchRequest(searchInput);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!activeRequest) return;

    const updated = requestService.submitFeedback(activeRequest.id, {
      clarityRating,
      easeRating,
      comments: feedbackComment,
    });

    if (updated) {
      setActiveRequest(updated);
      setFeedbackSuccess(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Search Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>Real-Time Citizen Tracking</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
          {t("track.title")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
          {t("track.subtitle")}
        </p>

        {/* Input Form */}
        <form onSubmit={handleSearchSubmit} className="pt-2">
          <div className="relative max-w-xl mx-auto flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t("track.inputPlaceholder")}
              className="w-full pl-12 pr-28 py-3.5 rounded-2xl border border-slate-300 text-sm font-mono uppercase text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              {t("track.trackBtn")}
            </button>
          </div>

          {/* Quick-fill Button */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs">
            <span className="text-slate-400">Quick Test:</span>
            <button
              type="button"
              onClick={() => {
                setSearchInput("CS-2026-1042");
                fetchRequest("CS-2026-1042");
              }}
              className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-mono text-xs font-bold border border-blue-200 transition-colors cursor-pointer"
            >
              {t("track.quickFill")}
            </button>
          </div>
        </form>

        {searchError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center justify-center gap-2 max-w-md mx-auto">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{searchError}</span>
          </div>
        )}
      </div>

      {/* TRACKING DETAILS VIEW */}
      {activeRequest && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Request Details & Vertical Timeline */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header Status Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-lg font-extrabold text-[#102A43]">
                    {activeRequest.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${
                      STATUS_BADGES[activeRequest.status] || STATUS_BADGES.Submitted
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {activeRequest.status}
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  Logged: {new Date(activeRequest.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900 leading-snug">
                  {activeRequest.serviceName}
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  Category: {activeRequest.category}
                </span>
              </div>

              {/* Key Metadata Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Assigned Department
                  </span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <Building className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    {activeRequest.assignedDepartment || "Pending Routing"}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Locality & Landmark
                  </span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    {activeRequest.locality} ({activeRequest.landmark})
                  </span>
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Citizen Problem Description
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {activeRequest.description}
                </p>
              </div>

              {/* Attached Photo */}
              {activeRequest.photoUrl && (
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Attached Site Inspection Photo
                  </span>
                  <div className="rounded-xl overflow-hidden border border-slate-200 max-h-56">
                    <img
                      src={activeRequest.photoUrl}
                      alt="Site Inspection"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Vertical Progression Timeline */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-[#102A43]">
                    {t("track.timelineTitle")}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Live updates as municipal field staff record milestones.
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                  Verified Records
                </span>
              </div>

              <StatusTimeline
                currentStatus={activeRequest.status}
                history={activeRequest.history}
              />
            </div>
          </div>

          {/* Right Column: Citizen Feedback & Staff Sync Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Feedback Module */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#102A43]">
                    {t("track.feedbackSectionTitle")}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Help us improve municipal urban service delivery.
                  </p>
                </div>
              </div>

              {activeRequest.status !== "Completed" ? (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-slate-700">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Feedback Unlocks Upon Completion</span>
                  </div>
                  <p className="leading-relaxed">
                    Once the assigned department completes and closes this request on site, you will be able to submit clarity and ease of service ratings.
                  </p>
                  <p className="text-[11px] text-blue-700 font-medium">
                    (Tip for examiners: Switch to Staff Portal to mark this request as 'Completed', then return here to test the rating flow!)
                  </p>
                </div>
              ) : activeRequest.feedback ? (
                // Already Submitted Feedback
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t("track.feedbackGivenNotice")}</span>
                  </div>
                  <div className="space-y-1 text-slate-700 pt-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Clarity Rating:</span>
                      <span className="font-bold text-amber-600">{activeRequest.feedback.clarityRating} / 5 ★</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Ease of Use:</span>
                      <span className="font-bold text-amber-600">{activeRequest.feedback.easeRating} / 5 ★</span>
                    </div>
                    {activeRequest.feedback.comments && (
                      <div className="mt-2 p-2.5 bg-white rounded-xl border border-emerald-100 text-slate-700 italic">
                        "{activeRequest.feedback.comments}"
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                // Feedback Form
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t("feedback.clarityLabel")}
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setClarityRating(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= clarityRating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-2">
                        {clarityRating} / 5
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t("feedback.easeLabel")}
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setEaseRating(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= easeRating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-2">
                        {easeRating} / 5
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t("feedback.commentsLabel")}
                    </label>
                    <textarea
                      rows={3}
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      placeholder="Share your experience or suggestions for the municipal crew..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t("feedback.submitBtn")}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Staff Quick Action Helper Card for Examiners */}
            <div className="bg-gradient-to-br from-slate-900 to-[#102A43] text-white rounded-3xl p-5 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                  Examiner Quick Action
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-slate-300">
                  Prototype Sync
                </span>
              </div>
              <h4 className="text-xs font-bold">Want to change this request's status?</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Open this request in the Staff Management console to assign departments and push it through the workflow.
              </p>
              <button
                onClick={() => {
                  onNavigate("admin-requests", { targetId: activeRequest.id });
                }}
                className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Open in Staff Management</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
