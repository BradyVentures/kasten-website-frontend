import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '../shared/Container';

interface ProductHeroProps {
  title: string;
  description: string;
  image?: string;
  ctaText?: string;
}

export default function ProductHero({ title, description, ctaText = 'Kostenlose Beratung anfragen' }: ProductHeroProps) {
  return (
    <section className="relative pt-8 pb-16">
      <Container>
        <div className="text-center">
          {/* Badge — identical to homepage */}
          <div className="mb-5 flex justify-center">
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.12] backdrop-blur-xl border border-white/[0.08]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red" />
              </span>
              <span className="text-white/70 text-xs font-heading font-bold tracking-[0.15em] uppercase">
                Bauelemente Kasten
              </span>
            </span>
          </div>

          {/* Title — red gradient like "neu gedacht." */}
          <h1 className="text-[clamp(2rem,5vw,4.5rem)] font-heading font-black leading-[0.95] tracking-tight mb-5">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-400 to-brand-red-light">
              {title}.
            </span>
          </h1>

          <p className="text-base md:text-lg text-white/80 font-body leading-relaxed mb-8 max-w-xl mx-auto">{description}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-heading font-bold text-white bg-gradient-to-r from-brand-red via-red-500 to-brand-red-light rounded-xl shadow-lg shadow-brand-red/25 hover:shadow-brand-red/40 hover:brightness-110 transition-all duration-300"
            >
              {ctaText}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/visualizer"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-heading font-bold text-white/80 hover:text-white rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.14] backdrop-blur-xl transition-all duration-300"
            >
              Produktvorschau testen
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
