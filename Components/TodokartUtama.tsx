"use client";

import { useState, useEffect, useCallback } from "react";
import TodoHeader from "./TodoHeader";
import TodoInputDlu from "./TodoInputDlu";
import TodoTaskFilter from "./TodoTaskFilter";
import TodoTombolFilternya from "./TodoTombolFilternya";
import { Task } from "./TodoItemItem";
import { TodoStatus } from "@/lib/todos.service";
import { getAllData } from "@/action/todos.action";
import { logoutAction } from "@/action/auth/auth.action";

type dataTodos = {
  id: number;
  todos: string;
  status: TodoStatus;
  createdAT: Date;
};

export default function TodokartUtama() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TodoStatus>("in progres");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const datas = await getAllData();

    if (!datas.success || !("data" in datas) || !datas.data) {
      setMessage(datas.message);
      setTasks([]);
      setIsLoading(false);
      return;
    }

    const todos: Task[] = (datas.data as unknown as dataTodos[]).map((item) => ({
      id: item.id,
      text: item.todos,
      completed: item.status === "done",
      status: item.status,
    }));

    setTasks(todos);
    setMessage("");
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshData = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

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

  const filteredTasks = tasks.filter((task) => task.status === filter);
  const remainingCount = tasks.filter((task) => task.status === "in progres").length;

  const editTask = (id: number, text: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: text,
            }
          : task,
      ),
    );
  };

  const removeTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleLogout = async () => {
    await logoutAction();
    window.location.reload();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-gray-100/50">
      <TodoHeader
        Judul="Apa fokusmu hari ini?"
        Deskripsi="Mari selesaikan satu per satu."
      />

      <TodoInputDlu TambahData={addTask} onRefresh={refreshData} />

      {isLoading ? (
        <div className="py-8 text-center text-sm text-gray-400">
          Memuat data...
        </div>
      ) : (
        <TodoTaskFilter
          tasks={filteredTasks}
          ToggleTugas={toggleTask}
          EditTugas={editTask}
          onRemoveTask={removeTask}
          onRefresh={refreshData}
        />
      )}

      {message && !isLoading && (
        <p className="text-sm text-gray-400 text-center py-4">{message}</p>
      )}

      <TodoTombolFilternya
        remainingCount={remainingCount}
        currentFilter={filter}
        setFilter={setFilter}
      />

      <div className="flex justify-end pt-3">
        <button
          onClick={handleLogout}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          Keluar
        </button>
      </div>
    </div>
  );
}
