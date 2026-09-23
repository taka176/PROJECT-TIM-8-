import { db } from "@/src/config/db";
import { tableList } from "@/src/config/schema";
import { eq, and, inArray } from "drizzle-orm";

export type TodoStatus = "done" | "in progres" | "deleted";

export class TodosService {
  getAll = async (userId: number) => {
    try {
      const result = await db
        .select()
        .from(tableList)
        .where(
          and(
            eq(tableList.user, userId),
            inArray(tableList.status, ["in progres", "done"]),
          ),
        );

      if (result.length === 0) {
        return {
          success: true,
          message: "belum ada kegiatan, tambahin dlu boss",
        };
      }

      return {
        success: true,
        message: "data ditemukan",
        data: result,
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: "Gagal mengambil data. Silakan coba lagi.",
        data: message,
      };
    }
  };

  getDataByStatus = async (userId: number, status: TodoStatus) => {
    try {
      const result = await db
        .select()
        .from(tableList)
        .where(
          and(eq(tableList.user, userId), eq(tableList.status, status)),
        );

      if (result.length === 0) {
        return {
          success: true,
          message: "belum ada kegiatan, tambahin dlu boss",
        };
      }

      return {
        success: true,
        message: "data ditemukan",
        data: result,
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unknown error";
      return {
        success: false,
        message: "Gagal mengambil data. Silakan coba lagi.",
        data: message,
      };
    }
  };

  postData = async (userId: number, text: string) => {
    try {
      const result = await db
        .insert(tableList)
        .values({
          user: userId,
          todos: text,
        })
        .returning({
          id: tableList.id,
        });

      return {
        success: true as const,
        message: "data berhasil ditambahkan",
        data: {
          id: result[0].id,
        },
      };
    } catch (error: unknown) {
      return {
        success: false as const,
        message: "Gagal menyimpan todo. Silakan coba lagi.",
        data: null,
      };
    }
  };

  updateData = async (text: string, id: number) => {
    try {
      const isExist = await db
        .select({ id: tableList.id })
        .from(tableList)
        .where(eq(tableList.id, id));

      if (isExist.length === 0) {
        return {
          success: false,
          message: "data tidak ditemukan",
        };
      }

      await db
        .update(tableList)
        .set({ todos: text })
        .where(eq(tableList.id, id));

      return {
        success: true,
        message: "data berhasil diupdate",
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: "Gagal mengupdate todo. Silakan coba lagi.",
      };
    }
  };

  updateDataStatus = async (id: number, status: TodoStatus) => {
    try {
      const isExist = await db
        .select({ id: tableList.id })
        .from(tableList)
        .where(eq(tableList.id, id));

      if (isExist.length === 0) {
        return {
          success: false,
          message: "data tidak ditemukan",
        };
      }

      await db
        .update(tableList)
        .set({ status: status })
        .where(eq(tableList.id, id));

      return {
        success: true,
        message: "status berhasil diupdate",
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: "Gagal mengupdate status. Silakan coba lagi.",
      };
    }
  };

  deleteData = async (id: number) => {
    try {
      const isExist = await db
        .select({ id: tableList.id })
        .from(tableList)
        .where(eq(tableList.id, id));

      if (isExist.length === 0) {
        return {
          success: false,
          message: "data tidak ditemukan",
        };
      }

      await db
        .update(tableList)
        .set({ status: "deleted" })
        .where(eq(tableList.id, id));

      return {
        success: true,
        message: "data dihapus",
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: "Gagal menghapus todo. Silakan coba lagi.",
      };
    }
  };
}

export const todos = new TodosService();
