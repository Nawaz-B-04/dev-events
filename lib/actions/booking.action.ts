"use server"
import { bookingSchema } from "@/lib/validator"
import Booking from "@/database/booking.model"
import connectDB from "@/lib/mongodb"
import { Resend } from "resend";


export async function createBooking(eventId: string, userId: string, prevState: any, formData: FormData) { // useActionState hook automaticllay passes previous state, createBooking(pevState,formData)
  const rawData = Object.fromEntries(formData.entries())
  const parsedData = bookingSchema.safeParse(rawData)
  if (!parsedData.success) {
    return {
      success: false,
      errors: parsedData.error.flatten().fieldErrors
    };
  }
  const data = parsedData.data
  console.log("saving in db", data)

  try {
    await Booking.create({ ...data, eventId });
  } catch (error: any) {
    if (error.code === 11000) {
      return {
        success: false,
        message: "You have already booked this event with this email."
      }
    }
    throw error;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'onboarding@resend.dev', // Use this exact email for testing
    to: "nawazishb2004@gmail.com",       // The user's email from the form
    subject: 'Booking Confirmation - Event Platform',
    html: `
      <h1>Booking Confirmed!</h1>
      <p>Hi ${data.name},</p>
      <p>You have successfully booked <strong>${data.guestCount}</strong> tickets.</p>
      <p>We look forward to seeing you!</p>
    `
  });
  return {
    success: true,
    message: "Booking created successfully",
    data
  }
}

import Event from "@/database/event.model"

export async function getBookingsByEmail(email: string) {
  await connectDB()
  const bookings = await Booking.find({ email })
    .populate("eventId")
    .sort({ createdAt: -1 })
    .lean()

  return bookings
}