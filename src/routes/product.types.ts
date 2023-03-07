import type { Request } from "express";

import type { ProductCreate } from "../handlers/product";

export type ProductCreateRequest = Request<{}, any, ProductCreateRequestBody>;

export type ProductCreateRequestBody = Pick<ProductCreate, "name">;

export type ProductUpdateRequest = Request<{ id: string }, any, ProductCreateRequestBody>;
