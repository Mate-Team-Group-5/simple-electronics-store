export type FlyTarget = 'cart' | 'favourites';

const FLY_DURATION = 700;
const ARC_HEIGHT = 120;

function findVisibleTarget(target: FlyTarget) {
  const candidates = document.querySelectorAll<HTMLElement>(
    `[data-fly-target="${target}"]`,
  );

  return Array.from(candidates).find(
    (element) => element.getClientRects().length > 0,
  );
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

  const flyingCopy = source.cloneNode(true) as HTMLElement;

  Object.assign(flyingCopy.style, {
    position: 'fixed',
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
    margin: '0',
    zIndex: '50',
    pointerEvents: 'none',
  });

  document.body.append(flyingCopy);

  const animation = flyingCopy.animate(
    [
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      {
        transform: `translate(${dx / 2}px, ${dy / 2 - ARC_HEIGHT}px) scale(0.5)`,
        opacity: 0.9,
      },
      { transform: `translate(${dx}px, ${dy}px) scale(0.1)`, opacity: 0.3 },
    ],
    { duration: FLY_DURATION, easing: 'ease-in-out' },
  );

  animation.onfinish = () => {
    flyingCopy.remove();
    targetElement.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(1.15)' },
        { transform: 'scale(1)' },
      ],
      { duration: 250, easing: 'ease-out' },
    );
  };
}
