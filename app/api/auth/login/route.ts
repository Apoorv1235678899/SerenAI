import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AUTH_COOKIE_NAME, getJwtSecret } from "@/lib/auth";
import { Session } from "@/models/Session";
import { User } from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        if (typeof email !== "string" || typeof password !== "string") {
            return NextResponse.json(
                { message: "Email and password are required." },
                { status: 400 }
            );
        }

        await connectDB();
        const user = await User.findOne({ email: email.trim().toLowerCase() });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json(
                { message: "Invalid email or password." },
                { status: 401 }
            );
        }

        const token = jwt.sign({ userId: String(user._id) }, getJwtSecret(), {
            expiresIn: "24h",
        });
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        await Session.create({
            userId: user._id,
            token,
            expiresAt,
            deviceInfo: req.headers.get("user-agent") ?? undefined,
        });

        const response = NextResponse.json({
            user: { _id: user._id, name: user.name, email: user.email },
            message: "Login successful",
        });
        response.cookies.set(AUTH_COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            expires: expiresAt,
        });
        return response;
    } catch (error) {
        console.error("Login failed:", error);
        return NextResponse.json({ message: "Unable to log in." }, { status: 500 });
    }
}