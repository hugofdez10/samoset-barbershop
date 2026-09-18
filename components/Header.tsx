import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="barber-stripe h-1.5 w-full" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Samoset Barbershop logo"
            width={52}
            height={52}
            className="h-12 w-12 rounded-full border border-[#d4ad63]/50 object-cover"
            priority
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d4ad63]">
              Samoset
            </p>
            <p className="font-serif text-lg font-black leading-none text-[#f0e6cf]">
              Barbershop
            </p>
          </div>
        </Link>

        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2.5 text-sm font-bold text-[#071b0e] transition hover:-translate-y-0.5 hover:bg-[#45e17e]"
        >
          <MessageCircle className="h-4 w-4" />
          Book on WhatsApp
        </a>
      </div>
    </header>
  );
}
