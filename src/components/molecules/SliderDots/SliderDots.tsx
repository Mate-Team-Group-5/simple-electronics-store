import { cn } from 'cn';
import { SliderDot } from '@/components/atoms/SliderDot/SliderDot';
import { useLanguage } from '@/context/LanguageContext';

type SliderDotsProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
};

export function SliderDots({
  count,
  activeIndex,
  onSelect,
  className,
}: SliderDotsProps) {
  const { t } = useLanguage();

  return (
    <div className={cn('flex justify-center gap-1', className)}>
      {Array.from({ length: count }, (_, index) => (
        <SliderDot
          key={index}
          isActive={index === activeIndex}
          label={t('slider.goTo', { number: index + 1 })}
          onClick={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
