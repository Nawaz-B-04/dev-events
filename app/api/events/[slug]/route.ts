import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";

interface RouteParams {
    params: Promise<{
        slug: string;
    }>;
}

export async function GET(req: NextRequest,{ params }: RouteParams) {
    
    try {
        // 1. Connect to the database
        await connectDB();

        // 2. Extract and validate slug
        // In Next.js 15+, params is a Promise
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json(
                { message: "Slug is required" },
                { status: 400 }
            );
        }

        // 3. Query the database
        // Using findOne to get a single event matching the slug
        // The model uses 'slug' field as unique identifier
        const event = await Event.findOne({ slug });

        // 4. Handle "Not Found" case
        if (!event) {
            return NextResponse.json(
                { message: "Event not found" },
                { status: 404 }
            );
        }

        // 5. Return the event
        return NextResponse.json(
            { message: "Event fetched successfully", event },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching event:", error);
        return NextResponse.json(
            { message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
