"use client";

import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

type FormState = {
  fullName: string;
  room: string;
  contact: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  website: string;
};

const initialState: FormState = {
  fullName: "",
  room: "",
  contact: "",
  service: "",
  date: "",
  time: "",
  notes: "",
  website: "",
};

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(2026, 0, 1, hour, minute));
}

export function BookingForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const dateLimits = useMemo(() => {
    const today = new Date();
    const max = new Date();
    max.setDate(max.getDate() + 30);
    return { min: toDateInputValue(today), max: toDateInputValue(max) };
  }, []);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setSent(false);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not send the request.");
      setForm(initialState);
      setSent(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const fieldClass =
    "min-w-0 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-[#d4ad63]/60";

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 text-left shadow-2xl backdrop-blur sm:p-6"
    >
      <h2 className="text-center font-serif text-2xl font-black text-[#f0e6cf]">
        Request a $5 haircut
      </h2>
      <p className="mt-1 text-center text-sm text-white/40">
        It is not confirmed until Hugo accepts it.
      </p>

      <div className="mt-5 grid gap-3">
        <input
          required
          value={form.fullName}
          onChange={(event) => update("fullName", event.target.value)}
          placeholder="Your name"
          aria-label="Your name"
          className={fieldClass}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            value={form.room}
            onChange={(event) => update("room", event.target.value)}
            placeholder="Room"
            aria-label="Room"
            className={fieldClass}
          />
          <input
            required
            value={form.contact}
            onChange={(event) => update("contact", event.target.value)}
            placeholder="Contact"
            aria-label="Contact"
            className={fieldClass}
          />
        </div>

        <textarea
          required
          value={form.service}
          onChange={(event) => update("service", event.target.value)}
          placeholder="What do you want? Example: sideburn fade, taper fade, full haircut..."
          aria-label="What haircut do you want?"
          rows={4}
          className={`${fieldClass} resize-y`}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            required
            type="date"
            min={dateLimits.min}
            max={dateLimits.max}
            value={form.date}
            onChange={(event) => update("date", event.target.value)}
            aria-label="Date"
            className={fieldClass}
          />
          <select
            required
            value={form.time}
            onChange={(event) => update("time", event.target.value)}
            aria-label="Time"
            className={fieldClass}
          >
            <option value="">Time</option>
            {siteConfig.timeSlots.map((time) => (
              <option key={time} value={time}>
                {formatTime(time)}
              </option>
            ))}
          </select>
        </div>

        <label className="hidden" aria-hidden="true">
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </label>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}

      {sent ? (
        <div className="mt-4 flex gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          Request sent. Wait for Hugo&apos;s confirmation.
        </div>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f0e6cf] px-5 py-3.5 font-black text-black transition hover:bg-white disabled:opacity-60"
      >
        {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send request"}
      </button>
    </form>
  );
}
