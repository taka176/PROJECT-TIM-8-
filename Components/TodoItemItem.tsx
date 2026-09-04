"use client";

import { updateStatusTodos } from "@/action/todos.action";
import { TodoStatus } from "@/lib/todos.service";
import { deleteTodos, updateTodos } from "@/action/todos.action";
import { useState } from "react";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  status: TodoStatus;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, status: TodoStatus) => void;
  onEdit: (id: number, text: string) => void;
}

export default function TodoItemItem({
  task,
  onToggle,
  onEdit,
}: TaskItemProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleToggle = async () => {
    const newStatus: TodoStatus = task.completed
      ? "in progres"
      : "done";

    const result = await updateStatusTodos(task.id, newStatus);

    if (result.success) {
      onToggle(task.id, newStatus);
    }

    console.log(result);
  };

  const handleDelete = async () => {
    const result = await deleteTodos(task.id);

    if (result.success) {
      onToggle(task.id, "deleted");
    }

    console.log("hasil delete", result);
  };

  const handleEdit = async () => {
    const newText = editText.trim();

    if (!newText) {
      return;
    }

    const result = await updateTodos(newText, task.id);

    if (result.success) {
      onEdit(task.id, newText);
      setIsEditOpen(false);
    }

    console.log("hasil edit", result);
  };

  return (
    <>
      {/* TODO ITEM */}
      <div
        className={`flex items-center justify-between gap-3 p-4 rounded-2xl mb-2 transition-all ${
          task.status === "done"
            ? "bg-red-50"
            : "bg-stone-50/70 hover:bg-stone-100"
        }`}
      >
        <div className="flex items-center gap-5">
          {/* CHECKBOX */}
          {task.status !== "done" && (
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggle}
              className="w-5 h-5 accent-indigo-600 cursor-pointer rounded-md border-gray-300"
            />
          )}

          {/* TEXT */}
          <span
            className={`text-sm select-none ${
              task.status === "done"
                ? "text-green-400"
                : task.completed
                  ? "text-gray-400 line-through"
                  : "text-gray-700"
            }`}
          >
            {task.text}
          </span>
        </div>

        {/* BUTTON */}
        {task.status !== "done" && (
          <div className="flex gap-2">
            {/* EDIT */}
            <button
              onClick={() => {
                setEditText(task.text);
                setIsEditOpen(true);
              }}
              type="button"
              className="text-black hover:text-indigo-600 transition-colors p-2 bg-slate-300 rounded-2xl"
            >
              📝
            </button>

            {/* DELETE */}
            <button
              onClick={handleDelete}
              type="button"
              className="text-black hover:text-red-500 transition-colors p-2 bg-slate-300 rounded-2xl"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      {/* POPUP EDIT */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl">
            <h2 className="text-lg font-semibold text-gray-800">
              Edit Task
            </h2>

            <p className="text-sm text-gray-400 mt-1 mb-5">
              Ubah isi task kamu.
            </p>

            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEdit();
                }

                if (e.key === "Escape") {
                  setIsEditOpen(false);
                }
              }}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm text-gray-700"
              placeholder="Masukkan task..."
            />

            <div className="flex justify-end gap-2 mt-5">
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 rounded-xl text-sm text-gray-500 hover:bg-gray-100"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleEdit}
                disabled={!editText.trim()}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700 disabled:opacity-50"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}