import type { Product } from "@prisma/client";
import express, { Request } from "express";

import authenticated from "../middlewares/authenticated";
import { createProduct, getProducts } from "../handlers/product";
import routePrefix from "../route-prefix";
import type { ServerResponse } from "../types";
import type { ProductCreateRequest } from "./product.types";
import { validateProductCreation } from "./product.validation";

const router = express.Router();

router.use(authenticated);

router.get("/", async (request: Request, response: ServerResponse<Product[]>) => {
  const user = request.user;
  if (!user) {
    return response.sendStatus(500);
  }

  const products = await getProducts(user.id);
  return response.json({ data: products });
});

router.post(
  "/",
  validateProductCreation,
  async (request: ProductCreateRequest, response: ServerResponse<Product>) => {
    const user = request.user;
    if (!user) {
      return response.sendStatus(500);
    }

    const product = await createProduct({ ...request.body, belongsToId: user.id });
    return response
      .status(201)
      .location(`${routePrefix.product}/${product.id}`)
      .json({ data: product });
  }
);

export default router;
