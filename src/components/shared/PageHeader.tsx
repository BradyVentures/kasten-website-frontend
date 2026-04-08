import Container from './Container';

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ badge, title, subtitle }: PageHeaderProps) {
  return (
    <div className="pt-8 pb-10">
      <Container>
        <div className="text-center">
          {badge && (
            <div className="mb-5 flex justify-center">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.12] backdrop-blur-xl border border-white/[0.08]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red" />
                </span>
                <span className="text-white/70 text-xs font-heading font-bold tracking-[0.15em] uppercase">
                  {badge}
                </span>
              </span>
            </div>
          )}
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-heading font-black leading-[0.95] tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-400 to-brand-red-light">
              {title}
            </span>
          </h1>
          {subtitle && (
            <p className="text-base md:text-lg text-white/80 font-body leading-relaxed max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
