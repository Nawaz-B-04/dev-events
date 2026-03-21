import { getBookingsByEmail } from "@/lib/actions/booking.action";
import EventCard from "@/components/EventCard";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

import { Suspense } from "react";

function MyBookingPageInner({ token }: { token: string | null }) {
  if (!token) return <div>Please log in</div>;
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || "fallback_dev_password");
  const { payload } = jwtVerify(token, secretKey);
  const email = payload.email as string;
  // ...existing code to fetch bookings and render...
  return null; // Replace with actual JSX
}

export default function MyBookingPageWrapper() {
  return (
    <Suspense fallback={<div>Loading your bookings...</div>}>
      <MyBookingPageWithCookies />
    </Suspense>
  );
}

async function MyBookingPageWithCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value || null;
  return <MyBookingPageInner token={token} />;
}