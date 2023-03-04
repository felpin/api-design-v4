import type { Product } from "@prisma/client";

import database from "../database";

export type ProductCreation = Pick<Product, "name" | "belongsToId">;

export async function createProduct(product: ProductCreation) {
  return database.product.create({ data: product });
}

export async function getProducts(userId: string) {
  return database.product.findMany({ where: { belongsToId: userId } });
}
