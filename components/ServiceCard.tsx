import { Clock3, Scissors } from "lucide-react";

type Props = {
  name: string;
  description: string;
  duration: string;
};

export function ServiceCard({ name, description, duration }: Props) {
  return (
    <article className="group rounded-3xl border border-white/10 bg-white/[0.045] p-6 transition hover:-translate-y-1 hover:border-[#d4ad63]/40 hover:bg-white/[0.07]">
      <div className="mb-5 inline-flex rounded-2xl border border-[#d4ad63]/30 bg-[#d4ad63]/10 p-3 text-[#d4ad63]">
        <Scissors className="h-6 w-6" />
      </div>
      <h3 className="font-serif text-2xl font-black text-[#f0e6cf]">{name}</h3>
      <p className="mt-3 leading-7 text-white/60">{description}</p>
      <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-white/50">
        <Clock3 className="h-4 w-4" />
        {duration}
      </div>
    </article>
  );
}
