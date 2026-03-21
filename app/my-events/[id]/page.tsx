import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import Booking from "@/database/booking.model";
import { redirect, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Suspense } from "react";

function EventAttendeesPageInner({ id, token }: { id: string, token: string | null }) {
    if (!token) redirect("/login");
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_dev_password");
    let userId;
    try {
        const { payload } = jwtVerify(token, secretKey);
        userId = payload.userId;
    } catch {
        redirect("/login");
    }
    // ...existing code to fetch event, verify ownership, and render...
    return null; // Replace with actual JSX
}

export default function EventAttendeesPageWrapper({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={<div>Loading event attendees...</div>}>
            <EventAttendeesPageWithCookies params={params} />
        </Suspense>
    );
}

async function EventAttendeesPageWithCookies({ params }: { params: { id: string } }) {
    const { id } = params;
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value || null;
    return <EventAttendeesPageInner id={id} token={token} />;
    }

    // 2. Fetch Bookings for this Event
    const bookings = await Booking.find({ eventId: id }).sort({ createdAt: -1 });

    // Calculate Total Tickets Sold
    const totalTickets = bookings.reduce((acc, booking) => acc + booking.guestCount, 0);

    return (
        <section className="bg-slate-950 min-h-screen py-10 px-6 text-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <Link href="/my-events" className="text-blue-400 hover:underline mb-2 block text-sm">&larr; Back to My Events</Link>
                        <h1 className="text-3xl font-bold">{event.title} - Attendees</h1>
                    </div>
                    <div className="bg-slate-900 px-6 py-3 rounded-lg border border-slate-800 text-center">
                        <span className="block text-gray-400 text-xs uppercase tracking-wide">Total Tickets Sold</span>
                        <span className="text-2xl font-bold text-green-400">{totalTickets}</span>
                    </div>
                </div>

                {/* Attendees Table */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-800/50 text-gray-400 text-xs uppercase border-b border-slate-800">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Attendee Name</th>
                                    <th className="px-6 py-4 font-semibold">Email</th>
                                    <th className="px-6 py-4 font-semibold text-center">Tickets</th>
                                    <th className="px-6 py-4 font-semibold text-right">Date Booked</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/50">
                                {bookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                            No bookings yet. Share your event link!
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-slate-800/30 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white max-w-50 truncate" title={booking.name}>
                                                {booking.name}
                                            </td>
                                            <td className="px-6 py-4 text-gray-300 max-w-62.5 truncate" title={booking.email}>
                                                {booking.email}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-block px-2 py-1 rounded bg-blue-900/30 text-blue-300 text-xs font-bold w-8">
                                                    {booking.guestCount}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-gray-500 text-sm">
                                                {new Date(booking.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
