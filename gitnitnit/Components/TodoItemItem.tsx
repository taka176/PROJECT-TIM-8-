"use client";

import { updateStatusTodos } from "@/action/todos.action";
import { TodoStatus } from "@/lib/todos.service";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  status: TodoStatus;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, status: TodoStatus) => void;
}

export default function TodoItemItem({ task, onToggle }: TaskItemProps) {
  const handleToggle = async () => {
    const newStatus: TodoStatus = task.completed ? "in progres" : "done";

    const result = await updateStatusTodos(task.id, newStatus);
    if (result.success) {
      onToggle(task.id, newStatus)
    }

    console.log(result);
  };
  return (
    <div className="flex items-center gap-3 p-4 bg-stone-50/70 rounded-2xl mb-2 transition-all hover:bg-stone-100">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
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
