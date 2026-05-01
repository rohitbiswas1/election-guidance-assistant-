import { useState } from "react";
import type { UserContext } from "../App";
import { POLLING_DAY_DOCS, REGISTRATION_DOCS } from "../data";

type Props = {
  user: UserContext;
};

type Mode = "registration" | "polling";

export default function Documents({ user }: Props) {
  const [mode, setMode] = useState<Mode>(user.registered ? "polling" : "registration");
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (k: string) => {
    setChecked((prev) => {
      const n = new Set(prev);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  };

  const totalNeeded = mode === "registration" ? 4 : 1;
  const collected = checked.size;
  const progress = Math.min(100, Math.round((collected / totalNeeded) * 100));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Required Documents</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          A smart checklist that adapts to your situation. Tick off as you collect them.
        </p>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-2">
        <Tab active={mode === "registration"} onClick={() => setMode("registration")}>
          📝 For Registration
        </Tab>
        <Tab active={mode === "polling"} onClick={() => setMode("polling")}>
          🗳️ For Polling Day
        </Tab>
      </div>

      {/* Progress */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700 dark:text-slate-300">Your checklist progress</span>
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{progress}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {mode === "registration" ? (
        <div className="space-y-5">
          <Group title="Identity proof" subtitle="Any one">
            {REGISTRATION_DOCS.filter((d) => d.category === "identity" && !d.required).map((d) => (
              <DocItem
                key={d.name}
                name={d.name}
                desc={d.description}
                checked={checked.has(d.name)}
                onToggle={() => toggle(d.name)}
              />
            ))}
          </Group>

          <Group title="Age proof" subtitle="Any one">
            {REGISTRATION_DOCS.filter((d) => d.category === "age").map((d) => (
              <DocItem
                key={d.name}
                name={d.name}
                desc={d.description}
                checked={checked.has(d.name)}
                onToggle={() => toggle(d.name)}
              />
            ))}
          </Group>

          <Group title="Address proof" subtitle="Any one">
            {REGISTRATION_DOCS.filter((d) => d.category === "address").map((d) => (
              <DocItem
                key={d.name}
                name={d.name}
                desc={d.description}
                checked={checked.has(d.name)}
                onToggle={() => toggle(d.name)}
              />
            ))}
          </Group>

          <Group title="Mandatory" subtitle="Always required" required>
            {REGISTRATION_DOCS.filter((d) => d.required).map((d) => (
              <DocItem
                key={d.name}
                name={d.name}
                desc={d.description}
                checked={checked.has(d.name)}
                onToggle={() => toggle(d.name)}
                required
              />
            ))}
          </Group>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300">
            <strong>You only need ONE of these on polling day</strong> — provided your name is on
            the electoral roll. EPIC is preferred but not mandatory.
          </div>
          <Group title="Approved photo IDs" subtitle="Any one is enough">
            {POLLING_DAY_DOCS.map((d) => (
              <DocItem
                key={d}
                name={d}
                desc=""
                checked={checked.has(d)}
                onToggle={() => toggle(d)}
              />
            ))}
          </Group>
        </div>
      )}
    </div>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm"
          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600 dark:hover:bg-slate-700"
      }`}
    >
      {children}
    </button>
  );
}

function Group({
  title,
  subtitle,
  required,
  children,
}: {
  title: string;
  subtitle: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">{title}</h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">{subtitle}</p>
        </div>
        {required && (
          <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:bg-rose-900/50 dark:text-rose-400">
            Required
          </span>
        )}
      </div>
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}

function DocItem({
  name,
  desc,
  checked,
  onToggle,
  required,
}: {
  name: string;
  desc: string;
  checked: boolean;
  onToggle: () => void;
  required?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
        checked
          ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40"
          : required
          ? "border-rose-100 bg-rose-50/50 hover:bg-rose-50 dark:border-rose-800/50 dark:bg-rose-950/20 dark:hover:bg-rose-950/40"
          : "border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-700/50 dark:hover:bg-slate-700"
      }`}
    >
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition ${
          checked
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-slate-300 bg-white dark:border-slate-500 dark:bg-slate-700"
        }`}
      >
        {checked && (
          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{name}</div>
        {desc && <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-500">{desc}</div>}
      </div>
    </button>
  );
}
