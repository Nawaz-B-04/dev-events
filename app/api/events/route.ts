import { v2 as cloudinary } from "cloudinary"
import { NextRequest, NextResponse } from "next/server"

import connectDB from "@/lib/mongodb"
import Event from "@/database/event.model"

export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const formData = await req.formData()
        let event;

        try {
            event = Object.fromEntries(formData)
        }
        catch (e) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 })
        }


        let tags = JSON.parse(formData.get("tags") as string)
        let agenda = JSON.parse(formData.get("agenda") as string)
                const file = formData.get("image") as File | null;
        if (!file) return NextResponse.json({ error: "Image is required" }, { status: 400 })
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                resource_type: "image",
                folder: "DevEvent",
            }, (error, results) => {
                if (error) return reject(error)
                resolve(results)
            }).end(buffer)
        })

        event.image = (uploadResult as { secure_url: string }).secure_url


        let createdEvent = await Event.create({
            ...event,
            tags:tags,
            agenda:agenda
        })

        return NextResponse.json({ message: "event created successfully", event: createdEvent }, { status: 201 })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({ message: "Event creation failed", error: "Internal server error" }, { status: 500 })
    }
}


export async function GET(req: NextRequest) {
    try {
        await connectDB()
        const events = await Event.find().sort({ createdAt: -1 })
        return NextResponse.json({ message: "Events fetched successfully", events }, { status: 200 })
    }
    catch (e) {
        return NextResponse.json({ message: "Event fetching failed", e }, { status: 500 })
    }
}


