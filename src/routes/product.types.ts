import type { ProductCreation } from "../handlers/product";

export type ProductCreationRequestBody = Pick<ProductCreation, "name">;
