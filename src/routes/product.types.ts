import type { Request } from "express";

import type { ProductCreation } from "../handlers/product";

export type ProductCreateRequest = Request<{}, any, ProductCreateRequestBody>;

export type ProductCreateRequestBody = Pick<ProductCreation, "name">;
