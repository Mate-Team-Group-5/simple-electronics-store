import { cn } from 'cn';

type SliderDotProps = {
  isActive: boolean;
  label: string;
  onClick: () => void;
};

export function SliderDot({ isActive, label, onClick }: SliderDotProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={isActive}
      onClick={onClick}
      className="group flex size-6 items-center justify-center"
    >
      <span
        className={cn(
          'h-1 w-3.5 transition-colors',
          isActive ? 'bg-text-primary' : 'bg-elements group-hover:bg-icons',
        )}
      />
    </button>
  );
}
