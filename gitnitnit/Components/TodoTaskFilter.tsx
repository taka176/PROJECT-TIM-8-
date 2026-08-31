"use client";

import TaskItem, { Task } from "./TodoItemItem";

interface TaskListProps {
  tasks: Task[];
  ToggleTugas: (id: string) => void;
}

export default function TodoTaskFilter({ tasks, ToggleTugas }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-gray-400">
        Belum ada tugas di sini...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 my-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} ToggleTugas={ToggleTugas} />
      ))}
    </div>
  );
}
