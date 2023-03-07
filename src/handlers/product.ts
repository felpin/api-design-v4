import type { Product } from "@prisma/client";

import database from "../database";

export type ProductCreate = Pick<Product, "name" | "belongsToId">;

export type ProductUpdate = Pick<Product, "id" | "name" | "belongsToId">;

export async function createProduct(product: ProductCreate) {
  return database.product.create({ data: product });
}

export async function getProducts(userId: string) {
  return database.product.findMany({ where: { belongsToId: userId } });
}

export async function updateProduct(product: ProductUpdate) {
  return database.product.update({
    where: { id_belongsToId: { id: product.id, belongsToId: product.belongsToId } },
    data: { name: product.name },
  });
}
