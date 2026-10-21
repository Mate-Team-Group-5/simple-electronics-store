import { animate } from 'motion/react';

export type FlyTarget = 'cart' | 'favourites';

const FLIGHT_DURATION = 0.8;
const RING_SIZE = 40;

function findVisibleTarget(target: FlyTarget) {
  const candidates = document.querySelectorAll<HTMLElement>(
    `[data-fly-target="${target}"]`,
  );

  return Array.from(candidates).find(
    (element) => element.getClientRects().length > 0,
  );
}

function createFlyingCopy(source: HTMLElement, rect: DOMRect) {
  const copy = source.cloneNode(true) as HTMLElement;

  Object.assign(copy.style, {
    position: 'fixed',
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    margin: '0',
    zIndex: '60',
    pointerEvents: 'none',
    borderRadius: '16px',
    boxShadow: '0 12px 32px rgba(144, 91, 255, 0.35)',
    willChange: 'transform, opacity',
  });

  document.body.append(copy);

  return copy;
}

function createRing(rect: DOMRect) {
  const ring = document.createElement('span');

  Object.assign(ring.style, {
    position: 'fixed',
    left: `${rect.left + rect.width / 2 - RING_SIZE / 2}px`,
    top: `${rect.top + rect.height / 2 - RING_SIZE / 2}px`,
    width: `${RING_SIZE}px`,
    height: `${RING_SIZE}px`,
    borderRadius: '50%',
    border: '2px solid var(--color-accent-purple)',
    zIndex: '60',
    pointerEvents: 'none',
  });

  document.body.append(ring);

  return ring;
}

export function flyToTarget(source: HTMLElement, target: FlyTarget) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const targetElement = findVisibleTarget(target);

  if (!targetElement) {
    return;
  }

  const from = source.getBoundingClientRect();
  const to = targetElement.getBoundingClientRect();

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);

  const copy = createFlyingCopy(source, from);

  // x and y use different easings, so the copy flies along a curve:
  // it shoots up quickly (y) and drifts sideways slowly at first (x)
  const flight = animate(
    copy,
    {
      x: [0, dx],
      y: [0, dy],
      scale: [1, 1.08, 0.12],
      rotate: [0, target === 'cart' ? -14 : 14],
      opacity: [1, 1, 0.5],
    },
    {
      // each value has its own timing, so the duration is set for each one
      x: { duration: FLIGHT_DURATION, ease: [0.55, 0, 0.9, 0.45] },
      y: { duration: FLIGHT_DURATION, ease: [0.15, 0.6, 0.35, 1] },
      scale: { duration: FLIGHT_DURATION, times: [0, 0.15, 1], ease: 'easeIn' },
      rotate: { duration: FLIGHT_DURATION, ease: 'easeIn' },
      opacity: { duration: FLIGHT_DURATION, times: [0, 0.75, 1] },
    },
  );

  flight.finished.then(() => {
    copy.remove();

    // the icon pops and settles with a bouncy spring
    animate(
      targetElement,
      { scale: [1.35, 1] },
      { type: 'spring', stiffness: 520, damping: 11 },
    );

    // a ring spreads out from the icon and fades
    const ring = createRing(to);

    animate(
      ring,
      { scale: [0.4, 1.8], opacity: [0.8, 0] },
      { duration: 0.5, ease: 'easeOut' },
    ).finished.then(() => ring.remove());
  });
}
