import type { JSX } from "react";
import type { Label } from "../types/model";
import { Briefcase, User, ShoppingBag, Tag } from "lucide-react";

type Props = {
  projects: string[];
  labels: Label[];
  selectedProject: string;
  onSelectProject: (p: string) => void;

  darkMode: boolean;
  onToggleDark: () => void;

  mobileOpen: boolean;
  onCloseMobile: () => void;
};

export default function SideBar({
  projects,
  labels,
  selectedProject,
  onSelectProject,
  darkMode,
  onToggleDark,
  mobileOpen,
  onCloseMobile,
}: Props) {
  const base =
    "rounded-2xl border border-zinc-200 bg-white p-4 " +
    "dark:border-white/10 dark:bg-white/5 dark:backdrop-blur";

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`hidden lg:block ${base}`}>
        <Content />
      </aside>

      {/* Tablet placeholder */}
      <aside className={`hidden md:block lg:hidden ${base}`}>
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          Sidebar collapsed (tablet)
        </div>
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60"
          onClick={onCloseMobile}
        >
          <div
            className="absolute left-0 top-0 h-full w-[280px] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={base}>
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold">Todo List</div>
                <button
                  onClick={onCloseMobile}
                  className="w-9 h-9 rounded-xl
                             bg-zinc-200 hover:bg-zinc-300
                             dark:bg-white/10 dark:hover:bg-white/15"
                >
                  ✕
                </button>
              </div>
              <Content />
            </div>
          </div>
        </div>
      )}
    </>
  );

  function Content() {
    const projectIcon: Record<string, JSX.Element> = {
      Work: <Briefcase className="w-4 h-4" />,
      Personal: <User className="w-4 h-4" />,
      Shopping: <ShoppingBag className="w-4 h-4" />,
    };

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="font-semibold text-lg">Todo List</div>
          <button
            className="w-8 h-8 rounded-lg
                       bg-zinc-200 hover:bg-zinc-300
                       dark:bg-white/10 dark:hover:bg-white/15"
            title="Add project"
          >
            +
          </button>
        </div>

        {/* Projects */}
        <div>
          <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Projects
          </div>
          <div className="space-y-1">
            {projects.map((p) => {
              const active = selectedProject === p;

              return (
                <button
                  key={p}
                  onClick={() => onSelectProject(p)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm
                    text-zinc-900 dark:text-zinc-100
                    ${
                      active
                        ? "bg-zinc-100 dark:bg-white/10"
                        : "hover:bg-zinc-100 dark:hover:bg-white/5"
                    }`}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center
                               bg-zinc-100 text-zinc-700
                               dark:bg-white/10 dark:text-zinc-100"
                  >
                    {projectIcon[p] ?? <Tag className="w-4 h-4" />}
                  </span>
                  <span>{p}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Labels */}
        <div>
          <div className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Labels
          </div>
          <div className="space-y-2">
            {labels.map((l) => (
              <div
                key={l.name}
                className="flex items-center gap-2 text-sm
                           text-zinc-700 dark:text-zinc-300"
              >
                <span className={`w-3 h-3 rounded-full ${l.colorClass}`} />
                <span>{l.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Theme toggle */}
        <button
          onClick={onToggleDark}
          className="w-full px-3 py-2 rounded-xl text-sm
                     bg-zinc-200 hover:bg-zinc-300
                     dark:bg-white/10 dark:hover:bg-white/15"
        >
          Toggle {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    );
  }
}
