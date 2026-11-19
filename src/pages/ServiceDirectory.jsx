import React, { useState, useMemo } from "react";
import {
  Search,
  Sparkles,
  Filter,
  CheckCircle2,
  Clock,
  Building,
  ArrowRight,
  Info,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { serviceDirectory } from "../services/serviceDirectory";
import ServiceCard from "../components/ServiceCard";

export default function ServiceDirectory({ onNavigate, onSelectService }) {
  const { t } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allServices = serviceDirectory.getAllServices();
  const categories = serviceDirectory.getCategories();

  // Intelligent recommendations based on search text
  const recommendations = useMemo(() => {
    return serviceDirectory.recommendServices(searchQuery);
  }, [searchQuery]);

  // Regular filtered list
  const filteredServices = useMemo(() => {
    return allServices.filter((srv) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        srv.name.toLowerCase().includes(q) ||
        srv.description.toLowerCase().includes(q) ||
        srv.keywords.some((k) => k.toLowerCase().includes(q));

      const matchesCat = selectedCategory === "All" || srv.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [allServices, searchQuery, selectedCategory]);

  const handleSelect = (service) => {
    if (onSelectService) onSelectService(service);
    onNavigate("submit", { preselectedService: service });
  };

  const sampleQueries = [
    "Street light is not working near my house",
    "Garbage has not been collected this morning",
    "Water pipe broken and leaking on road",
    "Deep pothole caused accident",
    "Drainage water stagnation after rain",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Directory Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Municipal Service Directory</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
          {t("serviceDirectory.title")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t("serviceDirectory.subtitle")}
        </p>

        {/* Search input with rule-based recommender trigger */}
        <div className="pt-2">
          <div className="relative max-w-2xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("serviceDirectory.searchPlaceholder")}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Click Sample Prompts */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <span className="font-semibold text-slate-700">Try testing:</span>
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSearchQuery(q)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-100 hover:text-blue-800 text-slate-600 transition-colors cursor-pointer"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Intelligent Recommendation Box (Appears when search has matches) */}
      {recommendations.length > 0 && searchQuery.trim().length >= 3 && (
        <div className="bg-gradient-to-r from-blue-50 via-teal-50/50 to-blue-50 rounded-2xl border-2 border-blue-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#102A43]">
                  Rule-Based Civic Recommendation Engine
                </h3>
                <p className="text-[11px] text-slate-500">
                  Identified most relevant service by matching domain keywords.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-1 rounded-full">
              {recommendations[0].confidence}% Match Confidence
            </span>
          </div>

          <div className="p-4 bg-white rounded-xl border border-blue-100 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">
                  {recommendations[0].service.name}
                </span>
                <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                  {recommendations[0].service.category}
                </span>
              </div>
              <p className="text-xs text-blue-900 font-medium">
                <strong className="text-blue-950 font-semibold">Why recommended: </strong>
                {recommendations[0].reason}
              </p>
              <div className="text-[11px] text-slate-500 flex items-center gap-2">
                <span>Suggested authority: <strong className="text-slate-700">{recommendations[0].service.suggestedTeam}</strong></span>
                <span>•</span>
                <span>SLA: <strong className="text-teal-700">{recommendations[0].service.sla}</strong></span>
              </div>
            </div>

            <button
              onClick={() => handleSelect(recommendations[0].service)}
              className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-xs cursor-pointer"
            >
              <span>{t("serviceDirectory.submitAction")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-[#102A43] text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs font-medium text-slate-500">
          Showing {filteredServices.length} civic services
        </span>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelectService={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
