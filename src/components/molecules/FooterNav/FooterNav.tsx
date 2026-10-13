import { cn } from 'cn';
import { FooterLink } from '@/components/atoms/FooterLink/FooterLink';

const FOOTER_LINKS = [
  {
    href: 'https://github.com/Mate-Team-Group-5/simple-electronics-store',
    label: 'Github',
  },
  { href: 'https://github.com/Mate-Team-Group-5', label: 'Contacts' },
  {
    href: 'https://github.com/Mate-Team-Group-5/simple-electronics-store',
    label: 'Rights',
  },
];

type FooterNavProps = {
  className?: string;
};

export function FooterNav({ className }: FooterNavProps) {
  return (
    <nav
      aria-label="Footer"
      className={className}
    >
      <ul
        className={cn(
          'flex flex-col gap-4',
          'tablet:flex-row tablet:items-center tablet:justify-between',
        )}
      >
        {FOOTER_LINKS.map(({ href, label }) => (
          <li key={label}>
            <FooterLink href={href}>{label}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
