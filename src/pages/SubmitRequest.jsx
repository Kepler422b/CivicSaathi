import React, { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Calendar,
  MapPin,
  Building,
  User,
  Mail,
  Phone,
  FileText,
  AlertCircle,
  Copy,
  Check,
  Image,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { serviceDirectory } from "../services/serviceDirectory";
import { requestService } from "../services/requestService";
import { LOCALITIES } from "../data/demoData";

const SAMPLE_PHOTOS = [
  {
    name: "Dark Streetlight Pole",
    url: "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Pothole on Asphalt Road",
    url: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Uncollected Garbage Heap",
    url: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80",
  },
  {
    name: "Waterlogging After Rain",
    url: "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&auto=format&fit=crop&q=80",
  },
];

export default function SubmitRequest({ onNavigate, initialService }) {
  const { user } = useAuth();
  const allServices = serviceDirectory.getAllServices();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialService || allServices[0]);

  // Form states
  const [formData, setFormData] = useState({
    description: "",
    locality: user?.locality || LOCALITIES[0],
    landmark: "",
    incidentDate: new Date().toISOString().split("T")[0],
    photoUrl: SAMPLE_PHOTOS[0].url,
    citizenName: user?.name || "Rahul Sharma",
    citizenEmail: user?.email || "citizen@civicsaathi.demo",
    citizenPhone: user?.phone || "+91 98765 43210",
  });

  const [errors, setErrors] = useState({});
  const [submittedRequest, setSubmittedRequest] = useState(null);
  const [copied, setCopied] = useState(false);

  // Field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Photo upload simulation
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Validations per step
  const validateStep2 = () => {
    const errs = {};
    if (!formData.description.trim()) {
      errs.description = "Please describe the civic problem clearly.";
    } else if (formData.description.trim().length < 10) {
      errs.description = "Description should be at least 10 characters.";
    }
    if (!formData.locality) {
      errs.locality = "Please choose a locality.";
    }
    if (!formData.landmark.trim()) {
      errs.landmark = "Please specify a nearby landmark or street corner.";
    }
    if (!formData.incidentDate) {
      errs.incidentDate = "Please choose the date of incident.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!formData.citizenName.trim()) {
      errs.citizenName = "Citizen name is required.";
    }
    if (!formData.citizenEmail.trim() || !formData.citizenEmail.includes("@")) {
      errs.citizenEmail = "Valid email address is required.";
    }
    if (!formData.citizenPhone.trim() || formData.citizenPhone.length < 8) {
      errs.citizenPhone = "Valid phone number is required.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!selectedService) {
        setErrors({ service: "Please select a civic service." });
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      if (validateStep3()) {
        setCurrentStep(4);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const created = requestService.createRequest({
      citizenName: formData.citizenName,
      citizenEmail: formData.citizenEmail,
      citizenPhone: formData.citizenPhone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      category: selectedService.category,
      locality: formData.locality,
      landmark: formData.landmark,
      incidentDate: formData.incidentDate,
      description: formData.description,
      assignedDepartment: selectedService.suggestedTeam,
      photoUrl: formData.photoUrl,
    });

    setSubmittedRequest(created);
  };

  const handleCopyId = () => {
    if (submittedRequest) {
      navigator.clipboard.writeText(submittedRequest.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // SUCCESS SCREEN
  if (submittedRequest) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 animate-fade-in">
        <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Registration Successful
            </span>
            <h1 className="text-2xl font-extrabold text-[#102A43]">
              Request Registered in CivicSaathi Demo
            </h1>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Your civic request has been successfully registered in the CivicSaathi demo system. Save the reference ID below to follow the complete lifecycle.
            </p>
          </div>

          {/* Reference ID Showcase Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border-2 border-dashed border-blue-200 max-w-md mx-auto flex items-center justify-between gap-3">
            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Reference Tracking ID
              </span>
              <span className="text-2xl font-mono font-extrabold text-[#102A43]">
                {submittedRequest.id}
              </span>
            </div>
            <button
              onClick={handleCopyId}
              className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          {/* Key Summary Details */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto text-left text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Civic Service</span>
              <span className="font-bold text-slate-800">{submittedRequest.serviceName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Initial Status</span>
              <span className="inline-block font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded text-[11px] mt-0.5">
                Submitted
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Assigned Authority</span>
              <span className="font-medium text-slate-700">{submittedRequest.assignedDepartment}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold uppercase">Locality</span>
              <span className="font-medium text-slate-700">{submittedRequest.locality}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate("track", { targetId: submittedRequest.id })}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Track Request Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("citizen-dashboard")}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              Return to Citizen Dashboard
            </button>
          </div>

          {/* Academic Prototype Notice */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 leading-snug">
            <strong>Demonstration Notice:</strong> This is a prototype submission stored in your browser's LocalStorage for academic demonstration. Not sent to a real municipal agency.
          </div>
        </div>
      </div>
    );
  }

  // MULTI-STEP WIZARD
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
      {/* Title */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43]">
          Guided Civic Request Submission
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Complete the 4 steps to register a trackable municipal grievance.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-4 gap-2">
          {[
            { num: 1, label: "Select Service" },
            { num: 2, label: "Problem Details" },
            { num: 3, label: "Contact Info" },
            { num: 4, label: "Review & Submit" },
          ].map((s) => {
            const isCompleted = s.num < currentStep;
            const isCurrent = s.num === currentStep;

            return (
              <div
                key={s.num}
                className={`flex flex-col sm:flex-row items-center gap-2 p-2 rounded-xl transition-all ${
                  isCurrent ? "bg-blue-50 text-blue-900 font-bold" : "text-slate-500"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isCompleted
                      ? "bg-emerald-500 text-white"
                      : isCurrent
                      ? "bg-[#2563EB] text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {isCompleted ? "✓" : s.num}
                </div>
                <span className="text-[11px] sm:text-xs truncate">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
        {/* STEP 1: Select Civic Service */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 1: Choose Civic Service</h2>
              <p className="text-xs text-slate-500">
                Select the service category that matches your grievance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
              {allServices.map((srv) => {
                const isSelected = selectedService?.id === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-blue-50/70 border-blue-500 ring-2 ring-blue-500/20"
                        : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-[10px] uppercase text-slate-500">
                          {srv.category}
                        </span>
                        <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-medium">
                          {srv.sla}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {srv.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {srv.shortDesc}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="truncate max-w-[170px]">{srv.suggestedTeam}</span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Problem Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 2: Enter Problem Details</h2>
              <p className="text-xs text-slate-500">
                Service: <strong className="text-blue-700">{selectedService.name}</strong> • Responsible: {selectedService.suggestedTeam}
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Problem Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the issue, hazards, or duration (e.g. Streetlight has been flickering and completely off for the last 3 days)..."
                className={`w-full p-3 rounded-xl border text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 ${
                  errors.description ? "border-red-500 bg-red-50/20" : "border-slate-200"
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-600 mt-1">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Locality / Sector <span className="text-red-500">*</span>
                </label>
                <select
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
                >
                  {LOCALITIES.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nearby Landmark / Street <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="e.g. Near Community Park or Opposite School Gate"
                  className={`w-full p-2.5 rounded-xl border text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 ${
                    errors.landmark ? "border-red-500 bg-red-50/20" : "border-slate-200"
                  }`}
                />
                {errors.landmark && (
                  <p className="text-xs text-red-600 mt-1">{errors.landmark}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date of Incident
              </label>
              <input
                type="date"
                name="incidentDate"
                value={formData.incidentDate}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Optional Photo Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Attach Site Photograph (Optional)
              </label>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] text-slate-500 font-medium">Select preset photo:</span>
                  {SAMPLE_PHOTOS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, photoUrl: p.url }))}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all cursor-pointer ${
                        formData.photoUrl === p.url
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium cursor-pointer shadow-2xs">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Upload Local Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {formData.photoUrl && (
                    <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Image Attached
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Contact Details */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 3: Citizen Contact Information</h2>
              <p className="text-xs text-slate-500">
                Official SMS and status tracking notifications will reference this contact.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="citizenName"
                  value={formData.citizenName}
                  onChange={handleChange}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs text-slate-800 ${
                    errors.citizenName ? "border-red-500 bg-red-50/20" : "border-slate-200"
                  }`}
                />
              </div>
              {errors.citizenName && (
                <p className="text-xs text-red-600 mt-1">{errors.citizenName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="citizenEmail"
                    value={formData.citizenEmail}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs text-slate-800 ${
                      errors.citizenEmail ? "border-red-500 bg-red-50/20" : "border-slate-200"
                    }`}
                  />
                </div>
                {errors.citizenEmail && (
                  <p className="text-xs text-red-600 mt-1">{errors.citizenEmail}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="citizenPhone"
                    value={formData.citizenPhone}
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs text-slate-800 ${
                      errors.citizenPhone ? "border-red-500 bg-red-50/20" : "border-slate-200"
                    }`}
                  />
                </div>
                {errors.citizenPhone && (
                  <p className="text-xs text-red-600 mt-1">{errors.citizenPhone}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Review and Submit */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 4: Review Details & Submit</h2>
              <p className="text-xs text-slate-500">
                Please verify all entered parameters before submitting to the CivicSaathi demo system.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Selected Service
                  </span>
                  <span className="text-sm font-bold text-slate-900">{selectedService.name}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-2 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Locality & Landmark
                  </span>
                  <span className="font-semibold text-slate-800">{formData.locality}</span>
                  <span className="text-slate-500 block text-[11px]">{formData.landmark}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Assigned Authority
                  </span>
                  <span className="font-medium text-slate-700">{selectedService.suggestedTeam}</span>
                  <span className="text-teal-700 block text-[11px] font-semibold">SLA: {selectedService.sla}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Problem Description
                </span>
                <p className="text-slate-700 mt-0.5 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-200">
                  {formData.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Citizen Name
                  </span>
                  <span className="font-medium text-slate-800">{formData.citizenName}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Phone / Email
                  </span>
                  <span className="font-medium text-slate-800">{formData.citizenPhone}</span>
                </div>
              </div>
            </div>

            {/* Prototype notice */}
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-[11px] text-blue-900 leading-snug">
              Upon clicking "Confirm & Submit", a unique reference ID will be generated and persisted in LocalStorage.
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Submit Request</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
