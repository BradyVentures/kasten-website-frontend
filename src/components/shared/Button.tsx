import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const variants = {
  primary: 'bg-gradient-to-r from-brand-red via-red-500 to-brand-red-light text-white shadow-lg shadow-brand-red/25 hover:shadow-brand-red/40 hover:brightness-110',
  secondary: 'bg-white/[0.06] border border-white/10 text-white/80 hover:bg-white/[0.1] hover:text-white backdrop-blur-sm',
  outline: 'border border-white/15 text-white/70 hover:bg-white/[0.06] hover:text-white hover:border-white/25 backdrop-blur-sm',
  white: 'bg-white text-brand-red hover:bg-white/[0.06] shadow-lg',
};

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-8 py-4 text-base',
};

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center font-heading font-bold rounded-xl transition-all duration-300 ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={baseClasses}>
      {children}
    </button>
  );
}
