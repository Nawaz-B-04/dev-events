import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";



export async function GET(req: NextRequest) {
    try {
        await connectDB();

        // 1. Get the query from the URL (?q=...)
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        if (!query) {
            return NextResponse.json({ events: [] });
        }

        // 2. Perform Database Search
        // $regex: Perform partial text search
        // $options: 'i' means Case Insensitive (Java = java)
        const events = await Event.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        }).select("title _id slug image date location price"); // Optimization: Only select needed fields

        return NextResponse.json({ events });

    } catch (error) {
        console.error("Search Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
