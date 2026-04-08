import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  href?: string;
  image?: string;
  icon?: React.ReactNode;
  className?: string;
}

export default function Card({ title, description, href, image, icon, className = '' }: CardProps) {
  const content = (
    <div className={`group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden ${className}`}>
      {image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6">
        {icon && (
          <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4 text-brand-red">
            {icon}
          </div>
        )}
        <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-brand-red transition-colors">
          {title}
        </h3>
        <p className="text-white/80 font-body">{description}</p>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
