import { useState } from "react";
import { VOTING_STEPS } from "../data";

export default function VotingProcess() {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Voting Process</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          A step-by-step walkthrough of what happens at the polling booth, from arrival to your vote
          being recorded.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
        {/* Step rail */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          {VOTING_STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                active === i
                  ? "bg-gradient-to-r from-indigo-50 to-violet-50 ring-1 ring-indigo-100 dark:from-indigo-950/50 dark:to-violet-950/50 dark:ring-indigo-800"
                  : "hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  active === i
                    ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white"
                    : i < active
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                }`}
              >
                {i < active ? "✓" : i + 1}
              </span>
              <span
                className={
                  active === i ? "font-semibold text-indigo-700 dark:text-indigo-400" : "font-medium text-slate-700 dark:text-slate-300"
                }
              >
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Step {active + 1} of {VOTING_STEPS.length}
          </div>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{VOTING_STEPS[active].title}</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            {VOTING_STEPS[active].description}
          </p>

          {VOTING_STEPS[active].tip && (
            <div className="mt-5 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/40">
              <div className="text-xl">💡</div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Pro tip
                </div>
                <div className="mt-1 text-sm text-amber-900 dark:text-amber-300">{VOTING_STEPS[active].tip}</div>
              </div>
            </div>
          )}

          {/* Visual illustration based on step */}
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 dark:from-slate-700/50 dark:to-slate-700/30">
            <div className="flex items-center justify-center text-7xl">
              {["🚶", "🧍‍♀️", "🪪", "🖋️", "📝", "🗳️", "📜", "✅"][active]}
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              disabled={active === 0}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            >
              ← Previous
            </button>
            <button
              onClick={() => setActive((a) => Math.min(VOTING_STEPS.length - 1, a + 1))}
              disabled={active === VOTING_STEPS.length - 1}
              className="rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Quick reference */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card emoji="🕖" title="Polling hours" sub="7:00 AM to 6:00 PM (varies by constituency)" />
        <Card
          emoji="🆔"
          title="Don't forget"
          sub="Carry EPIC or any approved photo ID — list is in the Documents tab"
        />
        <Card
          emoji="🤝"
          title="Need help?"
          sub="ECI helpline: 1950 — available in your local language"
        />
      </div>
    </div>
  );
}

function Card({ emoji, title, sub }: { emoji: string; title: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
      <div className="text-2xl">{emoji}</div>
      <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
      <div className="mt-1 text-xs text-slate-600 dark:text-slate-400">{sub}</div>
    </div>
  );
}
