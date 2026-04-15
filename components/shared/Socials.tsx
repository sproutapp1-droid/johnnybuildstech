import type { SVGProps } from 'react';

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4l16 16" />
    <path d="M20 4L4 20" />
  </svg>
);

const SOCIALS = [
  { href: 'https://x.com/johnnybuildr', label: 'X / Twitter', Icon: XIcon },
];

export function Socials({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-1.5 ${className}`}>
      {SOCIALS.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={label}
            className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-fg/10 text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
            <span className="sr-only">{label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
