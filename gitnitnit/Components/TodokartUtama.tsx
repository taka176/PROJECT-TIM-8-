"use client";

import { useState, useEffect } from "react";
import TodoHeader from "./TodoHeader"; //Judul+sub
import TodoInputDlu from "./TodoInputDlu"; //KetikTask
import TodoTaskFilter from "./TodoTaskFilter"; //List2
import TodoTombolFilternya, { FilterStatus } from "./TodoTombolFilternya"; //Tombol pling bawah filter
import { Task } from "./TodoItemItem";
import TodoItemItem from "./TodoItemItem";
import { TodoStatus } from "@/lib/todos.service";
import { getAllData } from "@/action/todos.action";
import { getDataByStatus } from "@/action/todos.action";

// Data boong2an awal
// const initialTasks: Task[] = [
//   { id: "1", text: "Contoh pertama", completed: false },
//   { id: "2", text: "Contoh kedua", completed: false },
//   { id: "3", text: "Send initial wireframes to client", completed: true },
// ];

// hastg1

type dataTodos = {
  id: number;
  todos: string;
  status: TodoStatus;
  createdAT: string;
};

export default function TodokartUtama() {
  // const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TodoStatus>("in progres");
  const [message, setMessage] = useState("");
  // const tambahinTask = (text: string) => {

  //   const newTask: Task = {
  //     id: Date.now().toString(),
  //     text,
  //     completed: false,
  //   };
  //   setTasks([newTask, ...tasks]);
  // };

  // hashtg2
  // const ToggleTugas = (id: string) => {
  //   setTasks(
  //     tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
  //   );
  // };

  // tiga3
  // const filteredTasks = tasks.filter((task) => {
  //   if (filter === "active") return !task.completed;
  //   if (filter === "completed") return task.completed;
  //   return true;
  // });

  // 4
  // const remainingCount = tasks.filter((task) => !task.completed).length;
  useEffect(() => {
    const allData = async () => {
      const datas = await getAllData();
      if (!datas.success) {
        return setMessage(datas.message);
      }

      if (!datas.data) {
        return setMessage(datas.message);
      }

      // Data database → data yang dibutuhkan TodoItemItem
      const todos: Task[] = datas.data.map((item: dataTodos) => ({
        id: item.id,
        text: item.todos,
        completed: item.status === "done",
        status: item.status,
      }));

      return setTasks(todos);
    };

    allData();
  }, []);

  const toggleTask = (id: number, status: TodoStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: status,
              completed: status === "done",
            }
          : task,
      ),
    );
  };

  const addTask = (id: number, text: string) => {
    const newTask: Task = {
      id: id,
      text: text,
      completed: false,
      status: "in progres",
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };
  console.log(tasks);

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-100/50">
      {/* 1. Header Dinamis */}
      <TodoHeader
        Judul="Apa fokusmu hari ini?"
        Deskripsi="Mari selesaikan satu per satu."
      />

      {/* 2. Form Input Tugas */}

      <TodoInputDlu TambahData={addTask} />

      <div>
        {tasks.map((items) => {
          return (
            <div
              className="flex justify-items-start items-center text-black"
              key={items.id}
            >
              <TodoItemItem key={items.id} task={items} onToggle={toggleTask} />
            </div>
          );
        })}
      </div>

      {/* 3. Daftar Tugas */}
      {/* <TodoTaskFilter tasks={filteredTasks} ToggleTugas={ToggleTugas} /> */}

      {/* 4. Footer & Filter */}
      {/* <TodoTombolFilternya
        remainingCount={remainingCount}
        currentFilter={filter}
        setFilter={setFilter}
      /> */}
    </div>
  );
}
