import { Heart } from 'lucide-react';
import { cn } from 'cn';

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
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
      aria-pressed={isFavourite}
      className={cn(
        'flex size-10 shrink-0 cursor-pointer hover:border-text-primary items-center justify-center border transition-colors',
        isFavourite ? 'border-elements' : 'border-icons',
        className,
      )}
    >
      <Heart
        size={16}
        className={isFavourite ? 'fill-red text-red' : 'text-text-primary'}
      />
    </button>
  );
}
