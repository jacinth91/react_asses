import type { AppData } from "../types/model";

export const seedData: AppData = {
  projects: ["Work", "Personal", "Shopping"],
  labels: [
    { name: "Work", colorClass: "bg-emerald-400" },
    { name: "Personal", colorClass: "bg-cyan-400" },
    { name: "Shopping", colorClass: "bg-orange-400" },
    { name: "Grant", colorClass: "bg-amber-400" },
  ],
  tasks: [
    {
      id: "t1",
      title: "Add a task tweak to cart",
      completed: true,
      dueDate: new Date(Date.now() + 60_000).toISOString(),
      tag: "Tag",
      priority: "high",
      notes: "",
      project: "Work",
      createdAt: Date.now(),
      subtasks: [{ id: "s1", title: "Add a new subtask", completed: true }],
    },
    {
      id: "t2",
      title: "Add a task card to network",
      completed: false,
      dueDate: null,
      tag: "Tag",
      priority: "none",
      notes: "",
      project: "Work",
      createdAt: Date.now(),
      subtasks: [],
    },
  ],
};
