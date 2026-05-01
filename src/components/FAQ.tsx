import { useMemo, useState } from "react";
import { FAQS } from "../data";

const TAGS = ["all", "registration", "epic", "voting", "documents", "nri", "postal", "nota"];

export default function FAQ() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = useMemo(() => {
    return FAQS.filter((f) => {
      if (tag !== "all" && !f.tags.some((t) => t.includes(tag))) return false;
      if (!query) return true;
      const hay = (f.q + " " + f.a + " " + f.tags.join(" ")).toLowerCase();
      return query
        .toLowerCase()
        .split(/\s+/)
        .every((w) => hay.includes(w));
    });
  }, [query, tag]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Quick answers to the most common election questions. Search or filter by topic.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:focus-within:border-indigo-600 dark:focus-within:bg-slate-700 dark:focus-within:ring-indigo-900/50">
          <span className="text-slate-400">🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search FAQs…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              Clear
            </button>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${
                tag === t
                  ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400">
            No matching FAQs. Try a different keyword.
          </div>
        )}
        {filtered.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-700/50"
              >
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{f.q}</span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition dark:bg-slate-700 dark:text-slate-400 ${
                    isOpen ? "rotate-180 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400" : ""
                  }`}
                >
                  ▾
                </span>
              </button>
              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/50 px-4 py-4 text-sm leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-700/30 dark:text-slate-300">
                  {f.a}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {f.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-indigo-700 ring-1 ring-indigo-100 dark:bg-slate-800 dark:text-indigo-400 dark:ring-indigo-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
