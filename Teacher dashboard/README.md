# Disha — AI Teacher Dashboard for Prashiksha

**Disha** is an AI-powered teacher dashboard built for the **Prashiksha** ecosystem. It provides educators with a modern command center for student evaluation, performance monitoring, class management, AI diagnostics, and teaching workflows.

The user interface and design have been crafted to match the exact visual style, typography, color palette, buttons, cards, and charts from `Prachiksha AI Teacher Dashboard.png`.

---

## 🔐 Complete Linked Site Flow

1. **First-Time / Entry Point (`index.html`)**:
   - When anyone opens the site (e.g. by double-clicking [`index.html`](file:///c:/Users/singh/OneDrive/Documents/Teacher%20dashboard/index.html) or visiting `http://localhost:8000/`), the **Teacher Login Page** displays first.
   - Credentials come pre-filled for instant testing (`ananya.sharma@prashiksha.edu`).
   - Supports both password login and Campus Single Sign-On (SSO).
2. **Post-Authentication (`dashboard.html`)**:
   - Upon successful sign-in, the user is authenticated and smoothly redirected to the **Disha Teacher Dashboard**.
   - Includes real-time student evaluation, performance trend line graph, class-wise bar chart, teaching load donut graph, and quick actions.
3. **Session Guard & Log Out**:
   - Direct access to [`dashboard.html`](file:///c:/Users/singh/OneDrive/Documents/Teacher%20dashboard/dashboard.html) is protected; unauthenticated visitors are automatically directed to the login page.
   - Clicking **Log Out** (from the top-right teacher profile dropdown or the Settings view) safely ends the session and returns to the login page.

---

## 🌟 Key Dashboard Features

- **Instructor Header with Full Profile & Hover Logout**:
  - Displays **Dr. Ananya Sharma** (Instructor · CSE) with active status dot.
  - Hovering opens a quick dropdown with faculty details, settings, and a direct **Log Out** button.
  - Clicking opens an expanded **Full Faculty Dossier Modal** showcasing complete credentials, office cabin, contact info, active batch allocations, student mastery statistics, and session logout.
- **Student Performance Overview Line Chart**: Progressive drawing animation across May–Oct with floating **Oct ↑ 78%** badge and 3-timeframe switcher.
- **Class-wise Performance Bar Chart**: Staggered rising bars comparing CSE 1st Year (82%), CSE 2nd Year (76%), and CSE 3rd Year (69%).
- **Teaching Load Distribution Donut/Pie Chart**: 360° radial sweep animation in the Students tab showing enrollment across batches.
- **Student Evaluation System**: AI diagnostic cards, Recent Evaluations table with modal inspector, and priority list of **Students Needing Extra Attention** (`58%`, `62%`, `64%`, `67%`, `69%`).
- **Quick Action Workflows**: Create Assignment, Generate AI Quiz, Upload Study Material, and Send Announcement.

---

## 🚀 How to Run

### Option A: Direct Open
Simply double-click [`index.html`](file:///c:/Users/singh/OneDrive/Documents/Teacher%20dashboard/index.html) in your file explorer. The login screen will open, and clicking **Sign In** will take you straight to the dashboard.

### Option B: Local Web Server
```powershell
python -m http.server 8000
```
Then open `http://localhost:8000/` in your browser.

---

## 📁 File Structure

- [`index.html`](file:///c:/Users/singh/OneDrive/Documents/Teacher%20dashboard/index.html): Main site entrypoint containing the Teacher Login Page.
- [`dashboard.html`](file:///c:/Users/singh/OneDrive/Documents/Teacher%20dashboard/dashboard.html): Complete Disha Teacher Dashboard matching the design mockup.
- [`login.html`](file:///c:/Users/singh/OneDrive/Documents/Teacher%20dashboard/login.html): Alias redirect to `index.html`.
- [`app.js`](file:///c:/Users/singh/OneDrive/Documents/Teacher%20dashboard/app.js): Application logic, Chart.js integrations, search, tab switcher, and session logout handler.
- [`style.css`](file:///c:/Users/singh/OneDrive/Documents/Teacher%20dashboard/style.css): Design system styles, typography, tabular numbers, and animations.
- [`Prachiksha AI Teacher Dashboard.png`](file:///c:/Users/singh/OneDrive/Documents/Teacher%20dashboard/Prachiksha%20AI%20Teacher%20Dashboard.png): Original design mockup reference.
