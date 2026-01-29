import { useMemo, useState } from "react";
import type { Priority, TaskDraft } from "../types/model";
import SubtasksEditor from "./SubtasksEditor";
import CalendarWidget from "./CalenderWidget";

type DraftSubtask = { title: string; completed?: boolean };

type Props = {
  selectedProject: string;
  onAddTask: (draft: TaskDraft) => void;
  onCloseMobile: () => void; // used in mobile drawer
};

export default function NewTaskPanel({ selectedProject, onAddTask, onCloseMobile }: Props) {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("Tag");
  const [priority, setPriority] = useState<Priority>("none");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [subtasks, setSubtasks] = useState<DraftSubtask[]>([{ title: "Add a new subtask", completed: true }]);


  function toYMD(d: Date) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  
  function fromYMD(ymd: string) {
    console.log(ymd,'&&&&&&')
    const [y, m, d] = ymd.split("-").map(Number);
    return new Date(y, m - 1, d); // local date, no UTC shift
  }  


  const canAdd = useMemo(() => title.trim().length > 0, [title]);

  const tagSelected = !!tag.trim()
  const prioritySelected = priority !== "none";
  const dueSelected = !!dueDate;

  const tagBtnClass = tagSelected
    ? "bg-emerald-500/30 border-emerald-400/60 ring-1 ring-emerald-400/60"
    : "bg-emerald-500/15 border-emerald-400/30 hover:bg-emerald-500/20";

  const priorityBtnClass = prioritySelected
    ? "bg-amber-500/30 border-amber-400/60 ring-1 ring-amber-400/60"
    : "bg-amber-500/15 border-amber-400/30 hover:bg-amber-500/20";

  const dueBtnClass = dueSelected
    ? "bg-white/20 border-white/30 ring-1 ring-white/60"
    : "bg-white/10 border-white/10 hover:bg-white/15";

  function add() {
    if (!canAdd) return;
    onAddTask({
      title,
      tag,
      priority,
      notes,
      dueDate,
      subtasks,
    });

    setTitle("");
    setNotes("");
    setDueDate(null);
    setSubtasks([]);
  }

  return (
    <aside className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold">New Task</div>
        <button className="lg:hidden w-9 h-9 rounded-xl bg-white/10 hover:bg-white/15" onClick={onCloseMobile}>
          ✕
        </button>
      </div>

      <div className="text-xs text-zinc-400 mb-2">Project: {selectedProject}</div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Name..."
        className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 outline-none"
      />

      <div className="flex items-center gap-2 mt-3">
        <button
          className={`px-3 py-2 rounded-xl bg-emerald-500/20 border  text-sm ${tagBtnClass} `}
          onClick={() => setTag((t) => (t ? "" : "Tag"))}
        >
          + Tag
        </button>

        <button
          className={`px-3 py-2 rounded-xl bg-amber-500/20 border  text-sm ${priorityBtnClass}`}
          onClick={() => setPriority((p) => (p === "high" ? "none" : "high"))}
        >
          Priority
        </button>

        <button
          className={`px-3 py-2 rounded-xl bg-white/10 border text-sm  ${dueBtnClass}`}
          onClick={() => setDueDate(new Date(Date.now() + 86400000).toISOString())}
          title="Set due date to tomorrow"
        >
          Due
        </button>
      </div>

      <div className="mt-4">
        <div className="text-xs uppercase tracking-wider text-zinc-400 mb-2">Subtasks</div>
        <SubtasksEditor value={subtasks} onChange={setSubtasks} />
      </div>

      <div className="mt-4">
        <div className="text-xs uppercase tracking-wider text-zinc-400 mb-2">Note</div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Here your note here."
          className="w-full min-h-[90px] rounded-xl border border-white/10 bg-black/20 px-3 py-2 outline-none text-sm"
        />
      </div>

      <div className="mt-4">
  <div className="text-xs uppercase tracking-wider text-zinc-400 mb-2">Calendar</div>

  <CalendarWidget
  selectedDate={dueDate ? fromYMD(dueDate) : null}
  onSelectDate={(date) => setDueDate(toYMD(date))}
/>


  <div className="mt-2 text-xs text-zinc-400">
    Selected date:{" "}
    <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
      {dueDate ? new Date(dueDate).toDateString() : "None"}
    </span>
  </div>
</div>

      <button
        disabled={!canAdd}
        onClick={add}
        className={`mt-4 w-full px-3 py-2 rounded-xl text-sm font-semibold ${
          canAdd ? "bg-white/15 hover:bg-white/20" : "bg-white/5 text-zinc-500 cursor-not-allowed"
        }`}
      >
        Add Task
      </button>
    </aside>
  );
}
