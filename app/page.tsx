import Image from "next/image";
import {
  ArrowDown,
  BadgeCheck,
  Clock3,
  MapPin,
  MessageCircle,
  Scissors,
  Sparkles,
} from "lucide-react";
import { ShowcaseVideo } from "@/components/ShowcaseVideo";
import { siteConfig } from "@/lib/site-config";

const services = [
  {
    icon: Scissors,
    name: "Classic cut",
    description: "A clean, even cut shaped around your style.",
  },
  {
    icon: Sparkles,
    name: "Fade & taper",
    description: "Low, mid or high — finished with sharp detail.",
  },
  {
    icon: BadgeCheck,
    name: "Final detailing",
    description: "Neckline, sideburns and edges cleaned up.",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <div className="barber-stripe h-1.5" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#090909]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="Back to top">
            <Image
              src="/logo.png"
              alt=""
              width={48}
              height={48}
              priority
              className="h-11 w-11 rounded-full border border-[#d4ad63]/50 object-cover"
            />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#d4ad63]">
                Samoset
              </p>
              <p className="font-serif text-base font-black leading-none text-[#f0e6cf]">
                Barbershop
              </p>
            </div>
          </a>

          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2.5 text-sm font-black text-[#071b0e] shadow-lg shadow-[#25d366]/10 transition hover:-translate-y-0.5 hover:bg-[#45e17e]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Book on WhatsApp</span>
            <span className="sm:hidden">Book now</span>
          </a>
        </div>
      </header>

      <section className="relative">
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid min-h-[calc(100svh-73px)] max-w-6xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.72fr] lg:gap-20 lg:py-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/65">
              <MapPin className="h-3.5 w-3.5 text-[#d4ad63]" aria-hidden="true" />
              Samoset Housing · Queensbury
            </div>

            <h1 className="mt-6 max-w-xl font-serif text-6xl font-black leading-[0.88] tracking-[-0.04em] text-[#f0e6cf] sm:text-7xl lg:text-[5.65rem]">
              Sharp cuts.
              <span className="block text-[#d4ad63]">Honest price.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/55 sm:text-lg">
              Clean fades and classic cuts by Hugo, right inside Samoset Housing.
              Simple booking, no fuss.
            </p>

            <div className="mt-7 flex flex-wrap items-end gap-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                  Every haircut
                </p>
                <p className="font-serif text-6xl font-black leading-none text-white">
                  $5
                </p>
              </div>
              <p className="max-w-[13rem] pb-1 text-sm leading-5 text-white/40">
                Message Hugo to check the chair is available.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#25d366] px-6 py-4 text-base font-black text-[#071b0e] shadow-xl shadow-[#25d366]/10 transition hover:-translate-y-0.5 hover:bg-[#45e17e]"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Book on WhatsApp
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.035] px-6 py-4 text-base font-bold text-white transition hover:border-white/30 hover:bg-white/[0.07]"
              >
                See the result
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/45">
              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[#d4ad63]" aria-hidden="true" />
                Evening appointments
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-[#d4ad63]" aria-hidden="true" />
                Confirmed personally
              </span>
            </div>
          </div>

          <div id="work" className="scroll-mt-24">
            <ShowcaseVideo />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="max-w-xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d4ad63]">
              What you get
            </p>
            <h2 className="mt-3 font-serif text-4xl font-black text-[#f0e6cf] sm:text-5xl">
              The details make the cut.
            </h2>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.name}
                  className="rounded-3xl border border-white/10 bg-black/25 p-6 transition hover:-translate-y-1 hover:border-[#d4ad63]/35"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#b62425]/15 text-[#e55252]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl font-black text-white">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/45">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#d4ad63]/25 bg-[#15120d] px-6 py-10 text-center shadow-2xl sm:px-12 sm:py-14">
          <div className="booking-glow pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d4ad63]">
              Ready for a fresh cut?
            </p>
            <h2 className="mt-3 font-serif text-4xl font-black text-[#f0e6cf] sm:text-5xl">
              Your chair is one message away.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-white/50 sm:text-base">
              Tap below and WhatsApp will open with your booking message ready to
              send. Hugo will confirm the time with you.
            </p>
            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-2xl bg-[#25d366] px-6 py-4 text-base font-black text-[#071b0e] shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#45e17e]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Contact Hugo on WhatsApp
            </a>
            <p className="mt-4 text-xs text-white/35">
              {siteConfig.phoneDisplay} · Appointments are confirmed personally
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-7 text-center text-xs text-white/30 sm:flex-row sm:px-8 sm:text-left">
          <p>© 2026 Samoset Barbershop · Haircuts by Hugo</p>
          <p>Low budget. High confidence.</p>
        </div>
        <div className="barber-stripe h-1.5" />
      </footer>

      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Book a haircut on WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-[#071b0e] shadow-2xl shadow-black/40 transition hover:scale-105 sm:hidden"
      >
        <MessageCircle className="h-6 w-6" aria-hidden="true" />
      </a>
    </main>
  );
}
