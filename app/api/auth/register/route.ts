import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();
        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !password
        ) {
            return NextResponse.json(
                { message: "Name, email, and password are required." },
                { status: 400 }
            );
    }

        await connectDB();
        const normalizedEmail = email.trim().toLowerCase();
        if (await User.exists({ email: normalizedEmail })) {
            return NextResponse.json(
                { message: "Email already in use." },
                { status: 409 }
            );
        }

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: await bcrypt.hash(password, 10),
        });
        return NextResponse.json(
            {
                user: { _id: user._id, name: user.name, email: user.email },
                message: "User registered successfully.",
            },
            { status: 201 }
        );
    } catch (error) {
        if (error && typeof error === "object" && "code" in error && error.code === 11000) {
            return NextResponse.json(
                { message: "Email already in use." },
                { status: 409 }
            );
        }
        console.error("Registration failed:", error);
        return NextResponse.json(
            { message: "Unable to register." },
            { status: 500 }
        );
    }
}