import type { Product } from "@prisma/client";
import type { NextFunction } from "express";
import { z } from "zod";

import type { ServerResponse } from "../types";
import type { ProductCreateRequest } from "./product.types";

const ProductValidation = z.object({
  name: z.string(),
});

export const validateProductCreation = (
  request: ProductCreateRequest,
  response: ServerResponse<Product>,
  next: NextFunction
) => {
  try {
    ProductValidation.parse(request.body);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.status(400).json({ errors: [error.message] });
    } else {
      return response.sendStatus(500);
    }
  }

  return next();
};
