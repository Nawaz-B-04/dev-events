import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Suspense } from "react";

function MyEventsPageInner({ token }: { token: string | null }) {
    if (!token) {
        redirect("/login");
    }
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_dev_password");
    let userId;
    try {
        const { payload } = jwtVerify(token, secretKey);
        if (typeof payload.userId !== 'string') throw new Error("Invalid userId");
        userId = payload.userId;
    } catch (e) {
        redirect("/login");
    }
    // ...existing code to fetch events and render...
    return null; // Replace with actual JSX
}

export default function MyEventsPageWrapper() {
    return (
        <Suspense fallback={<div>Loading your events...</div>}>
            <MyEventsPageWithCookies />
        </Suspense>
    );
}

async function MyEventsPageWithCookies() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value || null;
    return <MyEventsPageInner token={token} />;
                        <p className="text-gray-400 mb-6">Start hosting your own events today!</p>
                        <Link href="/events/create" className="text-blue-500 hover:underline">Get Started</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myEvents.map((event) => (
                            <div key={event._id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all flex flex-col">
                                <div className="relative h-48 w-full">
                                    <Image src={event.image} alt={event.title} fill className="object-cover" />
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{event.title}</h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                                        <span className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                                        <Link
                                            href={`/my-events/${event._id}`}
                                            className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                        >
                                            View Attendees &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
