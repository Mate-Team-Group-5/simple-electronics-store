import type { ReactNode } from 'react';
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from 'cn';

type AccordionProps = {
  defaultValue?: string[];
  children: ReactNode;
  className?: string;
};

export function Accordion({
  defaultValue,
  children,
  className,
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      multiple
      defaultValue={defaultValue}
      className={cn('flex flex-col', className)}
    >
      {children}
    </AccordionPrimitive.Root>
  );
}

type AccordionItemProps = {
  value: string;
  title: string;
  badge?: ReactNode;
  children: ReactNode;
};

export function AccordionItem({
  value,
  title,
  badge,
  children,
}: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      value={value}
      className="border-b border-elements last:border-b-0"
    >
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-2 py-4 text-left">
          <span className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-text-primary">{title}</span>

            {badge !== undefined && (
              <span className="text-xs text-text-secondary">{badge}</span>
            )}
          </span>

          <ChevronDown
            size={16}
            aria-hidden="true"
            className="shrink-0 text-text-secondary transition-transform duration-200 group-data-[panel-open]:rotate-180"
          />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>

      <AccordionPrimitive.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
        <div className="pb-4">{children}</div>
      </AccordionPrimitive.Panel>
    </AccordionPrimitive.Item>
  );
}
