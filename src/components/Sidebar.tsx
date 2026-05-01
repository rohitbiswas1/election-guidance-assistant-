import { cn } from "../utils/cn";

export type Module =
  | "home"
  | "chat"
  | "registration"
  | "status"
  | "voting"
  | "timeline"
  | "documents"
  | "faq";

const NAV: { id: Module; label: string; icon: string; desc: string }[] = [
  { id: "home", label: "Dashboard", icon: "🏠", desc: "Your election hub" },
  { id: "chat", label: "Ask VoteWise", icon: "💬", desc: "Smart assistant" },
  { id: "registration", label: "Register to Vote", icon: "✍️", desc: "Guided wizard" },
  { id: "status", label: "Voter ID Status", icon: "🆔", desc: "Check EPIC" },
  { id: "voting", label: "Voting Process", icon: "🗳️", desc: "Step-by-step" },
  { id: "timeline", label: "Election Timeline", icon: "📅", desc: "Key dates" },
  { id: "documents", label: "Required Documents", icon: "📄", desc: "What to carry" },
  { id: "faq", label: "FAQs", icon: "❓", desc: "Common questions" },
];

type Props = {
  active: Module;
  onChange: (m: Module) => void;
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ active, onChange, open, onClose }: Props) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 transform border-r border-slate-200 bg-white/95 backdrop-blur-xl transition-all duration-300 lg:static lg:translate-x-0 dark:border-slate-700 dark:bg-slate-900/95",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6 dark:border-slate-700">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl shadow-md shadow-indigo-200 dark:shadow-indigo-900/40">
            🗳️
          </div>
          <div>
            <div className="text-base font-bold tracking-tight text-slate-900 dark:text-white">VoteWise</div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Election Assistant
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onChange(item.id);
                onClose();
              }}
              className={cn(
                "group flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-all",
                active === item.id
                  ? "bg-gradient-to-r from-indigo-50 to-violet-50 shadow-sm ring-1 ring-indigo-100 dark:from-indigo-950/50 dark:to-violet-950/50 dark:ring-indigo-800"
                  : "hover:bg-slate-50 dark:hover:bg-slate-800",
              )}
            >
              <div
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg transition",
                  active === item.id
                    ? "bg-white shadow-sm ring-1 ring-indigo-100 dark:bg-slate-800 dark:ring-indigo-800"
                    : "bg-slate-100 group-hover:bg-white dark:bg-slate-800 dark:group-hover:bg-slate-700",
                )}
              >
                {item.icon}
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div
                  className={cn(
                    "text-sm font-semibold",
                    active === item.id ? "text-indigo-700 dark:text-indigo-400" : "text-slate-700 dark:text-slate-300",
                  )}
                >
                  {item.label}
                </div>
                <div className="truncate text-xs text-slate-500 dark:text-slate-500">{item.desc}</div>
              </div>
            </button>
          ))}
        </nav>

        <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 p-4 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40">
          <div className="text-xs font-medium uppercase tracking-wider opacity-80">
            Powered by
          </div>
          <div className="mt-1 text-sm font-semibold">Election Commission of India</div>
          <div className="mt-2 text-[11px] opacity-90">
            Information sourced from official ECI guidelines.
          </div>
        </div>
      </aside>
    </>
  );
}
