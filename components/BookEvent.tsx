"use client"

import { useState } from "react"
import { useActionState } from "react"
import { createBooking } from "@/lib/actions/booking.action"


const initialState = {
    success: false,
    message: "",
    errors: {}
}

export default function BookEvent({ eventId, userId }: { eventId: string, userId?: string }) {
    if (!userId) {
        return (
            <div className="flex flex-col items-center justify-center p-6 bg-gray-800 border border-gray-700 rounded-xl mt-4 text-center">
                <p className="text-gray-300 mb-4 text-sm font-medium">Authentication Required</p>
                <a
                    href="/login"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-all shadow-md hover:shadow-lg"
                >
                    Login to Book
                </a>
            </div>
        );
    }
    const createBookingWithId = createBooking.bind(null, eventId, userId);

    const [state, action, isPending] = useActionState(createBookingWithId, initialState)

    return (
        <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Book Your Spot</h2>
            {state.success ? (
                <div className="text-green-600 p-2 bg-green-50 rounded">
                    {state.message}
                </div>
            ) : (
                <form action={action} className="space-y-4">
                    {!state.success && state.message && (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm mb-4">
                            ⚠️ {state.message}
                        </div>
                    )}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">Name</label>
                        <input name="name" id="name" className="border p-2 w-full rounded" />
                        {state.errors?.name && <p className="text-red-500 text-sm">{state.errors.name[0]}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">Email</label>
                        <input type="email" id="email" name="email" className="border p-2 w-full rounded" />
                        {state.errors?.email && <p className="text-red-500 text-sm">{state.errors.email[0]}</p>}
                    </div>

                    <div>
                        <label htmlFor="guestCount" className="block text-sm font-medium">Guest Count</label>
                        <input type="number" id="guestCount" name="guestCount" className="border p-2 w-full rounded" />
                        {state.errors?.guestCount && <p className="text-red-500 text-sm">{state.errors.guestCount[0]}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isPending ? "Booking..." : "Confirm Booking"}
                    </button>
                </form>
            )}
        </div>
    )
}