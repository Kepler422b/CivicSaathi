import { storageService } from "./storageService";
import { DEPARTMENTS } from "../data/demoData";

const STATUS_COLORS = {
  Submitted: "#64748B",
  Reviewed: "#F59E0B",
  Routed: "#8B5CF6",
  "In Progress": "#3B82F6",
  Completed: "#10B981",
};

export const analyticsService = {
  getMetrics: () => {
    const requests = storageService.getRequests();
    const total = requests.length;

    const statusCounts = {
      Submitted: 0,
      Reviewed: 0,
      Routed: 0,
      "In Progress": 0,
      Completed: 0,
    };

    requests.forEach((r) => {
      if (statusCounts[r.status] !== undefined) {
        statusCounts[r.status] += 1;
      }
    });

    const completed = statusCounts.Completed;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Feedback metrics
    const feedbacks = requests.filter((r) => r.feedback).map((r) => r.feedback);
    let totalScore = 0;
    let scoreCount = 0;
    const ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    feedbacks.forEach((fb) => {
      const avg = Math.round((fb.clarityRating + fb.easeRating) / 2);
      if (ratingBreakdown[avg] !== undefined) {
        ratingBreakdown[avg] += 1;
      }
      totalScore += (fb.clarityRating + fb.easeRating) / 2;
      scoreCount += 1;
    });

    const averageRating = scoreCount > 0 ? (totalScore / scoreCount).toFixed(1) : "4.8";

    // Category breakdown
    const categoryMap = {};
    requests.forEach((r) => {
      const cat = r.category || "General";
      if (!categoryMap[cat]) {
        categoryMap[cat] = { name: cat, total: 0, completed: 0, inProgress: 0 };
      }
      categoryMap[cat].total += 1;
      if (r.status === "Completed") categoryMap[cat].completed += 1;
      if (r.status === "In Progress") categoryMap[cat].inProgress += 1;
    });

    const categoryData = Object.values(categoryMap);

    // Status pie chart data
    const statusPieData = Object.entries(statusCounts).map(([status, count]) => ({
      name: status,
      value: count,
      color: STATUS_COLORS[status] || "#94A3B8",
    }));

    // Department breakdown
    const departmentMap = {};
    DEPARTMENTS.forEach((dept) => {
      departmentMap[dept] = { department: dept.replace(" Department", "").replace(" Team", ""), total: 0, resolved: 0 };
    });

    requests.forEach((r) => {
      const dept = r.assignedDepartment || "Unassigned";
      if (!departmentMap[dept]) {
        departmentMap[dept] = { department: dept.replace(" Department", "").replace(" Team", ""), total: 0, resolved: 0 };
      }
      departmentMap[dept].total += 1;
      if (r.status === "Completed") {
        departmentMap[dept].resolved += 1;
      }
    });

    const departmentData = Object.values(departmentMap).filter((d) => d.total > 0);

    // Trend timeline data (by date or week)
    const timelineMap = {};
    requests.forEach((r) => {
      const d = r.createdAt ? r.createdAt.split("T")[0] : "2026-11-15";
      const shortDate = d.slice(5); // e.g. "11-16"
      if (!timelineMap[shortDate]) {
        timelineMap[shortDate] = { date: shortDate, received: 0, resolved: 0 };
      }
      timelineMap[shortDate].received += 1;
      if (r.status === "Completed") {
        timelineMap[shortDate].resolved += 1;
      }
    });

    const timelineData = Object.keys(timelineMap)
      .sort()
      .map((k) => timelineMap[k]);

    // Rating chart data for Recharts
    const feedbackChartData = [
      { stars: "5 Stars", count: ratingBreakdown[5] },
      { stars: "4 Stars", count: ratingBreakdown[4] },
      { stars: "3 Stars", count: ratingBreakdown[3] },
      { stars: "2 Stars", count: ratingBreakdown[2] },
      { stars: "1 Star", count: ratingBreakdown[1] },
    ];

    return {
      total,
      pending,
      inProgress: statusCounts["In Progress"],
      completed,
      reviewed: statusCounts.Reviewed,
      submitted: statusCounts.Submitted,
      completionRate,
      averageRating,
      feedbackCount: scoreCount,
      categoryData,
      statusPieData,
      departmentData,
      timelineData,
      feedbackChartData,
      feedbacksList: requests.filter((r) => r.feedback).map((r) => ({
        requestId: r.id,
        citizenName: r.citizenName,
        serviceName: r.serviceName,
        locality: r.locality,
        ...r.feedback,
      })),
    };
  },
};
