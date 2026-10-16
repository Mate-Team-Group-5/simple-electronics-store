import { cn } from 'cn';

type BannerSlideProps = {
  image: string;
  title: string;
  subtitle: string;
  bgClassName: string;
};

export function BannerSlide({
  image,
  title,
  subtitle,
  bgClassName,
}: BannerSlideProps) {
  return (
    <div
      className={cn(
        'flex h-full flex-col gap-4 overflow-hidden p-6',
        'tablet:flex-row tablet:items-center tablet:gap-6 tablet:p-8 desktop:p-12',
        bgClassName,
      )}
    >
      <div className="flex shrink-0 flex-col gap-2 tablet:w-2/5 desktop:gap-4">
        <p className="text-xs font-semibold tracking-widest text-white/60 uppercase">
          Now available
        </p>

        <h2 className="text-2xl font-bold text-white desktop:text-5xl">
          {title}
        </h2>

        <p className="text-sm text-white/70 desktop:text-base">{subtitle}</p>

        <span className="mt-2 hidden w-fit border border-white px-6 py-2 text-xs font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-white group-hover:text-text-primary tablet:inline-block desktop:mt-6">
          Order now
        </span>
      </div>

      <img
        src={image}
        alt=""
        draggable={false}
        className="min-h-0 min-w-0 flex-1 object-contain drop-shadow-2xl tablet:h-full"
      />
    </div>
  );
}
