import jwt from "jsonwebtoken";
import {get} from "lodash";

export default function extractIdFromJwt(token: string | null): number | null {
  if (!token) {
    return null;
  }

  const JWT_SECRET = String(process.env.JWT_SECRET);
  const decoded = jwt.verify(token.replace(/^Bearer\s/, ""), JWT_SECRET);
  return get(decoded, "id", null);
}
