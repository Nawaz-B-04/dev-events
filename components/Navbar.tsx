"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        // Read token from cookies on the client
        const value = document.cookie
            .split('; ')
            .find(row => row.startsWith('auth_token='))?.split('=')[1];
        setToken(value || null);
    }, []);

    const logout = () => {
        // Remove auth_token cookie and redirect
        document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/";
    };

    return (
        <header>
            <nav className="flex items-center justify-between p-4 max-w-5xl mx-auto">
                <Link href="/" className="logo flex items-center gap-2">
                    <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
                    <p className="font-bold text-xl">DevEvents</p>
                </Link>

                <div className="flex items-center gap-6 font-medium">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <Link href="/events" className="hover:text-blue-600">Explore</Link>

                    {token ? (
                        <>
                            <Link href="/events/create" className="hover:text-blue-600 transition-colors">Create Event</Link>
                            <Link href="/my-bookings" className="hover:text-blue-600 transition-colors">My Bookings</Link>
                            <Link href="/my-events" className="hover:text-blue-600 transition-colors font-semibold text-purple-400">My Dashboard</Link>
                            <button onClick={logout} className="text-red-500 hover:text-red-700">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="hover:text-blue-600">Login</Link>
                            <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
