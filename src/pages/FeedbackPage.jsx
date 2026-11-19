import React, { useState, useEffect } from "react";
import { Star, MessageSquare, CheckCircle2, Send, Clock, User, Building, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { requestService } from "../services/requestService";

export default function FeedbackPage({ onNavigate }) {
  const { user, role, t } = useAuth();
  const [requests, setRequests] = useState([]);
  const [selectedReqId, setSelectedReqId] = useState("");
  const [clarityRating, setClarityRating] = useState(5);
  const [easeRating, setEaseRating] = useState(5);
  const [comments, setComments] = useState("");
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const loadData = () => {
    const all = requestService.getAllRequests();
    setRequests(all);
    const completedWithoutFeedback = all.find((r) => r.status === "Completed" && !r.feedback);
    if (completedWithoutFeedback) {
      setSelectedReqId(completedWithoutFeedback.id);
    } else {
      const anyCompleted = all.find((r) => r.status === "Completed");
      if (anyCompleted) setSelectedReqId(anyCompleted.id);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener("civicsaathi:data-changed", loadData);
    return () => window.removeEventListener("civicsaathi:data-changed", loadData);
  }, []);

  const completedRequests = requests.filter((r) => r.status === "Completed");
  const feedbacksList = requests
    .filter((r) => r.feedback)
    .map((r) => ({
      ...r.feedback,
      requestId: r.id,
      serviceName: r.serviceName,
      citizenName: r.citizenName,
      locality: r.locality,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedReqId) return;

    const res = requestService.submitFeedback(selectedReqId, {
      clarityRating,
      easeRating,
      comments,
    });

    if (res) {
      setSubmittedSuccess(true);
      setComments("");
      setTimeout(() => setSubmittedSuccess(false), 3000);
    }
  };

  const selectedRequest = requests.find((r) => r.id === selectedReqId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          <span>Closed-Loop Citizen Experience</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] mt-1">
          Service Feedback & Experience Rating
        </h1>
        <p className="text-xs text-slate-500">
          Rate communication clarity, tracking accuracy, and municipal speed for completed grievances.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form to submit feedback */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-[#102A43]">
            Submit Feedback for Resolved Grievance
          </h3>

          {submittedSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{t("feedback.thankYou")}</span>
            </div>
          )}

          {completedRequests.length === 0 ? (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs text-slate-500 space-y-2">
              <Clock className="w-6 h-6 text-slate-400 mx-auto" />
              <p className="font-semibold text-slate-700">No completed requests yet</p>
              <p>Once staff marks a request as 'Completed', it will appear here for rating.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Choose Completed Request <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedReqId}
                  onChange={(e) => setSelectedReqId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-800 bg-white"
                >
                  {completedRequests.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.id} - {r.serviceName} ({r.locality}) {r.feedback ? "✓ [Rated]" : "★ [Pending Rating]"}
                    </option>
                  ))}
                </select>
              </div>

              {selectedRequest?.feedback ? (
                <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-blue-900 space-y-1">
                  <p className="font-semibold">Feedback already logged for this request:</p>
                  <p>Clarity: {selectedRequest.feedback.clarityRating}★ • Ease: {selectedRequest.feedback.easeRating}★</p>
                  <p className="italic">"{selectedRequest.feedback.comments}"</p>
                </div>
              ) : (
                <>
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
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Was the resolution satisfactory? Any notes on the turnaround time?"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t("feedback.submitBtn")}</span>
                  </button>
                </>
              )}
            </form>
          )}
        </div>

        {/* Right Column: Public Feedback Wall */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#102A43]">
              Collected Feedback Log ({feedbacksList.length})
            </h3>
            <span className="text-[10px] text-slate-400">Audited Reviews</span>
          </div>

          <div className="space-y-3">
            {feedbacksList.map((fb, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{fb.citizenName}</span>
                    <span className="text-slate-400 text-[11px] block">{fb.serviceName} • {fb.locality}</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    {fb.requestId}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-amber-500 text-xs font-semibold">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>Clarity: {fb.clarityRating}/5</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>Ease: {fb.easeRating}/5</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  "{fb.comments}"
                </p>

                <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                  <span>Audited on: {new Date(fb.submittedAt).toLocaleDateString()}</span>
                  <button
                    onClick={() => onNavigate("track", { targetId: fb.requestId })}
                    className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View Request Lifecycle</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
