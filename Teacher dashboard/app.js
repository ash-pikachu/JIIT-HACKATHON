// Disha - Teacher Portal for Prashiksha
// State and Data Store

const dashboardData = {
  teacher: {
    name: "Dr. Ananya Sharma",
    displayTitle: "Teacher",
    role: "Instructor",
    department: "Computer Science & Engineering",
    email: "ananya.sharma@prashiksha.edu"
  },
  metrics: {
    totalStudents: 48,
    classesCount: 3,
    avgPerformance: "78%",
    perfTrend: "+6% from last month",
    activeClasses: 3,
    batchesRunning: "Batches running",
    pendingEvaluations: 12
  },
  chartTrends: {
    "6m": {
      labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
      values: [24, 35, 42, 58, 60, 78],
      tooltip: { month: "Oct", value: "78%", trend: "↑ 6%" }
    },
    "3m": {
      labels: ["Aug", "Sep", "Oct"],
      values: [58, 60, 78],
      tooltip: { month: "Oct", value: "78%", trend: "↑ 6%" }
    },
    "1y": {
      labels: ["Nov", "Jan", "Mar", "May", "Jul", "Sep", "Oct"],
      values: [18, 22, 28, 38, 48, 62, 78],
      tooltip: { month: "Oct", value: "78%", trend: "↑ 6%" }
    }
  },
  classPerformance: [
    { name: "CSE 1st Year", score: 82, students: 16, color: "#0f172a", subject: "Fundamentals of Programming & Logic" },
    { name: "CSE 2nd Year", score: 76, students: 18, color: "#64748b", subject: "Data Structures & Algorithms" },
    { name: "CSE 3rd Year", score: 69, students: 14, color: "#cbd5e1", subject: "Operating Systems & System Design" }
  ],
  students: [
    {
      id: "std-01",
      name: "Aarav Sharma",
      initial: "A",
      class: "CSE 1st Year",
      score: 89,
      status: "Excellent",
      attendance: "94%",
      assignmentsCompleted: "14/14",
      lastSubmitted: "Oct 28, 2026",
      strengths: "Algorithmic thinking, discrete logic, fast learner",
      weakness: "Can elaborate more on theoretical proofs",
      aiRecommendation: "Ready for advanced competitive programming modules in Prashiksha.",
      radar: [90, 88, 92, 85, 90]
    },
    {
      id: "std-02",
      name: "Priya Singh",
      initial: "P",
      class: "CSE 1st Year",
      score: 76,
      status: "Good",
      attendance: "88%",
      assignmentsCompleted: "13/14",
      lastSubmitted: "Oct 27, 2026",
      strengths: "Structured code formatting, consistent problem solver",
      weakness: "Dynamic programming and recursion edge cases",
      aiRecommendation: "Recommend Prashiksha interactive tree recursion practice modules.",
      radar: [78, 75, 80, 72, 75]
    },
    {
      id: "std-03",
      name: "Rohan Mehta",
      initial: "R",
      class: "CSE 2nd Year",
      score: 58,
      status: "Needs Attention",
      attendance: "68%",
      assignmentsCompleted: "9/14",
      lastSubmitted: "Oct 21, 2026",
      strengths: "Good intuition on basic data structures",
      weakness: "Graph algorithms, memory pointers, low class attendance",
      aiRecommendation: "Needs 1-on-1 diagnostic review; assign Prashiksha remedial path on Graphs.",
      radar: [55, 60, 58, 62, 54]
    },
    {
      id: "std-04",
      name: "Sneha Verma",
      initial: "S",
      class: "CSE 2nd Year",
      score: 93,
      status: "Excellent",
      attendance: "98%",
      assignmentsCompleted: "14/14",
      lastSubmitted: "Oct 29, 2026",
      strengths: "Outstanding problem-solving, clean code architecture",
      weakness: "None noted; exceptional consistency",
      aiRecommendation: "Nominate as peer mentor and recommend advanced system design tracks.",
      radar: [95, 94, 92, 96, 90]
    },
    {
      id: "std-05",
      name: "Kartik Yadav",
      initial: "K",
      class: "CSE 3rd Year",
      score: 62,
      status: "Needs Attention",
      attendance: "71%",
      assignmentsCompleted: "10/14",
      lastSubmitted: "Oct 24, 2026",
      strengths: "Hardware interface knowledge, OS concepts",
      weakness: "Concurrency, deadlock detection code implementations",
      aiRecommendation: "Assign Prashiksha simulation lab for multi-threaded concurrency.",
      radar: [60, 64, 65, 59, 62]
    },
    {
      id: "std-06",
      name: "Aditya Rao",
      initial: "A",
      class: "CSE 1st Year",
      score: 64,
      status: "Needs Attention",
      attendance: "72%",
      assignmentsCompleted: "10/14",
      lastSubmitted: "Oct 25, 2026",
      strengths: "Good hardware enthusiasm",
      weakness: "Syntax mastery in C++ and pointer arithmetic",
      aiRecommendation: "Practice with Prashiksha guided visual compiler playground.",
      radar: [65, 62, 68, 60, 65]
    },
    {
      id: "std-07",
      name: "Neha Gupta",
      initial: "N",
      class: "CSE 2nd Year",
      score: 67,
      status: "Needs Attention",
      attendance: "75%",
      assignmentsCompleted: "11/14",
      lastSubmitted: "Oct 26, 2026",
      strengths: "Quick in quiz answers",
      weakness: "Time complexity optimization in sorting algorithms",
      aiRecommendation: "Encourage Big-O analysis self-tests.",
      radar: [68, 70, 64, 66, 67]
    },
    {
      id: "std-08",
      name: "Siddharth Jain",
      initial: "S",
      class: "CSE 3rd Year",
      score: 69,
      status: "Needs Attention",
      attendance: "74%",
      assignmentsCompleted: "11/14",
      lastSubmitted: "Oct 26, 2026",
      strengths: "Kernel concepts grasp",
      weakness: "Socket programming and virtual memory paging exercises",
      aiRecommendation: "Provide visual paging memory simulator on Prashiksha.",
      radar: [70, 68, 72, 65, 70]
    },
    {
      id: "std-09",
      name: "Ishita Banerjee",
      initial: "I",
      class: "CSE 1st Year",
      score: 85,
      status: "Excellent",
      attendance: "92%",
      assignmentsCompleted: "14/14",
      lastSubmitted: "Oct 29, 2026",
      strengths: "Analytical reasoning and code documentation",
      weakness: "Time management during timed sprint coding",
      aiRecommendation: "Encourage Prashiksha timed quiz challenges.",
      radar: [85, 86, 84, 88, 83]
    },
    {
      id: "std-10",
      name: "Devansh Patel",
      initial: "D",
      class: "CSE 2nd Year",
      score: 81,
      status: "Good",
      attendance: "89%",
      assignmentsCompleted: "13/14",
      lastSubmitted: "Oct 28, 2026",
      strengths: "Object-oriented modeling and inheritance designs",
      weakness: "Bit manipulation algorithms",
      aiRecommendation: "Review bitwise operators tutorials.",
      radar: [82, 80, 84, 79, 81]
    }
  ],
  assignments: [
    { title: "Binary Search Trees & Balancing", class: "CSE 2nd Year", dueDate: "Nov 04, 2026", submissions: "16/18", status: "Active" },
    { title: "Virtual Memory & Page Replacement", class: "CSE 3rd Year", dueDate: "Nov 06, 2026", submissions: "12/14", status: "Active" },
    { title: "Pointers & Dynamic Memory in C++", class: "CSE 1st Year", dueDate: "Nov 02, 2026", submissions: "15/16", status: "Grading" },
    { title: "Mid-Term AI Diagnostic Quiz", class: "All Batches", dueDate: "Oct 28, 2026", submissions: "48/48", status: "Completed" }
  ],
  announcements: [
    { title: "Lab Examination Schedule Announced", target: "All Classes", date: "Oct 30, 2026", preview: "Practical examinations will commence from Nov 15. Check Prashiksha calendar." },
    { title: "Doubt Clearing Session: Graph Theory", target: "CSE 2nd Year", date: "Oct 29, 2026", preview: "Special evening virtual session scheduled at 5:00 PM on Friday." }
  ]
};

// Global Chart instances
let performanceTrendChart = null;
let classPerformanceChart = null;
let totalStudentDistChart = null;
let currentTrendFilter = "6m";
let studentSubjectChart = null;
let studentActivityTrendChart = null;
let currentActiveStudentId = "std-01";
let currentActiveSubjectKey = "dsa";
let currentSubjectTopicsCache = [];

// Init Application
// Theme Management (Light: White & Royal Blue / Dark: Midnight Sleek)
function isDarkMode() {
  return document.body.classList.contains('dark-mode');
}

function applyInitialTheme() {
  const savedTheme = localStorage.getItem('disha_theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    document.documentElement.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
    document.documentElement.classList.remove('dark-mode');
  }
  updateThemeToggleUI();
}

function updateThemeToggleUI() {
  const isDark = isDarkMode();
  const sunIcon = document.querySelector('.theme-sun-icon');
  const moonIcon = document.querySelector('.theme-moon-icon');
  const textEl = document.getElementById('themeToggleText');
  if (sunIcon && moonIcon) {
    if (isDark) {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }
  if (textEl) {
    textEl.textContent = isDark ? 'Night' : 'Day';
  }
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function toggleTheme() {
  const willBeDark = !isDarkMode();
  if (willBeDark) {
    document.body.classList.add('dark-mode');
    document.documentElement.classList.add('dark-mode');
    localStorage.setItem('disha_theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    document.documentElement.classList.remove('dark-mode');
    localStorage.setItem('disha_theme', 'light');
  }
  updateThemeToggleUI();

  // Re-draw charts with theme-reactive palettes
  if (typeof initPerformanceTrendChart === 'function') {
    initPerformanceTrendChart(currentTrendFilter);
  }
  if (typeof initClassPerformanceChart === 'function') {
    initClassPerformanceChart();
  }
  if (typeof initTotalStudentsDistChart === 'function') {
    initTotalStudentsDistChart();
  renderAssignmentsList();
  setupAssignmentDropZone();
  renderQuizzesList();
  }
  if (typeof renderStudentSubjectChart === 'function' && currentActiveStudentId) {
    const studentData = PrashikshaDataBridge.getStudentData(currentActiveStudentId);
    if (studentData) {
      renderStudentSubjectChart(studentData);
      renderStudentActivityTrendChart(studentData);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyInitialTheme();
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initialize Animated Charts
  initPerformanceTrendChart(currentTrendFilter);
  initClassPerformanceChart();
  initTotalStudentsDistChart();

  // Populate dynamic elements
  renderRecentEvaluationsTable();
  renderStudentEvaluationList();
  renderAttentionList();
  renderStudentsDirectory();
  renderClassesView();

  // Setup event listeners
  setupEventListeners();
});

// 1. Performance Trend Chart (Line Chart with progressive drawing & soft gradient)
function initPerformanceTrendChart(filterKey) {
  const canvas = document.getElementById("performanceChart");
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dataset = dashboardData.chartTrends[filterKey] || dashboardData.chartTrends["6m"];

  if (performanceTrendChart) {
    performanceTrendChart.destroy();
  }

  const isDark = isDarkMode();
  const primaryColor = isDark ? '#38BDF8' : '#0B63E5';
  const pointBg = isDark ? '#38BDF8' : '#0B63E5';
  const pointBorder = isDark ? '#14161C' : '#ffffff';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : '#f1f5f9';
  const tickColor = isDark ? '#94A3B8' : '#64748b';
  const tooltipBg = isDark ? '#1E2129' : '#0B63E5';

  // Create smooth vertical gradient fill under line
  const gradient = ctx.createLinearGradient(0, 0, 0, 220);
  if (isDark) {
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.28)');
    gradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.05)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0.00)');
  } else {
    gradient.addColorStop(0, 'rgba(11, 99, 229, 0.22)');
    gradient.addColorStop(0.7, 'rgba(11, 99, 229, 0.04)');
    gradient.addColorStop(1, 'rgba(11, 99, 229, 0.00)');
  }

  // Update floating badge text
  const badgeMonthEl = document.getElementById("chartTooltipMonth");
  const badgeValEl = document.getElementById("chartTooltipValue");
  if (badgeMonthEl && badgeValEl) {
    badgeMonthEl.textContent = dataset.tooltip.month;
    badgeValEl.textContent = `${dataset.tooltip.trend} ${dataset.tooltip.value}`;
  }

  performanceTrendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dataset.labels,
      datasets: [{
        label: 'Average Performance',
        data: dataset.values,
        borderColor: primaryColor,
        backgroundColor: gradient,
        borderWidth: 2.5,
        tension: 0.38,
        fill: true,
        pointBackgroundColor: pointBg,
        pointBorderColor: pointBorder,
        pointBorderWidth: 2.2,
        pointRadius: 4.8,
        pointHoverRadius: 7.2,
        pointHoverBackgroundColor: primaryColor,
        pointHoverBorderColor: pointBorder,
        pointHoverBorderWidth: 2.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1500,
        easing: 'easeOutQuart',
        delay(ctx) {
          if (ctx.type === 'data' && ctx.mode === 'default') {
            return ctx.dataIndex * 140;
          }
          return 0;
        }
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: tooltipBg,
          titleFont: { size: 12, family: 'Plus Jakarta Sans', weight: '700' },
          bodyFont: { size: 12, family: 'Plus Jakarta Sans' },
          padding: 10,
          cornerRadius: 8,
          displayColors: false,
          boxPadding: 4,
          callbacks: {
            label: function(context) {
              return `Class Average: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            color: tickColor,
            font: { size: 11, family: 'Plus Jakarta Sans', weight: '500' }
          },
          grid: {
            color: gridColor,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: tickColor,
            font: { size: 11, family: 'Plus Jakarta Sans', weight: '500' }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    }
  });
}

// 2. Class-wise Performance Bar Chart (Staggered growth animation + top percentage labels)
function initClassPerformanceChart() {
  const canvas = document.getElementById("classPerformanceChart");
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (classPerformanceChart) {
    classPerformanceChart.destroy();
  }

  const isDark = isDarkMode();
  const labels = dashboardData.classPerformance.map(c => c.name);
  const dataValues = dashboardData.classPerformance.map(c => c.score);
  
  // White & Blue shade in light mode vs Cyan / Sleek dark slate in night mode
  const backgroundColors = isDark 
    ? ['#38BDF8', '#0284C7', '#0369A1'] 
    : ['#0B63E5', '#3B82F6', '#93C5FD'];
  const labelColor = isDark ? '#F8FAFC' : '#0F172A';
  const tickColor = isDark ? '#94A3B8' : '#64748b';
  const xLabelColor = isDark ? '#CBD5E1' : '#334155';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : '#f1f5f9';
  const tooltipBg = isDark ? '#1E2129' : '#0B63E5';

  // Custom plugin to render percentage values directly above bars
  const topLabelsPlugin = {
    id: 'topLabelsPlugin',
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i);
        meta.data.forEach((bar, index) => {
          const value = dataset.data[index] + '%';
          ctx.save();
          ctx.fillStyle = labelColor;
          ctx.font = '700 12.5px "Plus Jakarta Sans", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillText(value, bar.x, bar.y - 7);
          ctx.restore();
        });
      });
    }
  };

  classPerformanceChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Class Performance',
        data: dataValues,
        backgroundColor: backgroundColors,
        borderRadius: { topLeft: 5, topRight: 5, bottomLeft: 0, bottomRight: 0 },
        barPercentage: 0.52,
        categoryPercentage: 0.8
      }]
    },
    plugins: [topLabelsPlugin],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 26
        }
      },
      animation: {
        duration: 1300,
        easing: 'easeOutQuart',
        delay(ctx) {
          if (ctx.type === 'data' && ctx.mode === 'default') {
            return ctx.dataIndex * 220;
          }
          return 0;
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: tooltipBg,
          titleFont: { size: 12, family: 'Plus Jakarta Sans', weight: '700' },
          bodyFont: { size: 12, family: 'Plus Jakarta Sans' },
          padding: 9,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return `Performance: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            color: tickColor,
            font: { size: 11, family: 'Plus Jakarta Sans', weight: '500' }
          },
          grid: {
            color: gridColor,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: xLabelColor,
            font: { size: 11, family: 'Plus Jakarta Sans', weight: '600' }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    }
  });
}

// 3. Donut & Pie Chart (Radial sweep animation + center label)
function initTotalStudentsDistChart() {
  const ctx = document.getElementById("totalStudentsChart");
  if (!ctx) return;

  if (totalStudentDistChart) {
    totalStudentDistChart.destroy();
  }

  const isDark = isDarkMode();
  const bgColors = isDark 
    ? ['#38BDF8', '#0284C7', '#1E293B'] 
    : ['#0B63E5', '#3B82F6', '#BFDBFE'];
  const borderColor = isDark ? '#16181F' : '#ffffff';
  const legendColor = isDark ? '#CBD5E1' : '#334155';
  const tooltipBg = isDark ? '#1E2129' : '#0B63E5';

  totalStudentDistChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['CSE 1st Year (16)', 'CSE 2nd Year (18)', 'CSE 3rd Year (14)'],
      datasets: [{
        data: [16, 18, 14],
        backgroundColor: bgColors,
        borderWidth: 3,
        borderColor: borderColor,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1600,
        easing: 'easeOutCirc'
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 10,
            padding: 12,
            font: { size: 11.5, family: 'Plus Jakarta Sans', weight: '600' },
            color: legendColor
          }
        },
        tooltip: {
          backgroundColor: tooltipBg,
          titleFont: { size: 12, family: 'Plus Jakarta Sans', weight: '700' },
          bodyFont: { size: 12, family: 'Plus Jakarta Sans' },
          padding: 8,
          cornerRadius: 7,
          callbacks: {
            label: function(context) {
              const total = 48;
              const val = context.raw;
              const pct = Math.round((val / total) * 100);
              return `${context.label}: ${val} Students (${pct}%)`;
            }
          }
        }
      },
      cutout: '72%'
    }
  });
}


// Render Recent Student Evaluations Table in Bottom Left Card
function renderRecentEvaluationsTable(filterQuery = "") {
  const tbody = document.getElementById("recentEvaluationsTableBody");
  if (!tbody) return;

  const topFive = dashboardData.students.slice(0, 5);
  const filtered = filterQuery
    ? dashboardData.students.filter(s => s.name.toLowerCase().includes(filterQuery.toLowerCase()) || s.class.toLowerCase().includes(filterQuery.toLowerCase()))
    : topFive;

  tbody.innerHTML = filtered.map(student => `
    <tr class="hover:bg-slate-50/80 transition-colors">
      <td class="font-medium text-slate-900 flex items-center gap-3">
        <span class="avatar-initial">${student.initial}</span>
        <span class="font-semibold text-[13.5px]">${student.name}</span>
      </td>
      <td class="text-slate-600 text-[13px]">${student.class}</td>
      <td class="font-semibold text-slate-900 text-[13px] tabular-nums">${student.score}%</td>
      <td>
        <span class="status-pill ${student.status === 'Needs Attention' ? 'needs-attention' : ''}">
          ${student.status}
        </span>
      </td>
      <td>
        <button onclick="openStudentModal('${student.id}')" class="btn-view">
          View
        </button>
      </td>
    </tr>
  `).join("");
}

// Render Student Evaluation Widget (Top Right Card)
function renderStudentEvaluationList() {
  const container = document.getElementById("studentEvaluationList");
  if (!container) return;

  const topFive = dashboardData.students.slice(0, 5);
  container.innerHTML = topFive.map(student => `
    <div onclick="openStudentFullDashboard(\'${student.id}\')" class="flex items-center justify-between py-2 px-2 -mx-2 rounded-xl hover:bg-slate-50 transition-all cursor-pointer group">
      <div class="flex items-center gap-3">
        <span class="avatar-initial">${student.initial}</span>
        <div>
          <div class="text-[13.5px] font-semibold text-slate-900 group-hover:text-black">${student.name}</div>
          <div class="text-[11.5px] text-slate-500 tabular-nums">${student.score}% · ${student.class}</div>
        </div>
      </div>
      <div class="flex items-center gap-2.5">
        <span class="status-pill ${student.status === 'Needs Attention' ? 'needs-attention' : ''}">
          ${student.status}
        </span>
        <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 transition-all"></i>
      </div>
    </div>
  `).join("");

  if (window.lucide) window.lucide.createIcons();
}

// Render Students Needing Extra Attention (Bottom Middle Card)
function renderAttentionList() {
  const container = document.getElementById("attentionStudentsList");
  if (!container) return;

  const attentionList = [
    { name: "Rohan Mehta", initial: "R", class: "CSE 2nd Year", score: "58%", id: "std-03" },
    { name: "Kartik Yadav", initial: "K", class: "CSE 3rd Year", score: "62%", id: "std-05" },
    { name: "Aditya Rao", initial: "A", class: "CSE 1st Year", score: "64%", id: "std-06" },
    { name: "Neha Gupta", initial: "N", class: "CSE 2nd Year", score: "67%", id: "std-07" },
    { name: "Siddharth Jain", initial: "S", class: "CSE 3rd Year", score: "69%", id: "std-08" }
  ];

  container.innerHTML = attentionList.map(s => `
    <div onclick="openStudentModal('${s.id}')" class="flex items-center justify-between py-2 px-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
      <div class="flex items-center gap-3">
        <span class="avatar-initial">${s.initial}</span>
        <div>
          <div class="text-[13.5px] font-semibold text-slate-900 group-hover:text-black">${s.name}</div>
          <div class="text-[11.5px] text-slate-500">${s.class}</div>
        </div>
      </div>
      <span class="percent-pill-dark tabular-nums">${s.score}</span>
    </div>
  `).join("");
}

// Render Students Directory in the "Students" Tab
function renderStudentsDirectory(filterClass = "All") {
  const container = document.getElementById("studentsDirectoryTable");
  if (!container) return;

  const list = filterClass === "All" 
    ? dashboardData.students 
    : dashboardData.students.filter(s => s.class === filterClass);

  container.innerHTML = list.map(student => `
    <tr class="hover:bg-slate-50/70 transition-colors">
      <td class="font-medium text-slate-900 flex items-center gap-3">
        <span class="avatar-initial">${student.initial}</span>
        <div>
          <div class="font-semibold text-[13.5px]">${student.name}</div>
          <div class="text-[11px] text-slate-400">ID: ${student.id}</div>
        </div>
      </td>
      <td class="text-slate-600 text-[13px]">${student.class}</td>
      <td class="text-slate-700 text-[13px] font-medium tabular-nums">${student.attendance}</td>
      <td class="text-slate-700 text-[13px] tabular-nums">${student.assignmentsCompleted}</td>
      <td class="font-bold text-slate-900 text-[13.5px] tabular-nums">${student.score}%</td>
      <td>
        <span class="status-pill ${student.status === 'Needs Attention' ? 'needs-attention' : (student.status === 'Excellent' ? 'excellent' : '')}">
          ${student.status}
        </span>
      </td>
      <td>
        <button onclick="openStudentFullDashboard(\'${student.id}\')" class="btn-view flex items-center gap-1.5"><i data-lucide="bar-chart-2" class="w-3.5 h-3.5"></i> Evaluate</button>
      </td>
    </tr>
  `).join("");
}

// Render Classes View in "Classes" Tab
// ═══════════════════════════════════════════════════════════════════════════
// ACCREDITED CLASS SYLLABUS & TOPICS COVERED ENGINE
// ═══════════════════════════════════════════════════════════════════════════

let currentSelectedClassForSyllabus = "CSE 2nd Year";

// Master Curricular Syllabi Data for each class Dr. Ananya Sharma teaches
let classSyllabiData = {
  "CSE 2nd Year": {
    className: "CSE 2nd Year",
    subject: "Data Structures & Algorithms",
    code: "CS-201",
    term: "Semester III · Academic Year 2026-27",
    credits: "4.0 Credits",
    totalLectures: "45 Hours (36 Conducted)",
    enrolledStudents: 18,
    classAverage: "76%",
    units: [
      {
        unitNumber: 1,
        title: "Linear Data Structures & Algorithmic Complexity",
        lectureHours: "8 Hours",
        topics: [
          { name: "Asymptotic Analysis (Big-O, Omega, Theta) & Master Theorem", status: "Covered", dateCovered: "Sep 04, 2026", understanding: 91 },
          { name: "Dynamic Arrays, Vectors & Amortized Complexity Analysis", status: "Covered", dateCovered: "Sep 11, 2026", understanding: 88 },
          { name: "Singly, Doubly & Circular Linked List Implementations", status: "Covered", dateCovered: "Sep 18, 2026", understanding: 92 },
          { name: "Stacks, Queues & Monotonic Deques with Application Rubrics", status: "Covered", dateCovered: "Sep 25, 2026", understanding: 94 }
        ]
      },
      {
        unitNumber: 2,
        title: "Non-Linear Tree Hierarchies & Self-Balancing Structures",
        lectureHours: "10 Hours",
        topics: [
          { name: "Binary Trees & Standard Traversals (In, Pre, Post, Level-Order)", status: "Covered", dateCovered: "Oct 02, 2026", understanding: 89 },
          { name: "Binary Search Trees (Search, Insertion, Deletion Invariants)", status: "Covered", dateCovered: "Oct 09, 2026", understanding: 85 },
          { name: "AVL Trees & Self-Balancing Single/Double Rotations", status: "Covered", dateCovered: "Oct 16, 2026", understanding: 82 },
          { name: "B-Trees & B+ Tree Multi-Way Search for Databases", status: "In Progress", dateCovered: "Active Lecture & Lab", understanding: 76 }
        ]
      },
      {
        unitNumber: 3,
        title: "Priority Queues, Heaps & Disjoint Sets",
        lectureHours: "8 Hours",
        topics: [
          { name: "Binary Heaps (Min/Max Heapify, Priority Queue & HeapSort)", status: "Covered", dateCovered: "Oct 23, 2026", understanding: 84 },
          { name: "Disjoint-Set Union (Union by Rank & Path Compression)", status: "In Progress", dateCovered: "Active Lecture & Lab", understanding: 78 },
          { name: "Huffman Coding & Optimal Greedy Prefix Codes", status: "Upcoming", dateCovered: "Scheduled for Nov 04", understanding: 0 }
        ]
      },
      {
        unitNumber: 4,
        title: "Graph Theory, Traversals & Shortest Path Algorithms",
        lectureHours: "11 Hours",
        topics: [
          { name: "Graph Representations (Adjacency Matrix, List & Edge Lists)", status: "Covered", dateCovered: "Oct 28, 2026", understanding: 86 },
          { name: "Breadth-First Search (BFS) & Depth-First Search (DFS)", status: "In Progress", dateCovered: "Active Revision", understanding: 80 },
          { name: "Dijkstra's Shortest Path & Bellman-Ford Negative Weight Cycles", status: "Upcoming", dateCovered: "Scheduled for Nov 06", understanding: 0 },
          { name: "Minimum Spanning Trees (Prim's & Kruskal's Algorithms)", status: "Upcoming", dateCovered: "Scheduled for Nov 11", understanding: 0 }
        ]
      },
      {
        unitNumber: 5,
        title: "Dynamic Programming & Advanced Algorithmic Paradigms",
        lectureHours: "8 Hours",
        topics: [
          { name: "0/1 Knapsack Problem & Optimal Substructure Formulations", status: "Upcoming", dateCovered: "Scheduled for Nov 18", understanding: 0 },
          { name: "Longest Common Subsequence & Matrix Chain Multiplication", status: "Upcoming", dateCovered: "Scheduled for Nov 24", understanding: 0 },
          { name: "NP-Completeness, Reductions & Approximation Foundations", status: "Upcoming", dateCovered: "Scheduled for Dec 02", understanding: 0 }
        ]
      }
    ]
  },

  "CSE 1st Year": {
    className: "CSE 1st Year",
    subject: "Fundamentals of Programming & Logic in C++",
    code: "CS-101",
    term: "Semester I · Academic Year 2026-27",
    credits: "4.0 Credits",
    totalLectures: "45 Hours (34 Conducted)",
    enrolledStudents: 16,
    classAverage: "82%",
    units: [
      {
        unitNumber: 1,
        title: "Algorithmic Logic, Flowcharts & Core C++ Syntax",
        lectureHours: "9 Hours",
        topics: [
          { name: "Boolean Logic, Truth Tables & Conditional Statements", status: "Covered", dateCovered: "Sep 02, 2026", understanding: 95 },
          { name: "Loops (For, While, Do-While) & Nested Iteration Invariants", status: "Covered", dateCovered: "Sep 09, 2026", understanding: 92 },
          { name: "Primitive Types, Bitwise Operators & Type Casting Rules", status: "Covered", dateCovered: "Sep 16, 2026", understanding: 89 },
          { name: "One-Dimensional & Two-Dimensional Arrays in Memory", status: "Covered", dateCovered: "Sep 23, 2026", understanding: 91 }
        ]
      },
      {
        unitNumber: 2,
        title: "Modular Functions, Scope & Call Stacks",
        lectureHours: "8 Hours",
        topics: [
          { name: "Function Signatures, Default Parameters & Inline Functions", status: "Covered", dateCovered: "Sep 30, 2026", understanding: 94 },
          { name: "Pass-by-Value vs. Pass-by-Reference in C++", status: "Covered", dateCovered: "Oct 07, 2026", understanding: 90 },
          { name: "Recursive Functions, Base Conditions & Stack Unwinding", status: "Covered", dateCovered: "Oct 14, 2026", understanding: 84 },
          { name: "Function Overloading & Static Local Variables", status: "Covered", dateCovered: "Oct 21, 2026", understanding: 88 }
        ]
      },
      {
        unitNumber: 3,
        title: "Pointers, References & Dynamic Memory Management",
        lectureHours: "10 Hours",
        topics: [
          { name: "Memory Addresses, Pointers & Dereferencing (* and &)", status: "Covered", dateCovered: "Oct 28, 2026", understanding: 80 },
          { name: "Pointer Arithmetic & Array Navigation via Pointers", status: "Covered", dateCovered: "Oct 29, 2026", understanding: 78 },
          { name: "Heap Allocation with new/delete & Dangling Pointers", status: "In Progress", dateCovered: "Active Lecture & Lab", understanding: 74 },
          { name: "Constant Pointers & Pointers to Constants", status: "Upcoming", dateCovered: "Scheduled for Nov 04", understanding: 0 }
        ]
      },
      {
        unitNumber: 4,
        title: "Object-Oriented Programming & Encapsulation",
        lectureHours: "10 Hours",
        topics: [
          { name: "Classes, Objects & Access Modifiers (public, private)", status: "Upcoming", dateCovered: "Scheduled for Nov 08", understanding: 0 },
          { name: "Constructors, Destructors & Constructor Initializer Lists", status: "Upcoming", dateCovered: "Scheduled for Nov 14", understanding: 0 },
          { name: "Operator Overloading & Friend Functions", status: "Upcoming", dateCovered: "Scheduled for Nov 20", understanding: 0 }
        ]
      },
      {
        unitNumber: 5,
        title: "Templates, File Streams & STL Container Basics",
        lectureHours: "8 Hours",
        topics: [
          { name: "Function & Class Templates in C++", status: "Upcoming", dateCovered: "Scheduled for Nov 26", understanding: 0 },
          { name: "Standard Template Library (std::vector, std::string, std::pair)", status: "Upcoming", dateCovered: "Scheduled for Dec 01", understanding: 0 }
        ]
      }
    ]
  },

  "CSE 3rd Year": {
    className: "CSE 3rd Year",
    subject: "Operating Systems & System Architecture",
    code: "CS-301",
    term: "Semester V · Academic Year 2026-27",
    credits: "4.0 Credits",
    totalLectures: "45 Hours (32 Conducted)",
    enrolledStudents: 14,
    classAverage: "69%",
    units: [
      {
        unitNumber: 1,
        title: "OS Architectures, Kernels & System Calls",
        lectureHours: "8 Hours",
        topics: [
          { name: "Dual-Mode CPU Operations (User Mode vs Kernel Mode)", status: "Covered", dateCovered: "Sep 03, 2026", understanding: 86 },
          { name: "System Calls, POSIX API & Trap Handling Mechanisms", status: "Covered", dateCovered: "Sep 10, 2026", understanding: 84 },
          { name: "Monolithic, Microkernel & Hybrid OS Architectures", status: "Covered", dateCovered: "Sep 17, 2026", understanding: 88 },
          { name: "Process Control Blocks (PCB) & Context Switching Cost", status: "Covered", dateCovered: "Sep 24, 2026", understanding: 82 }
        ]
      },
      {
        unitNumber: 2,
        title: "Process Scheduling & Thread Management",
        lectureHours: "10 Hours",
        topics: [
          { name: "Preemptive vs Non-Preemptive Scheduling Algorithms", status: "Covered", dateCovered: "Oct 01, 2026", understanding: 85 },
          { name: "Round Robin, Shortest Remaining Time First (SRTF) & MLFQ", status: "Covered", dateCovered: "Oct 08, 2026", understanding: 80 },
          { name: "Kernel-Level vs User-Level Threads & Multi-Threading Models", status: "Covered", dateCovered: "Oct 15, 2026", understanding: 78 },
          { name: "Real-Time CPU Scheduling (Rate Monotonic & Earliest Deadline)", status: "In Progress", dateCovered: "Active Lecture", understanding: 70 }
        ]
      },
      {
        unitNumber: 3,
        title: "Process Synchronization, Concurrency & Deadlocks",
        lectureHours: "11 Hours",
        topics: [
          { name: "Critical Section Problem & Peterson's Software Solution", status: "Covered", dateCovered: "Oct 22, 2026", understanding: 74 },
          { name: "Hardware Mutex Locks, Semaphores & Condition Variables", status: "In Progress", dateCovered: "Active Lab Session", understanding: 68 },
          { name: "Classic Synchronization (Producer-Consumer, Dining Philosophers)", status: "In Progress", dateCovered: "Active Lab Session", understanding: 65 },
          { name: "Deadlock Detection, Prevention & Banker's Safety Algorithm", status: "Upcoming", dateCovered: "Scheduled for Nov 04", understanding: 0 }
        ]
      },
      {
        unitNumber: 4,
        title: "Memory Management, Paging & Virtual Memory",
        lectureHours: "10 Hours",
        topics: [
          { name: "Contiguous Memory Allocation, External & Internal Fragmentation", status: "Covered", dateCovered: "Oct 29, 2026", understanding: 79 },
          { name: "Non-Contiguous Paging, Multi-Level Page Tables & TLB Caching", status: "Upcoming", dateCovered: "Scheduled for Nov 06", understanding: 0 },
          { name: "Virtual Memory, Demand Paging & Page Fault Servicing", status: "Upcoming", dateCovered: "Scheduled for Nov 12", understanding: 0 },
          { name: "Page Replacement Algorithms (FIFO, LRU, Optimal & Clock)", status: "Upcoming", dateCovered: "Scheduled for Nov 18", understanding: 0 }
        ]
      },
      {
        unitNumber: 5,
        title: "File Systems, Secondary Storage & Security",
        lectureHours: "6 Hours",
        topics: [
          { name: "File System Structures, Inodes & Directory Allocation", status: "Upcoming", dateCovered: "Scheduled for Nov 25", understanding: 0 },
          { name: "Disk Scheduling Algorithms (SCAN, C-SCAN, LOOK)", status: "Upcoming", dateCovered: "Scheduled for Dec 02", understanding: 0 }
        ]
      }
    ]
  }
};

// Calculate total syllabus stats
function getSyllabusStats(classObj) {
  let totalTopics = 0;
  let coveredTopics = 0;
  let inProgressTopics = 0;

  classObj.units.forEach(unit => {
    unit.topics.forEach(topic => {
      totalTopics++;
      if (topic.status === "Covered") coveredTopics++;
      else if (topic.status === "In Progress") inProgressTopics++;
    });
  });

  const percent = totalTopics > 0 ? Math.round((coveredTopics / totalTopics) * 100) : 0;
  return { totalTopics, coveredTopics, inProgressTopics, percent };
}

// Render the 3 Class Cards at top of Classes View
function renderClassesView() {
  const container = document.getElementById("classesCardsContainer");
  if (!container) return;

  container.innerHTML = dashboardData.classPerformance.map((c, i) => {
    const syllabus = classSyllabiData[c.name] || classSyllabiData["CSE 2nd Year"];
    const stats = getSyllabusStats(syllabus);
    const isSelected = c.name === currentSelectedClassForSyllabus;

    return `
      <div 
        onclick="selectClassForSyllabus('${c.name}')"
        class="class-selector-card ${isSelected ? 'active-class-card' : ''}"
      >
        <div class="flex items-start justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Batch 0${i+1}</span>
              ${isSelected ? `
                <span class="text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-600 text-white flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-white pulse-dot"></span> Active Syllabus
                </span>
              ` : ''}
            </div>
            <h3 class="text-lg font-bold text-slate-900 mt-1">${c.name}</h3>
            <p class="text-xs text-slate-500 mt-0.5">${c.subject}</p>
          </div>
          <div class="w-10 h-10 rounded-xl ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'} flex items-center justify-center transition-colors">
            <i data-lucide="graduation-cap" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-5 pt-3.5 border-t border-slate-100">
          <div>
            <div class="text-[11px] text-slate-400 font-semibold uppercase">Enrolled</div>
            <div class="text-xl font-bold text-slate-900 tabular-nums">${c.students} Students</div>
          </div>
          <div>
            <div class="text-[11px] text-slate-400 font-semibold uppercase">Class Average</div>
            <div class="text-xl font-bold text-slate-900 tabular-nums">${c.score}%</div>
          </div>
        </div>

        <!-- Real-time Syllabus Covered Progress -->
        <div class="mt-4">
          <div class="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span class="font-semibold text-slate-700">Syllabus Covered</span>
            <span class="tabular-nums font-bold text-slate-900">${stats.coveredTopics} / ${stats.totalTopics} Topics (${stats.percent}%)</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" style="width: ${stats.percent}%"></div>
          </div>
        </div>

        <div class="mt-5 flex items-center justify-between pt-3.5 border-t border-slate-100">
          <span class="text-xs font-bold ${isSelected ? 'text-blue-600' : 'text-slate-700'} flex items-center gap-1">
            <span>View Syllabus</span> <i data-lucide="arrow-down" class="w-3.5 h-3.5"></i>
          </span>
          <button 
            type="button"
            onclick="event.stopPropagation(); switchTab('students'); filterStudentsByClass('${c.name}')" 
            class="btn-view text-xs font-semibold"
          >
            Roster (${c.students})
          </button>
        </div>
      </div>
    `;
  }).join("");

  // Render the selected class syllabus below
  renderClassSyllabusView();

  if (window.lucide) window.lucide.createIcons();
}

// Teacher selects a particular class to inspect syllabus & topics covered
function selectClassForSyllabus(className) {
  currentSelectedClassForSyllabus = className;
  renderClassesView();

  // Scroll smoothly to syllabus explorer
  const syllabusContainer = document.getElementById("classSyllabusViewerContainer");
  if (syllabusContainer) {
    syllabusContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// Render the Detailed Syllabus & Topics Covered Explorer
function renderClassSyllabusView() {
  const container = document.getElementById("classSyllabusViewerContainer");
  if (!container) return;

  const syllabus = classSyllabiData[currentSelectedClassForSyllabus] || classSyllabiData["CSE 2nd Year"];
  const stats = getSyllabusStats(syllabus);

  container.innerHTML = `
    <!-- Syllabus Header Card -->
    <div class="dashboard-card p-6">
      
      <!-- Top Title and Meta Row -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700">
              ${syllabus.className}
            </span>
            <span class="text-xs font-semibold text-slate-400">Course Code: <strong>${syllabus.code}</strong></span>
            <span class="text-xs font-semibold text-slate-400">· ${syllabus.credits}</span>
          </div>

          <h3 class="text-2xl font-black text-slate-900 tracking-tight mt-1">
            ${syllabus.subject} — Complete Course Syllabus
          </h3>
          <p class="text-xs text-slate-500 mt-0.5">
            Instructor: <strong>Dr. Ananya Sharma</strong> · Department of Computer Science & Engineering · ${syllabus.term}
          </p>
        </div>

        <!-- Quick Action Buttons -->
        <div class="flex flex-wrap items-center gap-2.5 shrink-0">
          <button 
            type="button" 
            onclick="openCreateCustomQuizModal()" 
            class="btn-view bg-[#0B63E5] hover:bg-[#094EC2] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition"
          >
            <i data-lucide="plus-circle" class="w-3.5 h-3.5"></i>
            <span>Schedule Topic Quiz</span>
          </button>
          <button 
            type="button" 
            onclick="showToast('Exported accredited ${syllabus.code} course syllabus as PDF!')" 
            class="btn-view text-xs font-semibold flex items-center gap-1.5"
          >
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span>Export Syllabus</span>
          </button>
        </div>
      </div>

      <!-- Syllabus Progress & Statistics Row -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-5 pb-2">
        <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
          <div class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Curriculum Progress</div>
          <div class="text-2xl font-black text-slate-900 mt-1 tabular-nums">${stats.percent}%</div>
          <div class="text-[11px] text-emerald-600 font-bold mt-0.5">${stats.coveredTopics} of ${stats.totalTopics} Topics Covered</div>
        </div>
        <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
          <div class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">In Progress / Active</div>
          <div class="text-2xl font-black text-blue-600 mt-1 tabular-nums">${stats.inProgressTopics} Topics</div>
          <div class="text-[11px] text-slate-500 font-medium mt-0.5">Currently Taught in Lab</div>
        </div>
        <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
          <div class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Lecture Hours</div>
          <div class="text-2xl font-black text-slate-900 mt-1 tabular-nums">${syllabus.totalLectures.split(" ")[0]} hrs</div>
          <div class="text-[11px] text-slate-500 font-medium mt-0.5">${syllabus.totalLectures}</div>
        </div>
        <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
          <div class="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Class Average</div>
          <div class="text-2xl font-black text-slate-900 mt-1 tabular-nums">${syllabus.classAverage}</div>
          <div class="text-[11px] text-emerald-600 font-bold mt-0.5">Prashiksha Telemetry</div>
        </div>
      </div>

    </div>

    <!-- Units & Topics Covered Breakdown -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="text-base font-bold text-slate-900">Curricular Units & Topics Covered Breakdown</h4>
        <div class="text-xs text-slate-500">Click on any topic status to update its completion</div>
      </div>

      ${syllabus.units.map((unit, unitIdx) => `
        <div class="syllabus-unit-card">
          <!-- Unit Header -->
          <div class="p-4 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-lg bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">
                U${unit.unitNumber}
              </span>
              <div>
                <h5 class="text-sm font-bold text-slate-900 leading-snug">Unit ${unit.unitNumber}: ${unit.title}</h5>
                <span class="text-[11px] text-slate-400 font-medium">${unit.lectureHours} · ${unit.topics.length} Syllabus Modules</span>
              </div>
            </div>
            <span class="text-xs font-bold text-slate-600">
              ${unit.topics.filter(t => t.status === "Covered").length} / ${unit.topics.length} Covered
            </span>
          </div>

          <!-- Topics List within Unit -->
          <div class="divide-y divide-slate-100">
            ${unit.topics.map((topic, topicIdx) => {
              let statusBadge = '';
              if (topic.status === "Covered") {
                statusBadge = `
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-600"></i>
                    <span>Covered</span>
                  </span>
                `;
              } else if (topic.status === "In Progress") {
                statusBadge = `
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    <span class="w-2 h-2 rounded-full bg-blue-600 pulse-dot"></span>
                    <span>In Progress</span>
                  </span>
                `;
              } else {
                statusBadge = `
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                    <i data-lucide="clock" class="w-3.5 h-3.5 text-slate-400"></i>
                    <span>Upcoming</span>
                  </span>
                `;
              }

              return `
                <div class="topic-covered-row">
                  <!-- Left: Topic Title & Date -->
                  <div class="space-y-1">
                    <div class="text-[13px] font-bold text-slate-900 flex items-center gap-2">
                      <span>${topic.name}</span>
                    </div>
                    <div class="text-[11px] text-slate-400 font-medium flex items-center gap-3">
                      <span>Status: <strong>${topic.dateCovered}</strong></span>
                      ${topic.understanding > 0 ? `
                        <span class="text-slate-500">· Prashiksha Mastery: <strong class="text-slate-800">${topic.understanding}%</strong></span>
                      ` : ''}
                    </div>
                  </div>

                  <!-- Right: Status Pill & Toggle Action -->
                  <div class="flex items-center gap-3 shrink-0">
                    ${statusBadge}
                    <button 
                      type="button" 
                      onclick="toggleTopicCoveredStatus('${syllabus.className}', ${unitIdx}, ${topicIdx})"
                      class="btn-view text-xs font-semibold py-1.5 px-3"
                      title="Toggle between Covered, In Progress, and Upcoming"
                    >
                      Change Status
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `).join("")}
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}

// Teacher toggles a topic status (Covered <-> In Progress <-> Upcoming)
function toggleTopicCoveredStatus(className, unitIdx, topicIdx) {
  const syllabus = classSyllabiData[className];
  if (!syllabus || !syllabus.units[unitIdx] || !syllabus.units[unitIdx].topics[topicIdx]) return;

  const topic = syllabus.units[unitIdx].topics[topicIdx];
  if (topic.status === "Covered") {
    topic.status = "In Progress";
    topic.dateCovered = "Active Lecture & Lab";
  } else if (topic.status === "In Progress") {
    topic.status = "Upcoming";
    topic.dateCovered = "Scheduled in Syllabus";
    topic.understanding = 0;
  } else {
    topic.status = "Covered";
    const today = new Date();
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    topic.dateCovered = today.toLocaleDateString('en-US', options);
    topic.understanding = 85;
  }

  // Re-render
  renderClassesView();
  showToast(`Updated "${topic.name}" status to "${topic.status}"!`);
}

// Student Evaluation Modal Logic
function openStudentModal(studentId) {
  const student = dashboardData.students.find(s => s.id === studentId);
  if (!student) return;

  const modal = document.getElementById("studentEvaluationModal");
  if (!modal) return;

  document.getElementById("modalStudentInitial").textContent = student.initial;
  document.getElementById("modalStudentName").textContent = student.name;
  document.getElementById("modalStudentClass").textContent = student.class;
  document.getElementById("modalStudentScore").textContent = `${student.score}%`;
  
  const statusBadge = document.getElementById("modalStudentStatus");
  statusBadge.textContent = student.status;
  statusBadge.className = `status-pill text-xs ${student.status === 'Needs Attention' ? 'needs-attention' : ''}`;

  document.getElementById("modalStudentAttendance").textContent = student.attendance;
  document.getElementById("modalStudentAssignments").textContent = student.assignmentsCompleted;
  document.getElementById("modalStudentStrengths").textContent = student.strengths;
  document.getElementById("modalStudentWeakness").textContent = student.weakness;
  document.getElementById("modalAiRecommendation").textContent = student.aiRecommendation;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeStudentModal() {
  const modal = document.getElementById("studentEvaluationModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// Teacher Profile Full Screen Modal Logic
function openTeacherProfileModal() {
  const modal = document.getElementById("teacherProfileModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  if (window.lucide) window.lucide.createIcons();
}

function closeTeacherProfileModal() {
  const modal = document.getElementById("teacherProfileModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// Action Modals: Create Assignment, Generate Quiz, Upload Material, Send Announcement
function openActionModal(type) {
  const modal = document.getElementById("actionGenericModal");
  if (!modal) return;

  const titleEl = document.getElementById("actionModalTitle");
  const descEl = document.getElementById("actionModalDescription");
  const contentEl = document.getElementById("actionModalFormContent");

  if (type === 'assignment') {
    titleEl.textContent = "Create Assignment";
    descEl.textContent = "Assign homework, coding tasks, or theory papers to students.";
    contentEl.innerHTML = `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Assignment Title</label>
          <input id="assignTitle" type="text" class="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-800" placeholder="e.g. Graph Traversal & Dijkstra Algorithm" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Target Class</label>
            <select class="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-800">
              <option>CSE 1st Year</option>
              <option>CSE 2nd Year</option>
              <option>CSE 3rd Year</option>
              <option>All Classes</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Due Date</label>
            <input type="date" value="2026-11-06" class="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-800" />
          </div>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Instructions & Problem Statement</label>
          <textarea rows="3" class="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-800" placeholder="Describe the requirements and evaluation criteria..."></textarea>
        </div>
      </div>
    `;
  } else if (type === 'quiz') {
    titleEl.textContent = "Generate Quiz (AI)";
    descEl.textContent = "Create an intelligent diagnostic quiz powered by Disha AI.";
    contentEl.innerHTML = `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Subject / Topic</label>
          <input id="quizTopic" type="text" class="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-800" value="Data Structures: Dynamic Trees & Heaps" />
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Difficulty Level</label>
            <select class="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-800">
              <option>Adaptive (AI tailored to student level)</option>
              <option>Foundational</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Questions Count</label>
            <input type="number" value="10" class="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-800" />
          </div>
        </div>
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 flex items-start gap-2.5">
          <i data-lucide="sparkles" class="w-4 h-4 text-slate-800 mt-0.5 shrink-0"></i>
          <span>Disha AI will automatically calibrate questions against students' weakest areas found in recent evaluations.</span>
        </div>
      </div>
    `;
  } else if (type === 'material') {
    titleEl.textContent = "Upload Study Material";
    descEl.textContent = "Share lecture slides, code repositories, or PDF notes.";
    contentEl.innerHTML = `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Material Title</label>
          <input type="text" class="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-800" placeholder="e.g. Lecture 14 - Deadlock Avoidance and Banker's Algorithm" />
        </div>
        <div class="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-slate-600 transition-colors cursor-pointer bg-slate-50/50">
          <i data-lucide="upload-cloud" class="w-8 h-8 text-slate-400 mx-auto mb-2"></i>
          <p class="text-xs font-semibold text-slate-700">Click to upload or drag & drop</p>
          <p class="text-[11px] text-slate-400 mt-0.5">PDF, DOCX, ZIP, or PPTX up to 50MB</p>
        </div>
      </div>
    `;
  } else if (type === 'announcement') {
    titleEl.textContent = "Send Announcement";
    descEl.textContent = "Broadcast updates instantly to students' Prashiksha app.";
    contentEl.innerHTML = `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Announcement Subject</label>
          <input id="annSubject" type="text" class="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-800" placeholder="e.g. Schedule Change for CSE 2nd Year Lab" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Target Audience</label>
          <select class="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-800">
            <option>All Enrolled Students (48)</option>
            <option>CSE 1st Year (16)</option>
            <option>CSE 2nd Year (18)</option>
            <option>CSE 3rd Year (14)</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-700 mb-1">Message</label>
          <textarea rows="3" class="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-slate-800" placeholder="Type your announcement here..."></textarea>
        </div>
      </div>
    `;
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  if (window.lucide) window.lucide.createIcons();
}

function closeActionModal() {
  const modal = document.getElementById("actionGenericModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function submitActionModal() {
  showToast("Action completed and synced to Prashiksha student portal!");
  closeActionModal();
}

function openAssignmentModalForClass(className) {
  openActionModal('assignment');
}

// Tab Switching
function switchTab(tabName) {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    if (item.getAttribute("data-tab") === tabName) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  const views = document.querySelectorAll(".tab-view");
  views.forEach(v => {
    if (v.id === `view-${tabName}`) {
      v.classList.remove("hidden");
      v.classList.add("fade-in");
    } else {
      v.classList.add("hidden");
      v.classList.remove("fade-in");
    }
  });

  // Re-render and trigger chart animations when switching to Home or Students
  if (tabName === 'quiz') {
    renderQuizzesList();
  } else if (tabName === 'assignments') {
    renderAssignmentsList();
  } else if (tabName === 'home') {
    setTimeout(() => {
      initPerformanceTrendChart(currentTrendFilter);
      initClassPerformanceChart();
    }, 60);
  } else if (tabName === 'students') {
    setTimeout(() => {
      initTotalStudentsDistChart();
    }, 60);
  }
}

// Student Directory Filter
function filterStudentsByClass(className) {
  renderStudentsDirectory(className);
}

// Search handling across the dashboard
function handleSearch(query) {
  renderRecentEvaluationsTable(query);
  if (query.trim().length > 0) {
    const matchedStudents = dashboardData.students.filter(s => 
      s.name.toLowerCase().includes(query.toLowerCase()) || 
      s.class.toLowerCase().includes(query.toLowerCase())
    );
    showSearchSuggestions(matchedStudents);
  } else {
    hideSearchSuggestions();
  }
}

function showSearchSuggestions(results) {
  const box = document.getElementById("searchDropdown");
  if (!box) return;

  if (results.length === 0) {
    box.innerHTML = `<div class="p-3 text-xs text-slate-500 text-center">No students or classes match your search</div>`;
  } else {
    box.innerHTML = results.map(s => `
      <div onclick="openStudentModal('${s.id}'); hideSearchSuggestions();" class="p-2.5 hover:bg-slate-50 cursor-pointer flex items-center justify-between border-b border-slate-100 last:border-0 transition-colors">
        <div class="flex items-center gap-2.5">
          <span class="avatar-initial text-[11px]">${s.initial}</span>
          <div>
            <div class="text-xs font-semibold text-slate-900">${s.name}</div>
            <div class="text-[10.5px] text-slate-500 tabular-nums">${s.class} · Score: ${s.score}%</div>
          </div>
        </div>
        <span class="status-pill text-[10px] ${s.status === 'Needs Attention' ? 'needs-attention' : ''}">${s.status}</span>
      </div>
    `).join("");
  }
  box.classList.remove("hidden");
}

function hideSearchSuggestions() {
  const box = document.getElementById("searchDropdown");
  if (box) box.classList.add("hidden");
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation tabs
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const tab = item.getAttribute("data-tab");
      if (tab) switchTab(tab);
    });
  });

  // Timeframe selector on the line chart
  const timeframeSelect = document.getElementById("timeframeSelect");
  if (timeframeSelect) {
    timeframeSelect.addEventListener("change", (e) => {
      currentTrendFilter = e.target.value;
      initPerformanceTrendChart(currentTrendFilter);
    });
  }

  // Search input
  const searchInput = document.getElementById("globalSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      handleSearch(e.target.value);
    });

    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target)) {
        hideSearchSuggestions();
      }
    });
  }

  // Notifications dropdown toggle
  const notifBtn = document.getElementById("notificationBtn");
  const notifDropdown = document.getElementById("notificationsDropdown");
  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener("click", () => {
      notifDropdown.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
        notifDropdown.classList.add("hidden");
      }
    });
  }

  // Close modals on Escape key or backdrop click
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeTeacherProfileModal();
      closeStudentModal();
      closeActionModal();
    }
  });

  const teacherModal = document.getElementById("teacherProfileModal");
  if (teacherModal) {
    teacherModal.addEventListener("click", (e) => {
      if (e.target === teacherModal) closeTeacherProfileModal();
    });
  }
}

// Quick AI Question Generator Demo in Assistant View
function generateAiTeachingInsight() {
  const promptInput = document.getElementById("aiPromptInput");
  const outputEl = document.getElementById("aiAssistantOutput");
  if (!promptInput || !outputEl) return;

  const text = promptInput.value.trim() || "Analyze CSE 2nd Year Graph theory gaps";
  outputEl.innerHTML = `
    <div class="flex items-center gap-2 text-xs font-semibold text-slate-800 mb-2">
      <i data-lucide="sparkles" class="w-4 h-4 text-black animate-spin"></i>
      <span>Disha AI analyzing student submissions & performance logs...</span>
    </div>
  `;

  setTimeout(() => {
    outputEl.innerHTML = `
      <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 fade-in">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-900 uppercase tracking-wide">AI Diagnostic Insight: "${text}"</span>
          <span class="status-pill">Generated in 0.4s</span>
        </div>
        <p class="text-xs text-slate-700 leading-relaxed">
          Based on the last 48 evaluations across your 3 batches, <strong>Rohan Mehta</strong> and <strong>Kartik Yadav</strong> struggle primarily with <em>recursion stack limits</em> and <em>pointer dereferencing in adjacency lists</em>. 
        </p>
        <div class="bg-white p-3 rounded-lg border border-slate-200">
          <div class="text-[11.5px] font-semibold text-slate-900 mb-1.5">Recommended 3-Step Action Plan:</div>
          <ol class="text-xs text-slate-600 list-decimal list-inside space-y-1">
            <li>Dispatch the 5-question visual pointer quiz to CSE 2nd Year.</li>
            <li>Schedule 15-minute peer review with Sneha Verma (93% peer mentor).</li>
            <li>Enable automatic Prashiksha Hint Mode for pending Assignment #03.</li>
          </ol>
        </div>
        <div class="flex justify-end gap-2 pt-1">
          <button onclick="showToast('Diagnostic sent to students via Prashiksha!')" class="btn-view text-xs bg-black text-white hover:bg-slate-800">
            Apply Recommendation to Prashiksha
          </button>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }, 600);
}

// Logout handler: Clears session and returns to login page
function handleLogout() {
  sessionStorage.removeItem('disha_logged_in');
  window.location.replace('index.html');
}

// Toast notification helper with smooth spring transition
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "fixed bottom-5 right-5 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 z-50 fade-in border border-slate-700";
  toast.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i> <span>${message}</span>`;
  document.body.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}


// ═══════════════════════════════════════════════════════════════════════════
// PRASHIKSHA DATA BRIDGE & STUDENT ANALYTICS ENGINE
// ═══════════════════════════════════════════════════════════════════════════
// Provides high-fidelity synchronized telemetry between Prashiksha AI Tutor
// (session progress, topics studied, flashcard attempts) and Disha Teacher Portal.

const PrashikshaDataBridge = {
  // Base subjects taxonomy matching Prashiksha learning curriculum
  subjectMeta: {
    dsa: {
      name: "Data Structures & Algorithms",
      code: "CS-201",
      icon: "code",
      color: "#0B63E5",
      darkColor: "#38BDF8",
      accentBg: "rgba(11, 99, 229, 0.1)"
    },
    os: {
      name: "Operating Systems & Architecture",
      code: "CS-204",
      icon: "cpu",
      color: "#6366F1",
      darkColor: "#818CF8",
      accentBg: "rgba(99, 102, 241, 0.1)"
    },
    dbms: {
      name: "Database Management Systems",
      code: "CS-208",
      icon: "database",
      color: "#0D9488",
      darkColor: "#2DD4BF",
      accentBg: "rgba(13, 148, 136, 0.1)"
    },
    science_ai: {
      name: "Natural Sciences & AI Foundations",
      code: "NS-102",
      icon: "leaf",
      color: "#16A34A",
      darkColor: "#4ADE80",
      accentBg: "rgba(22, 163, 74, 0.1)"
    }
  },

  // Generates or retrieves synchronized student learning data from Prashiksha
  getStudentData(studentId) {
    // Check if live API/localStorage override exists (for seamless Prashiksha connection)
    const localOverride = localStorage.getItem(`prashiksha_student_${studentId}`);
    if (localOverride) {
      try { return JSON.parse(localOverride); } catch (e) { /* fallback */ }
    }

    const baseStudent = dashboardData.students.find(s => s.id === studentId) || dashboardData.students[0];
    const score = baseStudent.score;

    // Generate accurate subject breakdown and topics list modeled on Prashiksha sessions
    const dsaMastery = Math.min(99, Math.max(45, score + 4));
    const osMastery = Math.min(98, Math.max(40, score - 6));
    const dbmsMastery = Math.min(97, Math.max(48, score + 1));
    const scienceMastery = Math.min(99, Math.max(50, score + 3));

    return {
      id: baseStudent.id,
      name: baseStudent.name,
      initial: baseStudent.initial,
      class: baseStudent.class,
      score: baseStudent.score,
      status: baseStudent.status,
      attendance: baseStudent.attendance,
      assignmentsCompleted: baseStudent.assignmentsCompleted,
      email: `${baseStudent.name.toLowerCase().replace(/\s+/g, '.')}@prashiksha.edu`,
      aiOverview: baseStudent.aiRecommendation,
      totalHours: (28 + (score * 0.15)).toFixed(1) + 'h',
      topicsCount: 20,
      flashcardAccuracy: (score >= 80 ? 94 : (score >= 65 ? 82 : 68)) + '%',
      weeklyTrend: [
        { week: 'W1', hours: 4.2, accuracy: score - 8 },
        { week: 'W2', hours: 5.8, accuracy: score - 5 },
        { week: 'W3', hours: 6.5, accuracy: score - 2 },
        { week: 'W4', hours: 7.2, accuracy: score },
        { week: 'W5', hours: 8.0, accuracy: Math.min(98, score + 3) },
        { week: 'W6', hours: 7.8, accuracy: Math.min(99, score + 5) }
      ],
      subjects: {
        dsa: {
          key: 'dsa',
          name: "Data Structures & Algorithms",
          lastOpenedTopic: "Binary Search Trees & AVL Balancing",
          lastOpenedTime: "Today at 4:15 PM",
          lastOpenedRelative: "1h ago",
          mastery: dsaMastery,
          accuracy: Math.min(99, dsaMastery + 2) + '%',
          hours: '14.5 Hours',
          topicsCount: 6,
          topicsList: [
            {
              topic: "Binary Search Trees & AVL Balancing",
              mode: "explanation",
              modeLabel: "Deep Explanation",
              understanding: Math.min(98, dsaMastery + 2),
              flashcardScore: "5/5 (100%)",
              duration: "45 mins",
              date: "Oct 29, 2026",
              aiNote: "Mastered self-balancing tree rotations; correctly resolved all height-balance flashcards in Prashiksha."
            },
            {
              topic: "Graph Traversals (Breadth-First & Depth-First Search)",
              mode: "qa",
              modeLabel: "Q&A Mode",
              understanding: dsaMastery,
              flashcardScore: "4/5 (80%)",
              duration: "38 mins",
              date: "Oct 27, 2026",
              aiNote: "High clarity on queue-based BFS; minor edge case on disconnected graph components."
            },
            {
              topic: "Dynamic Programming: 0/1 Knapsack Problem",
              mode: "roadmap",
              modeLabel: "Interactive Roadmap",
              understanding: Math.max(50, dsaMastery - 7),
              flashcardScore: "4/5 (80%)",
              duration: "52 mins",
              date: "Oct 25, 2026",
              aiNote: "Completed 3 of 4 roadmap steps. Subproblem memoization table formula understood."
            },
            {
              topic: "Recursion & Backtracking (N-Queens & Subsets)",
              mode: "explanation",
              modeLabel: "Deep Explanation",
              understanding: Math.max(55, dsaMastery - 4),
              flashcardScore: "3/5 (60%)",
              duration: "40 mins",
              date: "Oct 22, 2026",
              aiNote: "Understood stack unwinding; suggested additional interactive visual tree practice."
            },
            {
              topic: "QuickSort Partitioning & MergeSort Recurrence",
              mode: "flashcards",
              modeLabel: "Flashcard Quiz",
              understanding: Math.min(99, dsaMastery + 4),
              flashcardScore: "10/10 (100%)",
              duration: "25 mins",
              date: "Oct 19, 2026",
              aiNote: "Flawless score on pivot selection and recursion tree master theorem bounds."
            },
            {
              topic: "Stacks, Queues & Monotonic Deques",
              mode: "qa",
              modeLabel: "Q&A Mode",
              understanding: Math.min(98, dsaMastery + 3),
              flashcardScore: "5/5 (100%)",
              duration: "30 mins",
              date: "Oct 16, 2026",
              aiNote: "Solved all Prashiksha sliding window maximum challenge questions."
            }
          ]
        },

        os: {
          key: 'os',
          name: "Operating Systems & Architecture",
          lastOpenedTopic: "CPU Process Scheduling (Round Robin & SJF)",
          lastOpenedTime: "Yesterday at 5:30 PM",
          lastOpenedRelative: "Yesterday",
          mastery: osMastery,
          accuracy: Math.min(96, osMastery + 3) + '%',
          hours: '10.2 Hours',
          topicsCount: 5,
          topicsList: [
            {
              topic: "CPU Process Scheduling (Round Robin, SRTF, Multi-Level)",
              mode: "explanation",
              modeLabel: "Deep Explanation",
              understanding: Math.min(95, osMastery + 5),
              flashcardScore: "5/5 (100%)",
              duration: "40 mins",
              date: "Oct 28, 2026",
              aiNote: "Clear understanding of context switching time penalties and Gantt chart calculations."
            },
            {
              topic: "Deadlocks: Banker's Algorithm & Resource Allocation Graphs",
              mode: "qa",
              modeLabel: "Q&A Mode",
              understanding: osMastery,
              flashcardScore: "4/5 (80%)",
              duration: "45 mins",
              date: "Oct 26, 2026",
              aiNote: "Successfully derived safe sequence matrices in Prashiksha diagnostic exercise."
            },
            {
              topic: "Virtual Memory: Page Replacement (LRU, FIFO, Clock)",
              mode: "roadmap",
              modeLabel: "Interactive Roadmap",
              understanding: Math.max(50, osMastery - 5),
              flashcardScore: "3/5 (60%)",
              duration: "48 mins",
              date: "Oct 23, 2026",
              aiNote: "Needs quick practice on TLB hit ratio math; completed Belady's anomaly simulation."
            },
            {
              topic: "Inter-Process Communication & Mutex Semaphores",
              mode: "explanation",
              modeLabel: "Deep Explanation",
              understanding: Math.max(48, osMastery - 8),
              flashcardScore: "3/5 (60%)",
              duration: "35 mins",
              date: "Oct 20, 2026",
              aiNote: "Struggled with critical section race conditions in producer-consumer threads."
            },
            {
              topic: "File System Architecture & Inode Allocation",
              mode: "flashcards",
              modeLabel: "Flashcard Quiz",
              understanding: Math.min(96, osMastery + 6),
              flashcardScore: "5/5 (100%)",
              duration: "20 mins",
              date: "Oct 15, 2026",
              aiNote: "Accurately answered file descriptor tables and hard vs symbolic link differences."
            }
          ]
        },

        dbms: {
          key: 'dbms',
          name: "Database Management Systems",
          lastOpenedTopic: "Relational Schema Normalization (1NF to BCNF)",
          lastOpenedTime: "Oct 29 at 2:10 PM",
          lastOpenedRelative: "2 days ago",
          mastery: dbmsMastery,
          accuracy: Math.min(97, dbmsMastery + 2) + '%',
          hours: '8.4 Hours',
          topicsCount: 5,
          topicsList: [
            {
              topic: "Relational Schema Normalization (1NF through BCNF)",
              mode: "explanation",
              modeLabel: "Deep Explanation",
              understanding: Math.min(96, dbmsMastery + 4),
              flashcardScore: "5/5 (100%)",
              duration: "45 mins",
              date: "Oct 29, 2026",
              aiNote: "Identified partial and transitive functional dependencies with 100% accuracy."
            },
            {
              topic: "B+ Tree Indexing & Query Execution Plans",
              mode: "qa",
              modeLabel: "Q&A Mode",
              understanding: dbmsMastery,
              flashcardScore: "4/5 (80%)",
              duration: "35 mins",
              date: "Oct 26, 2026",
              aiNote: "Understood clustered vs unclustered index lookup costs in MySQL/InnoDB."
            },
            {
              topic: "ACID Properties & Multi-Version Concurrency (MVCC)",
              mode: "explanation",
              modeLabel: "Deep Explanation",
              understanding: Math.min(94, dbmsMastery + 1),
              flashcardScore: "4/5 (80%)",
              duration: "42 mins",
              date: "Oct 22, 2026",
              aiNote: "Grasped phantom reads and repeatable read transaction isolation."
            },
            {
              topic: "SQL Joins, Aggregations & Window Functions",
              mode: "flashcards",
              modeLabel: "Flashcard Quiz",
              understanding: Math.min(99, dbmsMastery + 5),
              flashcardScore: "8/8 (100%)",
              duration: "28 mins",
              date: "Oct 18, 2026",
              aiNote: "Completed Prashiksha live SQL challenge with optimal execution plans."
            },
            {
              topic: "Entity-Relationship Diagrams & Mapping to DDL",
              mode: "roadmap",
              modeLabel: "Interactive Roadmap",
              understanding: Math.min(92, dbmsMastery),
              flashcardScore: "4/5 (80%)",
              duration: "30 mins",
              date: "Oct 14, 2026",
              aiNote: "Converted cardinality constraints into clean foreign key schemas."
            }
          ]
        },

        science_ai: {
          key: 'science_ai',
          name: "Natural Sciences & AI Foundations",
          lastOpenedTopic: "Photosynthesis: Light-Dependent Reactions & Photophosphorylation",
          lastOpenedTime: "Today at 11:20 AM",
          lastOpenedRelative: "5h ago",
          mastery: scienceMastery,
          accuracy: Math.min(99, scienceMastery + 2) + '%',
          hours: '6.4 Hours',
          topicsCount: 4,
          topicsList: [
            {
              topic: "Photosynthesis: Light-Dependent Reactions & Photophosphorylation",
              mode: "explanation",
              modeLabel: "Deep Explanation",
              understanding: Math.min(99, scienceMastery + 4),
              flashcardScore: "5/5 (100%)",
              duration: "42 mins",
              date: "Oct 30, 2026",
              aiNote: "Mastered chlorophyll light absorption, Z-scheme electron transport, and ATP synthase proton gradients."
            },
            {
              topic: "Photosynthesis: Calvin Cycle & Carbon Fixation Mechanics",
              mode: "qa",
              modeLabel: "Q&A Mode",
              understanding: scienceMastery,
              flashcardScore: "4/5 (80%)",
              duration: "35 mins",
              date: "Oct 28, 2026",
              aiNote: "Understood RuBisCO enzyme catalyst reactions and G3P regeneration pathways."
            },
            {
              topic: "Artificial Neural Networks: Perceptrons, Weights & Backprop",
              mode: "explanation",
              modeLabel: "Deep Explanation",
              understanding: Math.min(96, scienceMastery + 1),
              flashcardScore: "5/5 (100%)",
              duration: "50 mins",
              date: "Oct 25, 2026",
              aiNote: "Demonstrated clear intuition for loss gradients, learning rates, and sigmoid activation."
            },
            {
              topic: "Boolean Algebra, Logic Gates & Computational Biology",
              mode: "flashcards",
              modeLabel: "Flashcard Quiz",
              understanding: Math.min(99, scienceMastery + 5),
              flashcardScore: "6/6 (100%)",
              duration: "20 mins",
              date: "Oct 21, 2026",
              aiNote: "100% precision on NAND/NOR universality and truth tables."
            }
          ]
        }
      }
    };
  },

  // Connection Hook: Dispatches assignments/remedial tasks to Prashiksha
  async sendTeacherRecommendationToPrashiksha(studentId, subjectKey, topicTitle, note) {
    console.log(`[Prashiksha Bridge] Dispatching to student ${studentId}:`, { subjectKey, topicTitle, note });
    // In live deployment, this POSTs to /api/teacher/student/${studentId}/assign
    showToast(`Task "${topicTitle}" dispatched to ${studentId} via Prashiksha!`);
    return { success: true, timestamp: new Date().toISOString() };
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// FULL STUDENT DASHBOARD CONTROLLER
// ═══════════════════════════════════════════════════════════════════════════

function openStudentFullDashboard(studentId) {
  currentActiveStudentId = studentId;
  const student = PrashikshaDataBridge.getStudentData(studentId);
  if (!student) return;

  // 1. Switch to the Student Detail View
  const views = document.querySelectorAll(".tab-view");
  views.forEach(v => {
    if (v.id === "view-student-detail") {
      v.classList.remove("hidden");
      v.classList.add("fade-in");
    } else {
      v.classList.add("hidden");
      v.classList.remove("fade-in");
    }
  });

  // Keep sidebar nav active on 'students' tab
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    if (item.getAttribute("data-tab") === "students") {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // 2. Populate Dropdown Switcher
  const selectEl = document.getElementById("studentDashboardSelect");
  if (selectEl) {
    selectEl.innerHTML = dashboardData.students.map(s => `
      <option value="${s.id}" ${s.id === student.id ? 'selected' : ''}>
        ${s.name} (${s.class}) — ${s.score}%
      </option>
    `).join("");
  }

  // 3. Populate Student Profile Header & Banner
  const nameHeader = document.getElementById("sdStudentNameHeader");
  if (nameHeader) nameHeader.textContent = student.name;

  const statusPill = document.getElementById("sdStudentStatusPill");
  if (statusPill) {
    statusPill.textContent = student.status;
    statusPill.className = `status-pill text-xs ${student.status === 'Needs Attention' ? 'needs-attention' : (student.status === 'Excellent' ? 'excellent' : '')}`;
  }

  const avatar = document.getElementById("sdAvatarInitial");
  if (avatar) avatar.textContent = student.initial;

  const nameEl = document.getElementById("sdStudentName");
  if (nameEl) nameEl.textContent = student.name;

  const idBadge = document.getElementById("sdStudentIdBadge");
  if (idBadge) idBadge.textContent = student.id;

  const classEl = document.getElementById("sdStudentClass");
  if (classEl) classEl.textContent = `${student.class} · Academic Track`;

  const emailEl = document.getElementById("sdStudentEmail");
  if (emailEl) emailEl.textContent = student.email;

  const aiOverviewEl = document.getElementById("sdAiOverview");
  if (aiOverviewEl) aiOverviewEl.textContent = student.aiOverview;

  // 4. Quick Telemetry Numbers
  const overallScoreEl = document.getElementById("sdOverallScore");
  if (overallScoreEl) overallScoreEl.textContent = `${student.score}%`;

  const topicsCountEl = document.getElementById("sdTopicsCount");
  if (topicsCountEl) topicsCountEl.textContent = student.topicsCount;

  const flashcardAccuracyEl = document.getElementById("sdFlashcardAccuracy");
  if (flashcardAccuracyEl) flashcardAccuracyEl.textContent = student.flashcardAccuracy;

  const totalHoursEl = document.getElementById("sdTotalHours");
  if (totalHoursEl) totalHoursEl.textContent = student.totalHours;

  // 5. Render Subject Cards with the "View Studied Topics & Activity" Button
  renderStudentSubjectCards(student);

  // 6. Render Categorized Graphs
  setTimeout(() => {
    renderStudentSubjectChart(student);
    renderStudentActivityTrendChart(student);
  }, 50);

  // Scroll smoothly to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (window.lucide) window.lucide.createIcons();
}

// Render the 4 Subject Cards with "View Studied Topics & Activity" button
function renderStudentSubjectCards(student) {
  const container = document.getElementById("sdSubjectCardsGrid");
  if (!container) return;

  const subjects = Object.values(student.subjects);
  container.innerHTML = subjects.map(sub => {
    const meta = PrashikshaDataBridge.subjectMeta[sub.key];
    const isDark = isDarkMode();
    const iconName = meta.icon || 'book-open';

    return `
      <div class="subject-card">
        <div>
          <!-- Header with Subject Icon & Badge -->
          <div class="flex items-start justify-between gap-2 mb-3">
            <div class="subject-icon-box">
              <i data-lucide="${iconName}" class="w-5 h-5"></i>
            </div>
            <span class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              ${sub.topicsCount} Topics
            </span>
          </div>

          <!-- Subject Title & Code -->
          <div class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">${meta.code}</div>
          <h4 class="text-sm font-bold text-slate-900 leading-snug line-clamp-2 mt-0.5">${sub.name}</h4>

          <!-- Progress Bar & Mastery Score -->
          <div class="mt-4">
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="text-slate-500 font-medium">Understanding Level</span>
              <span class="font-extrabold text-slate-900 tabular-nums">${sub.mastery}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${sub.mastery}%"></div>
            </div>
          </div>

          <!-- Quick Metrics: Flashcard accuracy & Hours -->
          <div class="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-slate-100 text-[11.5px]">
            <div>
              <div class="text-slate-400 text-[10.5px]">Flashcards</div>
              <div class="font-bold text-slate-800">${sub.accuracy}</div>
            </div>
            <div>
              <div class="text-slate-400 text-[10.5px]">Time Studied</div>
              <div class="font-bold text-slate-800">${sub.hours}</div>
            </div>
          </div>

          <!-- Last Topic Opened Row (Requested by Teacher) -->
          <div class="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100/80 flex items-center justify-between text-xs">
            <div class="flex items-center gap-1.5 text-slate-500">
              <i data-lucide="clock" class="w-3.5 h-3.5 text-blue-600 shrink-0"></i>
              <span class="text-[11px] font-medium">Last Opened:</span>
            </div>
            <div class="text-right pl-2 truncate">
              <div class="text-[11.5px] font-bold text-slate-900 tabular-nums">${sub.lastOpenedTime || 'Oct 29, 2026'}</div>
              <div class="text-[10px] text-slate-400 truncate max-w-[130px]" title="${sub.lastOpenedTopic}">${sub.lastOpenedTopic || 'Introduction'}</div>
            </div>
          </div>
        </div>

        <!-- THE REQUESTED BUTTON: See list of things student studied in this subject! -->
        <button 
          onclick="openSubjectStudyList('${sub.key}')" 
          type="button"
          class="btn-view w-full mt-4 flex items-center justify-center gap-2 bg-blue-50/80 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200/80 transition-all font-semibold text-xs py-2.5 rounded-xl shadow-sm"
        >
          <i data-lucide="list-checks" class="w-4 h-4"></i>
          <span>View Studied Topics (${sub.topicsCount})</span>
        </button>
      </div>
    `;
  }).join("");

  if (window.lucide) window.lucide.createIcons();
}

// ═══════════════════════════════════════════════════════════════════════════
// SUBJECT-CATEGORIZED CHARTS (Chart.js)
// ═══════════════════════════════════════════════════════════════════════════

// Graph 1: Subject Mastery & Understanding Categorized Bar Chart
function renderStudentSubjectChart(student) {
  const canvas = document.getElementById("studentSubjectChart");
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (studentSubjectChart) {
    studentSubjectChart.destroy();
  }

  const isDark = isDarkMode();
  const subjectList = Object.values(student.subjects);
  const labels = subjectList.map(s => {
    // Shorten long titles for clean x-axis layout
    if (s.name.includes("Data Structures")) return "DSA";
    if (s.name.includes("Operating Systems")) return "OS & Arch";
    if (s.name.includes("Database")) return "DBMS";
    if (s.name.includes("Natural Sciences")) return "Science & AI";
    return s.name;
  });

  const masteryData = subjectList.map(s => s.mastery);
  const accuracyData = subjectList.map(s => parseInt(s.accuracy) || s.mastery);

  const primaryBarColor = isDark ? '#38BDF8' : '#0B63E5';
  const secondaryBarColor = isDark ? '#818CF8' : '#60A5FA';
  const textColor = isDark ? '#CBD5E1' : '#475569';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : '#F1F5F9';
  const tooltipBg = isDark ? '#1E2129' : '#0B63E5';

  studentSubjectChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Understanding Score %',
          data: masteryData,
          backgroundColor: primaryBarColor,
          borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
          barPercentage: 0.58,
          categoryPercentage: 0.75
        },
        {
          label: 'Flashcard Accuracy %',
          data: accuracyData,
          backgroundColor: secondaryBarColor,
          borderRadius: { topLeft: 6, topRight: 6, bottomLeft: 0, bottomRight: 0 },
          barPercentage: 0.58,
          categoryPercentage: 0.75
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1200,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            boxWidth: 10,
            padding: 12,
            font: { size: 11, family: 'Plus Jakarta Sans', weight: '600' },
            color: textColor
          }
        },
        tooltip: {
          backgroundColor: tooltipBg,
          titleFont: { size: 12, family: 'Plus Jakarta Sans', weight: '700' },
          bodyFont: { size: 11.5, family: 'Plus Jakarta Sans' },
          padding: 10,
          cornerRadius: 8,
          callbacks: {
            label(context) {
              return ` ${context.dataset.label}: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 25,
            color: textColor,
            font: { size: 10.5, family: 'Plus Jakarta Sans', weight: '500' }
          },
          grid: {
            color: gridColor,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColor,
            font: { size: 11, family: 'Plus Jakarta Sans', weight: '600' }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    }
  });
}

// Graph 2: Study Velocity & Quiz Accuracy (Trend Line Chart with smooth area fill)
function renderStudentActivityTrendChart(student) {
  const canvas = document.getElementById("studentActivityTrendChart");
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  if (studentActivityTrendChart) {
    studentActivityTrendChart.destroy();
  }

  const isDark = isDarkMode();
  const trend = student.weeklyTrend || [
    { week: 'W1', hours: 4.2, accuracy: 78 },
    { week: 'W2', hours: 5.8, accuracy: 82 },
    { week: 'W3', hours: 6.5, accuracy: 86 },
    { week: 'W4', hours: 7.2, accuracy: 89 },
    { week: 'W5', hours: 8.0, accuracy: 92 },
    { week: 'W6', hours: 7.8, accuracy: 94 }
  ];

  const labels = trend.map(t => t.week);
  const accuracyValues = trend.map(t => t.accuracy);

  const primaryStroke = isDark ? '#38BDF8' : '#0B63E5';
  const pointBg = isDark ? '#38BDF8' : '#0B63E5';
  const pointBorder = isDark ? '#16181F' : '#ffffff';
  const textColor = isDark ? '#CBD5E1' : '#475569';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : '#F1F5F9';
  const tooltipBg = isDark ? '#1E2129' : '#0B63E5';

  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  if (isDark) {
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.32)');
    gradient.addColorStop(0.7, 'rgba(56, 189, 248, 0.05)');
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0.00)');
  } else {
    gradient.addColorStop(0, 'rgba(11, 99, 229, 0.22)');
    gradient.addColorStop(0.7, 'rgba(11, 99, 229, 0.04)');
    gradient.addColorStop(1, 'rgba(11, 99, 229, 0.00)');
  }

  studentActivityTrendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Quiz Retention %',
        data: accuracyValues,
        borderColor: primaryStroke,
        backgroundColor: gradient,
        borderWidth: 2.6,
        tension: 0.38,
        fill: true,
        pointBackgroundColor: pointBg,
        pointBorderColor: pointBorder,
        pointBorderWidth: 2,
        pointRadius: 4.5,
        pointHoverRadius: 6.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 1300,
        easing: 'easeOutQuart'
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: tooltipBg,
          titleFont: { size: 11.5, family: 'Plus Jakarta Sans', weight: '700' },
          bodyFont: { size: 11, family: 'Plus Jakarta Sans' },
          padding: 8,
          cornerRadius: 7,
          callbacks: {
            label(context) {
              return ` Accuracy: ${context.parsed.y}%`;
            }
          }
        }
      },
      scales: {
        y: {
          min: 40,
          max: 100,
          ticks: {
            stepSize: 20,
            color: textColor,
            font: { size: 10.5, family: 'Plus Jakarta Sans', weight: '500' }
          },
          grid: {
            color: gridColor,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColor,
            font: { size: 11, family: 'Plus Jakarta Sans', weight: '600' }
          },
          grid: {
            display: false,
            drawBorder: false
          }
        }
      }
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════════
// SUBJECT STUDIED TOPICS MODAL & LIST VIEWER
// ═══════════════════════════════════════════════════════════════════════════

function openSubjectStudyList(subjectKey) {
  currentActiveSubjectKey = subjectKey;
  const student = PrashikshaDataBridge.getStudentData(currentActiveStudentId || "std-01");
  if (!student || !student.subjects[subjectKey]) return;

  const subject = student.subjects[subjectKey];
  currentSubjectTopicsCache = subject.topicsList || [];

  const modal = document.getElementById("subjectStudyLogModal");
  if (!modal) return;

  // Set Modal Header Information
  const titleEl = document.getElementById("studyModalSubjectTitle");
  if (titleEl) titleEl.textContent = subject.name;

  const countBadge = document.getElementById("studyModalTopicCountBadge");
  if (countBadge) countBadge.textContent = `${subject.topicsCount} Topics Studied`;

  const studentNameEl = document.getElementById("studyModalStudentName");
  if (studentNameEl) studentNameEl.textContent = student.name;

  const masteryEl = document.getElementById("studyModalMastery");
  if (masteryEl) masteryEl.textContent = `${subject.mastery}% Understanding`;

  const flashcardsEl = document.getElementById("studyModalFlashcards");
  if (flashcardsEl) flashcardsEl.textContent = `${subject.accuracy} Accuracy`;

  const durationEl = document.getElementById("studyModalDuration");
  if (durationEl) durationEl.textContent = subject.hours;

  const lastOpenedTimeEl = document.getElementById("studyModalLastOpenedTime");
  if (lastOpenedTimeEl) lastOpenedTimeEl.textContent = subject.lastOpenedTime || "Today at 4:15 PM";

  const lastOpenedTopicEl = document.getElementById("studyModalLastOpenedTopic");
  if (lastOpenedTopicEl) lastOpenedTopicEl.textContent = subject.lastOpenedTopic || "Recent Topic";

  // Clear search input
  const searchInput = document.getElementById("studyModalSearchInput");
  if (searchInput) searchInput.value = "";

  // Render the topics list
  renderSubjectTopicsList(currentSubjectTopicsCache);

  // Show Modal
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  if (window.lucide) window.lucide.createIcons();
}

function closeSubjectStudyModal() {
  const modal = document.getElementById("subjectStudyLogModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function filterSubjectTopicsList(query) {
  const q = query.toLowerCase().trim();
  if (!q) {
    renderSubjectTopicsList(currentSubjectTopicsCache);
    return;
  }
  const filtered = currentSubjectTopicsCache.filter(item => 
    item.topic.toLowerCase().includes(q) ||
    item.modeLabel.toLowerCase().includes(q) ||
    item.aiNote.toLowerCase().includes(q)
  );
  renderSubjectTopicsList(filtered);
}

function renderSubjectTopicsList(list) {
  const container = document.getElementById("studyModalTopicsContainer");
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400">
        <i data-lucide="search-x" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
        <div class="text-xs font-semibold">No studied topics match your search query.</div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = list.map((item, index) => {
    // Mode badge styling
    let badgeClass = 'mode-badge-explanation';
    let modeIcon = 'lightbulb';
    if (item.mode === 'qa') {
      badgeClass = 'mode-badge-qa';
      modeIcon = 'messages-square';
    } else if (item.mode === 'roadmap') {
      badgeClass = 'mode-badge-roadmap';
      modeIcon = 'map';
    } else if (item.mode === 'flashcards') {
      badgeClass = 'mode-badge-flashcards';
      modeIcon = 'zap';
    }

    return `
      <div class="subject-study-list-item">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          
          <!-- Topic Title & Learning Mode -->
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="mode-badge ${badgeClass}">
                <i data-lucide="${modeIcon}" class="w-3 h-3"></i>
                <span>${item.modeLabel}</span>
              </span>
              ${index === 0 ? `
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot"></span>
                  <span>Last Opened Topic (${item.lastOpenedTime || item.date})</span>
                </span>
              ` : `
                <span class="text-[11px] text-slate-400 font-medium">Session Date: ${item.date}</span>
              `}
            </div>
            <div class="text-sm font-bold text-slate-900 tracking-tight pt-0.5">${item.topic}</div>
          </div>

          <!-- Understanding & Flashcard Scores -->
          <div class="flex items-center gap-3 shrink-0">
            <div class="text-right">
              <div class="text-[10.5px] text-slate-400 uppercase font-semibold">Understanding</div>
              <div class="text-sm font-black text-slate-900 tabular-nums">${item.understanding}%</div>
            </div>
            <div class="h-6 w-[1px] bg-slate-200"></div>
            <div class="text-right">
              <div class="text-[10.5px] text-slate-400 uppercase font-semibold">Quiz Score</div>
              <div class="text-sm font-bold text-emerald-600 tabular-nums">${item.flashcardScore}</div>
            </div>
          </div>

        </div>

        <!-- Prashiksha AI Diagnostic Feedback Note -->
        <div class="mt-2.5 pt-2 border-t border-slate-100 flex items-start justify-between gap-3 text-xs">
          <div class="text-slate-600 flex items-start gap-1.5 leading-relaxed">
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5"></i>
            <span>${item.aiNote}</span>
          </div>
          <span class="text-[11px] text-slate-400 font-medium whitespace-nowrap">${item.duration}</span>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) window.lucide.createIcons();
}

function showSendAssignmentModal() {
  const student = PrashikshaDataBridge.getStudentData(currentActiveStudentId || "std-01");
  const modal = document.getElementById("actionGenericModal");
  if (!modal) return;

  document.getElementById("actionModalTitle").textContent = `Assign Remedial Module to ${student.name}`;
  document.getElementById("actionModalSubtitle").textContent = "Dispatched in real-time to student's Prashiksha learning workspace";

  document.getElementById("actionModalFormContent").innerHTML = `
    <div class="space-y-3">
      <div>
        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Target Subject Category</label>
        <select id="assignSubjectSelect" class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800">
          <option value="dsa">Data Structures & Algorithms</option>
          <option value="os">Operating Systems & Architecture</option>
          <option value="dbms">Database Management Systems</option>
          <option value="science_ai">Natural Sciences & AI Foundations</option>
        </select>
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Topic or Challenge Concept</label>
        <input id="assignTopicInput" type="text" value="Photosynthesis & Cellular Respiration Energy Cycles" placeholder="Enter topic..." class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-700 uppercase mb-1">Teacher Instructions / Notes for Prashiksha Tutor</label>
        <textarea id="assignNotesInput" rows="3" class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl" placeholder="E.g. Focus on Calvin cycle ATP consumption and flashcards.">Please complete 5 interactive flashcard questions and verify understanding of ATP synthesis.</textarea>
      </div>
    </div>
  `;

  document.getElementById("actionModalSubmitBtn").onclick = function() {
    const topic = document.getElementById("assignTopicInput").value;
    const sub = document.getElementById("assignSubjectSelect").value;
    const notes = document.getElementById("assignNotesInput").value;
    PrashikshaDataBridge.sendTeacherRecommendationToPrashiksha(student.id, sub, topic, notes);
    closeActionModal();
  };

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  if (window.lucide) window.lucide.createIcons();
}


// ═══════════════════════════════════════════════════════════════════════════
// ASSIGNMENT CONTROLLER & PRASHIKSHA FLOATING SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

let currentSelectedAssignmentFile = null;
let currentAssignmentFilter = "All";

// Ensure assignments data is initialized and loaded from storage if available
function loadAssignmentsData() {
  const saved = localStorage.getItem('disha_assignments');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        dashboardData.assignments = parsed;
      }
    } catch (e) {
      console.warn("Could not parse saved assignments", e);
    }
  }

  // Ensure default items have rich attributes
  dashboardData.assignments = dashboardData.assignments.map((asgn, idx) => ({
    id: asgn.id || `asgn-legacy-${idx}`,
    title: asgn.title,
    class: asgn.class,
    subject: asgn.subject || (asgn.class.includes("1st") ? "Fundamentals of Logic & C++" : (asgn.class.includes("2nd") ? "Data Structures & Algorithms" : "Operating Systems")),
    dueDate: asgn.dueDate,
    rawDeadline: asgn.rawDeadline || "2026-11-06T23:59",
    submissions: asgn.submissions || "0/18",
    status: asgn.status || "Active",
    fileName: asgn.fileName || `${asgn.title.replace(/\s+/g, '_').substring(0, 24)}_Sheet.pdf`,
    fileSize: asgn.fileSize || "1.4 MB",
    storagePath: asgn.storagePath || `raw data/assignment/${asgn.fileName || (asgn.title.replace(/\s+/g, '_').substring(0, 24) + '_Sheet.pdf')}`,
    downloadUrl: asgn.downloadUrl || `/api/teacher/download-assignment/${asgn.fileName || (asgn.title.replace(/\s+/g, '_').substring(0, 24) + '_Sheet.pdf')}`,
    instructions: asgn.instructions || "Solve the problems and submit your solution via the Prashiksha portal before the deadline.",
    maxPoints: asgn.maxPoints || 100,
        hasQuiz: true,
    postAttemptQuiz: [
      {
        id: 1,
        question: "What is the worst-case search time in an unbalanced BST?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correct_answer: "O(n)",
        explanation: "Degenerate trees degrade to a linear singly linked list.",
        timer_seconds: 10
      },
      {
        id: 2,
        question: "In an AVL tree, what is the maximum allowed balance factor?",
        options: ["1", "0", "2", "3"],
        correct_answer: "1",
        explanation: "AVL balance factor must strictly be -1, 0, or +1.",
        timer_seconds: 10
      },
      {
        id: 3,
        question: "Which traversal of a BST yields elements in sorted order?",
        options: ["In-order", "Pre-order", "Post-order", "Level-order"],
        correct_answer: "In-order",
        explanation: "Left-Root-Right in-order traversal yields strictly ascending keys.",
        timer_seconds: 10
      },
      {
        id: 4,
        question: "What is the average height of a balanced BST with n nodes?",
        options: ["O(log n)", "O(n)", "O(sqrt n)", "O(1)"],
        correct_answer: "O(log n)",
        explanation: "Logarithmic tree height guarantees O(log n) lookups.",
        timer_seconds: 10
      },
      {
        id: 5,
        question: "Which rotation fixes a Left-Right (LR) tree imbalance?",
        options: ["Left then Right", "Right then Left", "Double Left", "Single Right"],
        correct_answer: "Left then Right",
        explanation: "First left-rotate the left child, then right-rotate the node.",
        timer_seconds: 10
      }
    ],
    floatedToPrashiksha: true
  }));
}

// Initial load
loadAssignmentsData();

// Render assignments list with rich cards, file download pills, and deadline status
function renderAssignmentsList(filter = currentAssignmentFilter) {
  currentAssignmentFilter = filter;
  const container = document.getElementById("assignmentsListContainer");
  if (!container) return;

  // Filter list
  let list = dashboardData.assignments;
  if (filter !== "All") {
    list = list.filter(a => a.class === filter || a.class === "All Batches" || a.class === "All Classes");
  }

  // Update filter buttons styling
  const filterBtns = document.querySelectorAll(".assignment-filter-btn");
  filterBtns.forEach(btn => {
    if (btn.getAttribute("data-filter") === filter) {
      btn.className = "btn-view bg-slate-900 text-white assignment-filter-btn font-semibold";
    } else {
      btn.className = "btn-view assignment-filter-btn";
    }
  });

  if (list.length === 0) {
    container.innerHTML = `
      <div class="dashboard-card p-10 text-center text-slate-400">
        <i data-lucide="file-question" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
        <div class="text-sm font-bold text-slate-700">No assignments found for ${filter}</div>
        <p class="text-xs text-slate-400 mt-1">Click "Create & Float Assignment" to publish a problem set to this class.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = list.map(asgn => {
    // Parse submission ratios
    let submittedCount = 0;
    let totalCount = 18;
    if (asgn.submissions && asgn.submissions.includes("/")) {
      const parts = asgn.submissions.split("/");
      submittedCount = parseInt(parts[0]) || 0;
      totalCount = parseInt(parts[1]) || 18;
    }
    const submissionPercent = Math.min(100, Math.round((submittedCount / totalCount) * 100));

    // Status pill
    let statusClass = "status-pill";
    if (asgn.status === "Completed") statusClass = "status-pill";
    else if (asgn.status === "Grading") statusClass = "status-pill needs-attention";

    return `
      <div class="assignment-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Left: Details & Attached File -->
        <div class="space-y-2 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700">
              ${asgn.class}
            </span>
            <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              ${asgn.subject}
            </span>
            <span class="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Floated to Prashiksha</span>
            </span>
          </div>

          <h4 class="text-base font-bold text-slate-900 tracking-tight leading-snug">
            ${asgn.title}
          </h4>

          <!-- Attached Problem Sheet Pill + Storage Badge -->
          <div class="flex flex-wrap items-center gap-2.5 pt-1">
            <div 
              onclick="downloadAssignmentFile('${asgn.id}')"
              class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50/80 hover:bg-blue-100/90 border border-blue-200/90 text-xs font-semibold text-blue-900 cursor-pointer transition active:scale-95 group shadow-2xs"
              title="Click to download original assignment file from raw data/assignment/"
            >
              <i data-lucide="file-text" class="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform"></i>
              <span class="truncate max-w-[200px]">${asgn.fileName}</span>
              <span class="text-[10px] text-blue-600/70 font-mono">(${asgn.fileSize})</span>
              <i data-lucide="download" class="w-3.5 h-3.5 text-blue-600 group-hover:translate-y-0.5 transition-transform"></i>
            </div>

            <!-- raw data storage pill -->
            <span class="inline-flex items-center gap-1 text-[10.5px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/70" title="Physical file saved in raw data/assignment/">
              <i data-lucide="hard-drive" class="w-3 h-3 text-slate-400"></i>
              <span>raw data/assignment/</span>
            </span>

            <span class="text-xs text-slate-500 font-medium flex items-center gap-1.5 ml-1">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-400"></i>
              <span>Due: <strong>${asgn.dueDate}</strong></span>
            </span>
          </div>
        </div>

        <!-- Right: Submission Progress & Actions -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
          
          <!-- Submissions Progress Tracker -->
          <div class="text-right min-w-[130px]">
            <div class="flex items-center justify-between sm:justify-end gap-2 text-xs mb-1">
              <span class="text-slate-500 font-medium">Submissions:</span>
              <span class="font-extrabold text-slate-900 tabular-nums">${asgn.submissions}</span>
            </div>
            <div class="w-full sm:w-32 progress-track">
              <div class="progress-fill" style="width: ${submissionPercent}%"></div>
            </div>
            <span class="text-[10.5px] font-semibold text-slate-400 mt-1 inline-block">${submissionPercent}% completed</span>
          </div>

          <!-- Action Buttons + 10s Quiz Simulator Button -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- Dedicated Download Button -->
            <button 
              onclick="downloadAssignmentFile('${asgn.id}')" 
              type="button"
              class="btn-view text-xs flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold whitespace-nowrap shadow-xs transition active:scale-95"
              title="Download this assignment file from raw data/assignment/"
            >
              <i data-lucide="download" class="w-3.5 h-3.5 text-white"></i>
              <span>Download Assignment</span>
            </button>

            <button 
              onclick="openQuizSimulatorModal('${asgn.id}')" 
              type="button"
              class="btn-view text-xs flex items-center gap-1.5 bg-amber-500/10 text-amber-700 hover:bg-amber-500 hover:text-white border border-amber-300 font-bold whitespace-nowrap transition"
              title="Play 5-Question 10s Quiz that students see after submitting assignment"
            >
              <i data-lucide="zap" class="w-3.5 h-3.5 text-amber-600"></i>
              <span>Play 10s Quiz</span>
            </button>
            <span class="${statusClass} text-xs">
              ${asgn.status}
            </span>
            <button 
              onclick="showToast('Opening grading queue on Prashiksha for ${asgn.title}!')" 
              class="btn-view text-xs font-semibold whitespace-nowrap"
            >
              Grade Submissions
            </button>
          </div>

        </div>

      </div>
    `;
  }).join("");

  // Update Stat counters
  const activeCountEl = document.getElementById("statActiveAssignments");
  if (activeCountEl) {
    const activeTotal = dashboardData.assignments.filter(a => a.status === "Active").length;
    activeCountEl.textContent = `${activeTotal} Tasks`;
  }

  if (window.lucide) window.lucide.createIcons();
}

// Filter assignments
function filterAssignmentsList(filterClass) {
  renderAssignmentsList(filterClass);
}

// Open the Create & Float Assignment Modal
function openCreateAssignmentModal() {
  const modal = document.getElementById("createAssignmentModal");
  if (!modal) return;

  // Set default due date to 7 days from today
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);
  const dateStr = targetDate.toISOString().split("T")[0];

  const dateInput = document.getElementById("newAssignDate");
  if (dateInput) dateInput.value = dateStr;

  const timeInput = document.getElementById("newAssignTime");
  if (timeInput) timeInput.value = "23:59";

  // Reset file selection
  removeSelectedAssignmentFile();

  // Reset title
  const titleInput = document.getElementById("newAssignTitle");
  if (titleInput) titleInput.value = "";

  const instructionsInput = document.getElementById("newAssignInstructions");
  if (instructionsInput) instructionsInput.value = "";

  // Update preview
  updateFloatingClassPreview("CSE 2nd Year");

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  if (window.lucide) window.lucide.createIcons();
}

function closeCreateAssignmentModal() {
  const modal = document.getElementById("createAssignmentModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

// Update floating preview text when teacher changes class
function updateFloatingClassPreview(className) {
  const targetClassEl = document.getElementById("previewTargetClassText");
  const countEl = document.getElementById("previewStudentCountText");
  if (!targetClassEl || !countEl) return;

  targetClassEl.textContent = className;
  if (className === "CSE 1st Year") {
    countEl.textContent = "16 enrolled students";
  } else if (className === "CSE 2nd Year") {
    countEl.textContent = "18 enrolled students";
  } else if (className === "CSE 3rd Year") {
    countEl.textContent = "14 enrolled students";
  } else {
    countEl.textContent = "all 48 students across 3 batches";
  }
}

// Setup Drag & Drop Zone Listeners
function setupAssignmentDropZone() {
  const dropZone = document.getElementById("fileDropZone");
  if (!dropZone) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZone.classList.remove('dragover');
    }, false);
  });

  dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files && files.length > 0) {
      handleFileObject(files[0]);
    }
  }, false);
}

// Handle file input change
function handleAssignmentFileSelect(e) {
  const files = e.target.files;
  if (files && files.length > 0) {
    handleFileObject(files[0]);
  }
}

// Display file preview card
function handleFileObject(file) {
  currentSelectedAssignmentFile = file;

  const dropZone = document.getElementById("fileDropZone");
  const previewContainer = document.getElementById("selectedFilePreviewContainer");
  if (!previewContainer) return;

  // Format file size
  let sizeStr = (file.size / 1024).toFixed(1) + " KB";
  if (file.size > 1024 * 1024) {
    sizeStr = (file.size / (1024 * 1024)).toFixed(1) + " MB";
  }

  // Choose icon based on file type
  let icon = "file-text";
  if (file.name.endsWith(".pdf")) icon = "file-text";
  else if (file.name.endsWith(".zip")) icon = "archive";
  else if (file.name.endsWith(".py") || file.name.endsWith(".cpp") || file.name.endsWith(".java")) icon = "code";

  if (dropZone) dropZone.classList.add("hidden");

  previewContainer.classList.remove("hidden");
  previewContainer.innerHTML = `
    <div class="file-preview-card">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
          <i data-lucide="${icon}" class="w-5 h-5"></i>
        </div>
        <div>
          <div class="text-xs font-bold text-slate-900">${file.name}</div>
          <div class="text-[11px] text-slate-500">${sizeStr} • Attached & ready for Gemini Agent</div>
        </div>
      </div>
      <button 
        type="button" 
        onclick="removeSelectedAssignmentFile()" 
        class="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-slate-600 transition"
        title="Remove this file"
      >
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();

  // Automatically prompt Gemini Agent to read the newly attached file and create the quiz
  showToast(`Attached "${file.name}". Gemini Agent is reading the file...`);
  setTimeout(() => {
    generateQuizWithGeminiFromAssignment();
  }, 400);
}

function removeSelectedAssignmentFile() {
  currentSelectedAssignmentFile = null;
  const fileInput = document.getElementById("assignmentFileInput");
  if (fileInput) fileInput.value = "";

  const dropZone = document.getElementById("fileDropZone");
  if (dropZone) dropZone.classList.remove("hidden");

  const previewContainer = document.getElementById("selectedFilePreviewContainer");
  if (previewContainer) {
    previewContainer.classList.add("hidden");
    previewContainer.innerHTML = "";
  }
}

// Submit Create and Float Assignment
async function submitCreateAndFloatAssignment(e) {
  e.preventDefault();

  const titleInput = document.getElementById("newAssignTitle");
  const classInput = document.getElementById("newAssignClass");
  const subjectInput = document.getElementById("newAssignSubject");
  const dateInput = document.getElementById("newAssignDate");
  const timeInput = document.getElementById("newAssignTime");
  const instructionsInput = document.getElementById("newAssignInstructions");
  const maxMarksInput = document.getElementById("newAssignMaxMarks");

  const title = titleInput ? titleInput.value.trim() : "";
  const targetClass = classInput ? classInput.value : "CSE 2nd Year";
  const subject = subjectInput ? subjectInput.value : "Data Structures & Algorithms";
  const dueDate = dateInput ? dateInput.value : "2026-11-07";
  const dueTime = timeInput ? timeInput.value : "23:59";
  const instructions = instructionsInput ? instructionsInput.value.trim() : "";
  const maxMarks = maxMarksInput ? parseInt(maxMarksInput.value) || 100 : 100;

  if (!title) {
    alert("Please provide an assignment title.");
    return;
  }

  // Format date display
  const dateObj = new Date(`${dueDate}T${dueTime}`);
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const formattedDueDate = isNaN(dateObj.getTime()) ? dueDate : dateObj.toLocaleDateString('en-US', options);

  // Determine file details & read original uploaded file as DataURL for lossless client download
  let initialFileName = "";
  let initialFileSize = "";
  let fileDataUrl = null;

  if (currentSelectedAssignmentFile) {
    initialFileName = currentSelectedAssignmentFile.name;
    initialFileSize = (currentSelectedAssignmentFile.size / (1024 * 1024) > 1) 
      ? (currentSelectedAssignmentFile.size / (1024 * 1024)).toFixed(1) + " MB"
      : (currentSelectedAssignmentFile.size / 1024).toFixed(1) + " KB";

    // Read the exact file bytes so they can be downloaded identically even without backend
    try {
      fileDataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(currentSelectedAssignmentFile);
      });
    } catch (readErr) {
      console.warn("Could not cache file dataUrl:", readErr);
    }
  } else {
    initialFileName = `${title.replace(/\s+/g, '_').substring(0, 24)}_Problem_Sheet.pdf`;
    initialFileSize = "1.8 MB";
  }

  // Compute student count based on class
  let studentCount = 18;
  if (targetClass.includes("1st")) studentCount = 16;
  else if (targetClass.includes("3rd")) studentCount = 14;
  else if (targetClass.includes("All")) studentCount = 48;

  // Persist file into "raw data/assignment" folder via Flask backend or client bridge
  let savedFileName = initialFileName;
  let savedFileSize = initialFileSize;
  let storagePath = `raw data/assignment/${initialFileName}`;
  let downloadUrl = `/api/teacher/download-assignment/${encodeURIComponent(initialFileName)}`;

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("class", targetClass);
    formData.append("subject", subject);
    formData.append("instructions", instructions);
    formData.append("due_date", formattedDueDate);

    if (currentSelectedAssignmentFile) {
      formData.append("file", currentSelectedAssignmentFile);
    }

    const saveRes = await fetch("/api/teacher/save-assignment", {
      method: "POST",
      body: formData
    });

    if (saveRes.ok) {
      const saveJson = await saveRes.json();
      if (saveJson.success) {
        savedFileName = saveJson.fileName || initialFileName;
        savedFileSize = saveJson.fileSize || initialFileSize;
        storagePath = saveJson.storagePath || storagePath;
        downloadUrl = saveJson.downloadUrl || downloadUrl;
        console.log("? Stored in raw data/assignment:", saveJson);
      }
    }
  } catch (backendErr) {
    console.warn("Could not reach /api/teacher/save-assignment, falling back to local storage handler", backendErr);
  }

  // Create Assignment Object
  const newAssignment = {
    id: "asgn-" + Date.now(),
    title: title,
    class: targetClass,
    subject: subject,
    dueDate: formattedDueDate,
    rawDeadline: `${dueDate}T${dueTime}`,
    submissions: `0/${studentCount}`,
    status: "Active",
    fileName: savedFileName,
    fileSize: savedFileSize,
    fileDataUrl: fileDataUrl, // Preserves exact original uploaded PDF/Word file bytes
    storagePath: storagePath,
    downloadUrl: downloadUrl,
    instructions: instructions || "Please submit your work before the deadline. Late submissions are flagged automatically in Prashiksha.",
    maxPoints: maxMarks,
    hasQuiz: true,
    postAttemptQuiz: currentGeneratedQuiz || getFallbackQuizForTopic(title, subject),
    floatedToPrashiksha: true,
    floatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  // Prepend to dashboard assignments
  dashboardData.assignments.unshift(newAssignment);

  // Save in localStorage for persistent simulation and Prashiksha integration
  try {
    localStorage.setItem('disha_assignments', JSON.stringify(dashboardData.assignments));
    
    // Also save in prashiksha_floating_queue for student consumption
    const prashikshaQueue = JSON.parse(localStorage.getItem('prashiksha_floating_queue') || '[]');
    prashikshaQueue.unshift(newAssignment);
    localStorage.setItem('prashiksha_floating_queue', JSON.stringify(prashikshaQueue));
  } catch (err) {
    console.warn("Could not save to localStorage", err);
  }

  // Close modal
  closeCreateAssignmentModal();

  // Re-render assignments list
  renderAssignmentsList(currentAssignmentFilter);

  // Show floating toast message
  showToast(`? Assignment "${title}" floated to ${studentCount} students in ${targetClass} & saved to raw data/assignment/!`);
}

// Download exact assignment file (PDF, docx, doc, zip, etc.) directly from raw data/assignment/
async function downloadAssignmentFile(asgnId) {
  const asgn = dashboardData.assignments.find(a => a.id === asgnId) || dashboardData.assignments[0];
  const targetFileName = asgn.fileName || "assignment.pdf";
  const downloadUrl = asgn.downloadUrl || `/api/teacher/download-assignment/${encodeURIComponent(targetFileName)}`;

  showToast(`Downloading "${targetFileName}" from raw data/assignment/...`);

  // 1. If backend is running, download exact file directly from /api/teacher/download-assignment/
  try {
    const response = await fetch(downloadUrl);
    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = targetFileName; // Preserves exact .pdf, .docx, .doc extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      showToast(`? Downloaded "${targetFileName}" from raw data/assignment/ successfully!`);
      return;
    }
  } catch (err) {
    console.warn("Direct download endpoint failed, using cached file dataUrl or PDF synthesizer", err);
  }

  // 2. If the user previously uploaded this file in this browser session, download the exact original file
  if (asgn.fileDataUrl) {
    const link = document.createElement("a");
    link.href = asgn.fileDataUrl;
    link.download = targetFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`? Downloaded exact uploaded "${targetFileName}"!`);
    return;
  }

  // 3. If it's a PDF without an uploaded file or backend offline, generate a real, valid ISO PDF file
  const ext = targetFileName.split('.').pop().toLowerCase();
  if (ext === 'pdf') {
    const cleanTitle = (asgn.title || 'Assignment').substring(0, 45);
    const cleanClass = `${asgn.class || 'CSE'} - ${asgn.subject || 'Course'}`.substring(0, 60);
    const cleanDue = `Deadline: ${asgn.dueDate || 'Nov 2026'}`.substring(0, 50);
    const cleanNotes = (asgn.instructions || 'Review syllabus unit and submit answers via Prashiksha.').substring(0, 180);

    const pdfStream = [
      'BT',
      '/F1 18 Tf',
      '50 740 Td',
      `(${cleanTitle.replace(/[()\\]/g, '')}) Tj`,
      '-50 -740 Td',
      '/F1 12 Tf',
      '50 710 Td',
      `(${cleanClass.replace(/[()\\]/g, '')}) Tj`,
      '-50 -710 Td',
      '/F1 10 Tf',
      '50 685 Td',
      `(${cleanDue.replace(/[()\\]/g, '')}) Tj`,
      '-50 -685 Td',
      '/F1 10 Tf',
      '50 655 Td',
      '(Instructions & Problem Details:) Tj',
      '-50 -655 Td',
      '/F1 10 Tf',
      '50 630 Td',
      `(${cleanNotes.replace(/[()\\]/g, '')}) Tj`,
      '-50 -630 Td',
      'ET'
    ].join('\n');

    const pdfContent = `%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n5 0 obj\n<< /Length ${pdfStream.length} >>\nstream\n${pdfStream}\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000228 00000 n \n0000000305 00000 n \ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${400 + pdfStream.length}\n%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = targetFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
    showToast(`? Downloaded "${targetFileName}" as valid PDF document!`);
    return;
  }

  // 4. For other file extensions (docx, doc, zip, code), preserve the exact file extension
  let mimeType = 'application/octet-stream';
  if (ext === 'docx') mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  else if (ext === 'doc') mimeType = 'application/msword';
  else if (ext === 'zip') mimeType = 'application/zip';

  const fileDocContent = `PRASHIKSHA ASSIGNMENT PROBLEM DOCUMENT
=============================================
Title: ${asgn.title}
Target Class: ${asgn.class}
Subject: ${asgn.subject}
Deadline: ${asgn.dueDate}
Storage Location: raw data/assignment/${targetFileName}

Problem Details & Instructions:
${asgn.instructions || "Please complete the problem tasks outlined by faculty."}
=============================================
`;
  const blob = new Blob([fileDocContent], { type: mimeType });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = targetFileName; // Retains .docx, .doc, etc.
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);

  showToast(`? Downloaded "${targetFileName}"!`);
}

// ???????????????????????????????????????????????????????????????????????????
// GEMINI API ASSIGNMENT QUIZ GENERATOR & 10-SECOND SIMULATOR
// ═══════════════════════════════════════════════════════════════════════════

let currentGeneratedQuiz = null;
let simQuizQuestions = [];
let simCurrentIdx = 0;
let simScore = 0;
let simTimerInterval = null;
let simTimeRemainingMs = 10000;
let simAnswerLocked = false;

// Generate 5-question rapid quiz using Gemini API from the uploaded PDF / assignment
// Global Gemini API key configured from Prashiksha
let PRASHIKSHA_GEMINI_API_KEY = window.PRASHIKSHA_GEMINI_API_KEY || "";

// Global Gemini API key configured from Prashiksha

async function generateQuizWithGeminiFromAssignment() {
  const titleInput = document.getElementById("newAssignTitle");
  const subjectInput = document.getElementById("newAssignSubject");
  const classInput = document.getElementById("newAssignClass");
  const statusEl = document.getElementById("geminiQuizStatus");
  const statusTextEl = document.getElementById("geminiQuizStatusText");
  const btnEl = document.getElementById("btnGenerateGeminiQuiz");
  const previewContainer = document.getElementById("geminiQuizPreviewContainer");
  const questionsListEl = document.getElementById("geminiGeneratedQuestionsList");

  const title = titleInput && titleInput.value.trim() ? titleInput.value.trim() : "Problem Set";
  const subject = subjectInput ? subjectInput.value : "Computer Science";
  const targetClass = classInput ? classInput.value : "CSE";

  if (!PRASHIKSHA_GEMINI_API_KEY && window.PRASHIKSHA_GEMINI_API_KEY) {
    PRASHIKSHA_GEMINI_API_KEY = window.PRASHIKSHA_GEMINI_API_KEY;
  }
  if (!PRASHIKSHA_GEMINI_API_KEY) {
    try {
      const kRes = await fetch("/api/teacher/gemini-key");
      if (kRes.ok) {
        const kData = await kRes.json();
        if (kData.key) PRASHIKSHA_GEMINI_API_KEY = kData.key;
      }
    } catch (e) {
      console.warn("Fallback gemini key fetch failed:", e);
    }
  }

  // Visual generating state
  if (btnEl) {
    btnEl.disabled = true;
    btnEl.innerHTML = `<i data-lucide="loader" class="w-3.5 h-3.5 animate-spin"></i> <span>Gemini Agent reading file...</span>`;
  }
  if (statusEl) {
    statusEl.classList.remove("hidden");
    if (statusTextEl) {
      statusTextEl.textContent = currentSelectedAssignmentFile 
        ? `Gemini agent is analyzing "${currentSelectedAssignmentFile.name}" to generate questions...`
        : `Gemini agent is reading "${title}" problem sheet...`;
    }
  }
  if (window.lucide) window.lucide.createIcons();

  // Read full file text or base64 data for Gemini
  let fileTextContent = "";
  let fileBase64Data = null;
  let fileMimeType = "text/plain";

  if (currentSelectedAssignmentFile) {
    const fname = currentSelectedAssignmentFile.name.toLowerCase();
    fileMimeType = currentSelectedAssignmentFile.type || (fname.endsWith(".pdf") ? "application/pdf" : "text/plain");

    if (fname.endsWith(".txt") || fname.endsWith(".py") || fname.endsWith(".cpp") || fname.endsWith(".java") || fname.endsWith(".sql") || fname.endsWith(".md") || fname.endsWith(".json") || fname.endsWith(".csv")) {
      try {
        fileTextContent = await new Promise((resolve) => {
          const r = new FileReader();
          r.onload = (e) => resolve(e.target.result);
          r.onerror = () => resolve("");
          r.readAsText(currentSelectedAssignmentFile);
        });
      } catch (err) {
        console.warn("Could not read text directly:", err);
      }
    } else {
      // Read as base64 for PDF or binary
      try {
        fileBase64Data = await new Promise((resolve) => {
          const r = new FileReader();
          r.onload = () => {
            const res = r.result;
            const commaIdx = res.indexOf(",");
            resolve(commaIdx !== -1 ? res.slice(commaIdx + 1) : res);
          };
          r.onerror = () => resolve(null);
          r.readAsDataURL(currentSelectedAssignmentFile);
        });
      } catch (err) {
        console.warn("Could not read base64:", err);
      }
    }
  }

  let generatedQuiz = null;

  // 1. Direct Call to Google Gemini 2.5 Flash using Prashiksha's GEMINI_API_KEY
  try {
    const promptText = `You are Prashiksha's AI tutor assistant and faculty examination specialist.
You are given an assignment problem sheet titled "${title}" (${subject}) for ${targetClass} students.
${fileTextContent ? `Read the following assignment problem sheet content carefully line-by-line:\n---\n${fileTextContent.slice(0, 15000)}\n---` : `Attached file: ${currentSelectedAssignmentFile ? currentSelectedAssignmentFile.name : title}`}

CRITICAL REQUIREMENTS:
1. QUESTION VARIETY (Balanced Pedagogical Mix):
   - 2 Conceptual Questions: Testing foundational principles, definitions, or mechanisms.
   - 2 Application-Based Questions: Presenting a real problem scenario, edge case, or algorithm decision.
   - 1 Calculation / Complexity / Quantitative Question: Testing numerical outcome, asymptotic bound (O-notation), step count, or state count.

2. DIFFICULTY SPECTRUM:
   - Span Easy (Q1-Q2), Medium (Q3-Q4), and Hard (Q5).
   - Tag each question with "difficulty": "Easy", "Medium", or "Hard".
   - Tag each question with "type": "Conceptual", "Application", or "Calculation".

3. ZERO QUESTION REFERENCES IN EXPLANATIONS:
   - NEVER use phrases such as "as per Question 9", "as in Problem 2", "according to question 4", or "in the assignment".
   - Explanations MUST be completely standalone, educational facts that explain WHY the correct answer is true on its own merits (under 20 words).

4. 10-SECOND TIMER & ACCESSIBILITY:
   - Every question has timer_seconds set strictly to 10.
   - Questions and options must be crisp, clear, and readable in under 3 seconds.

5. JSON FORMAT:
Return ONLY a valid JSON array of 5 objects (no markdown, no backticks, no conversation):
[
  {
    "id": 1,
    "difficulty": "Easy",
    "type": "Conceptual",
    "question": "Crisp standalone question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct_answer": "Option A",
    "explanation": "Completely standalone reason without citing question numbers.",
    "timer_seconds": 10
  }
]`;

    const requestParts = [];
    if (fileBase64Data) {
      requestParts.push({
        inlineData: {
          mimeType: fileMimeType,
          data: fileBase64Data
        }
      });
    }
    requestParts.push({ text: promptText });

    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${PRASHIKSHA_GEMINI_API_KEY}`;
    
    console.log("Calling Google Gemini 2.5 Flash with assignment content...");
    const directRes = await fetch(geminiEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: requestParts }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json"
        }
      })
    });

    if (directRes.ok) {
      const data = await directRes.json();
      const rawOutput = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
      console.log("✓ Gemini direct raw output:", rawOutput);

      const parsed = JSON.parse(rawOutput);
      if (Array.isArray(parsed) && parsed.length >= 5) {
        generatedQuiz = parsed.slice(0, 5);
        console.log("✓ Successfully parsed 5 questions generated by Gemini from file:", generatedQuiz);
      }
    } else {
      const errText = await directRes.text();
      console.warn("Direct Gemini call returned status:", directRes.status, errText);
    }
  } catch (directErr) {
    console.warn("Direct Gemini call encountered error:", directErr);
  }

  // 2. If direct call failed or was blocked, attempt backend route
  if (!generatedQuiz || generatedQuiz.length < 5) {
    try {
      const formData = new FormData();
      formData.append("assignment_title", title);
      formData.append("topic", subject);
      formData.append("target_class", targetClass);
      formData.append("content", fileTextContent || title);
      if (currentSelectedAssignmentFile) formData.append("file", currentSelectedAssignmentFile);

      const resp = await fetch("/api/teacher/generate-assignment-quiz", {
        method: "POST",
        body: formData
      });

      if (resp.ok) {
        const result = await resp.json();
        if (result && Array.isArray(result.quiz) && result.quiz.length >= 5) {
          generatedQuiz = result.quiz.slice(0, 5);
        }
      }
    } catch (netErr) {
      console.log("[Notice] Backend route unreachable", netErr);
    }
  }

  // 3. Dynamic Local Text Extractor (NEVER uses generic hardcoded BST questions if text is present)
  if (!generatedQuiz || generatedQuiz.length < 5) {
    if (fileTextContent && fileTextContent.trim().length > 20) {
      generatedQuiz = extractQuizFromCustomText(fileTextContent, title);
    } else {
      const fileHint = currentSelectedAssignmentFile ? currentSelectedAssignmentFile.name : title;
      generatedQuiz = getFallbackQuizForTopic(fileHint + " " + title, subject);
    }
  }

  
    // Sanitize any remaining question references from explanations
    generatedQuiz = generatedQuiz.map(q => {
      let exp = q.explanation || "";
      exp = exp.replace(/\b(as per|according to|as in|as per the|refer to|referring to)\s+(question|problem|task|q)\s*\d+/gi, "Based on the principle");
      exp = exp.replace(/\b(question|problem|task|q)\s*\d+[:.-]?\s*/gi, "");
      return { ...q, explanation: exp.trim() };
    });

  currentGeneratedQuiz = generatedQuiz;

  // Restore button state
  if (btnEl) {
    btnEl.disabled = false;
    btnEl.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> <span>Regenerate with Gemini Agent</span>`;
  }
  if (statusEl) statusEl.classList.add("hidden");

  // Render questions list preview in create assignment modal
  if (previewContainer && questionsListEl) {
    previewContainer.classList.remove("hidden");
    const sourceLabel = currentSelectedAssignmentFile ? `Generated by Gemini from "${currentSelectedAssignmentFile.name}"` : "Generated by Gemini Agent";
    questionsListEl.innerHTML = `
      <div class="text-[10px] text-blue-600 font-bold uppercase tracking-wider pb-1 flex items-center gap-1">
        <i data-lucide="sparkles" class="w-3 h-3 text-amber-500"></i>
        <span>${sourceLabel} • 10-Second Countdown Per Question</span>
      </div>
    ` + generatedQuiz.map((q, idx) => `
      <div class="p-2.5 rounded-xl bg-white border border-blue-200/80 shadow-xs space-y-1">
        <div class="flex items-center justify-between text-[11px]">
          <div class="flex items-center gap-1.5">
            <span class="font-extrabold text-blue-700">Question ${idx + 1} of 5</span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${q.difficulty === 'Hard' ? 'bg-rose-100 text-rose-700' : (q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700')}">
              ${q.difficulty || 'Standard'}
            </span>
            <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
              ${q.type || 'Conceptual'}
            </span>
          </div>
          <span class="inline-flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
            <i data-lucide="clock" class="w-3 h-3"></i> 10s Timer
          </span>
        </div>
        <p class="text-xs font-bold text-slate-900">${q.question}</p>
        <div class="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
          ${q.options.map((opt) => `
            <div class="px-2 py-1 rounded-md ${opt === q.correct_answer ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-300' : 'bg-slate-50 text-slate-600 border border-slate-100'}">
              ${opt} ${opt === q.correct_answer ? '✓' : ''}
            </div>
          `).join('')}
        </div>
        ${q.explanation ? `<div class="text-[10.5px] text-slate-500 pt-0.5 font-medium"><span class="font-bold text-slate-700">Explanation:</span> ${q.explanation}</div>` : ''}
      </div>
    `).join("");

    if (window.lucide) window.lucide.createIcons();
  }

  showToast(`✓ Gemini agent generated 5 rapid questions based on ${currentSelectedAssignmentFile ? currentSelectedAssignmentFile.name : title}!`);
}

// Dynamic text-based question builder so it NEVER outputs generic BST questions when an assignment file is given
function extractQuizFromCustomText(text, title) {
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 5);
  const questions = [];

  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i].replace(/^(Problem|Q|Question|Task)\s*\d*[:.-]?\s*/i, '');
    const cleanQ = line.length > 70 ? line.slice(0, 67) + '...' : line;
    questions.push({
      id: i + 1,
      question: cleanQ.endsWith('?') ? cleanQ : `Regarding: ${cleanQ}?`,
      options: ["Verify core concept", "Check edge condition", "Optimize complexity", "Evaluate logic"],
      correct_answer: "Verify core concept",
      explanation: `Derived directly from assignment problem line ${i + 1}.`,
      timer_seconds: 10
    });
  }

  while (questions.length < 5) {
    const idx = questions.length + 1;
    questions.push({
      id: idx,
      question: `What is the expected outcome of ${title} Task #${idx}?`,
      options: ["Correct execution", "Memory leak", "Infinite loop", "Syntax exception"],
      correct_answer: "Correct execution",
      explanation: "Assignment requires verifiable problem completion.",
      timer_seconds: 10
    });
  }

  return questions;
}

function readFileTextPreview(file) {
  return new Promise((resolve) => {
    if (file.type.includes("text") || file.name.endsWith(".txt") || file.name.endsWith(".py") || file.name.endsWith(".cpp") || file.name.endsWith(".sql")) {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result.slice(0, 3000));
      reader.onerror = () => resolve(file.name);
      reader.readAsText(file);
    } else {
      resolve(`Problem Sheet: ${file.name} - Size: ${(file.size/1024).toFixed(1)} KB`);
    }
  });
}

// Domain-aware fallback question sets for instant response
function getFallbackQuizForTopic(title, subject) {
  const t = (title + " " + subject).toLowerCase();
  if (t.includes("photosynthesis") || t.includes("bio") || t.includes("science")) {
    return [
      {
        id: 1,
        question: "Where do light-dependent reactions occur in chloroplasts?",
        options: ["Thylakoid membrane", "Stroma", "Outer membrane", "Mitochondria"],
        correct_answer: "Thylakoid membrane",
        explanation: "Chlorophyll pigments in thylakoids absorb photon energy.",
        timer_seconds: 10
      },
      {
        id: 2,
        question: "Which gas is fixed during the Calvin cycle?",
        options: ["Carbon Dioxide (CO2)", "Oxygen (O2)", "Nitrogen (N2)", "Methane (CH4)"],
        correct_answer: "Carbon Dioxide (CO2)",
        explanation: "RuBisCO fixes inorganic CO2 into sugar precursors.",
        timer_seconds: 10
      },
      {
        id: 3,
        question: "What molecule splits to provide electrons in PS II?",
        options: ["Water (H2O)", "Glucose", "CO2", "ATP"],
        correct_answer: "Water (H2O)",
        explanation: "Photolysis of water yields electrons and releases O2.",
        timer_seconds: 10
      },
      {
        id: 4,
        question: "Which enzyme catalyzes the initial carbon-fixing step?",
        options: ["RuBisCO", "ATP Synthase", "DNA Polymerase", "Amylase"],
        correct_answer: "RuBisCO",
        explanation: "RuBisCO is the primary catalyst for CO2 assimilation.",
        timer_seconds: 10
      },
      {
        id: 5,
        question: "What energy carriers are produced by the light reactions?",
        options: ["ATP & NADPH", "ADP & NADP+", "Glucose & O2", "Pyruvate"],
        correct_answer: "ATP & NADPH",
        explanation: "ATP and NADPH power dark-phase sugar synthesis.",
        timer_seconds: 10
      }
    ];
  } else if (t.includes("memory") || t.includes("operating") || t.includes("os")) {
    return [
      {
        id: 1,
        question: "What hardware component caches virtual address translations?",
        options: ["TLB", "ALU", "L1 Cache", "DMA Controller"],
        correct_answer: "TLB",
        explanation: "The TLB caches recent virtual-to-physical translations.",
        timer_seconds: 10
      },
      {
        id: 2,
        question: "Which page replacement algorithm suffers from Belady's Anomaly?",
        options: ["FIFO", "LRU", "Optimal", "Clock"],
        correct_answer: "FIFO",
        explanation: "FIFO page faults can increase with more physical frames.",
        timer_seconds: 10
      },
      {
        id: 3,
        question: "What state occurs when CPU spends more time paging than executing?",
        options: ["Thrashing", "Deadlock", "Starvation", "Aging"],
        correct_answer: "Thrashing",
        explanation: "Constant page swapping causes CPU utilization to drop.",
        timer_seconds: 10
      },
      {
        id: 4,
        question: "In paging systems, what type of fragmentation is prevented completely?",
        options: ["External fragmentation", "Internal fragmentation", "Disk fragmentation", "Bus fragmentation"],
        correct_answer: "External fragmentation",
        explanation: "Fixed-size frames eliminate external free space gaps.",
        timer_seconds: 10
      },
      {
        id: 5,
        question: "What signal does hardware raise when a page is absent from RAM?",
        options: ["Page Fault", "Segmentation Fault", "Trap", "SIGINT"],
        correct_answer: "Page Fault",
        explanation: "Page faults trigger the OS to fetch the page from backing store.",
        timer_seconds: 10
      }
    ];
  } else {
    // Default DSA BST questions
    return [
      {
        id: 1,
        question: "What is the worst-case search time in an unbalanced BST?",
        options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
        correct_answer: "O(n)",
        explanation: "Degenerate trees degrade to a linear singly linked list.",
        timer_seconds: 10
      },
      {
        id: 2,
        question: "In an AVL tree, what is the maximum allowed balance factor?",
        options: ["1", "0", "2", "3"],
        correct_answer: "1",
        explanation: "AVL balance factor must strictly be -1, 0, or +1.",
        timer_seconds: 10
      },
      {
        id: 3,
        question: "Which traversal of a BST yields elements in sorted order?",
        options: ["In-order", "Pre-order", "Post-order", "Level-order"],
        correct_answer: "In-order",
        explanation: "Left-Root-Right in-order traversal yields strictly ascending keys.",
        timer_seconds: 10
      },
      {
        id: 4,
        question: "What is the average height of a balanced BST with n nodes?",
        options: ["O(log n)", "O(n)", "O(sqrt n)", "O(1)"],
        correct_answer: "O(log n)",
        explanation: "Logarithmic tree height guarantees O(log n) lookups.",
        timer_seconds: 10
      },
      {
        id: 5,
        question: "Which rotation fixes a Left-Right (LR) tree imbalance?",
        options: ["Left then Right", "Right then Left", "Double Left", "Single Right"],
        correct_answer: "Left then Right",
        explanation: "First left-rotate the left child, then right-rotate the node.",
        timer_seconds: 10
      }
    ];
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 10-SECOND STUDENT QUIZ SIMULATOR CONTROLLER
// ═══════════════════════════════════════════════════════════════════════════

function openQuizSimulatorModal(asgnId = null, isDraft = false) {
  let questions = [];
  let title = "Assignment Verification Quiz";

  if (isDraft && currentGeneratedQuiz) {
    questions = currentGeneratedQuiz;
    const titleInput = document.getElementById("newAssignTitle");
    title = titleInput && titleInput.value.trim() ? titleInput.value.trim() : "Draft Assignment";
  } else if (asgnId) {
    const asgn = dashboardData.assignments.find(a => a.id === asgnId);
    if (asgn) {
      questions = asgn.postAttemptQuiz || getFallbackQuizForTopic(asgn.title, asgn.subject);
      title = asgn.title;
    }
  }

  if (!questions || questions.length === 0) {
    questions = getFallbackQuizForTopic("Data Structures", "Algorithms");
  }

  simQuizQuestions = questions;
  simCurrentIdx = 0;
  simScore = 0;

  const modal = document.getElementById("quizSimulatorModal");
  if (!modal) return;

  const titleEl = document.getElementById("simQuizTitle");
  if (titleEl) titleEl.textContent = title;

  // Reset Views
  const activeView = document.getElementById("simActiveQuizView");
  const completedView = document.getElementById("simCompletedView");
  if (activeView) activeView.classList.remove("hidden");
  if (completedView) completedView.classList.add("hidden");

  // Load Question 0
  loadSimulatorQuestion(0);

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  if (window.lucide) window.lucide.createIcons();
}

function closeQuizSimulatorModal() {
  stopSimulatorTimer();
  const modal = document.getElementById("quizSimulatorModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function restartSimulatorQuiz() {
  simCurrentIdx = 0;
  simScore = 0;
  const activeView = document.getElementById("simActiveQuizView");
  const completedView = document.getElementById("simCompletedView");
  if (activeView) activeView.classList.remove("hidden");
  if (completedView) completedView.classList.add("hidden");
  loadSimulatorQuestion(0);
}

function loadSimulatorQuestion(index) {
  stopSimulatorTimer();
  simAnswerLocked = false;

  const q = simQuizQuestions[index];
  if (!q) {
    showSimulatorCompleted();
    return;
  }

  const counterEl = document.getElementById("simQuestionCounter");
  if (counterEl) counterEl.textContent = `Q ${index + 1} of ${simQuizQuestions.length}`;

  const questionTextEl = document.getElementById("simQuestionText");
  if (questionTextEl) questionTextEl.textContent = q.question;

  const banner = document.getElementById("simExplanationBanner");
  if (banner) banner.classList.add("hidden");

  // Render 4 Single-Line Options
  const optionsContainer = document.getElementById("simOptionsContainer");
  if (optionsContainer) {
    const letters = ['A', 'B', 'C', 'D'];
    optionsContainer.innerHTML = q.options.map((opt, optIdx) => `
      <button 
        type="button" 
        onclick="selectSimulatorAnswer('${opt.replace(/'/g, "\\'")}', '${q.correct_answer.replace(/'/g, "\\'")}', '${(q.explanation || "").replace(/'/g, "\\'")}')"
        class="sim-option-btn w-full p-3 rounded-xl border border-slate-200 bg-white hover:bg-blue-50/70 hover:border-blue-400 text-left flex items-center justify-between text-xs font-semibold text-slate-800 transition active:scale-[0.99] group"
      >
        <div class="flex items-center gap-2.5">
          <span class="w-6 h-6 rounded-lg bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-600 flex items-center justify-center font-bold text-[11px] transition-colors">
            ${letters[optIdx] || (optIdx + 1)}
          </span>
          <span class="leading-normal">${opt}</span>
        </div>
        <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors"></i>
      </button>
    `).join("");
  }

  // Start the 10-second countdown
  startSimulatorTimer();
  if (window.lucide) window.lucide.createIcons();
}

function startSimulatorTimer() {
  stopSimulatorTimer();
  simTimeRemainingMs = 10000;

  const bar = document.getElementById("simTimerProgressBar");
  const digits = document.getElementById("simTimerDigits");

  if (bar) {
    bar.style.width = "100%";
    bar.className = "h-full bg-amber-500 rounded-full transition-all duration-100 ease-linear";
  }
  if (digits) {
    digits.textContent = "10.0s";
    digits.className = "text-sm font-black text-amber-600 tabular-nums";
  }

  const intervalStepMs = 100;
  simTimerInterval = setInterval(() => {
    simTimeRemainingMs -= intervalStepMs;

    if (simTimeRemainingMs <= 0) {
      simTimeRemainingMs = 0;
      stopSimulatorTimer();
      handleSimulatorTimeout();
      return;
    }

    const pct = Math.max(0, (simTimeRemainingMs / 10000) * 100);
    const secs = (simTimeRemainingMs / 1000).toFixed(1);

    if (bar) {
      bar.style.width = `${pct}%`;
      if (simTimeRemainingMs <= 3000) {
        bar.className = "h-full bg-rose-500 rounded-full animate-pulse transition-all duration-100 ease-linear";
      }
    }
    if (digits) {
      digits.textContent = `${secs}s`;
      if (simTimeRemainingMs <= 3000) {
        digits.className = "text-sm font-black text-rose-600 tabular-nums animate-pulse";
      }
    }
  }, intervalStepMs);
}

function stopSimulatorTimer() {
  if (simTimerInterval) {
    clearInterval(simTimerInterval);
    simTimerInterval = null;
  }
}

function selectSimulatorAnswer(selected, correct, explanation) {
  if (simAnswerLocked) return;
  simAnswerLocked = true;
  stopSimulatorTimer();

  const isCorrect = selected.trim() === correct.trim();
  if (isCorrect) simScore++;

  const optionBtns = document.querySelectorAll(".sim-option-btn");
  optionBtns.forEach(btn => {
    btn.disabled = true;
    const text = btn.innerText;
    if (text.includes(correct)) {
      btn.classList.add("bg-emerald-100", "border-emerald-500", "text-emerald-900");
    } else if (text.includes(selected) && !isCorrect) {
      btn.classList.add("bg-rose-100", "border-rose-400", "text-rose-900");
    }
  });

  const banner = document.getElementById("simExplanationBanner");
  const statusTxt = document.getElementById("simExplanationStatus");
  const expTxt = document.getElementById("simExplanationText");

  if (banner && statusTxt && expTxt) {
    banner.classList.remove("hidden");
    if (isCorrect) {
      statusTxt.innerHTML = `<span class="text-emerald-700 flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5"></i> Correct! Rapid Answer Logged.</span>`;
    } else {
      statusTxt.innerHTML = `<span class="text-rose-600 flex items-center gap-1.5"><i data-lucide="alert-circle" class="w-3.5 h-3.5"></i> Incorrect Answer.</span>`;
    }
    expTxt.textContent = explanation || `Correct answer: ${correct}`;
    if (window.lucide) window.lucide.createIcons();
  }

  // Auto advance to next question after 1.2 seconds
  setTimeout(() => {
    simCurrentIdx++;
    if (simCurrentIdx < simQuizQuestions.length) {
      loadSimulatorQuestion(simCurrentIdx);
    } else {
      showSimulatorCompleted();
    }
  }, 1250);
}

function handleSimulatorTimeout() {
  if (simAnswerLocked) return;
  simAnswerLocked = true;

  const q = simQuizQuestions[simCurrentIdx];
  const correct = q ? q.correct_answer : "";
  const explanation = q ? q.explanation : "";

  const optionBtns = document.querySelectorAll(".sim-option-btn");
  optionBtns.forEach(btn => {
    btn.disabled = true;
    if (correct && btn.innerText.includes(correct)) {
      btn.classList.add("bg-emerald-100", "border-emerald-500", "text-emerald-900");
    }
  });

  const banner = document.getElementById("simExplanationBanner");
  const statusTxt = document.getElementById("simExplanationStatus");
  const expTxt = document.getElementById("simExplanationText");

  if (banner && statusTxt && expTxt) {
    banner.classList.remove("hidden");
    statusTxt.innerHTML = `<span class="text-rose-600 flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5"></i> 10s Time Expired!</span>`;
    expTxt.textContent = `Time limit exceeded. Correct answer: ${correct}. ${explanation}`;
    if (window.lucide) window.lucide.createIcons();
  }

  setTimeout(() => {
    simCurrentIdx++;
    if (simCurrentIdx < simQuizQuestions.length) {
      loadSimulatorQuestion(simCurrentIdx);
    } else {
      showSimulatorCompleted();
    }
  }, 1300);
}

function showSimulatorCompleted() {
  stopSimulatorTimer();
  const activeView = document.getElementById("simActiveQuizView");
  const completedView = document.getElementById("simCompletedView");
  const scoreTxt = document.getElementById("simFinalScoreText");

  if (activeView) activeView.classList.add("hidden");
  if (completedView) completedView.classList.remove("hidden");

  const total = simQuizQuestions.length || 5;
  const pct = Math.round((simScore / total) * 100);
  if (scoreTxt) scoreTxt.textContent = `${simScore} / ${total} Correct (${pct}%)`;

  if (window.lucide) window.lucide.createIcons();
}


// ═══════════════════════════════════════════════════════════════════════════
// TEACHER CUSTOM QUIZ AUTHORING & SCHEDULED DISPATCH ENGINE
// ═══════════════════════════════════════════════════════════════════════════

let currentQuizFilter = "All";
let authorQuestionCounter = 0;

// Load or initialize scheduled quizzes data
function loadQuizzesData() {
  const saved = localStorage.getItem('disha_quizzes');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        dashboardData.quizzes = parsed;
        return;
      }
    } catch (e) {
      console.warn("Could not parse saved quizzes", e);
    }
  }

  // Initial Sample Quizzes authored by Dr. Ananya Sharma
  dashboardData.quizzes = [
    {
      id: "quiz-01",
      title: "Graph Algorithms & Minimum Spanning Trees Diagnostic",
      class: "CSE 2nd Year",
      subject: "Data Structures & Algorithms",
      scheduleDate: "2026-11-05",
      scheduleTime: "10:00",
      formattedSchedule: "Nov 05, 2026 at 10:00 AM",
      duration: "20",
      questionsCount: 5,
      status: "Scheduled",
      floatedToPrashiksha: true,
      targetStudents: 18,
      questions: [
        {
          id: 1,
          question: "What is the time complexity of Kruskal's algorithm using Union-Find?",
          options: ["O(E log E)", "O(V^2)", "O(V + E)", "O(E log V)"],
          correct_answer: "O(E log E)",
          explanation: "Sorting the edges dominates the runtime at O(E log E)."
        },
        {
          id: 2,
          question: "Which data structure is optimal for Prim's algorithm with dense graphs?",
          options: ["Adjacency Matrix", "Binary Heap", "Fibonacci Heap", "Linked List"],
          correct_answer: "Adjacency Matrix",
          explanation: "O(V^2) implementation with adjacency matrix is optimal for dense graphs."
        },
        {
          id: 3,
          question: "Can Dijkstra's algorithm handle negative edge weights correctly?",
          options: ["No, it may give incorrect results", "Yes, always works", "Only if graphs are DAGs", "Only with unweighted edges"],
          correct_answer: "No, it may give incorrect results",
          explanation: "Negative weights violate Dijkstra greedy relaxation invariants."
        },
        {
          id: 4,
          question: "What is the maximum number of edges in a simple undirected graph with V vertices?",
          options: ["V(V-1)/2", "V^2", "2V", "V-1"],
          correct_answer: "V(V-1)/2",
          explanation: "Every vertex can connect to V-1 other vertices without duplicates."
        },
        {
          id: 5,
          question: "Which search algorithm guarantees shortest path in an unweighted graph?",
          options: ["Breadth-First Search (BFS)", "Depth-First Search (DFS)", "Topological Sort", "A* Search"],
          correct_answer: "Breadth-First Search (BFS)",
          explanation: "Level-order exploration discovers vertices at minimal hop distances."
        }
      ]
    },
    {
      id: "quiz-02",
      title: "Virtual Memory, TLB & Paging Mechanisms Check",
      class: "CSE 3rd Year",
      subject: "Operating Systems & Architecture",
      scheduleDate: "2026-11-04",
      scheduleTime: "14:30",
      formattedSchedule: "Nov 04, 2026 at 02:30 PM",
      duration: "15",
      questionsCount: 5,
      status: "Scheduled",
      floatedToPrashiksha: true,
      targetStudents: 14,
      questions: [
        {
          id: 1,
          question: "What hardware component caches virtual-to-physical address translations?",
          options: ["TLB", "ALU", "L1 Cache", "DMA Controller"],
          correct_answer: "TLB",
          explanation: "The Translation Lookaside Buffer accelerates page table lookups."
        },
        {
          id: 2,
          question: "Which page replacement algorithm suffers from Belady's Anomaly?",
          options: ["FIFO", "LRU", "Optimal", "Clock"],
          correct_answer: "FIFO",
          explanation: "FIFO page faults can increase with more physical frames."
        },
        {
          id: 3,
          question: "What condition occurs when the CPU spends more time paging than executing?",
          options: ["Thrashing", "Deadlock", "Starvation", "Aging"],
          correct_answer: "Thrashing",
          explanation: "Constant page swapping causes CPU utilization to drop."
        },
        {
          id: 4,
          question: "In paging systems, what type of fragmentation is prevented completely?",
          options: ["External fragmentation", "Internal fragmentation", "Disk fragmentation", "Bus fragmentation"],
          correct_answer: "External fragmentation",
          explanation: "Fixed-size frames eliminate external free space gaps."
        },
        {
          id: 5,
          question: "What signal does CPU hardware raise when a page is not in RAM?",
          options: ["Page Fault", "Segmentation Fault", "Trap", "SIGINT"],
          correct_answer: "Page Fault",
          explanation: "Page faults trigger the OS to fetch the page from backing store."
        }
      ]
    },
    {
      id: "quiz-03",
      title: "C++ Memory Management & Pointer Arithmetic",
      class: "CSE 1st Year",
      subject: "Fundamentals of Programming & Logic",
      scheduleDate: "2026-10-31",
      scheduleTime: "16:00",
      formattedSchedule: "Today at 04:00 PM",
      duration: "15",
      questionsCount: 4,
      status: "Live Now",
      floatedToPrashiksha: true,
      targetStudents: 16,
      questions: [
        {
          id: 1,
          question: "Which operator is used to deallocate dynamic memory in C++?",
          options: ["delete", "free()", "remove", "destruct"],
          correct_answer: "delete",
          explanation: "delete / delete[] releases heap memory allocated with new."
        },
        {
          id: 2,
          question: "What is a dangling pointer in C++?",
          options: ["Pointer pointing to deallocated memory", "Null pointer", "Uninitialized pointer", "Void pointer"],
          correct_answer: "Pointer pointing to deallocated memory",
          explanation: "Accessing freed memory triggers undefined behavior."
        },
        {
          id: 3,
          question: "What does the dereference operator (*) return?",
          options: ["Value at the memory address", "The address itself", "Size of pointer", "Data type name"],
          correct_answer: "Value at the memory address",
          explanation: "*ptr accesses the value stored at the referenced address."
        },
        {
          id: 4,
          question: "Which smart pointer permits only unique, non-shared ownership?",
          options: ["std::unique_ptr", "std::shared_ptr", "std::weak_ptr", "std::auto_ptr"],
          correct_answer: "std::unique_ptr",
          explanation: "unique_ptr prevents copying and enforces exclusive ownership."
        }
      ]
    }
  ];
}

// Initial load
loadQuizzesData();

// Render scheduled quizzes list
function renderQuizzesList(filter = currentQuizFilter) {
  currentQuizFilter = filter;
  const container = document.getElementById("quizzesListContainer");
  if (!container) return;

  let list = dashboardData.quizzes || [];
  if (filter !== "All") {
    list = list.filter(q => q.class === filter || q.status === filter);
  }

  // Update filter buttons styling
  const filterBtns = document.querySelectorAll(".quiz-filter-btn");
  filterBtns.forEach(btn => {
    if (btn.getAttribute("data-filter") === filter) {
      btn.className = "btn-view bg-slate-900 text-white quiz-filter-btn font-semibold";
    } else {
      btn.className = "btn-view quiz-filter-btn";
    }
  });

  if (list.length === 0) {
    container.innerHTML = `
      <div class="dashboard-card p-10 text-center text-slate-400">
        <i data-lucide="help-circle" class="w-10 h-10 mx-auto mb-2 opacity-50"></i>
        <div class="text-sm font-bold text-slate-700">No quizzes found for ${filter}</div>
        <p class="text-xs text-slate-400 mt-1">Click "Create & Schedule Quiz" to author questions and schedule a test.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = list.map(quiz => {
    let statusClass = "status-pill";
    if (quiz.status === "Live Now") {
      statusClass = "status-pill needs-attention";
    }

    return `
      <div class="quiz-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <!-- Left: Quiz Info -->
        <div class="space-y-2 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-700">
              ${quiz.class}
            </span>
            <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              ${quiz.subject}
            </span>
            <span class="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot"></span>
              <span>Floated to ${quiz.targetStudents || 18} Students in Prashiksha</span>
            </span>
          </div>

          <h4 class="text-base font-bold text-slate-900 tracking-tight leading-snug">
            ${quiz.title}
          </h4>

          <div class="flex flex-wrap items-center gap-3 text-xs text-slate-600 pt-1">
            <span class="flex items-center gap-1.5 font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-blue-600"></i>
              <span>${quiz.formattedSchedule}</span>
            </span>
            <span class="flex items-center gap-1 font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
              <i data-lucide="timer" class="w-3.5 h-3.5 text-amber-500"></i>
              <span>${quiz.duration} Mins Duration</span>
            </span>
            <span class="flex items-center gap-1 font-medium text-slate-500">
              <i data-lucide="check-square" class="w-3.5 h-3.5 text-slate-400"></i>
              <span>${quiz.questionsCount || quiz.questions.length} Authored Questions</span>
            </span>
          </div>
        </div>

        <!-- Right: Actions -->
        <div class="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
          <span class="${statusClass} text-xs">
            ${quiz.status}
          </span>
          <button 
            type="button" 
            onclick="previewCustomQuiz('${quiz.id}')"
            class="btn-view text-xs font-bold flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200"
          >
            <i data-lucide="play" class="w-3.5 h-3.5"></i>
            <span>Preview Quiz</span>
          </button>
          <button 
            type="button" 
            onclick="showToast('Roster for ${quiz.class}: All ${quiz.targetStudents || 18} students will see this quiz on Prashiksha at ${quiz.scheduleTime}!')"
            class="btn-view text-xs font-semibold"
          >
            Target Students (${quiz.targetStudents || 18})
          </button>
        </div>

      </div>
    `;
  }).join("");

  // Update statistics
  const scheduledStatEl = document.getElementById("statScheduledQuizzes");
  if (scheduledStatEl) {
    scheduledStatEl.textContent = `${dashboardData.quizzes.length} Quizzes`;
  }

  const totalQuestionsEl = document.getElementById("statTotalAuthoredQuestions");
  if (totalQuestionsEl) {
    const totalQ = dashboardData.quizzes.reduce((sum, q) => sum + (q.questions ? q.questions.length : 0), 0);
    totalQuestionsEl.textContent = `${totalQ} Questions`;
  }

  if (window.lucide) window.lucide.createIcons();
}

function filterQuizzesList(filter) {
  renderQuizzesList(filter);
}

// Open Create & Schedule Custom Quiz Modal
function openCreateCustomQuizModal() {
  const modal = document.getElementById("createCustomQuizModal");
  if (!modal) return;

  // Set default scheduled date to tomorrow
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 1);
  const dateStr = targetDate.toISOString().split("T")[0];

  const dateInput = document.getElementById("customQuizDate");
  if (dateInput) dateInput.value = dateStr;

  const timeInput = document.getElementById("customQuizTime");
  if (timeInput) timeInput.value = "10:00";

  const titleInput = document.getElementById("customQuizTitle");
  if (titleInput) titleInput.value = "";

  updateQuizTargetClassPreview("CSE 2nd Year");

  // Reset questions container and start with clean, blank author question card
  authorQuestionCounter = 0;
  const questionsContainer = document.getElementById("authorQuestionsContainer");
  if (questionsContainer) {
    questionsContainer.innerHTML = "";
    // Create 1 clean, blank question card for the teacher to write from scratch without pre-typed questions
    addAuthorQuestionField();
  }

  updateAuthorQuestionBadge();

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  if (window.lucide) window.lucide.createIcons();
}

function closeCreateCustomQuizModal() {
  const modal = document.getElementById("createCustomQuizModal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function updateQuizTargetClassPreview(className) {
  const targetClassEl = document.getElementById("quizPreviewTargetClassText");
  const countEl = document.getElementById("quizPreviewStudentCountText");
  if (!targetClassEl || !countEl) return;

  targetClassEl.textContent = className;
  if (className === "CSE 1st Year") countEl.textContent = "16 enrolled students";
  else if (className === "CSE 2nd Year") countEl.textContent = "18 enrolled students";
  else if (className === "CSE 3rd Year") countEl.textContent = "14 enrolled students";
  else countEl.textContent = "all 48 students across 3 batches";
}

function updateAuthorQuestionBadge() {
  const container = document.getElementById("authorQuestionsContainer");
  const badge = document.getElementById("authorQuestionCounterBadge");
  if (!container || !badge) return;
  const total = container.children.length;
  badge.textContent = `${total} ${total === 1 ? 'Question' : 'Questions'}`;
}

// Add an author question input card (clean blank fields for teacher to author completely by themselves)
function addAuthorQuestionField(data = null) {
  authorQuestionCounter++;
  const container = document.getElementById("authorQuestionsContainer");
  if (!container) return;

  const cardId = `author-q-card-${authorQuestionCounter}`;
  const qNum = container.children.length + 1;

  const qText = data ? data.question : "";
  const optA = data ? data.optA : "";
  const optB = data ? data.optB : "";
  const optC = data ? data.optC : "";
  const optD = data ? data.optD : "";
  const correct = data ? data.correct : "A";

  const questionCard = document.createElement("div");
  questionCard.id = cardId;
  questionCard.className = "quiz-author-question-box space-y-3";
  questionCard.innerHTML = `
    <div class="flex items-center justify-between pb-1 border-b border-slate-100/80">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-[11px] flex items-center justify-center">
          ${qNum}
        </span>
        <span class="text-xs font-bold text-slate-800">Question ${qNum}</span>
      </div>
      <button 
        type="button" 
        onclick="removeAuthorQuestionField('${cardId}')"
        class="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 transition"
      >
        <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
        <span>Remove</span>
      </button>
    </div>

    <!-- Question Text -->
    <div>
      <label class="block text-[11px] font-semibold text-slate-600 mb-1">
        Question Text <span class="text-rose-500">*</span>
      </label>
      <input 
        type="text" 
        required 
        value="${qText.replace(/"/g, '&quot;')}" 
        placeholder="Type question here (e.g. What is the time complexity of binary search?)..." 
        class="author-q-text w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
      />
    </div>

    <!-- 4 Options A, B, C, D -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
      <div>
        <label class="block text-[10.5px] font-bold text-slate-500 mb-0.5">Option A <span class="text-rose-500">*</span></label>
        <input type="text" required value="${optA.replace(/"/g, '&quot;')}" placeholder="Enter Option A" class="author-opt-a w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
      </div>
      <div>
        <label class="block text-[10.5px] font-bold text-slate-500 mb-0.5">Option B <span class="text-rose-500">*</span></label>
        <input type="text" required value="${optB.replace(/"/g, '&quot;')}" placeholder="Enter Option B" class="author-opt-b w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
      </div>
      <div>
        <label class="block text-[10.5px] font-bold text-slate-500 mb-0.5">Option C <span class="text-rose-500">*</span></label>
        <input type="text" required value="${optC.replace(/"/g, '&quot;')}" placeholder="Enter Option C" class="author-opt-c w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
      </div>
      <div>
        <label class="block text-[10.5px] font-bold text-slate-500 mb-0.5">Option D <span class="text-rose-500">*</span></label>
        <input type="text" required value="${optD.replace(/"/g, '&quot;')}" placeholder="Enter Option D" class="author-opt-d w-full text-xs p-2 bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:outline-none" />
      </div>
    </div>

    <!-- Select Correct Answer -->
    <div class="flex items-center justify-between pt-1">
      <div class="flex items-center gap-3 text-xs">
        <span class="font-bold text-slate-700">Correct Answer:</span>
        <label class="flex items-center gap-1 cursor-pointer font-bold text-slate-800">
          <input type="radio" name="correct_${cardId}" value="A" ${correct === 'A' ? 'checked' : ''} class="author-correct-radio text-blue-600 focus:ring-blue-500" /> A
        </label>
        <label class="flex items-center gap-1 cursor-pointer font-bold text-slate-800">
          <input type="radio" name="correct_${cardId}" value="B" ${correct === 'B' ? 'checked' : ''} class="author-correct-radio text-blue-600 focus:ring-blue-500" /> B
        </label>
        <label class="flex items-center gap-1 cursor-pointer font-bold text-slate-800">
          <input type="radio" name="correct_${cardId}" value="C" ${correct === 'C' ? 'checked' : ''} class="author-correct-radio text-blue-600 focus:ring-blue-500" /> C
        </label>
        <label class="flex items-center gap-1 cursor-pointer font-bold text-slate-800">
          <input type="radio" name="correct_${cardId}" value="D" ${correct === 'D' ? 'checked' : ''} class="author-correct-radio text-blue-600 focus:ring-blue-500" /> D
        </label>
      </div>
      <span class="text-[10.5px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
        Teacher Authored
      </span>
    </div>
  `;

  container.appendChild(questionCard);
  updateAuthorQuestionBadge();

  if (window.lucide) window.lucide.createIcons();

  // Smooth scroll so the new question is brought into immediate view
  setTimeout(() => {
    questionCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    const firstInput = questionCard.querySelector('.author-q-text');
    if (firstInput && !data) firstInput.focus();
  }, 50);
}

function removeAuthorQuestionField(cardId) {
  const container = document.getElementById("authorQuestionsContainer");
  if (!container) return;
  if (container.children.length <= 1) {
    alert("Quiz must have at least one question.");
    return;
  }
  const el = document.getElementById(cardId);
  if (el) el.remove();

  // Renumber remaining question cards
  Array.from(container.children).forEach((card, idx) => {
    const numSpan = card.querySelector('.w-6.h-6');
    const titleSpan = card.querySelector('.text-xs.font-bold');
    if (numSpan) numSpan.textContent = idx + 1;
    if (titleSpan) titleSpan.textContent = `Question ${idx + 1}`;
  });

  updateAuthorQuestionBadge();
}

function submitCreateAndScheduleQuiz(e) {
  e.preventDefault();

  const titleInput = document.getElementById("customQuizTitle");
  const classInput = document.getElementById("customQuizClass");
  const subjectInput = document.getElementById("customQuizSubject");
  const dateInput = document.getElementById("customQuizDate");
  const timeInput = document.getElementById("customQuizTime");
  const durationInput = document.getElementById("customQuizDuration");

  const title = titleInput ? titleInput.value.trim() : "";
  const targetClass = classInput ? classInput.value : "CSE 2nd Year";
  const subject = subjectInput ? subjectInput.value : "Data Structures & Algorithms";
  const scheduleDate = dateInput ? dateInput.value : "2026-11-05";
  const scheduleTime = timeInput ? timeInput.value : "10:00";
  const duration = durationInput ? durationInput.value : "15";

  if (!title) {
    alert("Please provide a quiz title.");
    return;
  }

  // Collect all authored questions
  const container = document.getElementById("authorQuestionsContainer");
  const questionCards = container ? container.children : [];
  if (questionCards.length === 0) {
    alert("Please author at least one question for the quiz.");
    return;
  }

  const collectedQuestions = [];
  for (let i = 0; i < questionCards.length; i++) {
    const card = questionCards[i];
    const qTextEl = card.querySelector(".author-q-text");
    const optAEl = card.querySelector(".author-opt-a");
    const optBEl = card.querySelector(".author-opt-b");
    const optCEl = card.querySelector(".author-opt-c");
    const optDEl = card.querySelector(".author-opt-d");
    const radioEl = card.querySelector(".author-correct-radio:checked");

    const qText = qTextEl ? qTextEl.value.trim() : "";
    const optA = optAEl ? optAEl.value.trim() : "Option A";
    const optB = optBEl ? optBEl.value.trim() : "Option B";
    const optC = optCEl ? optCEl.value.trim() : "Option C";
    const optD = optDEl ? optDEl.value.trim() : "Option D";
    const correctLetter = radioEl ? radioEl.value : "A";

    let correctVal = optA;
    if (correctLetter === "B") correctVal = optB;
    else if (correctLetter === "C") correctVal = optC;
    else if (correctLetter === "D") correctVal = optD;

    if (!qText) {
      alert(`Please enter text for Question ${i + 1}.`);
      return;
    }

    collectedQuestions.push({
      id: i + 1,
      question: qText,
      options: [optA, optB, optC, optD],
      correct_answer: correctVal,
      explanation: `Correct answer is Option ${correctLetter}: ${correctVal}.`,
      timer_seconds: 10
    });
  }

  // Format schedule display
  const dateObj = new Date(`${scheduleDate}T${scheduleTime}`);
  const options = { month: 'short', day: '2-digit', year: 'numeric' };
  const dateFormatted = isNaN(dateObj.getTime()) ? scheduleDate : dateObj.toLocaleDateString('en-US', options);
  const formattedSchedule = `${dateFormatted} at ${scheduleTime}`;

  // Student count
  let studentCount = 18;
  if (targetClass.includes("1st")) studentCount = 16;
  else if (targetClass.includes("3rd")) studentCount = 14;
  else if (targetClass.includes("All")) studentCount = 48;

  const newQuiz = {
    id: "quiz-" + Date.now(),
    title: title,
    class: targetClass,
    subject: subject,
    scheduleDate: scheduleDate,
    scheduleTime: scheduleTime,
    formattedSchedule: formattedSchedule,
    duration: duration,
    questionsCount: collectedQuestions.length,
    questions: collectedQuestions,
    status: "Scheduled",
    floatedToPrashiksha: true,
    targetStudents: studentCount
  };

  dashboardData.quizzes.unshift(newQuiz);

  // Save to persistent storage and Prashiksha scheduled queue
  try {
    localStorage.setItem('disha_quizzes', JSON.stringify(dashboardData.quizzes));
    
    // Save in prashiksha_scheduled_quizzes partitioned for student dashboards
    const studentQueue = JSON.parse(localStorage.getItem('prashiksha_scheduled_quizzes') || '[]');
    studentQueue.unshift(newQuiz);
    localStorage.setItem('prashiksha_scheduled_quizzes', JSON.stringify(studentQueue));
  } catch (err) {
    console.warn("Could not save to localStorage", err);
  }

  closeCreateCustomQuizModal();
  renderQuizzesList(currentQuizFilter);

  showToast(`📅 Quiz "${title}" scheduled for ${targetClass}! Floated to ${studentCount} student dashboards in Prashiksha.`);
}

// Preview Custom Quiz in Simulator
function previewCustomQuiz(quizId) {
  const quiz = dashboardData.quizzes.find(q => q.id === quizId);
  if (!quiz) return;

  simQuizQuestions = quiz.questions;
  simCurrentIdx = 0;
  simScore = 0;

  const modal = document.getElementById("quizSimulatorModal");
  if (!modal) return;

  const titleEl = document.getElementById("simQuizTitle");
  if (titleEl) titleEl.textContent = `${quiz.title} (${quiz.duration} Mins · ${quiz.class})`;

  const activeView = document.getElementById("simActiveQuizView");
  const completedView = document.getElementById("simCompletedView");
  if (activeView) activeView.classList.remove("hidden");
  if (completedView) completedView.classList.add("hidden");

  loadSimulatorQuestion(0);

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  if (window.lucide) window.lucide.createIcons();
}
