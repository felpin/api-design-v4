import jwt from "jsonwebtoken";
import type { User } from "@prisma/client";
import bcrypt from "bcrypt";

export function createJsonWebToken(user: User) {
  const secret = process.env?.["JWT_SECRET"];

  if (secret === undefined) {
    throw new Error("Cannot create token without a secret");
  }

  return jwt.sign({ id: user.id }, secret);
}

export function comparePasswords(password: string, passwordHash: string) {
  return bcrypt.compareSync(password, passwordHash);
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 8);
}
