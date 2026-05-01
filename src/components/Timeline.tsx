import { useMemo, useState } from "react";
import { ELECTION_TIMELINE } from "../data";

export default function Timeline() {
  const defaultDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split("T")[0];
  }, []);
  const [pollDate, setPollDate] = useState(defaultDate);

  const today = new Date();
  const poll = new Date(pollDate);

  const events = ELECTION_TIMELINE.map((e) => {
    const eventDate = new Date(poll);
    eventDate.setDate(poll.getDate() - e.daysBefore);
    const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return { ...e, date: eventDate, diffDays };
  });

  const upcomingIdx = events.findIndex((e) => e.diffDays >= 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Election Timeline</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Pick a polling date and we'll show you every key milestone — calculated from official ECI
          schedule patterns.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Polling day</label>
        <input
          type="date"
          value={pollDate}
          onChange={(e) => setPollDate(e.target.value)}
          className="mt-1.5 w-full max-w-xs rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:border-indigo-600 dark:focus:bg-slate-700 dark:focus:ring-indigo-900/50"
        />
      </div>

      {/* Vertical timeline */}
      <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 sm:p-8">
        <div className="absolute left-10 top-8 bottom-8 w-0.5 bg-gradient-to-b from-indigo-200 via-violet-200 to-pink-200 dark:from-indigo-800 dark:via-violet-800 dark:to-pink-800 sm:left-12" />

        <div className="space-y-6">
          {events.map((e, i) => {
            const isPast = e.diffDays < 0;
            const isNext = i === upcomingIdx;
            return (
              <div key={i} className="relative flex gap-4 sm:gap-6">
                <div
                  className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg shadow-sm sm:h-12 sm:w-12 ${
                    isPast
                      ? "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                      : isNext
                      ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 ring-4 ring-indigo-100 dark:shadow-indigo-900/40 dark:ring-indigo-900/50"
                      : "bg-white text-slate-700 ring-2 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600"
                  }`}
                >
                  {e.icon}
                </div>
                <div
                  className={`flex-1 rounded-2xl border p-4 ${
                    isNext
                      ? "border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 dark:border-indigo-800 dark:from-indigo-950/50 dark:to-violet-950/50"
                      : isPast
                      ? "border-slate-100 bg-slate-50/60 opacity-70 dark:border-slate-700 dark:bg-slate-800/60"
                      : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {e.phase}
                    </span>
                    {isNext && (
                      <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Upcoming
                      </span>
                    )}
                    {isPast && (
                      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-600 dark:text-slate-300">
                        Past
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-base font-semibold text-slate-900 dark:text-white">{e.title}</div>
                  <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{e.description}</div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-lg bg-white px-2.5 py-1 font-medium text-slate-700 ring-1 ring-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-600">
                      📅 {e.date.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {e.diffDays === 0
                        ? "Today"
                        : e.diffDays > 0
                        ? `In ${e.diffDays} day${e.diffDays === 1 ? "" : "s"}`
                        : `${Math.abs(e.diffDays)} day${Math.abs(e.diffDays) === 1 ? "" : "s"} ago`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
