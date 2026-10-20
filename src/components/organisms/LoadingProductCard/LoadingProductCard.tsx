import React from 'react';
import cn from 'classnames';
import { Card } from '@/components/atoms/Card';

import './LoadingProductCard.css';

export const LoadingProductCard: React.FC = () => {
  return (
    <>
      <Card
        className={cn(
          'shrink-0 w-68 h-126.5 ',
          'border-box p-8',
          'flex-col gap-0 snap-x snap-mandatory',
          'scroll-smooth hoverAnimations',
          'bg-card-background',
          'hover:shadow-lg hover:shadow-black/10',
        )}
      >
        <div
          data-slot="img "
          className={cn(
            'w-full flex-1 bg-sidebar-ring ',
            'rounded-lg',
            'bg-[linear-gradient(135deg,var(--sidebar-ring),var(--sidebar-border),var(--sidebar-ring))] bg-size-[200%_200%]',

            'animate-gradient',
          )}
        ></div>
        <div
          data-slot="name"
          className={cn(
            'w-full h-10.5 bg-sidebar-ring mt-2',
            'rounded-lg',
            'bg-[linear-gradient(135deg,var(--sidebar-ring),var(--sidebar-border),var(--sidebar-ring))] bg-size-[200%_200%]',

            'animate-gradient',
          )}
        ></div>
        <div
          data-slot="price"
          className={cn(
            'w-[50%] h-7.75 bg-sidebar-ring mt-2',
            'rounded-lg',
            'bg-[linear-gradient(135deg,var(--sidebar-ring),var(--sidebar-border),var(--sidebar-ring))] bg-size-[200%_200%]',

            'animate-gradient',
          )}
        ></div>
        <div
          data-slot="discriptions"
          className="flex flex-col justify-evenly h-19.25"
        >
          <div
            data-slot="data"
            className={cn(
              'w-full h-3.75 bg-sidebar-ring',
              'rounded-lg',
              'bg-[linear-gradient(135deg,var(--sidebar-ring),var(--sidebar-border),var(--sidebar-ring))] bg-size-[200%_200%]',

              'animate-gradient',
            )}
          ></div>
          <div
            data-slot="data"
            className={cn(
              'w-full h-3.75 bg-sidebar-ring',
              'rounded-lg',
              'bg-[linear-gradient(135deg,var(--sidebar-ring),var(--sidebar-border),var(--sidebar-ring))] bg-size-[200%_200%]',

              'animate-gradient',
            )}
          ></div>
          <div
            data-slot="data"
            className={cn(
              'w-full h-3.75 bg-sidebar-ring',
              'rounded-lg',
              'bg-[linear-gradient(135deg,var(--sidebar-ring),var(--sidebar-border),var(--sidebar-ring))] bg-size-[200%_200%]',

              'animate-gradient',
            )}
          ></div>
        </div>
        <div
          data-slot="button"
          className={cn(
            'w-full h-10 bg-sidebar-ring',
            'rounded-lg',
            'bg-[linear-gradient(135deg,var(--sidebar-ring),var(--sidebar-border),var(--sidebar-ring))] bg-size-[200%_200%]',
            'animate-gradient',
          )}
        ></div>
      </Card>
    </>
  );
};
