import "server-only";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { Session } from "@/models/Session";
import { User } from "@/models/User";

export const AUTH_COOKIE_NAME = "serenai_session";

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not configured");
  return secret;
}

export function getRequestToken(request: NextRequest) {
  const cookieToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (cookieToken) return cookieToken;

  const authorization = request.headers.get("Authorization");
  return authorization?.match(/^Bearer\s+(.+)$/i)?.[1] ?? null;
}

export async function getAuthenticatedUser(request: NextRequest) {
  const token = getRequestToken(request);
  if (!token) return null;

  const secret = getJwtSecret();
  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, secret) as JwtPayload;
  } catch {
    return null;
  }
  if (typeof decoded.userId !== "string") return null;

  await connectDB();
  const session = await Session.findOne({
    token,
    userId: decoded.userId,
    expiresAt: { $gt: new Date() },
  }).lean();
  if (!session) return null;

  return User.findById(decoded.userId).select("_id name email").lean();
}