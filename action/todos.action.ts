"use server";

import { todos, TodoStatus } from "@/lib/todos.service";
import { getAuthenticatedUser } from "@/lib/auth/getUser";

export async function getAllData() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return {
      success: false,
      message: "Silakan login terlebih dahulu",
    };
  }
  return await todos.getAll(user.id);
}

export async function getDataByStatus(status: TodoStatus) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return {
      success: false,
      message: "Silakan login terlebih dahulu",
    };
  }
  return await todos.getDataByStatus(user.id, status);
}

export async function postTodos(text: string) {
  if (!text.trim()) {
    return {
      success: false as const,
      message: "masukan minimal 1 karakter",
      data: null,
    };
  }

  const user = await getAuthenticatedUser();
  if (!user) {
    return {
      success: false as const,
      message: "Silakan login terlebih dahulu",
      data: null,
    };
  }

  return await todos.postData(user.id, text);
}

export async function updateTodos(text: string, id: number) {
  return await todos.updateData(text, id);
}

export async function updateStatusTodos(id: number, status: TodoStatus) {
  return await todos.updateDataStatus(id, status);
}

export async function deleteTodos(id: number) {
  return await todos.deleteData(id);
}
