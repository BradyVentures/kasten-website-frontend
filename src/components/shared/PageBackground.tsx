import Image from 'next/image';

interface PageBackgroundProps {
  image: string;
}

export default function PageBackground({ image }: PageBackgroundProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Full image — same as hero on homepage */}
      <Image
        src={image}
        alt=""
        fill
        className="object-cover"
      />

      {/* Dark cinematic gradients — identical to homepage hero */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />

      {/* Animated red accent glow — same as homepage */}
      <div className="absolute inset-0 opacity-30 mix-blend-overlay">
        <div
          className="absolute -top-1/2 -left-1/4 w-[80vw] h-[80vw] rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(199,3,4,0.3) 0%, transparent 70%)',
            animationDuration: '6s',
          }}
        />
        <div
          className="absolute -bottom-1/3 -right-1/4 w-[60vw] h-[60vw] rounded-full animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(199,3,4,0.15) 0%, transparent 70%)',
            animationDuration: '8s',
            animationDelay: '3s',
          }}
        />
      </div>
    </div>
  );
}
