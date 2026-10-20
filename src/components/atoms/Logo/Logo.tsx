import { Link } from 'react-router';
import { cn } from 'cn';
//import logo from 'img/header/logo.svg';

type LogoProps = {
  className?: string;
  imageClassName?: string;
};

export function Logo({ className, imageClassName }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn('flex shrink-0 items-center', className)}
    >
      <img
        src={`${import.meta.env.BASE_URL}img/header/logo.svg`}
        alt="Nice Gadgets"
        className={cn('h-5.5 w-16 desktop:h-7 desktop:w-20', imageClassName)}
      />
    </Link>
  );
}
