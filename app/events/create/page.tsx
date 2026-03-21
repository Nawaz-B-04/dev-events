"use client";

import { createEvent } from "@/lib/actions/event.actions";
import { useActionState, useState } from "react";
import FileUploader from "@/components/FileUploader";

const initialState = {
    success: false,
    message: ""
};

export default function CreateEventPage() {
    const [imageUrl, setImageUrl] = useState("");
    const [state, formAction, isPending] = useActionState(createEvent, initialState);

    return (
        <section className="bg-slate-950 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 min-h-screen">
            <div className="wrapper max-w-5xl mx-auto p-8 bg-slate-900 rounded-2xl shadow-xl border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-3xl font-bold mb-8 text-white border-b border-slate-800 pb-4">Create New Event</h3>

                {state.message && (
                    <div className={`p-4 mb-6 rounded-lg font-medium border ${state.success ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        {state.message}
                    </div>
                )}

                <form action={formAction} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-6 md:flex-row">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-semibold text-gray-300">Event Title</label>
                            <input type="text" name="title" placeholder="e.g. Next.js Conf 2024" required className="w-full border border-slate-800 p-3 rounded-lg bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600" />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-semibold text-gray-300">Category</label>
                            <select name="category" className="w-full border border-slate-800 p-3 rounded-lg bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                                <option value="Tech">Tech</option>
                                <option value="Health">Health</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 md:flex-row">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-semibold text-gray-300">Description</label>
                            <textarea name="description" placeholder="Describe your event..." rows={8} className="w-full border border-slate-800 p-3 rounded-lg bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600" />
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-semibold text-gray-300">Event Image</label>
                            <FileUploader
                                onFieldChange={setImageUrl}
                                imageUrl={imageUrl}
                            />
                            <input type="hidden" name="imageUrl" value={imageUrl} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 md:flex-row">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-semibold text-gray-300">Location</label>
                            <div className="relative">
                                <input type="text" name="location" placeholder="Event Location or Online" className="w-full border border-slate-800 p-3 rounded-lg bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pl-10 placeholder-gray-600" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-3.5 text-gray-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 md:flex-row">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-semibold text-gray-300">Start Date</label>
                            <input type="datetime-local" name="startDate" className="w-full border border-slate-800 p-3 rounded-lg bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all [color-scheme:dark]" />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-semibold text-gray-300">End Date</label>
                            <input type="datetime-local" name="endDate" className="w-full border border-slate-800 p-3 rounded-lg bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all [color-scheme:dark]" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 md:flex-row">
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-semibold text-gray-300">Price</label>
                            <input type="text" name="price" placeholder="Free" className="w-full border border-slate-800 p-3 rounded-lg bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600" />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <label className="font-semibold text-gray-300">URL</label>
                            <input type="url" name="url" placeholder="https://..." className="w-full border border-slate-800 p-3 rounded-lg bg-slate-950 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-600" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl mt-6 hover:bg-blue-700 transition shadow-lg hover:shadow-xl disabled:opacity-70 flex justify-center items-center gap-2"
                    >
                        {isPending ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </>
                        ) : 'Create Event'}
                    </button>
                </form>
            </div>
        </section>
    )
}
