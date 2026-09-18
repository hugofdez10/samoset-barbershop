import { CalendarDays, Clock3, Instagram, MapPin, MessageSquareText, Trash2 } from "lucide-react";
import { deleteBooking, setBookingStatus } from "@/app/admin/actions";
import type { Booking } from "@/lib/types";

const statusStyles = {
  pending: "border-amber-400/25 bg-amber-400/10 text-amber-200",
  accepted: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
  rejected: "border-red-400/25 bg-red-400/10 text-red-200",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

function formatTime(value: string) {
  const [hour, minute] = value.slice(0, 5).split(":").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(2026, 0, 1, hour, minute));
}

export function BookingCard({ booking }: { booking: Booking }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-serif text-2xl font-black text-[#f0e6cf]">
              {booking.full_name}
            </h3>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${statusStyles[booking.status]}`}
            >
              {booking.status}
            </span>
          </div>
          <p className="mt-2 font-semibold text-[#d4ad63]">
            {booking.service}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {booking.status !== "accepted" ? (
            <form action={setBookingStatus}>
              <input type="hidden" name="id" value={booking.id} />
              <input type="hidden" name="status" value="accepted" />
              <button className="rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-bold text-white transition hover:bg-emerald-500">
                Accept
              </button>
            </form>
          ) : null}

          {booking.status !== "rejected" ? (
            <form action={setBookingStatus}>
              <input type="hidden" name="id" value={booking.id} />
              <input type="hidden" name="status" value="rejected" />
              <button className="rounded-lg bg-red-700 px-3.5 py-2 text-sm font-bold text-white transition hover:bg-red-600">
                Reject
              </button>
            </form>
          ) : null}

          {booking.status !== "pending" ? (
            <form action={setBookingStatus}>
              <input type="hidden" name="id" value={booking.id} />
              <input type="hidden" name="status" value="pending" />
              <button className="rounded-lg border border-white/15 px-3.5 py-2 text-sm font-bold text-white/70 transition hover:bg-white/10">
                Pending
              </button>
            </form>
          ) : null}
        </div>
      </div>

      <div className="mt-6 grid gap-3 text-sm text-white/60 sm:grid-cols-2">
        <p className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-[#d4ad63]" />
          {formatDate(booking.appointment_date)}
        </p>
        <p className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-[#d4ad63]" />
          {formatTime(booking.appointment_time)}
        </p>
        <p className="flex items-center gap-2">
          <Instagram className="h-4 w-4 text-[#d4ad63]" />
          {booking.contact}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-[#d4ad63]" />
          {booking.room || "Room not provided"}
        </p>
      </div>

      {booking.notes ? (
        <div className="mt-5 flex gap-3 rounded-2xl bg-black/25 p-4 text-sm leading-6 text-white/55">
          <MessageSquareText className="mt-0.5 h-4 w-4 shrink-0 text-[#d4ad63]" />
          <p>{booking.notes}</p>
        </div>
      ) : null}

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <p className="text-xs text-white/25">
          Requested {new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(booking.created_at))}
        </p>
        <form action={deleteBooking}>
          <input type="hidden" name="id" value={booking.id} />
          <button
            aria-label={`Delete booking from ${booking.full_name}`}
            className="rounded-lg p-2 text-white/30 transition hover:bg-red-500/10 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </form>
      </div>
    </article>
  );
}
