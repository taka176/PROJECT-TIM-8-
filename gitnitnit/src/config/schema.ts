import { integer, pgTable, varchar, pgEnum, timestamp } from "drizzle-orm/pg-core";

export const todosStatus = pgEnum("todos_status", ["done", "in progres", "deleted"]);

export const tableList = pgTable("table_list", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  todos: varchar("todos", { length: 50 }).default(""),
  status : todosStatus("status").default("in progres").notNull(),
  createdAT : timestamp("created_at").defaultNow().notNull()    
});
