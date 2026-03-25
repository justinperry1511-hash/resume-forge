import React, { useState, useEffect, useRef } from "react";

const JOBS_KEY = "rfjobs_v1";
const STEEL = "#2C2C2A", STEEL2 = "#444441", STEEL3 = "#888780", STEEL_LIGHT = "#F1EFE8", STEEL_MID = "#D3D1C7";
const GOLD = "#BA7517", GOLD_LIGHT = "#FAEEDA", GOLD_MID = "#FAC775", GOLD_BRIGHT = "#EF9F27", GOLD_TEXT = "#854F0B";
const FL = { fontSize: 11, fontWeight: 500, letterSpacing: "0.07em", textTransform: "uppercase" };
const FORMATS = ["Classic", "Modern", "Creative", "Minimalist"];
const VISUALS = ["Clean & Simple", "Bold Headers", "Two-Column", "Timeline"];
const LENGTHS = ["Condensed (1 page)", "Standard (1-2 pages)", "Detailed (2+ pages)"];
const TONES = ["Professional", "Conversational", "Executive", "Technical"];
const FOCUS = ["Skills-first", "Experience-first", "Achievements-first"];
const STATUSES = ["In Progress", "Applied", "Interview", "Offer", "Rejected"];
const SC = { "In Progress": { bg: "#EEEDFE", text: "#3C3489" }, Applied: { bg: "#F1EFE8", text: "#444441" }, Interview: { bg: "#FAEEDA", text: "#854F0B" }, Offer: { bg: "#EAF3DE", text: "#3B6D11" }, Rejected: { bg: "#FCEBEB", text: "#A32D2D" } };
const PALETTES = {
  "Steel Blue": { accent: "#185FA5", light: "#E6F1FB", mid: "#85B7EB", text: "#0C447C", bullet: "#378ADD" },
  "Forest Green": { accent: "#3B6D11", light: "#EAF3DE", mid: "#97C459", text: "#27500A", bullet: "#639922" },
  "Burgundy Red": { accent: "#791F1F", light: "#FCEBEB", mid: "#F09595", text: "#501313", bullet: "#A32D2D" },
  "Slate Purple": { accent: "#534AB7", light: "#EEEDFE", mid: "#AFA9EC", text: "#3C3489", bullet: "#7F77DD" },
  Teal: { accent: "#0F6E56", light: "#E1F5EE", mid: "#5DCAA5", text: "#085041", bullet: "#1D9E75" },
  Monochrome: { accent: "#2C2C2A", light: "#F1EFE8", mid: "#B4B2A9", text: "#444441", bullet: "#5F5E5A" }
};

// ── DEMO MOCK DATA ──────────────────────────────────────────────────────────
// Simulates a real AI response optimizing Justin Perry's resume for a
// Business Analyst role at a tech company.
const MOCK_RESULTS = {
  ats_before: 61,
  ats_after: 89,
  ats_breakdown: {
    keyword_match: 91,
    formatting: 95,
    relevance: 88,
    impact_language: 83
  },
  keywords_added: ["data pipeline", "KPI reporting", "cross-functional", "stakeholder communication", "ETL", "regression analysis", "A/B testing", "agile"],
  keywords_missing: ["Snowflake", "dbt", "Looker"],
  improvements: [
    "Reframed retail experience around data analysis and metrics tracking to align with BA role requirements",
    "Added quantified outcomes to all work experience bullets where measurable impact was implied",
    "Incorporated 8 high-value ATS keywords from the job description naturally throughout the resume",
    "Strengthened summary to lead with technical stack and analytical background",
    "Restructured skills section to mirror exact terminology used in the job posting"
  ],
  optimized_resume: `JUSTIN PERRY
Alcoa, TN 37701 | 740-591-1184 | Jperry50@vols.utk.edu | linkedin.com/in/justin-perry-4b1275232

SUMMARY
Business Analytics student at the University of Tennessee with a strong foundation in data analysis, predictive modeling, and KPI reporting. Proficient in Python, R, SQL, and Tableau with hands-on experience building end-to-end data pipelines, machine learning models, and cross-functional analytics tools. Seeking a Business Analyst role to apply technical skills and a data-driven mindset to solve real business problems.

WORK EXPERIENCE
Retail Run Ambassador | Dick's Sporting Goods – House of Sports | Apr 2021 – Present
Knoxville, TN
• Analyze sales trends and inventory data to inform floor planning and product placement decisions, contributing to profitability at the highest-grossing House of Sports location
• Conduct structured biomechanical assessments (Gait Analyses) to collect and interpret customer data, translating findings into personalized product recommendations that improved repeat purchase rate
• Track department-level KPIs and sales metrics to identify performance gaps, adjusting strategy in real time to consistently meet or exceed targets
• Apply ETL-style data workflows to inventory management, flagging demand patterns and stock variances to optimize product availability

IT Support Assistant | Ohio University | May 2019 – Aug 2019
Athens, OH
• Installed, configured, and maintained campus computer systems, improving technology reliability across supported departments
• Performed diagnostic troubleshooting and maintenance; collaborated with senior IT staff on infrastructure upgrades

Study Abroad – International Business | Bond University | Jan 2024 – Apr 2024
Gold Coast, Australia
• Completed coursework in Global Business Strategy, International Trade, and Cross-Cultural Management
• Developed cross-functional communication and adaptability skills in a multicultural academic environment

EDUCATION
B.S. Business Analytics | University of Tennessee, Knoxville | Aug 2020 – May 2026 (Expected)
Relevant Coursework: Business Analytics, Data Visualization, Predictive Modeling, Business Intelligence, Statistics, Global Business Strategy

International Business Exchange | Bond University | Jan 2024 – Apr 2024

PROJECTS
Resume Forge – AI-Powered Resume Optimization Tool | Personal Project | 2025
• Built a full-stack React application integrating an LLM API to tailor resumes to job descriptions, generate cover letters, and score ATS compatibility in real time
• Engineered ATS scoring engine with before/after comparison, keyword gap analysis, and stakeholder-facing improvement reporting
• Tools: React, JavaScript, REST APIs, jsPDF

Airbnb Price Prediction & Market Segmentation | University of Tennessee | 2025
• Engineered and evaluated three ML models (Linear Regression, SVM, Random Forest) on 7,000+ listings; Random Forest achieved 91.72% accuracy with R² = 0.97
• Applied K-means clustering to segment market into three tiers, enabling data-driven pricing strategy recommendations
• Built end-to-end data pipeline: cleaning, feature engineering, scaling, and hyperparameter tuning via grid search
• Tools: R, tidyverse, caret, ranger, ggplot2

Mortgage & Refinance Analytics Calculator | Personal Project | 2024
• Built interactive R Shiny app for modeling amortization schedules, total interest costs, and refinance break-even timelines
• Tools: R, Shiny, ggplot2

U.S. Airline Flight Performance Analysis | University of Tennessee | 2023
• Analyzed 2+ months of national flight data in Tableau; built interactive dashboard across 10+ major carriers
• Key finding: Friday/Saturday had lowest average arrival delays; Illinois had nearly 3x weather cancellations of next state
• Tools: Tableau, calculated fields, dashboard design, data storytelling

SKILLS
Analytics & Business Intelligence: Python, R, SQL, Tableau, Power BI, Microsoft Excel (PivotTables, Power Query), Data Visualization
Modeling & Statistics: Predictive Modeling, Regression Analysis, A/B Testing, Market Basket Analysis, Forecasting
Data Operations: ETL Processes, Data Cleaning & Preparation, Database Management, Business Intelligence
Professional: Stakeholder Communication, Cross-Functional Collaboration, Agile, Research, Relationship Building`,

  cover_letter: `March 25, 2026

Dear Hiring Manager,

I am writing to express my strong interest in the Business Analyst position at Apex Analytics. As a Business Analytics student at the University of Tennessee with hands-on experience building machine learning models, interactive dashboards, and AI-powered data tools, I am confident I can contribute immediately to your team's analytical capabilities.

In my most recent project, I built a full-stack AI-powered resume optimization tool that integrates an LLM API to generate ATS scoring, keyword gap analysis, and tailored cover letters — demonstrating my ability to take an analytical problem end-to-end from data pipeline to user-facing product. Prior to that, I developed a Random Forest price prediction model on 7,000+ Airbnb listings that achieved 91.72% accuracy, applying K-means clustering and rigorous hyperparameter tuning to deliver actionable market segmentation insights.

Beyond academics, my role at Dick's Sporting Goods has sharpened my ability to translate data into decisions in a fast-paced environment. I track department-level KPIs, identify inventory demand patterns, and adjust strategy in real time — skills that transfer directly to cross-functional analytics work.

I am proficient in Python, R, SQL, Tableau, and Power BI, and I thrive at the intersection of technical analysis and clear stakeholder communication. I would welcome the opportunity to bring this combination of skills to Apex Analytics.

Thank you for your consideration. I look forward to the opportunity to discuss how I can contribute to your team.

Sincerely,
Justin Perry
740-591-1184 | Jperry50@vols.utk.edu`
};

const DEMO_RESUME = `JUSTIN PERRY
Alcoa, TN 37701 | 740-591-1184 | Jperry50@vols.utk.edu | linkedin.com/in/justin-perry-4b1275232

SUMMARY
Business Analytics student at the University of Tennessee with a strong foundation in data analysis, predictive modeling, and business intelligence. Skilled in Python, R, SQL, and Tableau with hands-on project experience building machine learning models, interactive dashboards, and AI-powered applications.

WORK EXPERIENCE
Retail Run Ambassador | Dick's Sporting Goods | Apr 2021 – Present
• Analyze sales trends and inventory flow data to inform seasonal floor planning
• Conduct structured Gait Analyses and translate findings into product recommendations
• Track sales metrics to identify performance gaps and adjust strategy in real time

EDUCATION
B.S. Business Analytics | University of Tennessee | Aug 2020 – May 2026

SKILLS
Python, R, SQL, Tableau, Power BI, Excel, Predictive Modeling, Data Visualization`;

const DEMO_JOB = `Business Analyst – Apex Analytics

We're looking for a Business Analyst to join our data team. You'll work cross-functionally with product and engineering to turn complex data into actionable insights.

Requirements:
- Proficiency in SQL, Python, and data visualization tools (Tableau, Power BI)
- Experience with ETL pipelines and KPI reporting
- Strong stakeholder communication skills
- Familiarity with regression analysis, A/B testing, and agile workflows
- Experience with predictive modeling a plus`;

// ── PDF HELPERS ──────────────────────────────────────────────────────────────
const fmtPhone = t => t.replace(/(\d{3})\.(\d{3})\.(\d{4})/g, "$1-$2-$3").replace(/\((\d{3})\)\s?(\d{3})[.\-\s](\d{4})/g, "$1-$2-$3");
const jobSlug = d => d.split("\n").slice(0, 5).join(" ").replace(/[^a-zA-Z0-9\s]/g, "").trim().split(/\s+/).slice(0, 4).join("_") || "Application";
const scoreColor = s => s >= 80 ? "#1D9E75" : s >= 60 ? "#EF9F27" : "#E24B4A";

function loadJsPDF() {
  return new Promise(function (res) {
    if (window.jspdf) { res(); return; }
    var s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    s.onload = res;
    document.head.appendChild(s);
  });
}

function downloadPDF(doc, filename) {
  var blob = doc.output("blob");
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  setTimeout(function () { URL.revokeObjectURL(url); document.body.removeChild(a); }, 1000);
}

async function buildResumePDF(text, accent) {
  await loadJsPDF();
  var jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF({ unit: "pt", format: "letter" });
  var mg = 48, pw = 612, ph = 792, cw = 516, y = mg;
  var chk = function (n) { if (y + (n || 14) > ph - mg) { doc.addPage(); y = mg; } };
  text.split("\n").forEach(function (raw, idx) {
    var ln = raw.trim(); if (!ln) { y += 5; return; }
    var ft = fmtPhone(ln);
    var isName = idx === 0 && ln.length < 60 && !/@|\|/.test(ln);
    var isHdr = /^[A-Z][A-Z\s&]{3,}$/.test(ln) && ln.length < 40;
    var isBul = /^[•\-\*]/.test(ln);
    var isCon = /@|linkedin|github|\d{3}[-.\s]\d{3}/i.test(ln);
    if (isName) { chk(28); doc.setFontSize(20).setFont("helvetica", "bold").setTextColor("#1a1a1a"); doc.text(ft, mg, y); y += 28; }
    else if (isCon) { chk(16); doc.setFontSize(9).setFont("helvetica", "normal").setTextColor("#555"); doc.text(ft, mg, y); y += 5; doc.setDrawColor(accent).setLineWidth(0.5).line(mg, y, pw - mg, y); y += 10; }
    else if (isHdr) { chk(22); y += 6; doc.setFontSize(9).setFont("helvetica", "bold").setTextColor(accent); doc.text(ft.toUpperCase(), mg, y); y += 4; doc.setDrawColor(accent).setLineWidth(1.5).line(mg, y, mg + cw * 0.35, y); y += 8; }
    else if (isBul) { chk(14); var cl = ft.replace(/^[•\-\*]\s*/, ""); doc.setFontSize(9).setFont("helvetica", "normal").setTextColor("#444"); doc.setFillColor(accent).circle(mg + 4, y - 3, 1.5, "F"); doc.splitTextToSize(cl, cw - 14).forEach(function (wl) { chk(13); doc.text(wl, mg + 12, y); y += 13; }); }
    else { chk(13); doc.setFontSize(9).setFont("helvetica", "normal").setTextColor("#444"); doc.splitTextToSize(ft, cw).forEach(function (wl) { chk(13); doc.text(wl, mg, y); y += 13; }); }
  });
  return doc;
}

async function buildCoverPDF(text) {
  await loadJsPDF();
  var jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF({ unit: "pt", format: "letter" });
  var mg = 64, ph = 792, cw = 484, y = mg;
  var chk = function (n) { if (y + (n || 16) > ph - mg) { doc.addPage(); y = mg; } };
  text.split("\n").forEach(function (raw, idx) {
    var ln = raw.trim(); if (!ln) { y += 8; return; }
    var ft = fmtPhone(ln);
    if (idx === 0) { chk(14); doc.setFontSize(10).setFont("helvetica", "normal").setTextColor("#888"); doc.text(ft, mg, y); y += 20; }
    else if (ln.startsWith("Dear") || ln.startsWith("To ") || ln.startsWith("Sincerely") || ln.startsWith("Best") || ln.startsWith("Thank")) { chk(16); doc.setFontSize(11).setFont("helvetica", "bold").setTextColor("#222"); doc.text(ft, mg, y); y += 18; }
    else { chk(14); doc.setFontSize(10).setFont("helvetica", "normal").setTextColor("#333"); doc.splitTextToSize(ft, cw).forEach(function (wl) { chk(14); doc.text(wl, mg, y); y += 15; }); }
  });
  return doc;
}

// ── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function App() {
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [format, setFormat] = useState("Modern");
  const [visual, setVisual] = useState("Clean & Simple");
  const [length, setLength] = useState("Standard (1-2 pages)");
  const [tone, setTone] = useState("Professional");
  const [focus, setFocus] = useState("Experience-first");
  const [palette, setPalette] = useState("Steel Blue");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("resume");
  const [appTab, setAppTab] = useState("optimizer");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [loadingMsg, setLoadingMsg] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [savedToTracker, setSavedToTracker] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobAdding, setJobAdding] = useState(false);
  const [jobExpanded, setJobExpanded] = useState(null);
  const [jobForm, setJobForm] = useState({ company: "", title: "", date: "", status: "In Progress", link: "" });
  const [demoLoaded, setDemoLoaded] = useState(false);
  const msgIdx = useRef(0);
  const msgs = ["Parsing your resume...", "Analyzing job description...", "Matching keywords...", "Crafting optimized content...", "Scoring ATS compatibility...", "Writing your cover letter..."];

  useEffect(function () {
    try { var s = localStorage.getItem(JOBS_KEY); if (s) setJobs(JSON.parse(s)); } catch (e) { }
  }, []);

  useEffect(function () { setSavedToTracker(false); }, [results]);

  const persistJobs = function (u) {
    setJobs(u);
    try { localStorage.setItem(JOBS_KEY, JSON.stringify(u)); } catch (e) { }
  };

  const addJob = function () {
    if (!jobForm.company || !jobForm.title) return;
    persistJobs([Object.assign({ id: Date.now() }, jobForm)].concat(jobs));
    setJobForm({ company: "", title: "", date: "", status: "In Progress", link: "" });
    setJobAdding(false);
  };

  const loadDemo = function () {
    setResumeText(DEMO_RESUME);
    setJobDesc(DEMO_JOB);
    setDemoLoaded(true);
  };

  const optimize = async function () {
    if (!resumeText.trim() && !demoLoaded) { setError("Please paste your resume or load the demo first."); return; }
    if (!jobDesc.trim() && !demoLoaded) { setError("Please paste the job description."); return; }
    setError(""); setLoading(true); setResults(null); msgIdx.current = 0;
    var iv = setInterval(function () { setLoadingMsg(msgs[msgIdx.current % msgs.length]); msgIdx.current++; }, 1400);
    // Simulate realistic AI processing delay
    await new Promise(function (res) { setTimeout(res, 8500); });
    clearInterval(iv);
    setResults(MOCK_RESULTS);
    setActiveTab("resume");
    setLoading(false);
    setLoadingMsg("");
  };

  const saveToTracker = function () {
    var lines = jobDesc.split("\n").filter(function (l) { return l.trim(); });
    var entry = { id: Date.now(), company: (lines[1] && lines[1].trim()) || "Apex Analytics", title: (lines[0] && lines[0].trim()) || "Business Analyst", date: new Date().toISOString().split("T")[0], status: "In Progress", link: "", optimizedResume: (results && results.optimized_resume) || "", coverLetter: (results && results.cover_letter) || "", atsScore: (results && results.ats_after) || null };
    persistJobs([entry].concat(jobs));
    setSavedToTracker(true);
  };

  const bg = dark ? "#121212" : "#fafaf8";
  const cardBg = dark ? "#1e1e1e" : "#ffffff";
  const bd = dark ? "#333" : "#e5e5e0";
  const tp = dark ? "#e0e0e0" : "#1a1a1a";
  const ts = dark ? "#888" : "#888780";
  const ib = dark ? "#2a2a2a" : "#f5f4f0";
  const cnt = STATUSES.reduce(function (a, s) { a[s] = jobs.filter(function (j) { return j.status === s; }).length; return a; }, {});
  const pal = PALETTES[palette] || PALETTES["Steel Blue"];

  const pill = function (options, value, onChange) {
    return <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{options.map(function (o) {
      return <button key={o} onClick={function () { onChange(o); }} style={{ padding: "4px 10px", fontSize: 12, borderRadius: 20, border: "0.5px solid " + (value === o ? GOLD : dark ? "#444" : STEEL_MID), background: value === o ? GOLD_LIGHT : dark ? "#2a2a2a" : "transparent", color: value === o ? GOLD_TEXT : dark ? "#ccc" : STEEL3, cursor: "pointer", fontWeight: value === o ? 500 : 400, whiteSpace: "nowrap" }}>{o}</button>;
    })}</div>;
  };

  const prefRow = function (label, options, value, onChange) {
    return <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 0", borderBottom: "0.5px solid " + (dark ? "#333" : "#e5e5e0") }}>
      <span style={{ ...FL, fontSize: 10, color: dark ? "#888" : STEEL3, minWidth: 68, flexShrink: 0 }}>{label}</span>
      {pill(options, value, onChange)}
    </div>;
  };

  const SB = {
    Professional: ["Led cross-functional team to deliver data platform, improving reporting efficiency by 40%", "Defined analytics roadmap aligned with 5-year business strategy", "Reduced churn 18% through data-driven onboarding improvements"],
    Conversational: ["Worked with the team to ship a data platform that cut reporting time by 40%", "Helped shape a roadmap that matched company goals", "Cut churn 18% by rethinking onboarding with data"],
    Executive: ["Architected enterprise analytics strategy delivering 40% efficiency gains", "Orchestrated multi-year data roadmap", "Drove 18% churn reduction through strategic analysis"],
    Technical: ["Engineered data pipeline; +40% reporting efficiency", "Designed SQL analytics roadmap", "Reduced churn 18% via funnel analysis and regression modeling"]
  };
  const SB2 = {
    Professional: ["Shipped 3 major analytics releases on time and under budget", "Improved NPS score 22pts through insight-driven UX changes"],
    Conversational: ["Got 3 big data features out on time", "Worked with design to push NPS up 22 points"],
    Executive: ["Delivered 3 strategic releases within budget", "Elevated NPS by 22 points through data-led transformation"],
    Technical: ["Released 3 sprints on schedule via agile", "Increased NPS 22pts via A/B testing and regression analysis"]
  };
  const SS = {
    Professional: ["Python · R · SQL · Tableau · Power BI · Predictive Modeling · Stakeholder communication"],
    Conversational: ["Python · R · SQL · Tableau · Power BI · Working with stakeholders"],
    Executive: ["Strategic analytics · Executive communication · Python · SQL · Portfolio management"],
    Technical: ["SQL · Python · R · Tableau · REST APIs · Agile · ETL · Regression analysis · A/B testing"]
  };

  const renderPreview = function () {
    var s = 1.5, ac = pal.accent;
    var isTwo = visual === "Two-Column", isBold = visual === "Bold Headers", isTL = visual === "Timeline";
    var nStyle = { Classic: { fontSize: 11 * s, fontWeight: 700, color: "#1a1a1a", textAlign: "center", marginBottom: 2 }, Modern: { fontSize: 11 * s, fontWeight: 700, color: ac, marginBottom: 2 }, Creative: { fontSize: 11 * s, fontWeight: 700, color: "#1a1a1a", borderLeft: "3px solid " + ac, paddingLeft: 6, marginBottom: 2 }, Minimalist: { fontSize: 11 * s, fontWeight: 400, color: "#1a1a1a", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 } };
    var cStyle = { Classic: { fontSize: 7 * s, color: "#777", textAlign: "center", borderBottom: "0.5px solid #ccc", paddingBottom: 4 }, Modern: { fontSize: 7 * s, color: "#777", borderBottom: "2px solid " + ac, paddingBottom: 4 }, Creative: { fontSize: 7 * s, color: ac, paddingLeft: 6, borderBottom: "0.5px solid " + ac + "44", paddingBottom: 4 }, Minimalist: { fontSize: 7 * s, color: "#aaa", letterSpacing: "0.04em", borderBottom: "0.5px solid #eee", paddingBottom: 4 } };
    var sh = function (heading) {
      if (isBold) return <div style={{ background: ac, padding: (2 * s) + "px " + (6 * s) + "px", borderRadius: 2, marginBottom: 4, marginTop: 9 * s }}><div style={{ fontSize: 7 * s, fontWeight: 700, color: "#fff", letterSpacing: "0.07em", textTransform: "uppercase" }}>{heading}</div></div>;
      if (isTL) return <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 9 * s, marginBottom: 4 }}><div style={{ width: 7 * s, height: 7 * s, borderRadius: "50%", background: ac, flexShrink: 0 }}></div><div style={{ fontSize: 7 * s, fontWeight: 700, color: ac, letterSpacing: "0.06em", textTransform: "uppercase" }}>{heading}</div><div style={{ flex: 1, height: "0.5px", background: ac + "44" }}></div></div>;
      if (format === "Classic") return <div style={{ marginTop: 9 * s, marginBottom: 4, textAlign: "center" }}><div style={{ fontSize: 7 * s, fontWeight: 700, color: "#333", letterSpacing: "0.1em", textTransform: "uppercase" }}>{heading}</div><div style={{ height: "0.5px", background: "#333", margin: (2 * s) + "px 0" }}></div></div>;
      if (format === "Minimalist") return <div style={{ marginTop: 9 * s, marginBottom: 4 }}><div style={{ fontSize: 7 * s, fontWeight: 400, color: "#aaa", letterSpacing: "0.1em", textTransform: "uppercase" }}>{heading}</div></div>;
      return <div style={{ marginTop: 9 * s, marginBottom: 4 }}><div style={{ fontSize: 7 * s, fontWeight: 700, color: ac, letterSpacing: "0.07em", textTransform: "uppercase" }}>{heading}</div><div style={{ height: 2, width: "28%", background: ac, borderRadius: 1, marginTop: 1 }}></div></div>;
    };
    var jt = function (title) {
      if (format === "Classic") return <div style={{ fontSize: 7.5 * s, fontWeight: 700, color: "#222", marginBottom: 2 }}>{title}</div>;
      if (format === "Minimalist") return <div style={{ fontSize: 7.5 * s, fontWeight: 400, color: "#444", borderBottom: "0.5px solid #eee", paddingBottom: 1, marginBottom: 2 }}>{title}</div>;
      if (isTL) return <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2 }}><div style={{ width: 5 * s, height: 5 * s, borderRadius: "50%", border: "1px solid " + ac, flexShrink: 0 }}></div><div style={{ fontSize: 7.5 * s, fontWeight: 600, color: "#222" }}>{title}</div></div>;
      return <div style={{ fontSize: 7.5 * s, fontWeight: 600, color: "#222", borderLeft: "2px solid " + ac, paddingLeft: 4, marginBottom: 2 }}>{title}</div>;
    };
    var bl = function (b, i) { return <div key={i} style={{ display: "flex", gap: 3, marginBottom: 2 }}><span style={{ color: format === "Minimalist" ? pal.mid : pal.bullet, fontSize: 6 * s, marginTop: 1.5, flexShrink: 0 }}>{format === "Minimalist" ? "—" : "▸"}</span><span style={{ fontSize: 6.5 * s, color: "#555", lineHeight: 1.5 }}>{b}</span></div>; };
    var b1 = SB[tone] || SB.Professional, b2 = SB2[tone] || SB2.Professional, sk = SS[tone] || SS.Professional;
    var exp = <div>{sh("Experience")}<div style={{ marginBottom: 5 * s }}>{jt("Data Analyst  |  Innovatech  |  2021-Present")}{b1.map(bl)}</div><div style={{ marginBottom: 5 * s }}>{jt("Analyst  |  Brightloop  |  2018-2021")}{b2.map(bl)}</div></div>;
    var skills = <div>{sh("Skills")}<div style={{ marginBottom: 5 * s }}>{sk.map(bl)}</div></div>;
    var edu = <div>{sh("Education")}<div style={{ marginBottom: 5 * s }}>{jt("B.S. Business Analytics  |  Univ. of Tennessee  |  2026")}</div></div>;
    var sorted = focus === "Skills-first" ? [skills, exp, edu] : [exp, skills, edu];
    return <div style={{ background: "#fff", borderRadius: 4, padding: (14 * s) + "px " + (12 * s) + "px", overflow: "hidden" }}>
      <div style={nStyle[format] || nStyle.Modern}>Justin Perry</div>
      <div style={{ ...(cStyle[format] || cStyle.Modern), marginBottom: 4 }}>Jperry50@vols.utk.edu  |  740-591-1184</div>
      {isTwo ? <div style={{ display: "grid", gridTemplateColumns: "38% 1fr", gap: 8, marginTop: 4 }}><div style={{ borderRight: "0.5px solid " + ac + "33", paddingRight: 6 }}>{skills}{edu}</div><div>{exp}</div></div> : <div style={{ marginTop: 4 }}>{sorted}</div>}
    </div>;
  };

  const renderResume = function () {
    if (!results || !results.optimized_resume) return null;
    var ac = pal.accent, ht = visual === "Bold Headers" ? "#fff" : ac;
    return <div style={{ lineHeight: 1.7, fontSize: 13, color: tp }}>
      {results.optimized_resume.split("\n").map(function (line, i) {
        var t = line.trim(); if (!t) return <div key={i} style={{ height: 6 }}></div>;
        var isName = i === 0 && t.length < 60 && !/@|\|/.test(t);
        var isHdr = /^[A-Z][A-Z\s&]{3,}$/.test(t) && t.length < 40;
        var isBul = /^[•\-\*]/.test(t);
        var isCon = /@|linkedin|github|\d{3}[-.\s]\d{3}/i.test(t);
        var isJob = /^[A-Z]/.test(t) && t.length < 80 && (t.indexOf("|") > -1 || t.indexOf("–") > -1 || /\d{4}/.test(t));
        if (isName) return <div key={i} style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: tp, textAlign: format === "Classic" ? "center" : "left" }}>{t}</div>;
        if (isCon) return <div key={i} style={{ fontSize: 12, color: ts, margin: "0 0 12px", borderBottom: "0.5px solid " + ac + "33", paddingBottom: 8, textAlign: format === "Classic" ? "center" : "left" }}>{fmtPhone(t)}</div>;
        if (isHdr) return <div key={i} style={{ marginTop: 18, marginBottom: 6 }}><div style={{ display: format === "Classic" ? "block" : "inline-block", background: visual === "Bold Headers" ? ac : "transparent", padding: visual === "Bold Headers" ? "3px 10px" : "0", borderRadius: visual === "Bold Headers" ? 4 : 0 }}><div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", color: ht, textTransform: "uppercase" }}>{t}</div></div>{visual !== "Bold Headers" && <div style={{ height: 2, background: "linear-gradient(to right," + ac + ",transparent)", marginTop: 3, borderRadius: 2 }}></div>}</div>;
        if (isJob) return <div key={i} style={{ fontSize: 13, fontWeight: 600, color: tp, margin: "6px 0 2px", borderLeft: "3px solid " + ac, paddingLeft: 8 }}>{fmtPhone(t)}</div>;
        if (isBul) return <div key={i} style={{ display: "flex", gap: 8, margin: "2px 0", paddingLeft: 8 }}><span style={{ color: pal.bullet, flexShrink: 0, marginTop: 2, fontSize: 11 }}>▸</span><span style={{ fontSize: 13, color: ts, lineHeight: 1.6 }}>{fmtPhone(t.replace(/^[•\-\*]\s*/, ""))}</span></div>;
        return <div key={i} style={{ margin: "2px 0", fontSize: 13, color: ts }}>{fmtPhone(t)}</div>;
      })}
    </div>;
  };

  var hammerSVG = <svg width="52" height="52" viewBox="0 0 46 46" fill="none" style={{ flexShrink: 0, overflow: "hidden" }}>
    <style>{"@keyframes rfHS{0%{transform-origin:6px 20px;transform:rotate(-32deg)}42%{transform-origin:6px 20px;transform:rotate(0deg)}52%{transform-origin:6px 20px;transform:rotate(0deg)}92%{transform-origin:6px 20px;transform:rotate(-32deg)}100%{transform-origin:6px 20px;transform:rotate(-32deg)}}@keyframes rfSL{0%,45%{opacity:0;transform:translate(0,0) scale(0)}55%{opacity:1;transform:translate(-5px,-4px) scale(1)}80%{opacity:0}100%{opacity:0}}@keyframes rfSR{0%,45%{opacity:0;transform:translate(0,0) scale(0)}55%{opacity:1;transform:translate(5px,-4px) scale(1)}80%{opacity:0}100%{opacity:0}}@keyframes rfST{0%,45%{opacity:0;transform:translate(0,0) scale(0)}55%{opacity:1;transform:translate(0,-6px) scale(1)}80%{opacity:0}100%{opacity:0}}@keyframes rfAS{0%,44%,56%,100%{transform:translateX(0)}48%{transform:translateX(-1px)}52%{transform:translateX(1px)}}.rfH{animation:rfHS 0.85s ease-in-out infinite}.rfA{animation:rfAS 0.85s ease-in-out infinite}.rfsl{animation:rfSL 0.85s ease-out infinite}.rfsr{animation:rfSR 0.85s ease-out infinite}.rfst{animation:rfST 0.85s ease-out infinite}"}</style>
    <g className="rfA"><rect x="5" y="25" width="30" height="5" rx="1.5" fill="#444441" /><rect x="18" y="38" width="22" height="4" rx="1" fill="#2C2C2A" stroke="#5F5E5A" strokeWidth="0.5" /><polygon points="18,38 21,34 21,38" fill="#444441" /><polygon points="40,38 37,34 37,38" fill="#444441" /><rect x="21" y="31" width="16" height="5" rx="1" fill="#444441" stroke="#5F5E5A" strokeWidth="0.4" /><rect x="16" y="25" width="26" height="6" rx="1" fill="#5F5E5A" stroke="#888780" strokeWidth="0.4" /><rect x="16" y="25" width="26" height="2" rx="1" fill="#6e6e6b" opacity="0.6" /><rect x="36" y="26.5" width="3" height="3" rx="0.3" fill="#2C2C2A" /><circle cx="32" cy="27.5" r="1" fill="#2C2C2A" /><polygon points="16,26 16,30 10,28" fill="#4a4a48" stroke="#5F5E5A" strokeWidth="0.4" /></g>
    <circle className="rfsl" cx="27" cy="25" r="1.8" fill={GOLD_BRIGHT} /><circle className="rfsr" cx="27" cy="25" r="1.8" fill={GOLD_BRIGHT} /><circle className="rfst" cx="27" cy="25" r="1.4" fill={GOLD_MID} />
    <g className="rfH"><line x1="5" y1="18" x2="22" y2="18" stroke="#A08060" strokeWidth="3" strokeLinecap="round" /><line x1="5" y1="18" x2="12" y2="18" stroke="#7a6040" strokeWidth="3" strokeLinecap="round" opacity="0.5" /><rect x="18" y="9" width="9" height="17" rx="2.5" fill="#444441" /><rect x="18" y="9" width="9" height="17" rx="2.5" fill="none" stroke="#888780" strokeWidth="0.8" /><rect x="18.5" y="9.5" width="8" height="2.5" rx="1" fill="#5F5E5A" opacity="0.7" /><rect x="18.5" y="21" width="8" height="4" rx="1" fill="#6a6a68" /><rect x="18" y="9" width="2" height="17" rx="1" fill="#5F5E5A" opacity="0.4" /></g>
  </svg>;

  var logoSVG = <svg width="42" height="42" viewBox="0 0 42 42" fill="none" style={{ overflow: "visible" }}>
    <g transform="rotate(-45 21 21)"><line x1="7" y1="21" x2="20" y2="21" stroke="#A08060" strokeWidth="2.5" strokeLinecap="round" /><line x1="7" y1="21" x2="13" y2="21" stroke="#7a6040" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" /><rect x="20" y="14" width="8" height="14" rx="2" fill="#444441" /><rect x="20" y="14" width="8" height="14" rx="2" fill="none" stroke="#888780" strokeWidth="0.7" /><rect x="20.5" y="14.5" width="7" height="2.5" rx="0.5" fill="#5F5E5A" opacity="0.7" /><rect x="20.5" y="22" width="7" height="5" rx="1" fill="#6a6a68" /><rect x="20" y="14" width="2" height="14" rx="0.5" fill="#5F5E5A" opacity="0.4" /></g>
  </svg>;

  return <div style={{ maxWidth: 900, margin: "0 auto", padding: "1.5rem 1rem", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", background: bg, minHeight: "100vh", boxSizing: "border-box" }}>

    {/* HEADER */}
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, paddingBottom: 14, borderBottom: "0.5px solid " + bd }}>
      <div style={{ width: 42, height: 42, borderRadius: 8, background: STEEL, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: "0.5px solid " + STEEL2 }}>{logoSVG}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ fontSize: 19, fontWeight: 500, color: tp, letterSpacing: "0.06em", textTransform: "uppercase" }}>Resume Forge</div>
          <div style={{ width: "1px", height: 18, background: STEEL_MID }}></div>
          <span style={{ fontSize: 10, color: GOLD_TEXT, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500, background: GOLD_LIGHT, padding: "2px 7px", borderRadius: 4, border: "0.5px solid " + GOLD_MID }}>v2</span>
          <span style={{ fontSize: 10, color: "#0F6E56", letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 500, background: "#E1F5EE", padding: "2px 7px", borderRadius: 4, border: "0.5px solid #5DCAA5" }}>Demo</span>
        </div>
        <div style={{ height: "1.5px", background: "linear-gradient(to right," + GOLD + "," + STEEL_MID + ",transparent)", margin: "4px 0 3px", borderRadius: 1 }}></div>
        <div style={{ fontSize: 11, color: ts, letterSpacing: "0.05em", textTransform: "uppercase" }}>Precision-crafted resumes, built to win.</div>
      </div>
      <button onClick={function () { setDark(function (d) { return !d; }); }} style={{ padding: "5px 10px", borderRadius: 6, border: "0.5px solid " + bd, background: "transparent", cursor: "pointer", fontSize: 13, color: ts }}>{dark ? "☀" : "◑"}</button>
    </div>

    {/* TABS */}
    <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
      {[["optimizer", "⚒ Optimizer"], ["tracker", "📋 Job Tracker"]].map(function (pair) {
        var k = pair[0], l = pair[1];
        return <button key={k} onClick={function () { setAppTab(k); }} style={{ padding: "7px 16px", borderRadius: 6, border: "0.5px solid " + (appTab === k ? GOLD : bd), background: appTab === k ? GOLD_LIGHT : "transparent", color: appTab === k ? GOLD_TEXT : ts, cursor: "pointer", fontSize: 13, fontWeight: appTab === k ? 500 : 400 }}>{l}</button>;
      })}
    </div>

    {appTab === "optimizer" && <div>
      {/* DEMO BANNER */}
      <div style={{ background: dark ? "#1a1f1a" : "#E1F5EE", border: "0.5px solid #5DCAA5", borderRadius: 8, padding: "12px 16px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ ...FL, fontSize: 10, color: "#0F6E56", marginBottom: 3 }}>Portfolio Demo</div>
          <div style={{ fontSize: 13, color: dark ? "#aaa" : "#333" }}>Load a sample resume + job description to see Resume Forge in action.</div>
        </div>
        <button onClick={loadDemo} style={{ ...FL, fontSize: 10, padding: "7px 18px", borderRadius: 6, border: "none", background: "#0F6E56", color: "#fff", cursor: "pointer", whiteSpace: "nowrap" }}>Load Demo ▸</button>
      </div>

      {/* RESUME INPUT */}
      <div style={{ background: cardBg, border: "0.5px solid " + bd, borderRadius: 8, marginBottom: 14, overflow: "hidden" }}>
        <div style={{ padding: "10px 1.25rem", borderBottom: "0.5px solid " + bd, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ ...FL, fontSize: 10, color: tp }}>Your Resume</span>
          {(resumeText || demoLoaded) && <span style={{ fontSize: 11, color: "#1D9E75" }}>✓ Loaded</span>}
        </div>
        <textarea value={resumeText} onChange={function (e) { setResumeText(e.target.value); setDemoLoaded(false); }} placeholder="Paste your resume text here, or click Load Demo above..." style={{ width: "100%", minHeight: 140, padding: "12px 1.25rem", border: "none", background: "transparent", color: tp, fontSize: 13, resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
      </div>

      {/* JOB DESCRIPTION */}
      <div style={{ background: cardBg, border: "0.5px solid " + bd, borderRadius: 8, marginBottom: 14, overflow: "hidden" }}>
        <div style={{ padding: "10px 1.25rem", borderBottom: "0.5px solid " + bd, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ ...FL, fontSize: 10, color: tp }}>Job Description</span>
          {(jobDesc || demoLoaded) && <span style={{ fontSize: 11, color: "#1D9E75" }}>✓ Loaded</span>}
        </div>
        <textarea value={jobDesc} onChange={function (e) { setJobDesc(e.target.value); }} placeholder="Paste the job description here..." style={{ width: "100%", minHeight: 110, padding: "12px 1.25rem", border: "none", background: "transparent", color: tp, fontSize: 13, resize: "vertical", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
      </div>

      {/* PREFERENCES */}
      <div style={{ background: cardBg, border: "0.5px solid " + bd, borderRadius: 8, marginBottom: 14, padding: "0 1.25rem" }}>
        {prefRow("Format", FORMATS, format, setFormat)}
        {prefRow("Visual", VISUALS, visual, setVisual)}
        {prefRow("Length", LENGTHS, length, setLength)}
        {prefRow("Tone", TONES, tone, setTone)}
        {prefRow("Focus", FOCUS, focus, setFocus)}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "7px 0" }}>
          <span style={{ ...FL, fontSize: 10, color: dark ? "#888" : STEEL3, minWidth: 68, flexShrink: 0 }}>Palette</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{Object.keys(PALETTES).map(function (name) {
            var p = PALETTES[name];
            return <button key={name} onClick={function () { setPalette(name); }} style={{ padding: "4px 10px", fontSize: 12, borderRadius: 20, cursor: "pointer", whiteSpace: "nowrap", fontWeight: palette === name ? 500 : 400, border: "0.5px solid " + (palette === name ? p.accent : dark ? "#444" : STEEL_MID), background: palette === name ? p.light : dark ? "#2a2a2a" : "transparent", color: palette === name ? p.text : dark ? "#ccc" : STEEL3, display: "flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: p.accent, display: "inline-block" }}></span>{name}</button>;
          })}</div>
        </div>
      </div>

      {/* LAYOUT PREVIEW */}
      <div style={{ background: cardBg, border: "0.5px solid " + bd, borderRadius: 8, marginBottom: 14, overflow: "hidden" }}>
        <button onClick={function () { setPreviewOpen(function (o) { return !o; }); }} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 1.25rem", background: "none", border: "none", cursor: "pointer", borderLeft: "3px solid " + GOLD }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ ...FL, fontSize: 10, color: tp }}>Layout preview</span><span style={{ fontSize: 11, color: ts }}>{format + " · " + visual + " · " + tone}</span></div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: previewOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M2 4l5 5 5-5" stroke={ts} strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
        {previewOpen && <div style={{ padding: "0 1.25rem 1.25rem", borderTop: "0.5px solid " + bd }}>
          <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 6, padding: "20px 18px", marginTop: 12 }}>{renderPreview()}</div>
          <div style={{ fontSize: 11, color: ts, textAlign: "center", marginTop: 8 }}>Updates live as you adjust preferences above</div>
        </div>}
      </div>

      {error && <div style={{ color: "#E24B4A", fontSize: 13, marginBottom: 10 }}>{error}</div>}

      {/* FORGE BUTTON */}
      <button onClick={optimize} disabled={loading} style={{ width: "100%", padding: "12px", fontSize: 14, fontWeight: 500, borderRadius: 6, border: "0.5px solid " + STEEL2, background: loading ? ib : STEEL, cursor: loading ? "not-allowed" : "pointer", color: loading ? GOLD_TEXT : GOLD_MID, marginBottom: loading ? 8 : 24, letterSpacing: "0.04em", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
        {loading ? <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{hammerSVG}<span style={{ fontSize: 13 }}>{loadingMsg || "Forging..."}</span></div> : "⚒ Forge my resume"}
      </button>
      {loading && <div style={{ display: "flex", justifyContent: "center", gap: 5, marginBottom: 24 }}>{msgs.map(function (m, i) { return <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: msgs.indexOf(loadingMsg) === i ? GOLD : STEEL_MID, transition: "background 0.3s" }}></div>; })}</div>}

      {/* RESULTS */}
      {results && <div style={{ background: cardBg, border: "0.5px solid " + bd, borderRadius: 8, overflow: "hidden" }}>
        <div style={{ display: "flex", borderBottom: "0.5px solid " + bd, background: dark ? "#181816" : STEEL_LIGHT }}>
          {[["resume", "Optimized Resume"], ["ats", "ATS Score"], ["cover", "Cover Letter"]].map(function (pair) {
            var k = pair[0], l = pair[1];
            return <button key={k} onClick={function () { setActiveTab(k); }} style={{ flex: 1, padding: "10px", border: "none", borderBottom: activeTab === k ? "2px solid " + GOLD : "2px solid transparent", background: "transparent", cursor: "pointer", color: activeTab === k ? GOLD_TEXT : ts, transition: "all 0.15s", ...FL, fontSize: 11 }}>{l}</button>;
          })}
        </div>
        {!savedToTracker ? <div style={{ background: GOLD_LIGHT, borderTop: "0.5px solid " + GOLD_MID, padding: "10px 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div><div style={{ ...FL, fontSize: 10, color: GOLD_TEXT }}>Save to job tracker</div><div style={{ fontSize: 11, color: GOLD }}>Saves resume, cover letter & ATS score</div></div>
          <button onClick={saveToTracker} style={{ ...FL, fontSize: 10, padding: "5px 16px", borderRadius: 20, border: "none", background: STEEL, color: GOLD_MID, cursor: "pointer" }}>Save</button>
        </div> : <div style={{ background: "#EAF3DE", borderTop: "0.5px solid #97C459", padding: "10px 1.25rem", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ ...FL, fontSize: 10, color: "#3B6D11" }}>Saved to tracker</div>
          <button onClick={function () { setAppTab("tracker"); }} style={{ marginLeft: "auto", ...FL, fontSize: 10, padding: "4px 12px", borderRadius: 20, border: "0.5px solid #97C459", background: "transparent", color: "#3B6D11", cursor: "pointer" }}>View tracker</button>
        </div>}
        <div style={{ padding: "1.25rem" }}>
          {activeTab === "resume" && <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{[format, visual, tone, palette].map(function (t) { return <span key={t} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 10, background: GOLD_LIGHT, color: GOLD_TEXT, border: "0.5px solid " + GOLD_MID }}>{t}</span>; })}</div>
              <div style={{ display: "flex", gap: 7 }}>
                <button onClick={function () { results && results.optimized_resume && navigator.clipboard.writeText(results.optimized_resume); }} style={{ ...FL, fontSize: 10, padding: "5px 12px", borderRadius: 6, border: "0.5px solid " + STEEL_MID, background: STEEL_LIGHT, cursor: "pointer", color: STEEL }}>Copy</button>
                <button onClick={async function () { if (!results || !results.optimized_resume) return; var doc = await buildResumePDF(results.optimized_resume, GOLD); downloadPDF(doc, "Resume_" + jobSlug(jobDesc) + ".pdf"); }} style={{ ...FL, fontSize: 10, padding: "5px 12px", borderRadius: 6, border: "0.5px solid " + STEEL2, background: STEEL, cursor: "pointer", color: GOLD_MID }}>PDF</button>
              </div>
            </div>
            <div style={{ background: dark ? "#181816" : STEEL_LIGHT, borderRadius: 8, padding: "1.25rem", maxHeight: 520, overflowY: "auto", border: "0.5px solid " + bd }}>{renderResume()}</div>
            {results.improvements && results.improvements.length > 0 && <div style={{ marginTop: 14, padding: "1rem", background: GOLD_LIGHT + "44", borderRadius: 6, border: "0.5px solid " + GOLD_MID }}>
              <div style={{ ...FL, fontSize: 10, color: GOLD_TEXT, marginBottom: 8 }}>Improvements made</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>{results.improvements.map(function (imp, i) { return <li key={i} style={{ fontSize: 13, color: ts, marginBottom: 3, lineHeight: 1.5 }}>{imp}</li>; })}</ul>
            </div>}
          </div>}
          {activeTab === "ats" && <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[["Score before", results.ats_before], ["Score after", results.ats_after]].map(function (pair) {
                var l = pair[0], s = pair[1];
                return <div key={l} style={{ background: ib, borderRadius: 8, padding: "1rem 1.25rem", textAlign: "center", border: "0.5px solid " + scoreColor(s) + "44" }}><div style={{ ...FL, fontSize: 10, color: ts, marginBottom: 6 }}>{l}</div><div style={{ fontSize: 36, fontWeight: 500, color: scoreColor(s) }}>{s}</div><div style={{ fontSize: 11, color: ts, marginTop: 2 }}>/100</div></div>;
              })}
            </div>
            <div style={{ marginBottom: 20, padding: "1rem", background: ib, borderRadius: 6 }}>
              <div style={{ ...FL, fontSize: 10, color: ts, marginBottom: 12 }}>Score breakdown</div>
              {results.ats_breakdown && Object.keys(results.ats_breakdown).map(function (k) {
                var v = results.ats_breakdown[k];
                return <div key={k} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}><span style={{ color: ts, textTransform: "capitalize" }}>{k.replace(/_/g, " ")}</span><span style={{ fontWeight: 500, color: scoreColor(v) }}>{v + "/100"}</span></div><div style={{ height: 7, background: cardBg, borderRadius: 4, overflow: "hidden", border: "0.5px solid " + bd }}><div style={{ height: "100%", width: v + "%", background: scoreColor(v), borderRadius: 4 }}></div></div></div>;
              })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ padding: "1rem", background: "#E1F5EE44", borderRadius: 6, border: "0.5px solid #9FE1CB" }}><div style={{ ...FL, fontSize: 10, color: "#0F6E56", marginBottom: 8 }}>Keywords added</div><div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{results.keywords_added && results.keywords_added.map(function (k) { return <span key={k} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 10, background: "#E1F5EE", color: "#0F6E56" }}>{k}</span>; })}</div></div>
              <div style={{ padding: "1rem", background: GOLD_LIGHT + "44", borderRadius: 6, border: "0.5px solid " + GOLD_MID }}><div style={{ ...FL, fontSize: 10, color: GOLD_TEXT, marginBottom: 8 }}>Still missing</div><div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{results.keywords_missing && results.keywords_missing.map(function (k) { return <span key={k} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 10, background: GOLD_LIGHT, color: GOLD_TEXT }}>{k}</span>; })}</div></div>
            </div>
          </div>}
          {activeTab === "cover" && <div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 7, marginBottom: 12 }}>
              <button onClick={function () { results && results.cover_letter && navigator.clipboard.writeText(results.cover_letter); }} style={{ ...FL, fontSize: 10, padding: "5px 12px", borderRadius: 6, border: "0.5px solid " + STEEL_MID, background: STEEL_LIGHT, cursor: "pointer", color: STEEL }}>Copy</button>
              <button onClick={async function () { if (!results || !results.cover_letter) return; var doc = await buildCoverPDF(results.cover_letter); downloadPDF(doc, "CoverLetter_" + jobSlug(jobDesc) + ".pdf"); }} style={{ ...FL, fontSize: 10, padding: "5px 12px", borderRadius: 6, border: "0.5px solid " + STEEL2, background: STEEL, cursor: "pointer", color: GOLD_MID }}>PDF</button>
              <button onClick={async function () { if (!results || !results.optimized_resume || !results.cover_letter) return; var r = await buildResumePDF(results.optimized_resume, GOLD); downloadPDF(r, "Resume_" + jobSlug(jobDesc) + ".pdf"); var c = await buildCoverPDF(results.cover_letter); downloadPDF(c, "CoverLetter_" + jobSlug(jobDesc) + ".pdf"); }} style={{ ...FL, fontSize: 10, padding: "5px 12px", borderRadius: 6, border: "0.5px solid " + GOLD, background: GOLD_LIGHT, cursor: "pointer", color: GOLD_TEXT }}>Download both</button>
            </div>
            <div style={{ background: dark ? "#181816" : STEEL_LIGHT, borderRadius: 8, padding: "1.5rem", maxHeight: 500, overflowY: "auto", border: "0.5px solid " + bd }}>
              {results.cover_letter.split("\n").map(function (line, i) {
                var t = line.trim();
                if (!t) return <div key={i} style={{ height: 8 }}></div>;
                var isGr = t.startsWith("Dear") || t.startsWith("To ");
                var isCl = t.startsWith("Sincerely") || t.startsWith("Best") || t.startsWith("Thank");
                return <div key={i} style={{ fontSize: 13, lineHeight: 1.8, marginBottom: 2, color: i === 0 ? STEEL3 : isGr || isCl ? GOLD_TEXT : tp, fontWeight: isGr || isCl ? 500 : 400 }}>{fmtPhone(t)}</div>;
              })}
            </div>
          </div>}
        </div>
      </div>}
    </div>}

    {/* JOB TRACKER TAB */}
    {appTab === "tracker" && <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {STATUSES.map(function (s) { return <div key={s} style={{ padding: "5px 12px", borderRadius: 20, fontSize: 12, background: SC[s].bg, color: SC[s].text, border: "0.5px solid " + SC[s].text + "44" }}>{s} · {cnt[s]}</div>; })}
      </div>
      {!jobAdding ? <button onClick={function () { setJobAdding(true); }} style={{ ...FL, fontSize: 10, padding: "7px 16px", borderRadius: 6, border: "0.5px solid " + GOLD, background: GOLD_LIGHT, color: GOLD_TEXT, cursor: "pointer", marginBottom: 16 }}>+ Add application</button>
        : <div style={{ background: cardBg, border: "0.5px solid " + bd, borderRadius: 8, padding: "1rem 1.25rem", marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            {[["Company", "company"], ["Role", "title"], ["Date", "date"], ["Link", "link"]].map(function (pair) {
              var l = pair[0], k = pair[1];
              return <div key={k}><div style={{ ...FL, fontSize: 9, color: ts, marginBottom: 4 }}>{l}</div><input type={k === "date" ? "date" : "text"} value={jobForm[k]} onChange={function (e) { setJobForm(function (f) { return Object.assign({}, f, { [k]: e.target.value }); }); }} style={{ width: "100%", padding: "6px 10px", borderRadius: 5, border: "0.5px solid " + bd, background: ib, color: tp, fontSize: 13, outline: "none", boxSizing: "border-box" }} /></div>;
            })}
          </div>
          <div style={{ marginBottom: 12 }}><div style={{ ...FL, fontSize: 9, color: ts, marginBottom: 6 }}>Status</div>{pill(STATUSES, jobForm.status, function (v) { setJobForm(function (f) { return Object.assign({}, f, { status: v }); }); })}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={addJob} style={{ ...FL, fontSize: 10, padding: "6px 16px", borderRadius: 6, border: "none", background: STEEL, color: GOLD_MID, cursor: "pointer" }}>Save</button>
            <button onClick={function () { setJobAdding(false); }} style={{ ...FL, fontSize: 10, padding: "6px 16px", borderRadius: 6, border: "0.5px solid " + bd, background: "transparent", color: ts, cursor: "pointer" }}>Cancel</button>
          </div>
        </div>}
      {jobs.length === 0 && <div style={{ textAlign: "center", padding: "3rem 1rem", color: ts, fontSize: 13 }}>No applications yet. Add one above or forge a resume and save it to the tracker.</div>}
      {jobs.map(function (job) {
        var isExp = jobExpanded === job.id;
        return <div key={job.id} style={{ background: cardBg, border: "0.5px solid " + bd, borderRadius: 8, marginBottom: 10, overflow: "hidden" }}>
          <div style={{ padding: "12px 1.25rem", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={function () { setJobExpanded(isExp ? null : job.id); }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: tp }}>{job.title}</div>
              <div style={{ fontSize: 12, color: ts }}>{job.company}{job.date ? " · " + job.date : ""}</div>
            </div>
            {job.atsScore && <div style={{ fontSize: 13, fontWeight: 500, color: scoreColor(job.atsScore) }}>{job.atsScore}/100</div>}
            <div style={{ padding: "3px 10px", borderRadius: 10, fontSize: 11, background: SC[job.status].bg, color: SC[job.status].text }}>{job.status}</div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: isExp ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}><path d="M1 3l5 5 5-5" stroke={ts} strokeWidth="1.5" strokeLinecap="round" /></svg>
          </div>
          {isExp && <div style={{ padding: "0 1.25rem 1.25rem", borderTop: "0.5px solid " + bd }}>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "12px 0 10px" }}>{STATUSES.map(function (s) { return <button key={s} onClick={function () { persistJobs(jobs.map(function (j) { return j.id === job.id ? Object.assign({}, j, { status: s }) : j; })); }} style={{ padding: "3px 10px", borderRadius: 10, fontSize: 11, background: job.status === s ? SC[s].bg : "transparent", color: job.status === s ? SC[s].text : ts, border: "0.5px solid " + (job.status === s ? SC[s].text + "44" : bd), cursor: "pointer" }}>{s}</button>; })}</div>
            {job.optimizedResume && <div style={{ marginTop: 10 }}><div style={{ ...FL, fontSize: 9, color: ts, marginBottom: 6 }}>Saved resume</div><div style={{ background: ib, borderRadius: 6, padding: "10px 12px", maxHeight: 180, overflowY: "auto", fontSize: 12, color: ts, whiteSpace: "pre-wrap" }}>{job.optimizedResume.slice(0, 600)}...</div></div>}
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              {job.link && <a href={job.link} target="_blank" rel="noopener noreferrer" style={{ ...FL, fontSize: 9, padding: "5px 12px", borderRadius: 6, border: "0.5px solid " + bd, color: ts, textDecoration: "none" }}>View posting ↗</a>}
              <button onClick={function () { persistJobs(jobs.filter(function (j) { return j.id !== job.id; })); }} style={{ ...FL, fontSize: 9, padding: "5px 12px", borderRadius: 6, border: "0.5px solid #FCEBEB", background: "#FCEBEB", color: "#A32D2D", cursor: "pointer", marginLeft: "auto" }}>Remove</button>
            </div>
          </div>}
        </div>;
      })}
    </div>}
  </div>;
}
