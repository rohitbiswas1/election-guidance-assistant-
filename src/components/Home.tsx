import type { Module } from "./Sidebar";
import type { UserContext } from "../App";

type Props = {
  user: UserContext;
  onNavigate: (m: Module) => void;
};

export default function Home({ user, onNavigate }: Props) {
  const greeting = user.name ? `Hi, ${user.name}!` : "Welcome to VoteWise!";
  const isEligible = user.age !== null && user.age >= 18;

  const cards: { mod: Module; title: string; sub: string; emoji: string; gradient: string }[] = [
    { mod: "registration", title: "Register to Vote", sub: "Guided 5-step wizard", emoji: "✍️", gradient: "from-emerald-500 to-teal-600" },
    { mod: "status", title: "Check Voter ID", sub: "Look up your EPIC status", emoji: "🆔", gradient: "from-sky-500 to-indigo-600" },
    { mod: "voting", title: "Voting Process", sub: "What to do at the booth", emoji: "🗳️", gradient: "from-violet-500 to-purple-600" },
    { mod: "timeline", title: "Election Timeline", sub: "Key dates explained", emoji: "📅", gradient: "from-amber-500 to-orange-600" },
    { mod: "documents", title: "Documents", sub: "What to carry & when", emoji: "📄", gradient: "from-pink-500 to-rose-600" },
    { mod: "faq", title: "FAQs", sub: "Quick answers", emoji: "❓", gradient: "from-slate-600 to-slate-800" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 text-white shadow-xl shadow-indigo-200 dark:shadow-indigo-900/30">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-pink-400/20 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
            Your democratic companion
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{greeting}</h1>
          <p className="mt-2 max-w-2xl text-base text-white/85">
            VoteWise guides you through every step — from voter registration and ID verification
            to polling-day procedures, timelines, and FAQs. Smart, personalized, and always free.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("chat")}
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-slate-50"
            >
              💬 Ask VoteWise anything
            </button>
            <button
              onClick={() => onNavigate("registration")}
              className="rounded-xl bg-white/15 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
            >
              Start Registration →
            </button>
          </div>
        </div>
      </div>

      {/* Personalized status */}
      {(user.age !== null || user.state || user.registered !== null) && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Your profile
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {user.age !== null && (
              <Chip
                color={isEligible ? "emerald" : "rose"}
                label={
                  isEligible
                    ? `Age ${user.age} — Eligible to vote`
                    : `Age ${user.age} — Not yet eligible`
                }
              />
            )}
            {user.state && <Chip color="indigo" label={`📍 ${user.state}`} />}
            {user.registered === true && <Chip color="emerald" label="✓ Registered voter" />}
            {user.registered === false && <Chip color="amber" label="Not registered yet" />}
            {user.hasEpic === true && <Chip color="sky" label="Has EPIC card" />}
          </div>
          {!isEligible && user.age !== null && user.age >= 17 && (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              You can apply as soon as you turn 18 — start a pre-registration via Form 6.
            </p>
          )}
        </div>
      )}

      {/* Module cards */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Explore</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <button
              key={c.mod}
              onClick={() => onNavigate(c.mod)}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
            >
              <div
                className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.gradient} text-xl text-white shadow-sm`}
              >
                {c.emoji}
              </div>
              <div className="mt-4 text-base font-semibold text-slate-900 dark:text-white">{c.title}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{c.sub}</div>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-indigo-600 opacity-0 transition group-hover:opacity-100 dark:text-indigo-400">
                Open <span>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Trust strip */}
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 transition-colors dark:border-slate-700 dark:from-slate-800 dark:to-slate-800 sm:grid-cols-3">
        <Stat icon="🔒" big="100%" label="Private — data stays on your device" />
        <Stat icon="🇮🇳" big="ECI" label="Aligned with official guidelines" />
        <Stat icon="⚡" big="24/7" label="Always available, multilingual-ready" />
      </div>
    </div>
  );
}

function Chip({ color, label }: { color: string; label: string }) {
  const map: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:ring-emerald-800",
    rose: "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:ring-rose-800",
    amber: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:ring-amber-800",
    sky: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-950/50 dark:text-sky-400 dark:ring-sky-800",
    indigo: "bg-indigo-50 text-indigo-700 ring-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-400 dark:ring-indigo-800",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 ${map[color]}`}>
      {label}
    </span>
  );
}

function Stat({ icon, big, label }: { icon: string; big: string; label: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="text-lg font-bold text-slate-900 dark:text-white">{big}</div>
        <div className="text-xs text-slate-600 dark:text-slate-400">{label}</div>
      </div>
    </div>
  );
}
