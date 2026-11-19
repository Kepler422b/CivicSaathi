# CivicSaathi – Smart Citizen Service Navigator & Follow-up Platform

> **Urban System Problem Statement 7:**  
> *"To investigate the interaction between urban services and citizens and identify opportunities for improved service delivery."*  
> **Course:** Semester V Engineering Idea Lab-III  
> **Project Type:** GovTech Civic Service Delivery Prototype  

---

## 🏛️ Executive Summary

**CivicSaathi** is a modern, closed-loop GovTech web platform built to address systemic bottlenecks in municipal service delivery. Traditional civic portals often suffer from:
1. **Opaque routing:** Citizens do not know which department is responsible for an issue.
2. **Missing progress feedback:** Complaints enter a "black box" with zero status milestones.
3. **No accountability:** Field crews lack timestamped tracking, resulting in high pendency.
4. **Lack of citizen feedback loops:** Municipalities lack quantitative satisfaction metrics to evaluate performance.

CivicSaathi solves these challenges with an **intelligent rule-based service catalog**, a **guided multi-step submission engine**, **real-time vertical lifecycle tracking**, and a **staff administration console with Recharts analytics**.

---

## 💻 Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React.js 19** with **Vite 8** | High-performance, modular component hierarchy |
| **Styling & Design** | **Tailwind CSS** | Professional GovTech theme (Deep Navy `#102A43`, Royal Blue `#2563EB`, Teal `#14B8A6`) |
| **Iconography** | **Lucide React** | Consistent, accessible iconography |
| **Data Visualization** | **Recharts** | Interactive Bar, Pie/Donut, and Line charts |
| **Persistence Layer** | **HTML5 LocalStorage Engine** | Browser sandbox persistence (survives page refresh without paid cloud APIs) |
| **Architecture** | **Service Layer Pattern** | Clean separation of UI, Services, and Storage for seamless backend substitution |
| **Internationalization** | **Bilingual Engine** | Instant toggle between **English** and **Hindi (हिंदी)** |

---

## 🚀 Quick Start Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Run the Application
```bash
# 1. Clone or navigate to the repository
cd CivicSaathi

# 2. Install dependencies (if not already installed)
npm install

# 3. Start the local development server
npm run dev
```

Open your browser at:  
👉 **`http://localhost:5173/`**

---

## 🔑 Demo Login Credentials

The application includes simulated authentication with instant role switching for external examinations:

| Portal | Demo Email | Demo Password | Persona & Default Ward |
| :--- | :--- | :--- | :--- |
| **Citizen Portal** | `citizen@civicsaathi.demo` | `demo123` | **Rahul Sharma** • Ward 12 (North) • Mira Road |
| **Staff / Admin Portal** | `staff@civicsaathi.demo` | `demo123` | **Officer Vikram Kulkarni** • Ward 12 Municipal Operations |

> **Examiner Convenience:** You do not need to type credentials manually. Use the **"1-Click Citizen Login"** or **"1-Click Staff Login"** buttons on the Login page, or the **"Switch Portal"** button in the header bar.

---

## 📋 Features Implemented

### 1. Public Landing Page
- Modern GovTech hero section with city illustrations and problem statement alignment.
- Live statistics banner calculated dynamically from stored prototype data.
- Service catalog preview featuring the 8 municipal services.
- 4-step workflow explainer (Discover → Submit → Admin Routing → Track & Feedback).
- Verified citizen testimonials and academic disclaimers.

### 2. Service Discovery Module (8 Municipal Services)
Includes comprehensive service cards with requirements, SLAs, and resolution steps:
1. **Streetlight Not Working** (Electricity & Lighting • 24-48 hrs)
2. **Missed Waste Collection** (Sanitation & Waste • 12-24 hrs)
3. **Drainage and Waterlogging Issue** (Stormwater & Drainage • 24 hrs)
4. **Pothole or Damaged Road** (Roads & Infrastructure • 48-72 hrs)
5. **Water Supply Problem** (Water Supply • 12-36 hrs)
6. **Public Park Maintenance** (Environment & Parks • 3-5 days)
7. **Garbage Dumping Complaint** (Sanitation & Waste • 24 hrs)
8. **Public Sanitation Issue** (Sanitation & Waste • 12-24 hrs)

### 3. Intelligent Rule-Based Service Recommendations
- Allows citizens to describe their grievance in natural language (e.g., *"Street light is not working near my house"*).
- The recommendation engine analyzes keywords and triggers, recommends the matching service, explains **why** it was suggested, and displays the responsible municipal team.

### 4. Guided Multi-Step Submission
- **Step 1:** Service Selection.
- **Step 2:** Problem details (description, locality, nearby landmark, incident date, optional photograph).
- **Step 3:** Citizen contact parameters (name, email, phone).
- **Step 4:** Verification preview & submit.
- Generates a unique reference ID (e.g., `CS-2026-1042`).

### 5. Real-Time Request Tracking Module
- Search by reference ID (with 1-click test button for `CS-2026-1042`).
- Displays problem description, attached photograph, assigned department, and current status.
- Vertical progression timeline:
  - **1. Submitted** → **2. Reviewed** → **3. Routed** → **4. In Progress** → **5. Completed**
- Each stage displays completion checkmark, date/time, and staff remarks.

### 6. Staff / Admin Management Console
- Request queue with filters for status, category, and reference ID.
- Detailed inspection drawer with citizen information and uploaded photos.
- Reassign incorrectly classified categories.
- Assign responsible field department (Streetlight, Waste Management, Drainage, etc.).
- Advance request status with official staff remarks.
- Instant LocalStorage sync: changes reflect immediately on the citizen tracking view.

### 7. Closed-Loop Citizen Feedback
- Unlocked when a request reaches **Completed** status.
- Star ratings for **Clarity** (1–5 ★) and **Ease of Use** (1–5 ★), plus written comments.
- Prevents duplicate feedback for the same reference ID.
- Displayed in the public feedback wall and administrative reports.

### 8. GovTech Recharts Analytics Dashboard
- **Requests by Category:** Interactive Bar Chart.
- **Status Distribution:** Donut / Pie Chart.
- **Intake & Resolution Trend:** Line Chart.
- **Department-wise Workload:** Bar Chart.
- **Citizen Feedback Satisfaction:** Horizontal Rating Distribution Chart.
- Live KPI cards: Total Requests, Completion Rate %, Active Backlog, Average Satisfaction ★.

### 9. Notification System & Accessibility
- In-app notification drawer for Citizen (status updates) and Staff (new submissions, feedback).
- Bilingual toggle: **English** and **Hindi (हिंदी)**.
- High-contrast typography and responsive layouts.

---

## ⏱️ 5-Minute Examination Demonstration Guide

Follow this scenario to demonstrate the complete citizen-to-administration lifecycle to external evaluators:

1. **Step 1: Start as Citizen**
   - Click the **"5-Min Exam Guide"** button in the header.
   - Click **"Switch to Citizen"** or login using `citizen@civicsaathi.demo`.
   - View the personalized Citizen Dashboard and KPI cards.

2. **Step 2: Service Discovery & Recommendation**
   - Navigate to **"Explore Services"**.
   - In the search bar, click the preset prompt: *"Street light is not working near my house"*.
   - Point out the **Intelligent Recommendation Card**: notice the 98% match confidence, explanation of why it matched, and suggested department (*Streetlight Maintenance Team*).

3. **Step 3: Guided Submission**
   - Click **"Submit This Request"**.
   - Notice that *Streetlight Not Working* is pre-selected.
   - Enter problem details (e.g. Locality: *Mira Road*, Landmark: *Near Community Park*).
   - Advance through Step 3 and Step 4, then click **"Confirm & Submit Request"**.
   - Highlight the generated Reference ID (e.g. `CS-2026-1043`).

4. **Step 4: Switch to Staff Portal**
   - Click the **"Switch: To Staff"** button in the top navigation bar.
   - Notice the interface changes to the **Municipal Operations Desk**.
   - Open **"Manage Requests"**.
   - Locate the newly submitted request or demo target **`CS-2026-1042`** in the queue.

5. **Step 5: Administrative Action & Status Update**
   - Select `CS-2026-1042`.
   - Under *Staff Action & Department Routing*:
     - Verify assigned department: *Streetlight Maintenance Team*.
     - Change status from `Submitted` to **`In Progress`**.
     - In *Official Staff Note*, enter: *"Field technician dispatched with 45W replacement LED driver."*
     - Click **"Save & Dispatch Changes"**.

6. **Step 6: Return to Citizen Tracker & Verify Live Sync**
   - Switch back to the **Citizen Portal** (click *"Switch: To Citizen"*).
   - Go to **"Track Request"** and enter `CS-2026-1042`.
   - Show the external examiner the updated vertical status timeline:
     - Notice stage 4 (*Field Work In Progress*) is now active.
     - Point out the official staff note and timestamp logged in step 5!

7. **Step 7: Resolution & Citizen Feedback**
   - Switch back to Staff and mark `CS-2026-1042` as **`Completed`**.
   - Switch back to Citizen: notice the **Citizen Experience Feedback** section is now unlocked!
   - Give 5 stars for Clarity, 5 stars for Ease of Use, and write: *"Excellent repair speed!"*
   - Submit feedback.

8. **Step 8: Analytics Verification**
   - Open **"GovTech Analytics"** in Staff view.
   - Observe how the **Category Bar Chart**, **Status Donut Chart**, and **Feedback Satisfaction Scores** reflect the newly resolved request in real time!

---

## 🏗️ Clean Architecture & Production Migration

CivicSaathi is engineered with an isolated service layer pattern:
```
src/
├── components/          # Reusable UI widgets (Navbar, StatCard, ServiceCard, StatusTimeline)
├── context/             # AuthContext & Language state
├── data/                # Initial demonstration seed & service definitions
├── i18n/                # English & Hindi translations
├── pages/               # Routed portal views (Landing, Dashboards, Submission, Tracking, Analytics)
└── services/            # Isolated business logic & persistence
    ├── storageService.js     # Browser LocalStorage CRUD engine
    ├── requestService.js     # Request lifecycle & history logging
    ├── serviceDirectory.js   # Service catalog & recommendation algorithm
    └── analyticsService.js   # Metric computations for Recharts
```

### Future Production Stack
To deploy this platform in production:
1. **Backend:** Replace `storageService.js` with **FastAPI (Python)** or **Node.js (Express)** REST/GraphQL endpoints.
2. **Database:** Replace LocalStorage with **MongoDB** or **PostgreSQL** with PostGIS geospatial indexing for GIS ward maps.
3. **WebSockets / Firebase:** Push live browser push notifications when municipal officers update request statuses.

---

## ⚖️ Academic Prototype Disclaimer

> **Notice:** CivicSaathi is an academic demonstration prototype developed for **Semester V Engineering Idea Lab-III (Urban System Problem Statement 7)**. All requests, service timelines, and administrative remarks displayed in this application are simulated demonstration records and are **not** officially submitted to any municipal corporation or government department.
