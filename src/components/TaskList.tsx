import type { Task } from "../types/model";
import TaskCard from "./TaskCard";

type Props = {
  tasks: Task[];
  editingTaskId: string | null;
  onStartEdit: (id: string) => void;
  onStopEdit: () => void;

  onToggleDone: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onSaveTitle: (taskId: string, title: string) => void;

  // not used in UI yet (kept for easy extension)
  onAddSubtask: (taskId: string, title: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onDeleteSubtask: (taskId: string, subtaskId: string) => void;
};

export default function TaskList({
  tasks,
  editingTaskId,
  onStartEdit,
  onStopEdit,
  onToggleDone,
  onDelete,
  onSaveTitle,
}: Props) {
  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className="text-sm text-zinc-400">No tasks found.</div>
      ) : (
        tasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            editing={editingTaskId === t.id}
            onStartEdit={() => onStartEdit(t.id)}
            onStopEdit={onStopEdit}
            onToggleDone={() => onToggleDone(t.id)}
            onDelete={() => onDelete(t.id)}
            onSaveTitle={(title) => onSaveTitle(t.id, title)}
          />
        ))
      )}
    </div>
  );
}
