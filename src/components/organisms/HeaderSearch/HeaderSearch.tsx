import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { Link, useNavigate } from 'react-router';
import { Search, X } from 'lucide-react';
import { cn } from 'cn';
import { useAllProducts } from '@/hooks/useAllProducts';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useLanguage } from '@/context/LanguageContext';
import { searchProducts } from '@/utils/searchProducts';
import type { Product } from '@/types/Product';

const MAX_RESULTS = 6;
const SEARCH_DELAY = 300;

function getProductLink(product: Product) {
  return `/${product.category}/${product.itemId}`;
}

export function HeaderSearch() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [shouldLoad, setShouldLoad] = useState(false);

  const products = useAllProducts(shouldLoad);
  const debouncedQuery = useDebouncedValue(query, SEARCH_DELAY);
  const results = useMemo(
    () => searchProducts(products, debouncedQuery, MAX_RESULTS),
    [products, debouncedQuery],
  );

  const hasQuery = query.trim().length > 0;
  const showDropdown =
    isDropdownOpen && hasQuery && debouncedQuery.trim().length > 0;

  useEffect(() => {
    if (!isDropdownOpen && !isPanelOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setIsPanelOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isDropdownOpen, isPanelOpen]);

  const close = () => {
    setQuery('');
    setActiveIndex(-1);
    setIsDropdownOpen(false);
    setIsPanelOpen(false);
  };

  const togglePanel = () => {
    if (isPanelOpen) {
      close();

      return;
    }

    setIsPanelOpen(true);
    setShouldLoad(true);
    // wait until the panel is rendered, then focus the input
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const openProduct = (product: Product) => {
    navigate(getProductLink(product));
    close();
    inputRef.current?.blur();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      close();
      inputRef.current?.blur();

      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();

      // Enter can be pressed before the delay ends:
      // then we search the current text right away
      const isUpToDate = query === debouncedQuery;
      const currentResults =
        isUpToDate ? results : searchProducts(products, query, MAX_RESULTS);
      const product = currentResults[isUpToDate ? Math.max(activeIndex, 0) : 0];

      if (product) {
        openProduct(product);
      }

      return;
    }

    if (!showDropdown || results.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1));
    }
  };

  return (
    <div
      ref={rootRef}
      className="flex h-full items-center desktop:relative desktop:px-2"
    >
      <button
        type="button"
        onClick={togglePanel}
        aria-label={t(isPanelOpen ? 'search.close' : 'search.open')}
        aria-expanded={isPanelOpen}
        className="flex h-full cursor-pointer items-center px-1.5 text-card-primary-text desktop:hidden"
      >
        {isPanelOpen ?
          <X size={16} />
        : <Search size={16} />}
      </button>

      <div
        className={cn(
          'absolute inset-x-0 top-full z-50 border-b border-card-border-background bg-main-beak p-3',
          'desktop:static desktop:block desktop:border-0 desktop:bg-transparent desktop:p-0',
          !isPanelOpen && 'hidden',
        )}
      >
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-text-secondary"
          />

          <input
            ref={inputRef}
            type="search"
            role="combobox"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(-1);
              setIsDropdownOpen(true);
            }}
            onFocus={() => {
              setShouldLoad(true);
              setIsDropdownOpen(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={t('search.placeholder')}
            aria-label={t('search.label')}
            aria-expanded={showDropdown}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined
            }
            className="h-10 w-full rounded-full border border-card-border-background bg-transparent pr-9 pl-9 text-sm text-card-primary-text outline-none placeholder:text-text-secondary focus:border-accent-purple desktop:w-48 [&::-webkit-search-cancel-button]:hidden"
          />

          {hasQuery && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label={t('search.clear')}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-text-secondary hover:text-card-primary-text"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {showDropdown && (
          <ul
            id={listId}
            role="listbox"
            aria-label={t('search.label')}
            className="mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-card-border-background bg-card-background p-1 shadow-lg desktop:absolute desktop:top-full desktop:right-2 desktop:w-96"
          >
            {results.length === 0 && (
              <li className="px-3 py-4 text-center text-sm text-text-secondary">
                {t('search.noResults', { query: debouncedQuery.trim() })}
              </li>
            )}

            {results.map((product, index) => (
              <li
                key={product.itemId}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === activeIndex}
              >
                <Link
                  to={getProductLink(product)}
                  onClick={close}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg p-2 text-card-primary-text transition-colors',
                    index === activeIndex && 'bg-card-border-background',
                  )}
                >
                  <img
                    src={product.image}
                    alt=""
                    className="size-10 shrink-0 object-contain"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm">
                    {product.name}
                  </span>
                  <span className="shrink-0 text-sm font-bold">
                    ${product.price}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
