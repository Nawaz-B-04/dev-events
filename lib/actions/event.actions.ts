"use server"

import Event from "@/database/event.model"
import connectDB from "@/lib/mongodb"
export const getSimilarEventsBySlug = async (slug: string) => {
    try {
        await connectDB()
        const event = await Event.findOne({ slug })
        if (!event) return []
        const similarEvents = await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean()
        return similarEvents
    }
    catch {
        return []
    }
}

import { jwtVerify } from "jose";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function createEvent(prevState: any, formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");

    if (!token) {
        return { success: false, message: "Unauthorized: Please login first" };
    }

    // 1. Verify User
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_dev_password");
    let userId;
    try {
        const { payload } = await jwtVerify(token.value, secretKey);
        if (typeof payload.userId !== 'string') throw new Error("Invalid userId");
        userId = payload.userId;
    } catch (e) {
        return { success: false, message: "Invalid session - please login again" };
    }

    await connectDB();
    const user = await User.findById(userId);
    if (!user) return { success: false, message: "User not found" };

    // 2. Parse Data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;

    const startDateRaw = formData.get("startDate") as string; // 2024-10-10T10:00
    const endDateRaw = formData.get("endDate") as string;

    // 3. Validate
    if (!title || !description || !location || !imageUrl || !startDateRaw) {
        return { success: false, message: "All fields are required" };
    }

    // 4. Format Date/Time for Schema
    const startObj = new Date(startDateRaw);
    const dateStr = startObj.toISOString().split('T')[0];
    const timeStr = `${startObj.getHours().toString().padStart(2, '0')}:${startObj.getMinutes().toString().padStart(2, '0')}`;

    try {
        const newEvent = await Event.create({
            title,
            description,
            overview: description.substring(0, 100) + "...", // Auto-generate overview
            image: imageUrl,
            location,
            venue: location, // duplicating location
            date: dateStr,
            time: timeStr,
            mode: "offline", // default
            audience: "General", // default
            agenda: ["Introduction", "Main Session", "Q&A"],
            organizer: user.name + " (Host)",
            organizerId: user._id,
            tags: [category || "Tech", "Community"],
            slug: title.toLowerCase().replace(/ /g, "-") + "-" + Date.now(),
        });

        console.log("Event Created!", newEvent._id);
    } catch (error: any) {
        console.error("Create Event Error:", error);
        return { success: false, message: error.message || "Failed to create event" };
    }

    revalidatePath("/");
    revalidatePath("/events");
    redirect("/");
}