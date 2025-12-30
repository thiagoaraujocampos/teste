import { relations } from "drizzle-orm";
import { connection, page } from "./schemas";

export const pageRelation = relations(page, ({ many }) => ({
  connection: many(connection),
}));

export const connectionRelation = relations(connection, ({ many }) => ({
  page: many(page),
}));
