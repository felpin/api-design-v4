import type { User } from "@prisma/client";
import type { Request } from "express";

import database from "../database";
import type { ServerResponse } from "../types/server";
import { comparePasswords, createJsonWebToken, hashPassword } from "../utils/auth";

type AuthRequest = Request<{}, {}, AuthRequestBody>;

interface AuthRequestBody {
  username: string;
  password: string;
}

export async function login(request: AuthRequest, response: ServerResponse<{ token: string }>) {
  const { username, password } = request.body;

  const user = await database.user.findUnique({ where: { username } });
  const error = "Invalid username/password";

  if (!user) {
    response.status(401);
    return response.json({ errors: [error] });
  }

  const isPasswordValid = comparePasswords(password, user.password);
  if (!isPasswordValid) {
    response.status(401);
    return response.json({ errors: [error] });
  }

  return response.json({ data: { token: createJsonWebToken(user) } });
}

export async function signup(
  request: AuthRequest,
  response: ServerResponse<Omit<User, "password">>
) {
  const { username, password } = request.body;

  const passwordHash = hashPassword(password);

  const { password: _ignore, ...user } = await database.user.create({
    data: { username, password: passwordHash },
  });

  return response.json({ data: user });
}
