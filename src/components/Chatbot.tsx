import { useEffect, useRef, useState } from "react";
import type { UserContext } from "../App";
import { FAQS } from "../data";

type Msg = { role: "bot" | "user"; text: string; chips?: { label: string; value: string }[] };

type Props = {
  user: UserContext;
  setUser: (u: UserContext) => void;
};

// Rule-based smart intent detection. In production this would call Gemini /
// Vertex AI via the Google Cloud APIs — the same prompt-routing logic applies.
function detectIntent(text: string): string {
  const t = text.toLowerCase();
  if (/(register|enroll|sign up|new voter|form 6)/.test(t)) return "register";
  if (/(epic|voter id|card|status|track)/.test(t)) return "status";
  if (/(how.*vote|polling|booth|evm|vvpat|voting process)/.test(t)) return "process";
  if (/(date|when|timeline|schedule|polling day)/.test(t)) return "timeline";
  if (/(document|carry|proof|id|aadhaar|passport)/.test(t)) return "documents";
  if (/(age|eligib|18|old enough)/.test(t)) return "age";
  if (/(nota|reject|none of)/.test(t)) return "nota";
  if (/(nri|abroad|overseas)/.test(t)) return "nri";
  if (/(postal|absentee|away)/.test(t)) return "postal";
  if (/(faq|help|what can you)/.test(t)) return "help";
  if (/(hi|hello|hey|namaste)/.test(t)) return "greet";
  return "search";
}

function answer(intent: string, query: string, user: UserContext): Msg {
  switch (intent) {
    case "greet":
      return {
        role: "bot",
        text: `Hello${user.name ? `, ${user.name}` : ""}! 👋 I'm VoteWise. I can help with voter registration, EPIC status, polling-day steps, election dates, and more. What would you like to do?`,
        chips: [
          { label: "Register to vote", value: "How do I register?" },
          { label: "Check my EPIC", value: "Check my voter ID status" },
          { label: "Voting process", value: "How does voting work at the booth?" },
        ],
      };
    case "register": {
      const personal =
        user.age !== null && user.age < 18
          ? `\n\nNote: You mentioned you're ${user.age}. You can pre-apply once you're within 3 months of turning 18.`
          : "";
      return {
        role: "bot",
        text:
          `To register, you'll need to fill **Form 6** on voters.eci.gov.in. The process takes ~10 minutes online.\n\n` +
          `1. Create an account on voters.eci.gov.in\n` +
          `2. Submit Form 6 with proof of age, identity & address\n` +
          `3. Track your reference ID (BLO may visit for verification)\n` +
          `4. Receive your EPIC by post in 2–4 weeks` + personal,
        chips: [
          { label: "Open guided wizard", value: "open:registration" },
          { label: "What documents?", value: "What documents do I need to register?" },
        ],
      };
    }
    case "status":
      return {
        role: "bot",
        text:
          `You can check your EPIC status in two ways:\n\n` +
          `• **By EPIC number** — at electoralsearch.eci.gov.in\n` +
          `• **By personal details** — name, DOB, state, district\n\n` +
          `For an application you've submitted, use your reference ID at voters.eci.gov.in → "Track Application".`,
        chips: [{ label: "Open status checker", value: "open:status" }],
      };
    case "process":
      return {
        role: "bot",
        text:
          `Polling day is straightforward:\n\n` +
          `1. Reach your assigned booth (find via voters.eci.gov.in)\n` +
          `2. ID verification by polling officers\n` +
          `3. Indelible ink on left index finger\n` +
          `4. Sign register & receive slip\n` +
          `5. Press the blue button on the EVM next to your candidate (or NOTA)\n` +
          `6. Verify the VVPAT slip (visible 7 seconds)\n\n` +
          `Total time: usually 10–20 minutes.`,
        chips: [{ label: "See full step-by-step", value: "open:voting" }],
      };
    case "timeline":
      return {
        role: "bot",
        text:
          `An Indian general election typically follows this schedule:\n\n` +
          `📢 Announcement — ~2 months before polling\n` +
          `📜 Notification & nominations — ~4 weeks before\n` +
          `📣 Campaigning — until 48 hours before polling\n` +
          `🗳️ Polling day — 7 AM to 6 PM (varies by state)\n` +
          `📊 Counting — usually 3 days after final phase`,
        chips: [{ label: "View timeline visual", value: "open:timeline" }],
      };
    case "documents": {
      const ctx = user.registered
        ? `Since you're already registered, on polling day you just need **one** photo ID — preferably your EPIC, or Aadhaar/Passport/DL/PAN.`
        : `For **registration**, you need: 1 photo, age proof (birth cert / class 10 marksheet / passport), identity proof (Aadhaar / PAN / passport) and address proof (utility bill / bank passbook / rent agreement).`;
      return {
        role: "bot",
        text: ctx,
        chips: [{ label: "Open documents checker", value: "open:documents" }],
      };
    }
    case "age":
      if (user.age !== null) {
        return {
          role: "bot",
          text:
            user.age >= 18
              ? `Yes — at ${user.age}, you are eligible to vote in India. ✅`
              : `You're ${user.age}. The minimum voting age is 18 (on the qualifying date — 1 Jan of the year).`,
        };
      }
      return {
        role: "bot",
        text: `The minimum voting age in India is **18 years** on the qualifying date (1 January of the year of revision).`,
      };
    case "nota":
      return {
        role: "bot",
        text: `**NOTA** (None Of The Above) is the last button on every EVM. It lets you formally reject all candidates while still casting your vote — protecting your secrecy.`,
      };
    case "nri":
      return {
        role: "bot",
        text: `NRIs can register as **overseas electors** using **Form 6A** with passport details. Currently NRIs must vote in person at their registered constituency in India.`,
      };
    case "postal":
      return {
        role: "bot",
        text: `Postal ballots are available for: armed forces, government employees on election duty, voters above 85, and persons with disabilities. Apply via Form 12 / 12D.`,
      };
    case "help":
      return {
        role: "bot",
        text: `I can help with: voter registration, EPIC/voter-ID status, what happens at the polling booth, election timeline, required documents, NOTA, postal ballots, and more. Just ask!`,
        chips: [
          { label: "How do I register?", value: "How do I register?" },
          { label: "What documents?", value: "What documents do I need?" },
          { label: "Voting process", value: "How does voting work?" },
        ],
      };
    case "search":
    default: {
      // Search FAQs
      const tokens = query.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
      const scored = FAQS.map((f) => {
        const hay = (f.q + " " + f.a + " " + f.tags.join(" ")).toLowerCase();
        const score = tokens.reduce((s, t) => s + (hay.includes(t) ? 1 : 0), 0);
        return { f, score };
      })
        .filter((x) => x.score > 0)
        .sort((a, b) => b.score - a.score);

      if (scored.length === 0) {
        return {
          role: "bot",
          text: `I'm not sure I caught that. Could you rephrase, or pick one of these?`,
          chips: [
            { label: "Register to vote", value: "How do I register?" },
            { label: "Documents needed", value: "What documents do I need?" },
            { label: "Polling process", value: "How does voting work?" },
            { label: "Timeline", value: "What is the election timeline?" },
          ],
        };
      }
      const top = scored[0].f;
      return {
        role: "bot",
        text: `**${top.q}**\n\n${top.a}`,
        chips: scored.slice(1, 3).map((s) => ({ label: s.f.q, value: s.f.q })),
      };
    }
  }
}

export default function Chatbot({ user, setUser }: Props) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: `Hi${user.name ? `, ${user.name}` : ""}! I'm VoteWise — your election assistant. Ask me anything, or pick a quick action below.`,
      chips: [
        { label: "How do I register?", value: "How do I register?" },
        { label: "Check voter ID status", value: "Check my voter ID status" },
        { label: "What documents?", value: "What documents do I need?" },
        { label: "Voting process", value: "How does voting work?" },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    // navigation chips
    if (trimmed.startsWith("open:")) {
      const target = trimmed.slice(5);
      window.dispatchEvent(new CustomEvent("votewise:navigate", { detail: target }));
      return;
    }

    // simple "set context" detection — name, age, state
    const ageMatch = trimmed.match(/i(?:'m| am)\s+(\d{1,3})\s*(?:years|yrs)?/i);
    if (ageMatch) {
      const age = parseInt(ageMatch[1], 10);
      if (age > 0 && age < 130) setUser({ ...user, age });
    }
    const nameMatch = trimmed.match(/(?:my name is|i am|i'm)\s+([A-Z][a-z]+)/);
    if (nameMatch && !ageMatch) setUser({ ...user, name: nameMatch[1] });

    const userMsg: Msg = { role: "user", text: trimmed };
    const botMsg = answer(detectIntent(trimmed), trimmed, user);
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput("");
  }

  return (
    <div className="flex h-[calc(100vh-9rem)] flex-col rounded-3xl border border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 dark:border-slate-700">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg shadow-md shadow-indigo-200 dark:shadow-indigo-900/40">
          🤖
        </div>
        <div>
          <div className="text-sm font-bold text-slate-900 dark:text-white">VoteWise Assistant</div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Online · context-aware
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={m.role === "user" ? "max-w-[85%]" : "max-w-[85%] space-y-2"}>
              <div
                className={
                  m.role === "user"
                    ? "rounded-2xl rounded-br-md bg-gradient-to-br from-indigo-600 to-violet-600 px-4 py-2.5 text-sm text-white shadow-sm"
                    : "rounded-2xl rounded-bl-md bg-slate-100 px-4 py-2.5 text-sm whitespace-pre-line text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                }
              >
                {renderRich(m.text)}
              </div>
              {m.chips && m.chips.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {m.chips.map((c, j) => (
                    <button
                      key={j}
                      onClick={() => send(c.value)}
                      className="rounded-full border border-indigo-200 bg-white px-3 py-1 text-xs font-medium text-indigo-700 transition hover:bg-indigo-50 dark:border-indigo-700 dark:bg-slate-800 dark:text-indigo-400 dark:hover:bg-slate-700"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-slate-100 p-4 dark:border-slate-700"
      >
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:focus-within:border-indigo-600 dark:focus-within:bg-slate-700 dark:focus-within:ring-indigo-900/50">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about elections, registration, or voting…"
            className="flex-1 bg-transparent px-2 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-200 dark:placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition disabled:opacity-40"
          >
            Send
          </button>
        </div>
        <div className="mt-2 px-1 text-[11px] text-slate-400 dark:text-slate-500">
          Try: "I'm 22, how do I register?" · "What's NOTA?" · "When is polling day?"
        </div>
      </form>
    </div>
  );
}

function renderRich(text: string) {
  // bold **xx** support
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={i} className="font-semibold">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{p}</span>
    ),
  );
}
