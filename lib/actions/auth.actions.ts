"use server"

import User from "@/database/user.model"
import connectDB from "../mongodb"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { SignJWT } from "jose"
import { cookies } from "next/headers";

export default async function Signup(prevState: any, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!name || !email || !password) {
        return { success: false, message: "All fields are required" };
    }

    await connectDB()
    const checkUser = await User.findOne({ email })
    if (checkUser) {
        return { success: false, message: "User already exists" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({ name, email, password: hashedPassword })
    console.log("User created successfully!");
    redirect("/login");
}

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    if (!email || !password) {
        return { success: false, message: "Email and password are required" };
    }
    await connectDB()
    const user = await User.findOne({ email })
    if (!user) return {
        success: false,
        message: "Invalid credentials"
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) return {
        success: false,
        message: "Invalid credentials"
    }

    const secretKey = new TextEncoder()
        .encode(process.env.JWT_SECRET || "fallback_dev_password");

    const token = await new SignJWT({ userId: user._id.toString(), email: user.email })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h") // Expires in 1 day
        .sign(secretKey);

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
        httpOnly: true, // JavaScript cannot read this (Security!)
        secure: process.env.NODE_ENV === "production", // HTTPS only in prod
        maxAge: 60 * 60 * 24, // 1 day in seconds
        path: "/", // Available correctly across the whole app
    });
    console.log("Login successful, cookie set!");
    redirect("/my-bookings");
}
