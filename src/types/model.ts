export type Priority = "none" | "low" | "medium" | "high";

export type Label = {
  name: string;
  colorClass: string; // tailwind class
};

export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string | null; // ISO
  tag: string;
  priority: Priority;
  notes: string;
  project: string;
  createdAt: number;
  subtasks: Subtask[];
};

export type TaskDraft = {
  title: string;
  tag?: string;
  priority?: Priority;
  dueDate?: string | null;
  notes?: string;
  subtasks?: { title: string; completed?: boolean }[];
};

export type AppData = {
  tasks: Task[];
  projects: string[];
  labels: Label[];
};
