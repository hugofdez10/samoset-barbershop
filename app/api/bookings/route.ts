import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/lib/site-config";

const bookingSchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  room: z.string().trim().max(40).optional().default(""),
  contact: z.string().trim().min(3).max(100),
  service: z.string().trim().min(2).max(160),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.enum(
    siteConfig.timeSlots as unknown as [
      (typeof siteConfig.timeSlots)[number],
      ...(typeof siteConfig.timeSlots)[number][],
    ],
  ),
  notes: z.string().trim().max(500).optional().default(""),
  website: z.string().max(0).optional().default(""),
});

function todayInNewYork() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = bookingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and complete every required field." },
        { status: 400 },
      );
    }

    if (parsed.data.date < todayInNewYork()) {
      return NextResponse.json(
        { error: "The appointment date cannot be in the past." },
        { status: 400 },
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      return NextResponse.json(
        { error: "Booking is not configured yet." },
        { status: 500 },
      );
    }

    const supabase = createClient(url, key, {
      auth: { persistSession: false },
    });

    const { error } = await supabase.from("bookings").insert({
      full_name: parsed.data.fullName,
      room: parsed.data.room || null,
      contact: parsed.data.contact,
      service: parsed.data.service,
      appointment_date: parsed.data.date,
      appointment_time: parsed.data.time,
      notes: parsed.data.notes || null,
      status: "pending",
    });

    if (error) {
      console.error("Supabase booking error:", error);
      return NextResponse.json(
        { error: "The request could not be saved. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Booking route error:", error);
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 },
    );
  }
}
