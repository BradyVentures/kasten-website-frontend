interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({ title, subtitle, centered = true, className = '' }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-heading font-black leading-[0.95] tracking-tight mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-400 to-brand-red-light">
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto font-body">
          {subtitle}
        </p>
      )}
    </div>
  );
}
