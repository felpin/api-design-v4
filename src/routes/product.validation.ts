import { z } from "zod";

export const ProductCreateValidation = z.object({
  name: z.string(),
});
