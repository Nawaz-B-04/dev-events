import EventCard from "@/components/EventCard";
import SearchEvents from "@/components/SearchEvents";
import { IEvent } from "@/database/event.model";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default async function GetAllEvents() {
    // Fetch all events
    const response = await fetch(`${BASE_URL}/api/events`, { cache: 'no-store' })
    const { events } = await response.json()

    return (
        <section className="bg-slate-950 bg-dotted-pattern bg-cover bg-center py-10 min-h-screen">
            <div className="wrapper max-w-7xl mx-auto px-6">

                {/* Header Section */}
                <div className="flex flex-col gap-4 text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h1 className="text-4xl font-bold text-white tracking-tight">Explore Events</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">Browse through our curated list of developer events, workshops, and hackathons.</p>

                    {/* Search Bar (Client Side) */}
                    <div className="mt-6 w-full relative z-50">
                        <SearchEvents />
                    </div>
                </div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events && events.length > 0 ? (
                        events.map((event: IEvent) => (
                            <div key={event._id as string} className="hover:scale-[1.02] transition-transform duration-300">
                                <EventCard {...event} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-20 bg-slate-900/50 rounded-xl border border-slate-800 text-center p-8">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <svg className="text-gray-500 w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
                            <p className="text-gray-400">We couldn't find any events matching your criteria.</p>
                        </div>
                    )}
                </div>

            </div>
        </section>
    )
}
