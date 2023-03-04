import type { NextFunction, Request } from "express";
import type { JsonWebTokenPayload, ServerResponse } from "../types";
import { verifyJsonWebToken } from "../utils/auth";

export default function authenticated(
  request: Request,
  response: ServerResponse<unknown>,
  next: NextFunction
) {
  const authorization = request.header("authorization");

  if (!authorization) {
    return response.sendStatus(401);
  }

  if (/^Bearer \.+/i.test(authorization)) {
    return response.sendStatus(401);
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    return response.sendStatus(401);
  }

  try {
    const user = verifyJsonWebToken(token);
    request.user = user as JsonWebTokenPayload;
  } catch (error) {
    return response.sendStatus(401);
  }

  return next();
}
