import { PageTitle } from '@/components/atoms/PageTitle/PageTitle';
import { BannerSlider } from '@/components/organisms/BannerSlider/BannerSlider';

export function HomePage() {
  return (
    <>
      <PageTitle className="mt-6 mb-6 tablet:mt-8 tablet:mb-8 desktop:mt-14 desktop:mb-14">
        Welcome to Nice Gadgets store!
      </PageTitle>

      <BannerSlider className="-mx-4 tablet:mx-0" />
    </>
  );
}
