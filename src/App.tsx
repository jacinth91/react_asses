import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import TaskList from "./components/TaskList";
import NewTaskPanel from "./components/NewTaskPanel";
import { loadAppData, saveAppData } from "./state/storage";
import { seedData } from "./state/mockData";
import type { AppData, Priority, Task, TaskDraft } from "./types/model";

export default function AppShell() {
 
  const [selectedProject, setSelectedProject] = useState<string>("Work");
  const [search, setSearch] = useState<string>("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [mobilePanelOpen, setMobilePanelOpen] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(true);


  const [projects, setProjects] = useState<string[]>(seedData.projects);
  const [labels, setLabels] = useState(seedData.labels);
  const [tasks, setTasks] = useState<Task[]>(seedData.tasks);


  useEffect(() => {
    const loaded = loadAppData();
    if (loaded) {
      setProjects(loaded.projects);
      setLabels(loaded.labels);
      setTasks(loaded.tasks);

     
      const first = loaded.projects?.[0] ?? "Work";
      setSelectedProject(first);
    }
  }, []);

 
  useEffect(() => {
    const data: AppData = { tasks, projects, labels };
    saveAppData(data);
  }, [tasks, projects, labels]);

 
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
    console.log("dark mode is", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  
    console.log("HTML class:", root.className);
  }, [darkMode]);
  
  const visibleTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks
      .filter((t) => t.project === selectedProject)
      .filter((t) => (q ? t.title.toLowerCase().includes(q) : true));
  }, [tasks, selectedProject, search]);


  function addTask(draft: TaskDraft) {
    const title = draft.title.trim();
    if (!title) return;

    const newTask: Task = {
      id: uuid(),
      title,
      completed: false,
      dueDate: draft.dueDate ?? null,
      tag: draft.tag ?? "",
      priority: (draft.priority ?? "none") as Priority,
      notes: draft.notes ?? "",
      project: selectedProject,
      createdAt: Date.now(),
      subtasks: (draft.subtasks ?? [])
        .filter((s) => s.title.trim())
        .map((s) => ({
          id: uuid(),
          title: s.title.trim(),
          completed: !!s.completed,
        })),
    };

    setTasks((prev) => [newTask, ...prev]);
    setMobilePanelOpen(false);
  }

  function toggleTaskDone(taskId: string) {
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTask(taskId: string) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setEditingTaskId((cur) => (cur === taskId ? null : cur));
  }

  function updateTaskTitle(taskId: string, title: string) {
    const next = title.trim();
    if (!next) return;
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, title: next } : t)));
    setEditingTaskId(null);
  }

  
  function addSubtask(taskId: string, title: string) {
    const next = title.trim();
    if (!next) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, subtasks: [...t.subtasks, { id: uuid(), title: next, completed: false }] }
          : t
      )
    );
  }

  function toggleSubtask(taskId: string, subtaskId: string) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.map((s) => (s.id === subtaskId ? { ...s, completed: !s.completed } : s)),
            }
          : t
      )
    );
  }

  function deleteSubtask(taskId: string, subtaskId: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, subtasks: t.subtasks.filter((s) => s.id !== subtaskId) } : t))
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
     <div className="p-3 rounded-xl bg-white text-black dark:bg-black dark:text-white">
  If this doesn’t flip, dark mode isn’t toggling.
</div>
     <div className="lg:hidden sticky top-0 z-30 backdrop-blur
                bg-white/70 border-b border-zinc-200
                dark:bg-zinc-950/60 dark:border-white/10">

        <div className="flex items-center justify-between px-4 py-3">
          <button
            className="px-3 py-2 rounded-lg
            bg-zinc-200 hover:bg-zinc-300
            dark:bg-white/10 dark:hover:bg-white/15"
            onClick={() => setMobileSidebarOpen(true)}
          >
            ☰
          </button>
          <div className="font-semibold">Todo List</div>
          <button
            className="px-3 py-2 rounded-lg
            bg-zinc-200 hover:bg-zinc-300
            dark:bg-white/10 dark:hover:bg-white/15"
            onClick={() => setMobilePanelOpen(true)}
          >
            ＋
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_360px] gap-4">
          <SideBar
            projects={projects}
            labels={labels}
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
            darkMode={darkMode}
            onToggleDark={() => {
              console.log("tootgle is clicked");
              setDarkMode((v) => !v)}}
            mobileOpen={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />

<main
  className="rounded-2xl border border-zinc-200 bg-white p-4
             dark:border-white/10 dark:bg-white/5 dark:backdrop-blur"
>
            <TopBar search={search} onSearchChange={setSearch} />
            <TaskList
              tasks={visibleTasks}
              editingTaskId={editingTaskId}
              onStartEdit={setEditingTaskId}
              onStopEdit={() => setEditingTaskId(null)}
              onToggleDone={toggleTaskDone}
              onDelete={deleteTask}
              onSaveTitle={updateTaskTitle}
              // optional subtask ops if you later want subtasks inside cards
              onAddSubtask={addSubtask}
              onToggleSubtask={toggleSubtask}
              onDeleteSubtask={deleteSubtask}
            />
          </main>

          {/* Desktop right panel */}
          <div className="hidden lg:block">
            <NewTaskPanel selectedProject={selectedProject} onAddTask={addTask} onCloseMobile={() => {}} />
          </div>
        </div>
      </div>

      {/* Mobile new task drawer */}
      {mobilePanelOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60" onClick={() => setMobilePanelOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-md p-4" onClick={(e) => e.stopPropagation()}>
            <NewTaskPanel selectedProject={selectedProject} onAddTask={addTask} onCloseMobile={() => setMobilePanelOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
