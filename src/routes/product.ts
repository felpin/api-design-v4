import type { Product } from "@prisma/client";
import express, { Request } from "express";

import authenticated from "../middlewares/authenticated";
import { getProducts } from "../handlers/product";
import type { ServerResponse } from "../types";

const router = express.Router();

router.use(authenticated);

router.get("/", async (request: Request, response: ServerResponse<Product[]>) => {
  const user = request.user;
  if (!user) {
    return response.json({ data: [] });
  }

  const products = await getProducts(user.id);
  return response.json({ data: products });
});

export default router;
