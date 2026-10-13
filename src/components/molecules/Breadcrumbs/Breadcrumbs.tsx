import { Fragment } from 'react';
import { Link } from 'react-router';
import { ChevronRight, House } from 'lucide-react';
import { cn } from 'cn';

type BreadcrumbItem = {
  label: string;
  to?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className={className}
    >
      <ol className="flex items-center gap-2 text-xs font-semibold">
        <li>
          <Link
            to="/"
            aria-label="Home"
            className="flex text-text-primary transition-colors hover:text-text-secondary"
          >
            <House size={16} />
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={item.label}>
              <li
                aria-hidden="true"
                className="flex text-icons"
              >
                <ChevronRight size={16} />
              </li>

              <li>
                {item.to && !isLast ?
                  <Link
                    to={item.to}
                    className="text-text-primary transition-colors hover:text-text-secondary"
                  >
                    {item.label}
                  </Link>
                : <span
                    aria-current="page"
                    className={cn('text-text-secondary')}
                  >
                    {item.label}
                  </span>
                }
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
