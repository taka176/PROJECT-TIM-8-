import { db } from "@/src/config/db";
import { userTable } from "@/src/config/schema";
import { eq } from "drizzle-orm";

import { getCurrentUser } from "./auth";

export async function getAuthenticatedUser() {
  const payload = await getCurrentUser();

  if (!payload?.userId) {
    return null;
  }

  const result = await db
    .select({
      id: userTable.id,
      username: userTable.username,
      email: userTable.email,
    })
    .from(userTable)
    .where(eq(userTable.id, Number(payload.userId)));

  return result[0] ?? null;
}
