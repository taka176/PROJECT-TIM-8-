import {
  integer,
  pgTable,
  varchar,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";

export const todosStatus = pgEnum("todos_status", [
  "done",
  "in progres",
  "deleted",
]);

export const userTable = pgTable("userTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar("username", { length: 59 }).notNull(),
  email: varchar("email", { length: 60 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const tableList = pgTable("table_list", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user: integer().references(() => userTable.id, { onDelete: "cascade" }),
  todos: varchar("todos", { length: 50 }).default(""),
  status: todosStatus("status").default("in progres").notNull(),
  createdAT: timestamp("created_at").defaultNow().notNull(),
});
