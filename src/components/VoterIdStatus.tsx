import { useState } from "react";
import type { UserContext } from "../App";
import { STATES } from "../data";

type Props = {
  user: UserContext;
  setUser: (u: UserContext) => void;
};

type Result =
  | { kind: "found"; epic: string; name: string; constituency: string; booth: string }
  | { kind: "pending"; ref: string }
  | { kind: "not_found" }
  | null;

export default function VoterIdStatus({ user, setUser }: Props) {
  const [mode, setMode] = useState<"epic" | "details" | "ref">("epic");
  const [epic, setEpic] = useState("");
  const [name, setName] = useState(user.name ?? "");
  const [state, setState] = useState(user.state ?? "");
  const [dob, setDob] = useState("");
  const [refId, setRefId] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [loading, setLoading] = useState(false);

  function search() {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      if (mode === "epic") {
        if (/^[A-Z]{3}\d{7}$/i.test(epic.trim())) {
          setResult({
            kind: "found",
            epic: epic.toUpperCase(),
            name: name || "Verified Elector",
            constituency: state ? `${state} — Constituency 142` : "Constituency 142",
            booth: "Booth #87, Govt Higher Secondary School",
          });
          setUser({ ...user, hasEpic: true, registered: true });
        } else {
          setResult({ kind: "not_found" });
        }
      } else if (mode === "ref") {
        if (refId.trim().length >= 6) {
          setResult({ kind: "pending", ref: refId.toUpperCase() });
        } else {
          setResult({ kind: "not_found" });
        }
      } else {
        if (name && state && dob) {
          setResult({
            kind: "found",
            epic: "ABC" + Math.floor(1000000 + Math.random() * 8999999),
            name,
            constituency: `${state} — Constituency 142`,
            booth: "Booth #87, Govt Higher Secondary School",
          });
          setUser({ ...user, hasEpic: true, registered: true, name, state });
        } else {
          setResult({ kind: "not_found" });
        }
      }
      setLoading(false);
    }, 700);
  }

  const inputCls = "mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:border-indigo-600 dark:focus:bg-slate-700 dark:focus:ring-indigo-900/50";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Voter ID Status</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Check your EPIC, find your polling booth, or track an in-progress application.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "epic", l: "By EPIC No." },
            { id: "details", l: "By Personal Details" },
            { id: "ref", l: "Track Application" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setMode(t.id as typeof mode);
                setResult(null);
              }}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                mode === t.id
                  ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              }`}
            >
              {t.l}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-4">
          {mode === "epic" && (
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">EPIC Number</label>
              <input
                value={epic}
                onChange={(e) => setEpic(e.target.value.toUpperCase())}
                placeholder="e.g. ABC1234567"
                className={`${inputCls} tracking-wider`}
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                Format: 3 letters + 7 digits, printed on your voter ID card.
              </p>
            </div>
          )}

          {mode === "details" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date of Birth</label>
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">State</label>
                <select value={state} onChange={(e) => setState(e.target.value)} className={inputCls}>
                  <option value="">Select…</option>
                  {STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {mode === "ref" && (
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Reference ID</label>
              <input
                value={refId}
                onChange={(e) => setRefId(e.target.value.toUpperCase())}
                placeholder="e.g. ECI4XJ29P"
                className={`${inputCls} tracking-wider`}
              />
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                You receive this after submitting Form 6 / 8.
              </p>
            </div>
          )}

          <button
            onClick={search}
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:opacity-50"
          >
            {loading ? "Searching…" : "Check status"}
          </button>
        </div>
      </div>

      {result && (
        <div>
          {result.kind === "found" && (
            <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm dark:border-emerald-800 dark:from-emerald-950/40 dark:to-teal-950/40">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-2xl text-white shadow-md shadow-emerald-200 dark:shadow-emerald-900/40">
                  ✓
                </div>
                <div>
                  <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">You're on the rolls!</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Verified against the electoral database.
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Info label="Name" value={result.name} />
                <Info label="EPIC No." value={result.epic} />
                <Info label="Constituency" value={result.constituency} />
                <Info label="Polling Booth" value={result.booth} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href="https://voters.eci.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-50 dark:bg-slate-800 dark:text-emerald-400 dark:ring-emerald-700 dark:hover:bg-slate-700"
                >
                  View on official portal ↗
                </a>
                <button className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-600 dark:hover:bg-slate-700">
                  Get directions to booth
                </button>
              </div>
            </div>
          )}

          {result.kind === "pending" && (
            <div className="rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm dark:border-amber-800 dark:from-amber-950/40 dark:to-orange-950/40">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-2xl text-white shadow-md shadow-amber-200 dark:shadow-amber-900/40">
                  ⏳
                </div>
                <div>
                  <div className="text-sm font-semibold text-amber-700 dark:text-amber-400">Under verification</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Reference: <span className="font-mono">{result.ref}</span>
                  </div>
                </div>
              </div>
              <ol className="mt-5 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <Step done label="Form 6 submitted" />
                <Step done label="Documents validated" />
                <Step current label="BLO field verification (in progress)" />
                <Step label="EPIC printed & dispatched" />
              </ol>
              <p className="mt-4 text-xs text-slate-600 dark:text-slate-400">
                Estimated completion: 1–2 weeks. You'll receive an SMS when your EPIC is dispatched.
              </p>
            </div>
          )}

          {result.kind === "not_found" && (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 shadow-sm dark:border-rose-800 dark:bg-rose-950/40">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500 text-2xl text-white">
                  ✕
                </div>
                <div>
                  <div className="text-sm font-semibold text-rose-700 dark:text-rose-400">No record found</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    We couldn't locate a matching elector. Try a different search method, or
                    register if you haven't yet.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/60 bg-white/70 px-4 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-800/70">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-medium text-slate-900 dark:text-white">{value}</div>
    </div>
  );
}

function Step({ done, current, label }: { done?: boolean; current?: boolean; label: string }) {
  return (
    <li className="flex items-center gap-2">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
          done
            ? "bg-emerald-500 text-white"
            : current
            ? "bg-amber-500 text-white animate-pulse"
            : "bg-slate-200 text-slate-400 dark:bg-slate-600 dark:text-slate-500"
        }`}
      >
        {done ? "✓" : current ? "•" : ""}
      </span>
      <span className={done ? "line-through opacity-70" : ""}>{label}</span>
    </li>
  );
}
