import { cn } from 'cn';

type ChoiceOptionProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  description?: string;
};

export function ChoiceOption({
  name,
  value,
  checked,
  onChange,
  title,
  description,
}: ChoiceOptionProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-3 border p-4 transition-colors',
        checked ? 'border-text-primary' : 'border-elements hover:border-icons',
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
      />

      <span className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-primary">{title}</span>
        {description && (
          <span className="text-xs text-secondary">{description}</span>
        )}
      </span>
    </label>
  );
}
