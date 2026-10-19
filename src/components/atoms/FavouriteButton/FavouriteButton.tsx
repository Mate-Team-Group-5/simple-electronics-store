import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from 'cn';
import { useLanguage } from '@/context/LanguageContext';

type FavouriteButtonProps = {
  isFavourite: boolean;
  onClick: () => void;
  className?: string;
};

export function FavouriteButton({
  isFavourite,
  onClick,
  className,
}: FavouriteButtonProps) {
  const { t } = useLanguage();
  const [isPopping, setIsPopping] = useState(false);

  const handleClick = () => {
    if (!isFavourite) {
      setIsPopping(true);
    }

    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={t(
        isFavourite ? 'card.removeFromFavourites' : 'card.addToFavourites',
      )}
      aria-pressed={isFavourite}
      className={cn(
        'relative flex size-10 shrink-0 cursor-pointer hover:border-text-primary items-center justify-center border transition-colors',
        isFavourite ? 'border-elements' : 'border-icons',
        className,
      )}
    >
      {isPopping && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute size-6 animate-heart-burst rounded-full border-2 border-red motion-reduce:hidden"
        />
      )}

      <Heart
        size={16}
        onAnimationEnd={() => setIsPopping(false)}
        className={cn(
          isFavourite ? 'fill-red text-red' : 'text-text-primary',
          isPopping && 'animate-heart-pop motion-reduce:animate-none',
        )}
      />
    </button>
  );
}
