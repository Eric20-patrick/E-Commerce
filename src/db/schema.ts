import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
});
export const categoryTable = pgTable("category", {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const categoryRelation = relations(categoryTable, ({ many }) => ({
  products: many(productTbale),
}));

export const productTbale = pgTable("product", {
  id: uuid().primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productVariantTable = pgTable("product_variant", {
  id: uuid().primaryKey().defaultRandom(),
  productId: uuid("product_id")
    .notNull()
    .references(() => productTbale.id),
  name: text().notNull(),
  slug: text().notNull().unique(),
  color: text().notNull(),
  priceInCents: integer("price_in_cents").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const productRelation = relations(productTbale, ({ one }) => ({
  category: one(categoryTable, {
    fields: [productTbale.categoryId],
    references: [categoryTable.id],
  }),
}));
