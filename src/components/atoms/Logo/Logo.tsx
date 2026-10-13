import { Link } from 'react-router';
import { cn } from 'cn';
import logo from '@/assets/img/header/logo.svg';

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn('flex shrink-0 items-center', className)}
    >
      <img
        src={logo}
        alt="Nice Gadgets"
        className="h-[22px] w-16 desktop:h-7 desktop:w-20"
      />
    </Link>
  );
}
