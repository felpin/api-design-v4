import type { NextFunction, Request } from "express";
import type { ZodSchema } from "zod";

import type { ServerResponse } from "../types";

export default function validate(schema: ZodSchema) {
  return (request: Request, response: ServerResponse<unknown>, next: NextFunction) => {
    try {
      schema.parse(request.body);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return response.status(400).json({ errors: [error.message] });
      } else {
        return response.sendStatus(500);
      }
    }

    return next();
  };
}
