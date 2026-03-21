import { notFound } from "next/navigation"
import Image from "next/image"
import BookEvent from "@/components/BookEvent"
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions"
import { IEvent } from "@/database"
import EventCard from "@/components/EventCard"

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string }) => (
    <div className="flex-row-gap-2">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className="agenda">
        <ul>
            {
                agendaItems.map((item, index) => (
                    <li key={index}>
                        {item}
                    </li>
                ))
            }
        </ul>
    </div>
)

const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex-row-gap-2 mt-4">
        {
            tags.map((item, index) => (
                <p key={index} className="pill">
                    {item}
                </p>
            ))
        }
    </div>
)





export default async function EventPageDetails({ params }: { params: Promise<{ slug: string }> }) {
    const cookieStore = await cookies();
const token = cookieStore.get("auth_token")?.value;
let user = null; // Default: No user logged in
// 2. If token exists, decode it to get email/userId
if (token) {
  try {
    const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secretKey);
    user = payload; // Now 'user' has { email: "...", userId: "..." }
  } catch (err) {
    // Token invalid (expired), ignore it
  }
}

    const { slug } = await params
    const request = await fetch(`${BASE_URL}/api/events/${slug}`)
    console.log("fetch succesfull")
    const { event: { audience, description, image, overview, date, time, location, title, mode, agenda, price, category, organizer, tags, _id } } = await request.json()
    const bookings = 10
    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug)
    if (!similarEvents) return []

    if (!description) return notFound()
import { Suspense } from "react";

function EventPageDetailsInner({ token }: { token: string | null }) {
    let user = null;
    if (token) {
        try {
            const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
            const { payload } = jwtVerify(token, secretKey);
            user = payload;
        } catch (err) {}
    }
    // ...existing code for rendering event details, using user if needed...
    return null; // Replace with actual JSX
}

export default function EventPageDetailsWrapper({ params }: { params: Promise<{ slug: string }> }) {
    return (
        <Suspense fallback={<div>Loading event details...</div>}>
            <EventPageDetailsWithCookies params={params} />
        </Suspense>
    );
}

async function EventPageDetailsWithCookies({ params }: { params: Promise<{ slug: string }> }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value || null;
    return <EventPageDetailsInner token={token} />;
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw"
                        />
                    </div>

                    <section className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section className="flex-col-gap-2">
                        <h2>Event Details</h2>
                        <EventDetailItem icon="/icons/calendar.svg" alt="calender" label={date} />
                        <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
                        <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
                        <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
                        <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
                    </section>

                    <EventAgenda agendaItems={agenda} />
                    <section className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>

                    <EventTags tags={tags}></EventTags>
                </div>


                {/* Right side booking form*/}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book your spot</h2>
                        {bookings > 0 ? (
                            <p className="text-sm">
                                Join {bookings} people who have already booked their spot!
                            </p>
                        ) : <p className="text-sm">Be the first to book your spot!</p>}

                        <BookEvent eventId={_id} userId={user?.userId as string} />

                    </div>
                </aside>
            </div>

            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {
                        similarEvents.length > 0 && similarEvents.map((event: IEvent) => (
                            <EventCard key={event.title} {...event} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
