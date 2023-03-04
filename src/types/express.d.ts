import type { JsonWebTokenPayload } from "./index";

declare global {
  namespace Express {
    interface Request {
      user?: JsonWebTokenPayload;
    }
  }
}
