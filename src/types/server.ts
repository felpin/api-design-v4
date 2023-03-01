import type { Response } from "express";

export type ServerResponse<T> = Response<{ errors?: string[]; data?: T }>;
