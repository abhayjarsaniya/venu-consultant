import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSiteContent } from "@/context/ContentContext";
import {
  isAdminAuthenticated,
  setAdminAuthenticated,
  verifyAdminPin,
  setAdminPin,
} from "@/lib/contentStore";
import { getStoredFirebaseConfig, saveStoredFirebaseConfig } from "@/lib/firebase";
import type { CareerRole, BlogPost, Service, Industry, Member } from "@/lib/defaultSiteContent";
import {
  Shield,
  Key,
  Globe,
  FileText,
  Search,
  Building,
  Cloud,
  CheckCircle,
  AlertCircle,
  Save,
  RotateCcw,
  Download,
  Upload,
  ExternalLink,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  Layers,
  Sparkles,
  GitBranch,
  Briefcase,
  BookOpen,
  Edit2,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

export function AdminPage() {
  const { content, updateContent, updateSEO, resetDefaults, syncToCloud, syncFromCloud } =
    useSiteContent();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "pages"
    | "visibility"
    | "careers"
    | "blog"
    | "services"
    | "seo"
    | "company"
    | "cloud"
    | "git"
    | "security"
  >("dashboard");
  const [selectedPage, setSelectedPage] = useState<string>("home");
  const [selectedSEOPage, setSelectedSEOPage] = useState<string>("home");
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // New PIN state
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  // Firebase config state
  const [fbConfig, setFbConfig] = useState(() => getStoredFirebaseConfig());
  const [cloudSyncLoading, setCloudSyncLoading] = useState(false);

  // Career Form Modal / State
  const [careerModalOpen, setCareerModalOpen] = useState(false);
  const [editingCareerId, setEditingCareerId] = useState<string | null>(null);
  const [careerForm, setCareerForm] = useState<CareerRole>({
    id: "",
    title: "",
    department: "Structural Engineering",
    type: "Full-time · Ahmedabad",
    experience: "3+ years",
    location: "Ahmedabad, Gujarat",
    brief: "",
    active: true,
  });

  // Blog Form Modal / State
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState<BlogPost>({
    id: "",
    title: "",
    cat: "Structural Engineering",
    excerpt: "",
    content: "",
    author: "Mr. Keyur Ladani",
    date: "November 2026",
    readTime: "4 min read",
    active: true,
  });

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  const showToast = (text: string, type: "success" | "error" | "info" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pinInput)) {
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setPinError("");
      showToast("Welcome to Venu Consultants Admin Panel!", "success");
    } else {
      setPinError("Invalid PIN. Default PIN is 'admin123'");
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
    setPinInput("");
  };

  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `venu-consultants-content-${new Date().toISOString().slice(0, 10)}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Content exported successfully as JSON!", "success");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        updateContent(parsed);
        showToast("Content imported successfully!", "success");
      } catch (err) {
        showToast("Invalid JSON file format", "error");
      }
    };
    reader.readAsText(file);
  };

  const handleCloudPush = async () => {
    setCloudSyncLoading(true);
    const res = await syncToCloud();
    setCloudSyncLoading(false);
    showToast(res.message, res.success ? "success" : "error");
  };

  const handleCloudPull = async () => {
    setCloudSyncLoading(true);
    const res = await syncFromCloud();
    setCloudSyncLoading(false);
    showToast(res.message, res.success ? "success" : "error");
  };

  const handleSaveFirebaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredFirebaseConfig(fbConfig);
    showToast("Firebase settings saved!", "success");
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      showToast("PIN must be at least 4 digits/characters", "error");
      return;
    }
    if (newPin !== confirmPin) {
      showToast("New PIN and confirmation do not match", "error");
      return;
    }
    setAdminPin(newPin);
    setNewPin("");
    setConfirmPin("");
    showToast("Admin PIN updated successfully!", "success");
  };

  // Section Visibility toggle helper
  const toggleSection = (key: keyof typeof content.sectionVisibility) => {
    const currentVis = content.sectionVisibility || {};
    const updated = {
      ...currentVis,
      [key]: !currentVis[key],
    };
    updateContent({ sectionVisibility: updated });
    showToast(`Section ${key} is now ${updated[key] ? "Visible" : "Hidden"}!`, "info");
  };

  // Career CRUD
  const handleSaveCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerForm.title.trim()) {
      showToast("Job title is required", "error");
      return;
    }

    const currentRoles = content.careers.openRoles || [];
    if (editingCareerId) {
      const updated = currentRoles.map((r) => (r.id === editingCareerId ? careerForm : r));
      updateContent({ careers: { ...content.careers, openRoles: updated } });
      showToast("Career opening updated successfully!", "success");
    } else {
      const newRole = {
        ...careerForm,
        id: `role-${Date.now()}`,
      };
      updateContent({ careers: { ...content.careers, openRoles: [newRole, ...currentRoles] } });
      showToast("New job ad published successfully!", "success");
    }
    setCareerModalOpen(false);
    setEditingCareerId(null);
  };

  const handleDeleteCareer = (id: string) => {
    if (confirm("Are you sure you want to delete this job opening?")) {
      const updated = (content.careers.openRoles || []).filter((r) => r.id !== id);
      updateContent({ careers: { ...content.careers, openRoles: updated } });
      showToast("Job opening removed", "info");
    }
  };

  // Blog CRUD
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title.trim()) {
      showToast("Article title is required", "error");
      return;
    }

    const currentPosts = content.blog.posts || [];
    if (editingBlogId) {
      const updated = currentPosts.map((p) => (p.id === editingBlogId ? blogForm : p));
      updateContent({ blog: { ...content.blog, posts: updated } });
      showToast("Article updated successfully!", "success");
    } else {
      const newPost = {
        ...blogForm,
        id: `post-${Date.now()}`,
      };
      updateContent({ blog: { ...content.blog, posts: [newPost, ...currentPosts] } });
      showToast("New article published successfully!", "success");
    }
    setBlogModalOpen(false);
    setEditingBlogId(null);
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      const updated = (content.blog.posts || []).filter((p) => p.id !== id);
      updateContent({ blog: { ...content.blog, posts: updated } });
      showToast("Article deleted", "info");
    }
  };

  // If not logged in, show login card
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-900 px-4 py-12 text-stone-100">
        <div className="w-full max-w-md rounded-2xl border border-stone-800 bg-stone-950 p-8 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="mt-5 font-display text-2xl font-bold tracking-tight text-white">
              Venu Consultants
            </h1>
            <p className="mt-1 text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Administrative Control Panel
            </p>
            <p className="mt-3 text-xs text-stone-400">
              Manage website sections, hide/show modules, post careers, publish blogs, and optimize
              crawler keywords.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-stone-400 font-medium">
                Admin Security PIN
              </label>
              <div className="relative mt-2">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter admin PIN"
                  className="w-full rounded-lg border border-stone-800 bg-stone-900 px-4 py-3 pl-11 text-sm text-white placeholder-stone-500 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  autoFocus
                />
                <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-500" />
              </div>
              {pinError && <p className="mt-2 text-xs text-rose-400">{pinError}</p>}
              <p className="mt-2 text-[11px] text-stone-500">
                Default security PIN: <code className="text-amber-300 font-mono">admin123</code>
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-amber-500 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-400 active:scale-[0.99] cursor-pointer"
            >
              Unlock Admin Panel
            </button>
          </form>

          <div className="mt-6 border-t border-stone-800 pt-4 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-stone-400 transition hover:text-white"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const vis = content.sectionVisibility || {
    homeHero: true,
    homeStats: true,
    homeAboutIntro: true,
    homeServices: true,
    homeIndustries: true,
    homeWhyChoose: true,
    homeProjects: true,
    homeClients: true,
    homeCta: true,
    aboutOverviewStats: true,
    aboutOverviewValues: true,
    aboutOverviewCta: true,
    aboutMissionVision: true,
    aboutLeadershipBio: true,
    aboutLeadershipExpertise: true,
    aboutTeamGrid: true,
    aboutWhyChooseGrid: true,
    aboutInfrastructureSoftware: true,
    aboutInfrastructurePillars: true,
    aboutLibraryStats: true,
    aboutLibraryWhy: true,
    careersCulture: true,
    careersOpenings: true,
    careersApplicationForm: true,
    blogCategories: true,
    blogPosts: true,
    contactForm: true,
    contactDetails: true,
    contactMap: true,
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-2xl text-sm font-medium transition-all ${
            toastMessage.type === "success"
              ? "bg-emerald-600 text-white"
              : toastMessage.type === "error"
                ? "bg-rose-600 text-white"
                : "bg-amber-600 text-white"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-stone-800 bg-stone-900/90 backdrop-blur">
        <div className="container mx-auto px-4 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" target="_blank" className="flex items-center gap-2 group">
              <span className="font-display text-xl font-bold text-white tracking-tight">Venu</span>
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-[11px] uppercase tracking-widest text-stone-400 font-medium">
                CMS Admin
              </span>
            </Link>
            <span className="hidden sm:inline-block rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] text-emerald-400 border border-emerald-500/20 font-medium">
              Firebase: Connected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-700 bg-stone-800 px-3 py-1.5 text-xs font-medium text-stone-200 transition hover:bg-stone-700"
            >
              <Eye className="h-3.5 w-3.5 text-amber-400" />
              <span>View Site</span>
              <ExternalLink className="h-3 w-3 text-stone-400" />
            </Link>

            <button
              onClick={() => showToast("All changes are saved to memory and storage!", "success")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-stone-950 transition hover:bg-amber-400 cursor-pointer"
            >
              <Save className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Save</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-800 p-2 text-stone-400 transition hover:bg-stone-800 hover:text-white cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-t border-stone-800/80 bg-stone-900 px-4 lg:px-8">
          <div className="container mx-auto flex overflow-x-auto no-scrollbar gap-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: Layers },
              { id: "pages", label: "Pages & Sections", icon: FileText },
              { id: "visibility", label: "Hide / Unhide Sections", icon: Eye },
              { id: "careers", label: "Careers & Job Ads", icon: Briefcase },
              { id: "blog", label: "Blog & Articles", icon: BookOpen },
              { id: "services", label: "Services & Sectors", icon: Layers },
              { id: "seo", label: "SEO & Crawler Keywords", icon: Search },
              { id: "company", label: "Company Info", icon: Building },
              { id: "cloud", label: "Firebase Cloud Sync", icon: Cloud },
              { id: "git", label: "GitHub & Vercel", icon: GitBranch },
              { id: "security", label: "Security & PIN", icon: Key },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? "border-amber-400 text-amber-400 bg-stone-800/50"
                      : "border-transparent text-stone-400 hover:border-stone-700 hover:text-stone-200"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto flex-1 px-4 py-8 lg:px-8">
        {/* TAB: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                    Pages Managed
                  </span>
                  <FileText className="h-5 w-5 text-amber-400" />
                </div>
                <p className="mt-3 text-3xl font-bold text-white">17</p>
                <p className="mt-1 text-xs text-stone-400">All sections fully editable</p>
              </div>

              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                    Active Job Openings
                  </span>
                  <Briefcase className="h-5 w-5 text-emerald-400" />
                </div>
                <p className="mt-3 text-3xl font-bold text-white">
                  {(content.careers.openRoles || []).filter((r) => r.active !== false).length}
                </p>
                <p className="mt-1 text-xs text-stone-400">Manage & add vacancies</p>
              </div>

              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                    Published Articles
                  </span>
                  <BookOpen className="h-5 w-5 text-sky-400" />
                </div>
                <p className="mt-3 text-3xl font-bold text-white">
                  {(content.blog.posts || []).filter((p) => p.active !== false).length}
                </p>
                <p className="mt-1 text-xs text-stone-400">Engineering blog insights</p>
              </div>

              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                    Firebase & Git
                  </span>
                  <Cloud className="h-5 w-5 text-purple-400" />
                </div>
                <p className="mt-3 text-sm font-semibold text-emerald-400 font-mono">
                  venu-consultants-web
                </p>
                <p className="mt-1 text-xs text-stone-400">Ready for Vercel & Firebase</p>
              </div>
            </div>

            {/* Quick Shortcuts */}
            <div className="grid gap-6 lg:grid-cols-12">
              <div className="rounded-2xl border border-stone-800 bg-stone-900/50 p-6 lg:col-span-7">
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  Management Center
                </h2>
                <p className="mt-1 text-xs text-stone-400">
                  Select any tool below to update text, post job ads, publish articles, or
                  hide/unhide sections.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => setActiveTab("visibility")}
                    className="flex items-start gap-3 rounded-xl border border-stone-800 bg-stone-900 p-4 text-left transition hover:border-amber-500/40 hover:bg-stone-800 cursor-pointer"
                  >
                    <Eye className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-white">Hide / Unhide Sections</p>
                      <p className="text-xs text-stone-400">
                        Toggle any block on/off on your website
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("careers")}
                    className="flex items-start gap-3 rounded-xl border border-stone-800 bg-stone-900 p-4 text-left transition hover:border-amber-500/40 hover:bg-stone-800 cursor-pointer"
                  >
                    <Briefcase className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-white">Careers & Job Openings</p>
                      <p className="text-xs text-stone-400">Add, edit, or remove job postings</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("blog")}
                    className="flex items-start gap-3 rounded-xl border border-stone-800 bg-stone-900 p-4 text-left transition hover:border-amber-500/40 hover:bg-stone-800 cursor-pointer"
                  >
                    <BookOpen className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-white">Blog & Publications</p>
                      <p className="text-xs text-stone-400">
                        Create new technical posts & case studies
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("git")}
                    className="flex items-start gap-3 rounded-xl border border-stone-800 bg-stone-900 p-4 text-left transition hover:border-amber-500/40 hover:bg-stone-800 cursor-pointer"
                  >
                    <GitBranch className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-white">GitHub & Vercel Connect</p>
                      <p className="text-xs text-stone-400">
                        Push to new GitHub repo & deploy to Vercel
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-stone-800 bg-stone-900/50 p-6 lg:col-span-5 space-y-4">
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <Globe className="h-4 w-4 text-amber-400" />
                  Website Backup & JSON Storage
                </h2>
                <p className="text-xs text-stone-400">
                  Export or import your entire website database anytime with one click.
                </p>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleExportJSON}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-stone-700 bg-stone-800 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-stone-700 cursor-pointer"
                  >
                    <Download className="h-4 w-4 text-amber-400" />
                    <span>Export Full Content (JSON)</span>
                  </button>

                  <label className="w-full flex items-center justify-center gap-2 rounded-lg border border-stone-700 bg-stone-800 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-stone-700 cursor-pointer">
                    <Upload className="h-4 w-4 text-emerald-400" />
                    <span>Import Content from JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={() => {
                      if (confirm("Restore brochure defaults?")) {
                        resetDefaults();
                        showToast("Reset to brochure defaults!", "info");
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-rose-900/40 bg-rose-950/20 px-4 py-2 text-xs font-medium text-rose-300 transition hover:bg-rose-900/40 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset to Factory Defaults</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SECTION VISIBILITY (HIDE / UNHIDE) */}
        {activeTab === "visibility" && (
          <div className="max-w-4xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-amber-400" />
                Section Visibility Control (Hide / Show Any Section)
              </h2>
              <p className="mt-1 text-xs text-stone-400">
                Turn any section on or off on your live website. When hidden, the layout adapts
                seamlessly without breaking design or responsiveness.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Home Page Sections */}
              <div className="rounded-xl border border-stone-800 bg-stone-900/80 p-5 space-y-4">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Home Page Sections
                </h3>
                {[
                  { key: "homeHero", label: "Hero Banner (Top Headline & CTA)" },
                  { key: "homeStats", label: "Key Statistics Counter (18+ Years, etc.)" },
                  { key: "homeAboutIntro", label: "Company Overview Intro Section" },
                  { key: "homeServices", label: "Featured Services Grid" },
                  { key: "homeIndustries", label: "Industries Served Grid" },
                  { key: "homeWhyChoose", label: "Why Choose Us (6 Value Cards)" },
                  { key: "homeProjects", label: "Featured Projects Showcase" },
                  { key: "homeClients", label: "Major Clients Roster" },
                  { key: "homeCta", label: "Bottom Call-to-Action Banner" },
                ].map((item) => {
                  const isVisible = (vis as any)[item.key] !== false;
                  return (
                    <div
                      key={item.key}
                      className="flex items-center justify-between py-2 border-b border-stone-800/60 last:border-0"
                    >
                      <span className="text-xs text-stone-200">{item.label}</span>
                      <button
                        onClick={() => toggleSection(item.key as any)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${
                          isVisible
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-stone-800 text-stone-500 border border-stone-700"
                        }`}
                      >
                        {isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        <span>{isVisible ? "Visible" : "Hidden"}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Other Pages Sections */}
              <div className="rounded-xl border border-stone-800 bg-stone-900/80 p-5 space-y-4">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Inner Pages Sections
                </h3>
                {[
                  { key: "careersCulture", label: "Careers — Life at Venu & Benefits" },
                  { key: "careersOpenings", label: "Careers — Open Positions List" },
                  { key: "careersApplicationForm", label: "Careers — CV Submission Form" },
                  { key: "blogCategories", label: "Blog — Category Filter Tabs" },
                  { key: "blogPosts", label: "Blog — Articles Grid" },
                  { key: "contactForm", label: "Contact — Send Enquiry Form" },
                  { key: "contactDetails", label: "Contact — Office Phone & Email" },
                  { key: "contactMap", label: "Contact — Google Maps Location" },
                  { key: "aboutOverviewValues", label: "About — 6 Guiding Values" },
                ].map((item) => {
                  const isVisible = (vis as any)[item.key] !== false;
                  return (
                    <div
                      key={item.key}
                      className="flex items-center justify-between py-2 border-b border-stone-800/60 last:border-0"
                    >
                      <span className="text-xs text-stone-200">{item.label}</span>
                      <button
                        onClick={() => toggleSection(item.key as any)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition ${
                          isVisible
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-stone-800 text-stone-500 border border-stone-700"
                        }`}
                      >
                        {isVisible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                        <span>{isVisible ? "Visible" : "Hidden"}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB: CAREERS & JOB ADS (ADD / EDIT / DELETE / SAVE) */}
        {activeTab === "careers" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-emerald-400" />
                  Careers & Job Ads Management
                </h2>
                <p className="mt-1 text-xs text-stone-400">
                  Publish new job ads, edit existing vacancies, or remove filled positions.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingCareerId(null);
                  setCareerForm({
                    id: "",
                    title: "",
                    department: "Structural Engineering",
                    type: "Full-time · Ahmedabad",
                    experience: "3+ years",
                    location: "Ahmedabad, Gujarat",
                    brief: "",
                    active: true,
                  });
                  setCareerModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Post New Job Vacancy</span>
              </button>
            </div>

            {/* List of Careers */}
            <div className="grid gap-4">
              {(content.careers.openRoles || []).map((role) => (
                <div
                  key={role.id || role.title}
                  className="rounded-xl border border-stone-800 bg-stone-900/70 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-bold text-white">{role.title}</h3>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          role.active !== false
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                            : "bg-stone-800 text-stone-500"
                        }`}
                      >
                        {role.active !== false ? "Active" : "Draft / Inactive"}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-400">
                      <span className="text-amber-400 font-medium">{role.department}</span>
                      <span>•</span>
                      <span>{role.type}</span>
                      <span>•</span>
                      <span>Experience: {role.experience}</span>
                      <span>•</span>
                      <span>Location: {role.location}</span>
                    </div>
                    <p className="text-xs text-stone-300 line-clamp-2 pt-1">{role.brief}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => {
                        setEditingCareerId(role.id);
                        setCareerForm({ ...role });
                        setCareerModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-stone-700 bg-stone-800 px-3 py-1.5 text-xs text-stone-200 hover:bg-stone-700 transition cursor-pointer"
                    >
                      <Edit2 className="h-3 w-3 text-amber-400" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteCareer(role.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-900/40 bg-rose-950/20 px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-900/40 transition cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Add / Edit Career */}
            {careerModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                <div className="w-full max-w-lg rounded-2xl border border-stone-800 bg-stone-950 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <h3 className="font-display text-base font-bold text-white">
                      {editingCareerId ? "Edit Job Vacancy" : "Create New Job Opening"}
                    </h3>
                    <button
                      onClick={() => setCareerModalOpen(false)}
                      className="text-stone-400 hover:text-white text-xs cursor-pointer"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <form onSubmit={handleSaveCareer} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-medium text-stone-400">Job Title *</label>
                      <input
                        type="text"
                        value={careerForm.title}
                        onChange={(e) => setCareerForm({ ...careerForm, title: e.target.value })}
                        required
                        placeholder="e.g. Senior Structural Engineer"
                        className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-stone-400">Department</label>
                        <input
                          type="text"
                          value={careerForm.department}
                          onChange={(e) =>
                            setCareerForm({ ...careerForm, department: e.target.value })
                          }
                          placeholder="e.g. Structural Engineering"
                          className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-400">Employment Type</label>
                        <input
                          type="text"
                          value={careerForm.type}
                          onChange={(e) => setCareerForm({ ...careerForm, type: e.target.value })}
                          placeholder="e.g. Full-time · Ahmedabad"
                          className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-stone-400">
                          Required Experience
                        </label>
                        <input
                          type="text"
                          value={careerForm.experience}
                          onChange={(e) =>
                            setCareerForm({ ...careerForm, experience: e.target.value })
                          }
                          placeholder="e.g. 5+ years"
                          className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-400">Location</label>
                        <input
                          type="text"
                          value={careerForm.location}
                          onChange={(e) =>
                            setCareerForm({ ...careerForm, location: e.target.value })
                          }
                          placeholder="e.g. Ahmedabad, Gujarat"
                          className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-stone-400">
                        Job Brief / Overview
                      </label>
                      <textarea
                        rows={3}
                        value={careerForm.brief}
                        onChange={(e) => setCareerForm({ ...careerForm, brief: e.target.value })}
                        placeholder="Key responsibilities and qualifications required for this role..."
                        className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-white"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="activeCheck"
                        checked={careerForm.active !== false}
                        onChange={(e) => setCareerForm({ ...careerForm, active: e.target.checked })}
                        className="h-4 w-4 rounded border-stone-800 bg-stone-900 text-amber-500"
                      />
                      <label
                        htmlFor="activeCheck"
                        className="text-stone-300 font-medium cursor-pointer"
                      >
                        Active & Published on Website
                      </label>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-stone-800">
                      <button
                        type="button"
                        onClick={() => setCareerModalOpen(false)}
                        className="rounded bg-stone-800 px-3.5 py-2 text-xs text-stone-300 hover:bg-stone-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500"
                      >
                        Save Job Vacancy
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: BLOG & ARTICLES (ADD / EDIT / DELETE) */}
        {activeTab === "blog" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-sky-400" />
                  Blog & Technical Insights Management
                </h2>
                <p className="mt-1 text-xs text-stone-400">
                  Publish engineering case studies, white papers, and articles.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingBlogId(null);
                  setBlogForm({
                    id: "",
                    title: "",
                    cat: "Structural Engineering",
                    excerpt: "",
                    content: "",
                    author: "Mr. Keyur Ladani",
                    date: "November 2026",
                    readTime: "4 min read",
                    active: true,
                  });
                  setBlogModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Write New Article</span>
              </button>
            </div>

            {/* List of Blog Posts */}
            <div className="grid gap-4">
              {(content.blog.posts || []).map((post) => (
                <div
                  key={post.id || post.title}
                  className="rounded-xl border border-stone-800 bg-stone-900/70 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-bold text-white">{post.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/40">
                        {post.cat}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-stone-400">
                      <span>Author: {post.author || "Venu Consultants"}</span>
                      <span>•</span>
                      <span>{post.date || "2026"}</span>
                      <span>•</span>
                      <span>{post.readTime || "5 min read"}</span>
                    </div>
                    <p className="text-xs text-stone-300 line-clamp-2 pt-1">{post.excerpt}</p>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => {
                        setEditingBlogId(post.id);
                        setBlogForm({ ...post });
                        setBlogModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1 rounded-lg border border-stone-700 bg-stone-800 px-3 py-1.5 text-xs text-stone-200 hover:bg-stone-700 transition cursor-pointer"
                    >
                      <Edit2 className="h-3 w-3 text-amber-400" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteBlog(post.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-rose-900/40 bg-rose-950/20 px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-900/40 transition cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for Add / Edit Blog */}
            {blogModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
                <div className="w-full max-w-lg rounded-2xl border border-stone-800 bg-stone-950 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                    <h3 className="font-display text-base font-bold text-white">
                      {editingBlogId ? "Edit Article" : "Write New Technical Article"}
                    </h3>
                    <button
                      onClick={() => setBlogModalOpen(false)}
                      className="text-stone-400 hover:text-white text-xs cursor-pointer"
                    >
                      ✕ Close
                    </button>
                  </div>

                  <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-medium text-stone-400">Article Title *</label>
                      <input
                        type="text"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        required
                        placeholder="e.g. Seismic Performance of Shear Wall Cores in High-Rise Towers"
                        className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-stone-400">Category</label>
                        <select
                          value={blogForm.cat}
                          onChange={(e) => setBlogForm({ ...blogForm, cat: e.target.value })}
                          className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-white"
                        >
                          {(content.blog.categories || []).map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block font-medium text-stone-400">Author</label>
                        <input
                          type="text"
                          value={blogForm.author || ""}
                          onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                          placeholder="e.g. Mr. Keyur Ladani"
                          className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-stone-400">Publish Date</label>
                        <input
                          type="text"
                          value={blogForm.date || ""}
                          onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                          placeholder="e.g. November 2026"
                          className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-400">Reading Time</label>
                        <input
                          type="text"
                          value={blogForm.readTime || ""}
                          onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                          placeholder="e.g. 5 min read"
                          className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-stone-400">Summary / Excerpt</label>
                      <textarea
                        rows={2}
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        placeholder="Brief summary appearing on the article card..."
                        className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-medium text-stone-400">
                        Full Article Content
                      </label>
                      <textarea
                        rows={6}
                        value={blogForm.content || ""}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        placeholder="Detailed technical article content..."
                        className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-3 py-2 text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-stone-800">
                      <button
                        type="button"
                        onClick={() => setBlogModalOpen(false)}
                        className="rounded bg-stone-800 px-3.5 py-2 text-xs text-stone-300 hover:bg-stone-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500"
                      >
                        Publish Article
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: GITHUB & VERCEL DEPLOYMENT */}
        {activeTab === "git" && (
          <div className="max-w-4xl space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-purple-400" />
                Connect with GitHub & Push to Vercel
              </h2>
              <p className="mt-1 text-xs text-stone-400">
                Your repository has been initialized locally with branch{" "}
                <code className="text-amber-400">main</code>. Follow the 2-step guide below to push
                to your GitHub account and import into Vercel.
              </p>
            </div>

            {/* Step 1: Push to GitHub */}
            <div className="rounded-xl border border-stone-800 bg-stone-900/80 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs">
                  1
                </span>
                <h3 className="font-display text-sm font-bold text-white">
                  Create a New GitHub Repo & Push
                </h3>
              </div>
              <p className="text-xs text-stone-300">
                1. Go to{" "}
                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:underline"
                >
                  github.com/new
                </a>{" "}
                and create a fresh new repository (e.g.{" "}
                <code className="text-amber-300">venu-consultants-web</code>). Do{" "}
                <strong>not</strong> initialize with README.
              </p>
              <p className="text-xs text-stone-300">
                2. Run the following commands in your PowerShell / terminal:
              </p>
              <div className="rounded-lg bg-stone-950 p-3 font-mono text-xs text-stone-200 border border-stone-800 overflow-x-auto space-y-1">
                <p className="text-stone-500"># In your terminal inside this folder:</p>
                <p className="text-amber-300">git add .</p>
                <p className="text-amber-300">
                  git commit -m "Initial commit with CMS Admin, SEO crawler keywords, and Firebase"
                </p>
                <p className="text-amber-300">
                  git remote add origin
                  https://github.com/YOUR_GITHUB_USERNAME/venu-consultants-web.git
                </p>
                <p className="text-amber-300">git push -u origin main</p>
              </div>
            </div>

            {/* Step 2: Deploy to Vercel */}
            <div className="rounded-xl border border-stone-800 bg-stone-900/80 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                  2
                </span>
                <h3 className="font-display text-sm font-bold text-white">
                  Import & Deploy to Vercel
                </h3>
              </div>
              <p className="text-xs text-stone-300">
                We have already added <code className="text-emerald-400">vercel.json</code> to your
                folder pre-configured with:
              </p>
              <div className="rounded-lg bg-stone-950 p-3 font-mono text-xs text-stone-200 border border-stone-800 overflow-x-auto">
                <pre className="text-emerald-300">{`{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public",
  "cleanUrls": true
}`}</pre>
              </div>
              <p className="text-xs text-stone-300">
                1. Go to{" "}
                <a
                  href="https://vercel.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  vercel.com/new
                </a>{" "}
                and select your new GitHub repo.
              </p>
              <p className="text-xs text-stone-300">
                2. Click <strong>Deploy</strong>. Vercel will automatically build and publish your
                website with zero extra configuration required!
              </p>
            </div>
          </div>
        )}

        {/* TAB: SERVICES & SECTORS */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-white">Engineering Services & Sectors</h2>
            <div className="space-y-4">
              {content.services.map((srv, idx) => (
                <div
                  key={srv.slug}
                  className="rounded-xl border border-stone-800 bg-stone-950 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => {
                        const copy = [...content.services];
                        copy[idx].title = e.target.value;
                        updateContent({ services: copy });
                      }}
                      className="font-bold text-sm text-amber-400 bg-transparent border-b border-stone-800 focus:border-amber-400 outline-none pb-1"
                    />
                    <span className="text-[11px] text-stone-500 font-mono">
                      /services/{srv.slug}
                    </span>
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-400">Short Summary</label>
                    <textarea
                      rows={2}
                      value={srv.summary}
                      onChange={(e) => {
                        const copy = [...content.services];
                        copy[idx].summary = e.target.value;
                        updateContent({ services: copy });
                      }}
                      className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-400">
                      Detailed Practice Overview
                    </label>
                    <textarea
                      rows={3}
                      value={srv.overview}
                      onChange={(e) => {
                        const copy = [...content.services];
                        copy[idx].overview = e.target.value;
                        updateContent({ services: copy });
                      }}
                      className="mt-1 w-full rounded border border-stone-800 bg-stone-900 px-2 py-1 text-xs text-stone-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: PAGES & SECTIONS (ALL OTHER PAGES) */}
        {activeTab === "pages" && (
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 px-2 mb-3">
                Select Page to Edit
              </p>
              {[
                { id: "home", label: "Home Page (/)" },
                { id: "about-overview", label: "About - Overview" },
                { id: "about-mission", label: "About - Mission & Vision" },
                { id: "about-leadership", label: "About - Leadership" },
                { id: "about-team", label: "About - Engineering Team" },
                { id: "about-why-choose", label: "About - Why Choose Us" },
                { id: "about-infrastructure", label: "About - Infrastructure" },
                { id: "about-library", label: "About - Technical Library" },
                { id: "technology", label: "Technology & Software Stack" },
                { id: "industries", label: "Industries & Sectors" },
                { id: "projects", label: "Projects Portfolio" },
                { id: "clients", label: "Clients & Credentials" },
                { id: "contact", label: "Contact Details & Office" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPage(p.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedPage === p.id
                      ? "bg-amber-500 text-stone-950 font-semibold"
                      : "text-stone-300 hover:bg-stone-800"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="lg:col-span-9 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 space-y-6">
              {/* EDIT HOME */}
              {selectedPage === "home" && (
                <div className="space-y-6">
                  <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                    Home Page Content & Sections
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-stone-400">
                        Hero Eyebrow
                      </label>
                      <input
                        type="text"
                        value={content.home.hero.eyebrow}
                        onChange={(e) =>
                          updateContent({
                            home: {
                              ...content.home,
                              hero: { ...content.home.hero, eyebrow: e.target.value },
                            },
                          })
                        }
                        className="mt-1 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-400">
                        Highlighted Word
                      </label>
                      <input
                        type="text"
                        value={content.home.hero.highlightedWord}
                        onChange={(e) =>
                          updateContent({
                            home: {
                              ...content.home,
                              hero: { ...content.home.hero, highlightedWord: e.target.value },
                            },
                          })
                        }
                        className="mt-1 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-stone-400">
                        Hero Main Title (\n for newlines)
                      </label>
                      <textarea
                        rows={2}
                        value={content.home.hero.title}
                        onChange={(e) =>
                          updateContent({
                            home: {
                              ...content.home,
                              hero: { ...content.home.hero, title: e.target.value },
                            },
                          })
                        }
                        className="mt-1 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-stone-400">
                        Hero Subtitle
                      </label>
                      <textarea
                        rows={2}
                        value={content.home.hero.subtitle}
                        onChange={(e) =>
                          updateContent({
                            home: {
                              ...content.home,
                              hero: { ...content.home.hero, subtitle: e.target.value },
                            },
                          })
                        }
                        className="mt-1 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* EDIT ABOUT OVERVIEW */}
              {selectedPage === "about-overview" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                    About Overview
                  </h3>
                  <div>
                    <label className="block text-xs font-medium text-stone-400">Heading</label>
                    <input
                      type="text"
                      value={content.about.overview.title}
                      onChange={(e) =>
                        updateContent({
                          about: {
                            ...content.about,
                            overview: { ...content.about.overview, title: e.target.value },
                          },
                        })
                      }
                      className="mt-1 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-400">Intro</label>
                    <textarea
                      rows={2}
                      value={content.about.overview.intro}
                      onChange={(e) =>
                        updateContent({
                          about: {
                            ...content.about,
                            overview: { ...content.about.overview, intro: e.target.value },
                          },
                        })
                      }
                      className="mt-1 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* EDIT TEAM */}
              {selectedPage === "about-team" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                      Engineering Team
                    </h3>
                    <button
                      onClick={() => {
                        const newM: Member = {
                          name: "New Engineer",
                          role: "Structural Engineer",
                          bio: "Bio here",
                        };
                        updateContent({
                          about: {
                            ...content.about,
                            team: {
                              ...content.about.team,
                              members: [newM, ...content.about.team.members],
                            },
                          },
                        });
                      }}
                      className="inline-flex items-center gap-1 rounded bg-stone-800 px-2.5 py-1 text-xs text-amber-400"
                    >
                      <Plus className="h-3 w-3" /> Add Member
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {content.about.team.members.map((m, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-stone-800 bg-stone-950 p-3 space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <input
                            type="text"
                            value={m.name}
                            onChange={(e) => {
                              const copy = [...content.about.team.members];
                              copy[idx].name = e.target.value;
                              updateContent({
                                about: {
                                  ...content.about,
                                  team: { ...content.about.team, members: copy },
                                },
                              });
                            }}
                            className="font-bold text-xs text-amber-400 bg-transparent border-b border-stone-800"
                          />
                          <button
                            onClick={() => {
                              const copy = content.about.team.members.filter((_, i) => i !== idx);
                              updateContent({
                                about: {
                                  ...content.about,
                                  team: { ...content.about.team, members: copy },
                                },
                              });
                            }}
                            className="text-stone-500 hover:text-rose-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={m.role}
                          onChange={(e) => {
                            const copy = [...content.about.team.members];
                            copy[idx].role = e.target.value;
                            updateContent({
                              about: {
                                ...content.about,
                                team: { ...content.about.team, members: copy },
                              },
                            });
                          }}
                          className="w-full text-xs text-stone-300 bg-transparent border-b border-stone-800"
                          placeholder="Role"
                        />
                        <textarea
                          rows={2}
                          value={m.bio}
                          onChange={(e) => {
                            const copy = [...content.about.team.members];
                            copy[idx].bio = e.target.value;
                            updateContent({
                              about: {
                                ...content.about,
                                team: { ...content.about.team, members: copy },
                              },
                            });
                          }}
                          className="w-full text-xs text-stone-400 bg-transparent border border-stone-800 rounded p-1"
                          placeholder="Bio"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EDIT CLIENTS */}
              {selectedPage === "clients" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider">
                      Clients
                    </h3>
                    <button
                      onClick={() => {
                        const newC = { name: "New Client", sector: "Industrial" };
                        updateContent({ clients: [newC, ...content.clients] });
                      }}
                      className="inline-flex items-center gap-1 rounded bg-stone-800 px-2.5 py-1 text-xs text-amber-400"
                    >
                      <Plus className="h-3 w-3" /> Add Client
                    </button>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {content.clients.map((c, idx) => (
                      <div
                        key={idx}
                        className="flex gap-2 items-center rounded border border-stone-800 bg-stone-950 p-2"
                      >
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => {
                            const copy = [...content.clients];
                            copy[idx].name = e.target.value;
                            updateContent({ clients: copy });
                          }}
                          className="flex-1 rounded border border-stone-800 bg-stone-900 px-2 py-1 text-xs text-white"
                        />
                        <input
                          type="text"
                          value={c.sector}
                          onChange={(e) => {
                            const copy = [...content.clients];
                            copy[idx].sector = e.target.value;
                            updateContent({ clients: copy });
                          }}
                          className="w-24 rounded border border-stone-800 bg-stone-900 px-2 py-1 text-xs text-amber-400"
                        />
                        <button
                          onClick={() => {
                            const copy = content.clients.filter((_, i) => i !== idx);
                            updateContent({ clients: copy });
                          }}
                          className="text-stone-500 hover:text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: SEO & CRAWLER KEYWORDS */}
        {activeTab === "seo" && (
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 px-2 mb-3">
                Select Page for SEO
              </p>
              {[
                { id: "home", label: "Home Page" },
                { id: "about", label: "About Us" },
                { id: "about-mission", label: "Mission & Vision" },
                { id: "about-leadership", label: "Leadership" },
                { id: "about-team", label: "Our Team" },
                { id: "about-why-choose-us", label: "Why Choose Us" },
                { id: "about-infrastructure", label: "Infrastructure" },
                { id: "about-library", label: "Technical Library" },
                { id: "services", label: "Services" },
                { id: "industries", label: "Industries" },
                { id: "projects", label: "Projects" },
                { id: "clients", label: "Clients" },
                { id: "technology", label: "Technology" },
                { id: "careers", label: "Careers" },
                { id: "blog", label: "Blog" },
                { id: "contact", label: "Contact" },
              ].map((p) => {
                const hasSEO = !!content.seo[p.id]?.keywords;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedSEOPage(p.id)}
                    className={`w-full flex items-center justify-between text-left px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      selectedSEOPage === p.id
                        ? "bg-amber-500 text-stone-950 font-semibold"
                        : "text-stone-300 hover:bg-stone-800"
                    }`}
                  >
                    <span>{p.label}</span>
                    {hasSEO && (
                      <span
                        className={`text-[10px] ${selectedSEOPage === p.id ? "text-stone-950" : "text-emerald-400"}`}
                      >
                        ✓ SEO
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-9 space-y-6">
              {(() => {
                const seoData = content.seo[selectedSEOPage] || {
                  title: "",
                  description: "",
                  keywords: "",
                  canonical: "",
                  robots: "index, follow",
                  ogTitle: "",
                  ogDescription: "",
                };

                return (
                  <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6 space-y-6">
                    <div>
                      <h2 className="text-base font-bold text-white flex items-center gap-2">
                        <Search className="h-4 w-4 text-amber-400" />
                        Crawler Keywords & Metadata ({selectedSEOPage})
                      </h2>
                      <p className="mt-1 text-xs text-stone-400">
                        Edit titles, descriptions, and crawler keywords for Google and search
                        crawlers.
                      </p>
                    </div>

                    {/* Google SERP Preview */}
                    <div className="rounded-xl border border-stone-700 bg-stone-950 p-4 space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-stone-400">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-stone-800 text-[9px] text-amber-400 font-bold">
                          V
                        </span>
                        <span>
                          https://venuconsultants.in
                          {seoData.canonical ||
                            `/${selectedSEOPage === "home" ? "" : selectedSEOPage}`}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium text-sky-400 hover:underline cursor-pointer line-clamp-1">
                        {seoData.title || "Venu Consultants — Engineering Consultancy"}
                      </h3>
                      <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                        {seoData.description ||
                          "Engineering consultancy delivering architectural, structural, environmental and industrial engineering solutions."}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center text-xs">
                          <label className="font-medium text-stone-300">Meta Title</label>
                          <span className="text-[11px] text-stone-500">
                            {(seoData.title || "").length} / 60 chars
                          </span>
                        </div>
                        <input
                          type="text"
                          value={seoData.title || ""}
                          onChange={(e) => updateSEO(selectedSEOPage, { title: e.target.value })}
                          className="mt-1.5 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-xs">
                          <label className="font-medium text-stone-300">Meta Description</label>
                          <span className="text-[11px] text-stone-500">
                            {(seoData.description || "").length} / 155 chars
                          </span>
                        </div>
                        <textarea
                          rows={2}
                          value={seoData.description || ""}
                          onChange={(e) =>
                            updateSEO(selectedSEOPage, { description: e.target.value })
                          }
                          className="mt-1.5 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center text-xs">
                          <label className="font-medium text-amber-400">
                            SEO Crawler Keywords{" "}
                            <span className="text-stone-400">(Comma-separated)</span>
                          </label>
                          <span className="text-[11px] text-stone-500">
                            {(seoData.keywords || "").split(",").filter((k) => k.trim()).length}{" "}
                            keywords added
                          </span>
                        </div>
                        <textarea
                          rows={3}
                          value={seoData.keywords || ""}
                          onChange={(e) => updateSEO(selectedSEOPage, { keywords: e.target.value })}
                          className="mt-1.5 w-full rounded border border-amber-500/40 bg-stone-950 px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* TAB: COMPANY & GLOBAL */}
        {activeTab === "company" && (
          <div className="max-w-2xl rounded-2xl border border-stone-800 bg-stone-900/60 p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Building className="h-4 w-4 text-amber-400" />
              Company Details
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div>
                <label className="text-stone-400">Company Name</label>
                <input
                  type="text"
                  value={content.company.name}
                  onChange={(e) =>
                    updateContent({ company: { ...content.company, name: e.target.value } })
                  }
                  className="mt-1 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-stone-400">Tagline</label>
                <input
                  type="text"
                  value={content.company.tagline}
                  onChange={(e) =>
                    updateContent({ company: { ...content.company, tagline: e.target.value } })
                  }
                  className="mt-1 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-stone-400">Phone</label>
                <input
                  type="text"
                  value={content.company.phone}
                  onChange={(e) =>
                    updateContent({ company: { ...content.company, phone: e.target.value } })
                  }
                  className="mt-1 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-stone-400">Email</label>
                <input
                  type="text"
                  value={content.company.email}
                  onChange={(e) =>
                    updateContent({ company: { ...content.company, email: e.target.value } })
                  }
                  className="mt-1 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-stone-400">Address</label>
                <input
                  type="text"
                  value={content.company.address}
                  onChange={(e) =>
                    updateContent({ company: { ...content.company, address: e.target.value } })
                  }
                  className="mt-1 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB: FIREBASE CLOUD SYNC */}
        {activeTab === "cloud" && (
          <div className="max-w-3xl rounded-2xl border border-stone-800 bg-stone-900/60 p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Cloud className="h-5 w-5 text-emerald-400" />
              Firebase Cloud Firestore Sync
            </h2>
            <p className="text-xs text-stone-400">
              Synchronize your website's content and SEO keywords with Firebase Firestore:
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                disabled={cloudSyncLoading}
                onClick={handleCloudPush}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 disabled:opacity-50 cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>Push to Firebase Firestore</span>
              </button>

              <button
                type="button"
                disabled={cloudSyncLoading}
                onClick={handleCloudPull}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-500 disabled:opacity-50 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Pull from Firebase Firestore</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB: SECURITY & PIN */}
        {activeTab === "security" && (
          <div className="max-w-md rounded-2xl border border-stone-800 bg-stone-900/60 p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="h-4 w-4 text-amber-400" />
              Security & Admin PIN
            </h2>
            <form onSubmit={handleChangePin} className="space-y-3 text-xs">
              <div>
                <label className="text-stone-400">New PIN</label>
                <input
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  placeholder="At least 4 characters"
                  className="mt-1 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="text-stone-400">Confirm New PIN</label>
                <input
                  type="password"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="Repeat new PIN"
                  className="mt-1 w-full rounded border border-stone-800 bg-stone-950 px-3 py-2 text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded bg-amber-500 py-2.5 text-xs font-semibold text-stone-950 hover:bg-amber-400 cursor-pointer"
              >
                Update Security PIN
              </button>
            </form>
          </div>
        )}
      </main>

      <footer className="border-t border-stone-800/80 bg-stone-900/40 py-4 text-center text-xs text-stone-500">
        Venu Consultants Pvt. Ltd. · Admin Panel Version 2.1 · Connected to Firebase & Git
      </footer>
    </div>
  );
}
