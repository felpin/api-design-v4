import type { Product } from "@prisma/client";

import database from "../database";

export async function getProducts(userId: string): Promise<Product[]> {
  return database.product.findMany({ where: { belongsToId: userId } });
}
