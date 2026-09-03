import { db } from "@/src/config/db";
import { tableList } from "@/src/config/schema";
import { eq } from "drizzle-orm";

export type TodoStatus = "done" | "in progres" | "deleted";

export class TodosService {
  getAll = async () => {
    try {
      const result = await db.select().from(tableList);

      if (result.length == 0) {
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
    } catch (error: any) {
      return {
        success: false,
        message: "Internal server error",
        data: error.message,
      };
    }
  };

  getDataByStatus = async (status: TodoStatus) => {
    try {
      const result = await db
        .select()
        .from(tableList)
        .where(eq(tableList.status, status));

      if (result.length == 0) {
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
    } catch (error: any) {
      return {
        success: false,
        message: "Internal server error",
        data: error.message,
      };
    }
  };

  postData = async (text: string) => {
    try {
      const result = await db
        .insert(tableList)
        .values({
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
    } catch (error: any) {
      console.error("ERROR INSERT TODO:", error);

      return {
        success: false as const,
        message: "Internal server error",
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

      if (isExist.length == 0) {
        return {
          success: false,
          message: "data tidak ditemukan",
        };
      }

      const result = await db
        .update(tableList)
        .set({
          todos: text,
        })
        .where(eq(tableList.id, id));

      return {
        success: true,
        message: "data ditemukan",
        // data: result,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Internal server error",
        data: error.message,
      };
    }
  };
  updateDataStatus = async (id: number, status: TodoStatus) => {
    try {
      const isExist = await db
        .select({ id: tableList.id })
        .from(tableList)
        .where(eq(tableList.id, id));

      if (isExist.length == 0) {
        return {
          success: false,
          message: "data tidak ditemukan",
        };
      }

      const result = await db
        .update(tableList)
        .set({
          status: status,
        })
        .where(eq(tableList.id, id));

      return {
        success: true,
        message: "data ditemukan",
        // data: result,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Internal server error",
        data: error.message,
      };
    }
  };

  deleteData = async (id: number) => {
    try {
      const isExist = await db
        .select({ id: tableList.id })
        .from(tableList)
        .where(eq(tableList.id, id));

      if (isExist.length == 0) {
        return {
          success: false,
          message: "data tidak ditemukan",
        };
      }

      const result = await db
        .update(tableList)
        .set({
          status: "deleted",
        })
        .where(eq(tableList.id, id));

      return {
        success: true,
        message: "data dihapus",
        data: result,
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Internal server error",
        data: error.message,
      };
    }
  };
}

export const todos = new TodosService();
