import { useEffect, useState } from "react";
import Sidebar, { type Module } from "./components/Sidebar";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import RegistrationWizard from "./components/RegistrationWizard";
import VoterIdStatus from "./components/VoterIdStatus";
import VotingProcess from "./components/VotingProcess";
import Timeline from "./components/Timeline";
import Documents from "./components/Documents";
import FAQ from "./components/FAQ";

export type UserContext = {
  name: string | null;
  age: number | null;
  state: string | null;
  registered: boolean | null;
  hasEpic: boolean | null;
};

const DEFAULT_USER: UserContext = {
  name: null,
  age: null,
  state: null,
  registered: null,
  hasEpic: null,
};

const STORAGE_KEY = "votewise:user";
const THEME_KEY = "votewise:theme";

export default function App() {
  const [active, setActive] = useState<Module>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dark, setDark] = useState(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });
  const [user, setUser] = useState<UserContext>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...DEFAULT_USER, ...JSON.parse(raw) } : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Allow chatbot to navigate via custom event
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as Module;
      if (detail) setActive(detail);
    };
    window.addEventListener("votewise:navigate", handler);
    return () => window.removeEventListener("votewise:navigate", handler);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 transition-colors duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30">
      <Sidebar
        active={active}
        onChange={setActive}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/80 px-4 backdrop-blur-xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/80 sm:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors dark:bg-slate-800 dark:text-slate-400 lg:hidden"
            aria-label="Open menu"
          >
            ☰
          </button>
          <div className="flex-1">
            <div className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {labelFor(active)}
            </div>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg transition-all hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className={`absolute transition-all duration-300 ${dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}>
              🌙
            </span>
            <span className={`absolute transition-all duration-300 ${dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}>
              ☀️
            </span>
          </button>

          {user.name && (
            <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors dark:bg-slate-800 dark:text-slate-300 sm:flex">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-[10px] font-bold text-white">
                {user.name[0].toUpperCase()}
              </span>
              {user.name}
            </div>
          )}
          <button
            onClick={() => {
              if (confirm("Reset your saved profile?")) setUser(DEFAULT_USER);
            }}
            className="rounded-lg px-2 py-1 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            title="Reset profile"
          >
            ⟲
          </button>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto max-w-5xl">
            {active === "home" && <Home user={user} onNavigate={setActive} />}
            {active === "chat" && <Chatbot user={user} setUser={setUser} />}
            {active === "registration" && <RegistrationWizard user={user} setUser={setUser} />}
            {active === "status" && <VoterIdStatus user={user} setUser={setUser} />}
            {active === "voting" && <VotingProcess />}
            {active === "timeline" && <Timeline />}
            {active === "documents" && <Documents user={user} />}
            {active === "faq" && <FAQ />}
          </div>
        </main>
      </div>
    </div>
  );
}

function labelFor(m: Module): string {
  return {
    home: "Dashboard",
    chat: "Ask VoteWise",
    registration: "Voter Registration",
    status: "Voter ID Status",
    voting: "Voting Process",
    timeline: "Election Timeline",
    documents: "Required Documents",
    faq: "FAQs",
  }[m];
}
