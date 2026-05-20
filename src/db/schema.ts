import { sqliteTable, text, integer, uniqueIndex, real } from "drizzle-orm/sqlite-core";

const createdAt = text("created_at").default("CURRENT_TIMESTAMP").notNull()

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  createdAt 
});

export const groceryTrips = sqliteTable("grocery_trips", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  marketName: text("market_name"),
  totalBudget: real("total_budget"),
  description: text("description").notNull(),
  createdAt
})

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  description: text("description").notNull(),

  amount: real("amount").notNull(),
  type: text("type").$type<"in" | "out">().notNull() ,

  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id, { onDelete: "cascade"}),

  groceryTripId: integer("grocery_trip_id").references(() => groceryTrips.id, { onDelete: "cascade"}),

  createdAt
});