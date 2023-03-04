import "./express";

import type { Response } from "express";

export type ServerResponse<T> = Response<{ errors?: string[]; data?: T }>;

export interface JsonWebTokenPayload {
  id: string;
}
