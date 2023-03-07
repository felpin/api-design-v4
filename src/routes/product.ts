import type { Product } from "@prisma/client";
import express, { Request } from "express";

import authenticated from "../middlewares/authenticated";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../handlers/product";
import routePrefix from "../route-prefix";
import type { ServerResponse } from "../types";
import validate from "../utils/validate";
import type {
  ProductCreateRequest,
  ProductDeleteRequest,
  ProductUpdateRequest,
} from "./product.types";
import { ProductCreateValidation } from "./product.validation";

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
  validate(ProductCreateValidation),
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

router.patch(
  "/:id",
  validate(ProductCreateValidation),
  async (request: ProductUpdateRequest, response: ServerResponse<Product>) => {
    const user = request.user;
    if (!user) {
      return response.sendStatus(500);
    }

    const product = await updateProduct({
      ...request.body,
      id: request.params.id,
      belongsToId: user.id,
    });

    return response.json({ data: product });
  }
);

router.delete("/:id", async (request: ProductDeleteRequest, response: ServerResponse<Product>) => {
  const user = request.user;
  if (!user) {
    return response.sendStatus(500);
  }

  const product = await deleteProduct({
    ...request.body,
    id: request.params.id,
    belongsToId: user.id,
  });

  return response.json({ data: product });
});

export default router;
