import { animate } from 'motion/react';

export type FlyTarget = 'cart' | 'favourites';

const ARC_HEIGHT = 140;
const MIN_TOP = 12;
const PARTICLES_COUNT = 8;
const PARTICLE_DISTANCE = 26;

type Point = { x: number; y: number };

function findVisibleTarget(target: FlyTarget) {
  const candidates = document.querySelectorAll<HTMLElement>(
    `[data-fly-target="${target}"]`,
  );

  return Array.from(candidates).find(
    (element) => element.getClientRects().length > 0,
  );
}

function getCenter(rect: DOMRect): Point {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

// If the image is scrolled under the header or below the screen,
// the copy starts from the nearest visible place instead
function getVisibleRect(rect: DOMRect, minTop: number) {
  const maxTop = window.innerHeight - rect.height;
  const top = Math.min(Math.max(rect.top, minTop), Math.max(maxTop, minTop));

  return new DOMRect(rect.left, top, rect.width, rect.height);
}

// Point on a quadratic Bezier curve: start → (pulled to) control → end
function getCurvePoint(start: Point, control: Point, end: Point, t: number) {
  const a = (1 - t) * (1 - t);
  const b = 2 * (1 - t) * t;
  const c = t * t;

  return {
    x: a * start.x + b * control.x + c * end.x,
    y: a * start.y + b * control.y + c * end.y,
  };
}

function createOverlay(styles: Partial<CSSStyleDeclaration>) {
  const element = document.createElement('span');

  Object.assign(element.style, {
    position: 'fixed',
    zIndex: '60',
    pointerEvents: 'none',
    ...styles,
  });

  document.body.append(element);

  return element;
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

// The icon pops with a spring, a ring spreads out and small particles burst
function celebrate(targetElement: HTMLElement) {
  const center = getCenter(targetElement.getBoundingClientRect());

  animate(
    targetElement,
    { scale: [1.35, 1] },
    { type: 'spring', stiffness: 520, damping: 11 },
  );

  const ring = createOverlay({
    left: `${center.x - 20}px`,
    top: `${center.y - 20}px`,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '2px solid var(--color-accent-purple)',
  });

  animate(
    ring,
    { scale: [0.4, 1.8], opacity: [0.8, 0] },
    { duration: 0.5, ease: 'easeOut' },
  ).finished.then(() => ring.remove());

  for (let i = 0; i < PARTICLES_COUNT; i++) {
    const angle = (i / PARTICLES_COUNT) * Math.PI * 2;
    const particle = createOverlay({
      left: `${center.x - 3}px`,
      top: `${center.y - 3}px`,
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: 'var(--color-accent-purple)',
    });

    animate(
      particle,
      {
        x: [0, Math.cos(angle) * PARTICLE_DISTANCE],
        y: [0, Math.sin(angle) * PARTICLE_DISTANCE],
        scale: [1, 0.3],
        opacity: [1, 0],
      },
      { duration: 0.55, ease: 'easeOut' },
    ).finished.then(() => particle.remove());
  }
}

export function flyToTarget(source: HTMLElement, target: FlyTarget) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const targetElement = findVisibleTarget(target);

  if (!targetElement) {
    return;
  }

  const targetRect = targetElement.getBoundingClientRect();
  const end = getCenter(targetRect);
  const sourceRect = getVisibleRect(
    source.getBoundingClientRect(),
    targetRect.bottom,
  );
  const start = getCenter(sourceRect);

  // The control point is above the middle of the path, so the copy flies
  // along an arc and "drops" into the icon. It never goes above the screen.
  const control = {
    x: (start.x + end.x) / 2,
    y: Math.max(Math.min(start.y, end.y) - ARC_HEIGHT, MIN_TOP),
  };

  const distance = Math.hypot(end.x - start.x, end.y - start.y);
  const duration = Math.min(Math.max(0.55 + distance / 2000, 0.65), 1);
  const tilt = target === 'cart' ? -1 : 1;

  const copy = createFlyingCopy(source, sourceRect);

  // Motion animates a number from 0 to 1, and on every frame
  // we place the copy on the curve ourselves
  animate(0, 1, {
    duration,
    ease: [0.45, 0, 0.2, 1],
    onUpdate: (progress) => {
      const point = getCurvePoint(start, control, end, progress);

      // a small "jump" at the start, then the copy shrinks into the icon
      const scale =
        progress < 0.15 ?
          1 + 0.08 * (progress / 0.15)
        : 1.08 - 0.96 * ((progress - 0.15) / 0.85) ** 1.3;

      // tilts during the flight and lands straight
      const rotate = tilt * 14 * Math.sin(Math.PI * progress);

      copy.style.transform = `translate(${point.x - start.x}px, ${point.y - start.y}px) scale(${scale}) rotate(${rotate}deg)`;
      copy.style.opacity = String(
        progress < 0.8 ? 1 : 1 - (progress - 0.8) * 2,
      );
    },
  }).finished.then(() => {
    copy.remove();
    celebrate(targetElement);
  });
}
