"use server";

import { todos, TodoStatus } from "@/lib/todos.service";

// ambil semua data yang pernah di maasukan
export async function getAllData() {
  return await todos.getAll();
}

// ambil data berdasarkan status -> "done" | "in progres" | "deleted" | "post"
export async function getDataByStatus(status: TodoStatus) {
  return await todos.getDataByStatus(status);
}

// masukan data ke dalam databse
export async function postTodos(text: string) {
  if (!text.trim()) {
    return {
      success: false as const,
      message: "masukan minimal 1 karakter",
      data: null,
    };
  }

  return await todos.postData(text);
}

// edit todo list
export async function updateTodos(text: string, id: number) {
  return await todos.updateData(text, id);
}

// update status
export async function updateStatusTodos(id: number, status: TodoStatus) {
  return await todos.updateDataStatus(id, status);
}

// hapus todo list
export async function deleteTodos(id: number) {
  return await todos.deleteData(id);
}
