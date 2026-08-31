"use client";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  ToggleTugas: (id: string) => void;
}

export default function TodoItemItem({ task, ToggleTugas }: TaskItemProps) {
  return (
    <div className="flex items-center gap-3 p-4 bg-stone-50/70 rounded-2xl mb-2 transition-all hover:bg-stone-100">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => ToggleTugas(task.id)}
        className="w-5 h-5 accent-indigo-600 cursor-pointer rounded-md border-gray-300"
      />
      <span
        className={`text-sm select-none ${
          task.completed ? "text-gray-400 line-through" : "text-gray-700"
        }`}
      >
        {task.text}
      </span>
    </div>
  );
}
