"use client";

import Signup from "@/lib/actions/auth.actions";
import { useActionState } from "react";


const initialState = {
    success: false,
    message: ""
};

export default function SignUpPage() {
    // Pass the server action function directly
    const [state, formAction, isPending] = useActionState(Signup, initialState);

    return (
        <div className="flex flex-col justify-center items-center py-20">
            <div className="w-full max-w-sm p-8 bg-white border border-gray-200 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h1>

                {state.message && (
                    <p className={`p-3 mb-4 text-sm rounded ${state.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {state.message}
                    </p>
                )}

                <form action={formAction} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-blue-600 text-white font-semibold p-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 mt-2"
                    >
                        {isPending ? "Creating Account..." : "Sign Up"}
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-4">
                        Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

