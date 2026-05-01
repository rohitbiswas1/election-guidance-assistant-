import { useState } from "react";
import type { UserContext } from "../App";
import { STATES } from "../data";

type Props = {
  user: UserContext;
  setUser: (u: UserContext) => void;
};

type Form = {
  name: string;
  dob: string;
  state: string;
  district: string;
  address: string;
  hasAadhaar: boolean | null;
  citizen: boolean | null;
  alreadyRegistered: boolean | null;
};

const STEPS = ["Eligibility", "Personal Details", "Address", "Documents", "Review"];

export default function RegistrationWizard({ user, setUser }: Props) {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<Form>({
    name: user.name ?? "",
    dob: "",
    state: user.state ?? "",
    district: "",
    address: "",
    hasAadhaar: null,
    citizen: null,
    alreadyRegistered: null,
  });

  const age = form.dob ? calcAge(form.dob) : null;
  const eligible = age !== null && age >= 18 && form.citizen === true && form.alreadyRegistered === false;
  const tooYoung = age !== null && age < 18;
  const willTurn18Soon = age !== null && age >= 17 && age < 18;

  function next() {
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function submit() {
    setUser({
      ...user,
      name: form.name || user.name,
      age,
      state: form.state,
      registered: true,
    });
    setSubmitted(true);
  }

  if (submitted) {
    const ref = "ECI" + Math.random().toString(36).substring(2, 10).toUpperCase();
    return (
      <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-8 text-center shadow-sm dark:border-emerald-800 dark:from-emerald-950/40 dark:to-teal-950/40">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-3xl text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/40">
          ✓
        </div>
        <h2 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">Application prepared!</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Your Form 6 details are ready. Submit them at{" "}
          <a
            className="font-medium text-indigo-600 underline dark:text-indigo-400"
            href="https://voters.eci.gov.in"
            target="_blank"
            rel="noreferrer"
          >
            voters.eci.gov.in
          </a>{" "}
          to complete registration.
        </p>
        <div className="mt-6 inline-block rounded-2xl border border-dashed border-emerald-300 bg-white px-6 py-4 text-left dark:border-emerald-700 dark:bg-slate-800">
          <div className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Reference ID (mock)
          </div>
          <div className="text-lg font-bold tracking-wider text-slate-900 dark:text-white">{ref}</div>
        </div>
        <div className="mt-6 grid gap-3 text-left sm:grid-cols-2">
          <Info label="Name" value={form.name} />
          <Info label="Date of Birth" value={form.dob} />
          <Info label="State" value={form.state} />
          <Info label="District" value={form.district} />
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(0);
          }}
          className="mt-6 rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Voter Registration</h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          A guided 5-step wizard. We'll only ask what's relevant based on your answers.
        </p>
      </div>

      {/* Stepper */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition ${
                    i < step
                      ? "bg-emerald-500 text-white"
                      : i === step
                      ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/40"
                      : "bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500"
                  }`}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <div
                  className={`mt-1 hidden text-[11px] font-medium sm:block ${
                    i === step ? "text-indigo-700 dark:text-indigo-400" : "text-slate-500 dark:text-slate-500"
                  }`}
                >
                  {label}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 ${i < step ? "bg-emerald-500" : "bg-slate-100 dark:bg-slate-700"}`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800 sm:p-8">
        {step === 0 && (
          <div className="space-y-5">
            <Section title="Let's check your eligibility">
              First, a few quick questions to make sure registration is right for you.
            </Section>

            <YesNo
              label="Are you a citizen of India?"
              value={form.citizen}
              onChange={(v) => setForm({ ...form, citizen: v })}
            />
            {form.citizen === false && (
              <Alert kind="rose">
                Voter registration is only available for Indian citizens. NRIs holding an Indian
                passport may register as overseas electors using <strong>Form 6A</strong>.
              </Alert>
            )}

            <YesNo
              label="Are you already registered as a voter?"
              value={form.alreadyRegistered}
              onChange={(v) => setForm({ ...form, alreadyRegistered: v })}
            />
            {form.alreadyRegistered === true && (
              <Alert kind="amber">
                You're already on the rolls! If you've moved or need corrections, you should file{" "}
                <strong>Form 8</strong> instead. Use the <em>Voter ID Status</em> section to verify.
              </Alert>
            )}

            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Date of Birth</label>
              <input
                type="date"
                value={form.dob}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:border-indigo-600 dark:focus:bg-slate-700 dark:focus:ring-indigo-900/50"
              />
              {age !== null && (
                <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                  You are <strong>{age} years</strong> old.
                </div>
              )}
              {tooYoung && !willTurn18Soon && (
                <Alert kind="rose">
                  You must be at least 18 to register. Come back when you're older!
                </Alert>
              )}
              {willTurn18Soon && (
                <Alert kind="amber">
                  Almost there! You can pre-apply once you're within 3 months of turning 18.
                </Alert>
              )}
              {age !== null && age >= 18 && (
                <Alert kind="emerald">Great — you meet the age requirement. ✓</Alert>
              )}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-5">
            <Section title="Personal details">
              These will appear on your voter record exactly as entered.
            </Section>
            <Field
              label="Full name (as on ID proof)"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="e.g. Priya Sharma"
            />
            <YesNo
              label="Do you have an Aadhaar card?"
              value={form.hasAadhaar}
              onChange={(v) => setForm({ ...form, hasAadhaar: v })}
            />
            {form.hasAadhaar === true && (
              <Alert kind="sky">
                Linking Aadhaar with EPIC is voluntary (Form 6B) but speeds up verification.
              </Alert>
            )}
            {form.hasAadhaar === false && (
              <Alert kind="amber">
                No problem — you can use Passport, PAN, Driving Licence, or Class 10 marksheet
                instead. We'll show the full list in the Documents step.
              </Alert>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <Section title="Where do you live?">
              Your constituency is determined by your <strong>ordinary place of residence</strong>.
            </Section>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">State / UT</label>
              <select
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:border-indigo-600 dark:focus:bg-slate-700 dark:focus:ring-indigo-900/50"
              >
                <option value="">Select state…</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <Field
              label="District"
              value={form.district}
              onChange={(v) => setForm({ ...form, district: v })}
              placeholder="e.g. Bengaluru Urban"
            />
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Residential address</label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={3}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:border-indigo-600 dark:focus:bg-slate-700 dark:focus:ring-indigo-900/50"
                placeholder="House no., street, area, PIN"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <Section title="Documents you'll need">
              Based on your answers, here's exactly what you should keep ready.
            </Section>
            <DocList
              title="Identity proof (any one)"
              items={
                form.hasAadhaar
                  ? ["Aadhaar Card ✓ (you have one)", "Passport", "PAN Card", "Driving Licence"]
                  : ["Passport", "PAN Card", "Driving Licence", "Govt Service ID"]
              }
            />
            <DocList
              title="Age proof (any one)"
              items={[
                "Birth Certificate",
                "Class 10 Marksheet / Certificate",
                "Passport",
                ...(form.hasAadhaar ? ["Aadhaar Card"] : []),
              ]}
            />
            <DocList
              title="Address proof (any one)"
              items={[
                "Utility bill (last 1 year)",
                "Bank passbook with photo",
                "Registered rent agreement",
                "Indian passport",
              ]}
            />
            <DocList
              title="Mandatory"
              items={["1 recent passport-size colour photo (white background, JPEG <2MB)"]}
            />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <Section title="Review your details">
              Please confirm before we prepare your Form 6.
            </Section>
            <div className="grid gap-3 sm:grid-cols-2">
              <Info label="Name" value={form.name || "—"} />
              <Info label="Date of Birth" value={form.dob || "—"} />
              <Info label="Age" value={age !== null ? `${age} yrs` : "—"} />
              <Info label="Citizen of India" value={form.citizen ? "Yes" : "No"} />
              <Info label="State" value={form.state || "—"} />
              <Info label="District" value={form.district || "—"} />
              <Info
                label="Address"
                value={form.address || "—"}
                wide
              />
            </div>
            {!eligible && (
              <Alert kind="rose">
                Some required information is missing or you're not eligible. Please go back and
                review.
              </Alert>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-700">
          <button
            onClick={prev}
            disabled={step === 0}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
          >
            ← Back
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              disabled={!canAdvance(step, form)}
              className="rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition disabled:opacity-40"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={!eligible || !form.name || !form.state}
              className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition disabled:opacity-40"
            >
              Submit application ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function canAdvance(step: number, f: Form): boolean {
  if (step === 0) {
    const a = f.dob ? calcAge(f.dob) : null;
    return f.citizen === true && f.alreadyRegistered === false && a !== null && a >= 18;
  }
  if (step === 1) return f.name.trim().length > 1 && f.hasAadhaar !== null;
  if (step === 2) return Boolean(f.state && f.district && f.address);
  return true;
}

function calcAge(dob: string): number {
  const d = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - d.getFullYear();
  const m = today.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
  return age;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{children}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-indigo-600 dark:focus:bg-slate-700 dark:focus:ring-indigo-900/50"
      />
    </div>
  );
}

function YesNo({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div>
      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</div>
      <div className="mt-1.5 flex gap-2">
        {[
          { v: true, l: "Yes" },
          { v: false, l: "No" },
        ].map((opt) => (
          <button
            key={opt.l}
            type="button"
            onClick={() => onChange(opt.v)}
            className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
              value === opt.v
                ? "border-indigo-300 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-100 dark:border-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 dark:ring-indigo-800"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            {opt.l}
          </button>
        ))}
      </div>
    </div>
  );
}

function Alert({ kind, children }: { kind: "emerald" | "amber" | "rose" | "sky"; children: React.ReactNode }) {
  const map: Record<string, string> = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
    amber: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
    rose: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-300",
    sky: "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-300",
  };
  return <div className={`rounded-xl border px-3 py-2 text-xs ${map[kind]}`}>{children}</div>;
}

function DocList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/50">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</div>
      <ul className="mt-2 space-y-1.5">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Info({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-700/50 ${wide ? "sm:col-span-2" : ""}`}>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-0.5 text-sm font-medium text-slate-900 dark:text-white">{value}</div>
    </div>
  );
}
