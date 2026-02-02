import { notFound } from "next/navigation"
import Image from "next/image"
import BookEvent from "@/components/BookEvent"
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions"
import { IEvent } from "@/database"
import EventCard from "@/components/EventCard"



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
    const { slug } = await params
    const request = await fetch(`${BASE_URL}/api/events/${slug}`)
    console.log("fetch succsfull")
    const { event: { audience, description, image, overview, date, time, location, title, mode, agenda, price, category, organizer, tags } } = await request.json()
    const bookings = 10
    const similarEvents : IEvent[] = await getSimilarEventsBySlug(slug)
    if(!similarEvents) return []

    if (!description) return notFound()
    return (
        <section id="event">
            <div className="header">
                <h1>Event desciption</h1>
                <div className="mt-2">{description}</div>
            </div>

            <div className="details">
                <div className="content">
                    <Image src={image} alt={title} width={800} height={800} className="banner" />

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
                        ): <p className="text-sm">Be the first to book your spot!</p>}

                        <BookEvent />
                        
                    </div>
                </aside>
            </div>
            
            <div className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
               <div className="events">
                 {
                    similarEvents.length > 0 && similarEvents.map((event : IEvent) => (
                        <EventCard key={event.title} {...event}/>
                     ))          
                }
               </div>
            </div>
        </section>
    )
}
