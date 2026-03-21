"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// 1. Define the shape of data we expect from API
interface SearchResult {
    _id: string;
    title: string;
    image: string;
    slug: string;
    date: string;
    price: string;
}

export default function SearchEvents() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // 2. The "React Way": Use useEffect to react to changes
    // Whenever 'query' changes, this code runs.
    useEffect(() => {
        const fetchEvents = async () => {
            if (!query) {
                setResults([]);
                setIsOpen(false);
                return;
            }

            setIsLoading(true);
            setIsOpen(true);

            try {
                // Client-Side Fetching!
                const res = await fetch(`/api/search?q=${query}`);
                const data = await res.json();
                setResults(data.events || []);
            } catch (error) {
                console.error("Failed to search", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Debounce: Wait 300ms after typing stops before fetching
        const delayDebounceFn = setTimeout(() => {
            fetchEvents();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    // Navigate on Enter key
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query) {
            router.push(`/events?query=${query}`); // Fallback to full page search
            setIsOpen(false);
        }
    }

    return (
        <div className="w-full max-w-md mx-auto relative z-50">
            {/* The Input Field */}
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-200"></div>
                <form onSubmit={handleSearch} className="relative flex items-center w-full bg-slate-900 border border-slate-800 rounded-full px-2 shadow-xl">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search events (e.g. Next.js)..."
                        className="w-full bg-transparent text-white py-3 px-6 rounded-full focus:outline-none placeholder-gray-500"
                    />
                    <button type="submit" className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition-colors m-1 shadow-lg">
                        {isLoading ? (
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        )}
                    </button>
                </form>
            </div>

            {/* The Dropdown Results (Client Side Rendering) */}
            {isOpen && (query.length > 0) && (
                <div className="absolute top-full text-left mt-2 w-full bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    {results.length > 0 ? (
                        <ul>
                            {results.map((event) => (
                                <li key={event._id} className="border-b border-slate-800 last:border-none">
                                    <Link
                                        href={`/events/${event.slug}`}
                                        className="flex items-center gap-4 p-3 hover:bg-slate-800 transition-colors"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                            <Image src={event.image} alt={event.title} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white text-sm line-clamp-1">{event.title}</p>
                                            <p className="text-xs text-blue-400">{event.date.split('T')[0]}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        !isLoading && (
                            <div className="p-4 text-center text-gray-500 text-sm">
                                No events found.
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}
