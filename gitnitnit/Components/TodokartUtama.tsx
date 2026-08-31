"use client";

import { useState } from "react";
import TodoHeader from "./TodoHeader"; //Judul+sub
import TodoInputDlu from "./TodoInputDlu"; //KetikTask
import TodoTaskFilter from "./TodoTaskFilter"; //List2
import TodoTombolFilternya, { FilterStatus } from "./TodoTombolFilternya"; //Tombol pling bawah filter
import { Task } from "./TodoItemItem";

// Data boong2an awal
const initialTasks: Task[] = [
  { id: "1", text: "Contoh pertama", completed: false },
  { id: "2", text: "Contoh kedua", completed: false },
  { id: "3", text: "Send initial wireframes to client", completed: true },
];

// hastg1
export default function TodokartUtama() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const tambahinTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  // hashtg2
  const ToggleTugas = (id: string) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  // tiga3
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // 4
  const remainingCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-100/50">
      {/* 1. Header Dinamis */}
      <TodoHeader
        Judul="Apa fokusmu hari ini?"
        Deskripsi="Mari selesaikan satu per satu."
      />

      {/* 2. Form Input Tugas */}
      <TodoInputDlu TambahinTask={tambahinTask} />

      {/* 3. Daftar Tugas */}
      <TodoTaskFilter tasks={filteredTasks} ToggleTugas={ToggleTugas} />

      {/* 4. Footer & Filter */}
      <TodoTombolFilternya
        remainingCount={remainingCount}
        currentFilter={filter}
        setFilter={setFilter}
      />
    </div>
  );
}
