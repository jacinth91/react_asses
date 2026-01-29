import { useEffect, useState } from "react";
import type { Task } from "../types/model";
import { formatRelative, isOverdue } from "../utils/dates";

type Props = {
  task: Task;
  editing: boolean;

  onToggleDone: () => void;
  onDelete: () => void;

  onStartEdit: () => void;
  onStopEdit: () => void;
  onSaveTitle: (title: string) => void;
};

export default function TaskCard({
  task,
  editing,
  onToggleDone,
  onDelete,
  onStartEdit,
  onStopEdit,
  onSaveTitle,
}: Props) {
  const [draft, setDraft] = useState(task.title);

  useEffect(() => {
    setDraft(task.title);
  }, [task.title]);

  const overdue = isOverdue(task.dueDate);

  function save() {
    onSaveTitle(draft);
  }

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-3 flex items-center justify-between gap-3 ${
        overdue ? "ring-1 ring-rose-400/60" : ""
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <input type="checkbox" checked={task.completed} onChange={onToggleDone} className="accent-white" />

        <div className="min-w-0">
          {editing ? (
            <div className="flex items-center gap-2">
              <input
                className="bg-black/30 border border-white/10 rounded-lg px-2 py-1 text-sm w-[260px] max-w-full outline-none"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") save();
                  if (e.key === "Escape") onStopEdit();
                }}
                autoFocus
              />
              <button className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs" onClick={save}>
                Save
              </button>
            </div>
          ) : (
            <button
              onDoubleClick={onStartEdit}
              className={`text-left w-full truncate ${task.completed ? "line-through text-zinc-400" : ""}`}
              title="Double click to edit"
            >
              {task.title}
            </button>
          )}

          {task.dueDate && (
            <div className={`text-xs mt-1 ${overdue ? "text-rose-300" : "text-zinc-400"}`}>
              Due {formatRelative(task.dueDate)}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {task.priority !== "none" && (
          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30">
            {task.priority.toUpperCase()}
          </span>
        )}
        {task.tag && (
          <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 border border-amber-400/30">
            {task.tag}
          </span>
        )}

        <button
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
          onClick={onStartEdit}
          title="Edit"
        >
          ✎
        </button>

        <button
          className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10"
          onClick={onDelete}
          title="Delete"
        >
          🗑
        </button>

        <button className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10" title="Options">
          ⋯
        </button>
      </div>
    </div>
  );
}
