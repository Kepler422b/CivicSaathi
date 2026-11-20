import { storageService } from "./storageService";

export const requestService = {
  getAllRequests: () => {
    return storageService.getRequests();
  },

  getRequestById: (id) => {
    if (!id) return null;
    const cleanId = id.trim().toUpperCase();
    const requests = storageService.getRequests();
    return requests.find((r) => r.id.toUpperCase() === cleanId) || null;
  },

  generateReferenceId: () => {
    const requests = storageService.getRequests();
    let maxNum = 1042;
    for (const r of requests) {
      const match = r.id.match(/CS-2026-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    }
    return `CS-2026-${maxNum + 1}`;
  },

  createRequest: (data) => {
    const requests = storageService.getRequests();
    const newId = requestService.generateReferenceId();
    const now = new Date().toISOString();

    const newRequest = {
      id: newId,
      citizenName: data.citizenName || "Demo Citizen",
      citizenEmail: data.citizenEmail || "citizen@civicsaathi.demo",
      citizenPhone: data.citizenPhone || "+91 98765 43210",
      serviceId: data.serviceId || "srv-custom",
      serviceName: data.serviceName || "General Civic Issue",
      category: data.category || "General Municipal Services",
      locality: data.locality || "Central Ward",
      landmark: data.landmark || "Near Main Junction",
      incidentDate: data.incidentDate || now.split("T")[0],
      description: data.description || "No description provided.",
      assignedDepartment: data.assignedDepartment || "Ward Dispatch Desk",
      status: "Submitted",
      createdAt: now,
      updatedAt: now,
      photoUrl: data.photoUrl || "https://images.unsplash.com/photo-1516245834210-c4c142787335?w=600&auto=format&fit=crop&q=80",
      history: [
        {
          status: "Submitted",
          timestamp: now,
          remarks: data.initialRemarks || "Civic request registered in CivicSaathi portal. Waiting for desk officer review.",
          updatedBy: `${data.citizenName || "Citizen"} (Citizen Portal)`,
        },
      ],
      feedback: null,
    };

    const updatedRequests = [newRequest, ...requests];
    storageService.saveRequests(updatedRequests);

    // Notify staff
    const notifs = storageService.getNotifications();
    const staffNotif = {
      id: `notif-${Date.now()}-staff`,
      targetRole: "staff",
      title: `New Civic Request: ${newId}`,
      message: `${newRequest.citizenName} reported "${newRequest.serviceName}" at ${newRequest.locality}.`,
      timestamp: now,
      read: false,
      requestId: newId,
      type: "warning",
    };

    // Notify citizen
    const citizenNotif = {
      id: `notif-${Date.now()}-cit`,
      targetRole: "citizen",
      title: `Request Registered: ${newId}`,
      message: `Your report for "${newRequest.serviceName}" has been logged successfully. Track anytime using ${newId}.`,
      timestamp: now,
      read: false,
      requestId: newId,
      type: "info",
    };

    storageService.saveNotifications([staffNotif, citizenNotif, ...notifs]);
    window.dispatchEvent(new CustomEvent("civicsaathi:data-changed"));

    return newRequest;
  },

  updateRequestStatus: ({ id, newStatus, staffRemarks, assignedDepartment, updatedCategory, staffName = "Officer Vikram Kulkarni (Staff)" }) => {
    const requests = storageService.getRequests();
    const now = new Date().toISOString();
    let updatedTarget = null;

    const updatedRequests = requests.map((req) => {
      if (req.id.toUpperCase() === id.trim().toUpperCase()) {
        const history = [...(req.history || [])];

        // Default automated remark if none supplied
        let defaultRemark = `Status updated to ${newStatus}.`;
        if (newStatus === "Reviewed") defaultRemark = "Request verified and approved by municipal desk officer.";
        if (newStatus === "Routed") defaultRemark = `Dispatched to ${assignedDepartment || req.assignedDepartment}.`;
        if (newStatus === "In Progress") defaultRemark = "Maintenance crew deployed on ground; active resolution in progress.";
        if (newStatus === "Completed") defaultRemark = "Resolution work completed and audited on site. Closed for citizen review.";

        history.push({
          status: newStatus,
          timestamp: now,
          remarks: staffRemarks || defaultRemark,
          updatedBy: staffName,
        });

        updatedTarget = {
          ...req,
          status: newStatus,
          assignedDepartment: assignedDepartment || req.assignedDepartment,
          category: updatedCategory || req.category,
          updatedAt: now,
          history,
        };
        return updatedTarget;
      }
      return req;
    });

    if (updatedTarget) {
      storageService.saveRequests(updatedRequests);

      // Create citizen notification
      const notifs = storageService.getNotifications();
      const notifType = newStatus === "Completed" ? "success" : newStatus === "In Progress" ? "info" : "warning";
      const citizenNotif = {
        id: `notif-${Date.now()}-upd`,
        targetRole: "citizen",
        title: `Request ${updatedTarget.id} ${newStatus}`,
        message: `${updatedTarget.serviceName} at ${updatedTarget.locality} is now ${newStatus}. Remarks: "${staffRemarks || 'Status updated by department'}".`,
        timestamp: now,
        read: false,
        requestId: updatedTarget.id,
        type: notifType,
      };

      storageService.saveNotifications([citizenNotif, ...notifs]);
      window.dispatchEvent(new CustomEvent("civicsaathi:data-changed"));
    }

    return updatedTarget;
  },

  submitFeedback: (id, { clarityRating, easeRating, comments }) => {
    const requests = storageService.getRequests();
    const now = new Date().toISOString();
    let updatedTarget = null;

    const updatedRequests = requests.map((req) => {
      if (req.id.toUpperCase() === id.trim().toUpperCase()) {
        updatedTarget = {
          ...req,
          feedback: {
            clarityRating: Number(clarityRating) || 5,
            easeRating: Number(easeRating) || 5,
            comments: comments || "Process was smooth and transparent.",
            submittedAt: now,
          },
        };
        return updatedTarget;
      }
      return req;
    });

    if (updatedTarget) {
      storageService.saveRequests(updatedRequests);

      // Notify staff
      const notifs = storageService.getNotifications();
      const avg = ((Number(clarityRating) + Number(easeRating)) / 2).toFixed(1);
      const staffNotif = {
        id: `notif-${Date.now()}-fb`,
        targetRole: "staff",
        title: `Citizen Feedback for ${updatedTarget.id}`,
        message: `${avg}★ rating received from ${updatedTarget.citizenName}. Comment: "${comments || 'No comment provided.'}"`,
        timestamp: now,
        read: false,
        requestId: updatedTarget.id,
        type: "success",
      };

      storageService.saveNotifications([staffNotif, ...notifs]);
      window.dispatchEvent(new CustomEvent("civicsaathi:data-changed"));
    }

    return updatedTarget;
  },

  getNotificationsForRole: (role) => {
    const all = storageService.getNotifications();
    return all.filter((n) => n.targetRole === role || n.targetRole === "all");
  },

  markNotificationsAsRead: (role) => {
    const all = storageService.getNotifications();
    const updated = all.map((n) => (n.targetRole === role ? { ...n, read: true } : n));
    storageService.saveNotifications(updated);
    window.dispatchEvent(new CustomEvent("civicsaathi:data-changed"));
    return updated.filter((n) => n.targetRole === role);
  },
};
