import {
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  vector,
} from "drizzle-orm/pg-core";

export const page = pgTable("page", {
  id: integer().primaryKey(),
  name: text().notNull(),
  link: text().notNull(),
  embedding: vector({ dimensions: 384 }),
  categories: jsonb("categories").$type<string[]>(),
});

export const connection = pgTable(
  "connections",
  {
    originPage: integer()
      .notNull()
      .references(() => page.id, { onDelete: "cascade" }),
    targetPage: integer()
      .notNull()
      .references(() => page.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.originPage, table.targetPage] })]
);
