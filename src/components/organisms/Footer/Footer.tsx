import { Logo } from '@/components/atoms/Logo/Logo';
import { BackToTopButton } from '@/components/atoms/BackToTopButton/BackToTopButton';
import { FooterNav } from '@/components/molecules/FooterNav/FooterNav';

export function Footer() {
  return (
    <footer className="bg-white shadow-[0_-1px_0_0_var(--color-elements)]">
      <div className="flex flex-col gap-8 px-4 py-8 tablet:flex-row tablet:items-center tablet:px-6 desktop:mx-auto desktop:max-w-[1200px] desktop:px-8">
        <div className="tablet:flex-1">
          <Logo imageClassName="h-8 w-[89px] desktop:h-8 desktop:w-[89px]" />
        </div>

        <FooterNav className="tablet:flex-1" />

        <div className="flex justify-center tablet:flex-1 tablet:justify-end">
          <BackToTopButton />
        </div>
      </div>
    </footer>
  );
}
