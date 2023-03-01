import jwt from 'jsonwebtoken'
import type {User} from "@prisma/client";

export function createJsonWebToken(user: User) {
  const secret = process.env?.['JWT_SECRET']

  if (secret === undefined) {
    throw new Error('Cannot create token without a secret')
  }

  return jwt.sign({ id: user.id }, secret)
}