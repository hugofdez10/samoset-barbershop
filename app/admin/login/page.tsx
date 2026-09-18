import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <main className="grid min-h-screen place-items-center px-5 py-12">
      <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#111] p-7 shadow-vintage sm:p-9">
        <Image
          src="/logo.png"
          alt="Samoset Barbershop"
          width={96}
          height={96}
          className="mx-auto h-24 w-24 rounded-full border border-[#d4ad63]/40 object-cover"
          priority
        />
        <p className="mt-6 text-center text-xs font-black uppercase tracking-[0.28em] text-[#d4ad63]">
          Private area
        </p>
        <h1 className="mt-2 text-center font-serif text-3xl font-black text-[#f0e6cf]">
          Barber dashboard
        </h1>
        <p className="mt-3 text-center text-sm leading-6 text-white/45">
          Sign in to accept, reject and manage booking requests.
        </p>

        <AdminLoginForm />

        <Link
          href="/"
          className="mt-6 block text-center text-sm font-semibold text-white/40 transition hover:text-white/70"
        >
          ← Back to website
        </Link>
      </section>
    </main>
  );
}
