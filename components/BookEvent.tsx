"use client"

import { useState } from "react"

export default function BookEvent() {
    const [email, setEmail] = useState()
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleChange = (e) => {
        const change = e.target.value
        setEmail(change)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
    }
    return (
        <div id="book-event">
            {isSubmitted ?
                <p>Thank you for submitting</p> :
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" id="email" value={email} onChange={handleChange} placeholder="Enter Your email address" />
                        
                    </div>
                    <button type="submit" className="button-submit">Submit</button>
                </form>
            }
        </div>
    )
}