import { useState } from "react";

type DraftSubtask = { title: string; completed?: boolean };

type Props = {
  value: DraftSubtask[];
  onChange: (next: DraftSubtask[]) => void;
};

export default function SubtasksEditor({ value, onChange }: Props) {
  const [draft, setDraft] = useState("");

  function add() {
    const t = draft.trim();
    if (!t) return;
    onChange([...value, { title: t, completed: false }]);
    setDraft("");
  }

  return (
    <div className="space-y-2">
      {value.map((s, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={!!s.completed}
            onChange={() => {
              const next = value.slice();
              next[idx] = { ...next[idx], completed: !next[idx].completed };
              onChange(next);
            }}
            className="accent-white"
          />
          <input
            value={s.title}
            onChange={(e) => {
              const next = value.slice();
              next[idx] = { ...next[idx], title: e.target.value };
              onChange(next);
            }}
            className="w-full rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-sm outline-none"
          />
          <button
            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs"
            onClick={() => onChange(value.filter((_, i) => i !== idx))}
            title="Remove"
          >
            ✕
          </button>
        </div>
      ))}

      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add the subtask"
          className="w-full rounded-lg border border-white/10 bg-black/20 px-2 py-2 text-sm outline-none"
          onKeyDown={(e) => e.key === "Enter" && add()}
        />
        <button className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm" onClick={add}>
          +
        </button>
      </div>
    </div>
  );
}
