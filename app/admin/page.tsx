import Image from "next/image";
import Link from "next/link";
import { CalendarCheck2, ClockAlert, LogOut, Scissors, XCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { BookingCard } from "@/components/BookingCard";
import { signOut } from "./actions";
import { isAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
import type { Booking } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  if (!isAdmin(user)) {
    return <NoAccess />;
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  const bookings = (data ?? []) as Booking[];
  const pending = bookings.filter((booking) => booking.status === "pending");
  const accepted = bookings.filter((booking) => booking.status === "accepted");
  const rejected = bookings.filter((booking) => booking.status === "rejected");

  return (
    <main className="min-h-screen">
      <div className="barber-stripe h-1.5" />
      <header className="border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Samoset Barbershop"
              width={52}
              height={52}
              className="h-12 w-12 rounded-full border border-[#d4ad63]/35 object-cover"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d4ad63]">
                Admin
              </p>
              <h1 className="font-serif text-xl font-black text-[#f0e6cf]">
                Booking dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold text-white/60 transition hover:bg-white/10 sm:inline-flex"
            >
              View website
            </Link>
            <form action={signOut}>
              <button className="inline-flex items-center gap-2 rounded-xl bg-[#b62425] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#d12d2e]">
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard icon={ClockAlert} label="Pending" value={pending.length} />
          <StatCard icon={CalendarCheck2} label="Accepted" value={accepted.length} />
          <StatCard icon={XCircle} label="Rejected" value={rejected.length} />
        </div>

        {error ? (
          <p className="mt-8 rounded-2xl border border-red-500/25 bg-red-500/10 p-4 text-red-200">
            The bookings could not be loaded. Check Supabase and your database policies.
          </p>
        ) : null}

        <BookingSection title="Pending requests" bookings={pending} empty="No pending requests." />
        <BookingSection title="Accepted appointments" bookings={accepted} empty="No accepted appointments." />
        <BookingSection title="Rejected requests" bookings={rejected} empty="No rejected requests." />
      </div>
    </main>
  );
}

function NoAccess() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-12">
      <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#111] p-7 text-center shadow-vintage sm:p-9">
        <h1 className="font-serif text-3xl font-black text-[#f0e6cf]">No access</h1>
        <p className="mt-3 text-sm leading-6 text-white/45">
          This account is not allowed to manage bookings.
        </p>
        <form action={signOut} className="mt-6">
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#b62425] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#d12d2e]">
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </section>
    </main>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Scissors;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold text-white/50">{label}</p>
        <Icon className="h-5 w-5 text-[#d4ad63]" />
      </div>
      <p className="mt-4 font-serif text-4xl font-black text-[#f0e6cf]">{value}</p>
    </div>
  );
}

function BookingSection({
  title,
  bookings,
  empty,
}: {
  title: string;
  bookings: Booking[];
  empty: string;
}) {
  return (
    <section className="mt-12">
      <div className="mb-5 flex items-center gap-3">
        <h2 className="font-serif text-3xl font-black text-[#f0e6cf]">{title}</h2>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-bold text-white/40">
          {bookings.length}
        </span>
      </div>

      {bookings.length ? (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-white/10 px-5 py-12 text-center text-white/35">
          {empty}
        </div>
      )}
    </section>
  );
}
