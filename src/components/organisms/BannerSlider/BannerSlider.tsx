import { useEffect, useRef, useState, type TouchEvent } from 'react';
import { cn } from 'cn';
import { SliderButton } from '@/components/atoms/SliderButton/SliderButton';
import { SliderDots } from '@/components/molecules/SliderDots/SliderDots';
import bannerPhones from '@/assets/img/banner-phones.png';
import bannerTablets from '@/assets/img/banner-tablets.png';
import bannerAccessories from '@/assets/img/banner-accessories.png';
import { Link } from 'react-router';

const SLIDES = [
  { src: bannerPhones, alt: 'New phones', to: '/phones' },
  { src: bannerTablets, alt: 'New tablets', to: '/tablets' },
  { src: bannerAccessories, alt: 'New accessories', to: '/accessories' },
];

const SLIDES_COUNT = SLIDES.length;
const AUTOPLAY_DELAY = 5000;
const SWIPE_THRESHOLD = 50;

type BannerSliderProps = {
  className?: string;
};

export function BannerSlider({ className }: BannerSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const intervalRef = useRef<number | undefined>(undefined);
  const [timerKey, setTimerKey] = useState(0);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES_COUNT);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(intervalRef.current);
  }, [timerKey]);

  const changeSlide = (getIndex: (prev: number) => number) => {
    window.clearInterval(intervalRef.current);
    setActiveIndex(getIndex);
    setTimerKey((key) => key + 1);
  };

  const showNext = () => {
    changeSlide((prev) => (prev + 1) % SLIDES_COUNT);
  };

  const showPrev = () => {
    changeSlide((prev) => (prev - 1 + SLIDES_COUNT) % SLIDES_COUNT);
  };

  const showSlide = (index: number) => {
    changeSlide(() => index);
  };

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) {
      return;
    }

    const distance = touchStartX.current - event.changedTouches[0].clientX;

    if (distance > SWIPE_THRESHOLD) {
      showNext();
    }

    if (distance < -SWIPE_THRESHOLD) {
      showPrev();
    }

    touchStartX.current = null;
  };

  return (
    <section
      aria-label="Promo banners"
      className={cn('flex flex-col gap-2', className)}
    >
      <div className="flex aspect-square gap-4 tablet:aspect-auto tablet:h-[189px] desktop:h-[400px]">
        <SliderButton
          direction="left"
          onClick={showPrev}
          className="hidden tablet:flex"
        />

        <div
          className="relative min-w-0 flex-1 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {SLIDES.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <Link
                  key={slide.to}
                  to={slide.to}
                  tabIndex={isActive ? 0 : -1}
                  aria-hidden={!isActive}
                  className="h-full w-full shrink-0"
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                </Link>
              );
            })}
          </div>
        </div>

        <SliderButton
          direction="right"
          onClick={showNext}
          className="hidden tablet:flex"
        />
      </div>

      <SliderDots
        count={SLIDES_COUNT}
        activeIndex={activeIndex}
        onSelect={showSlide}
      />
    </section>
  );
}
