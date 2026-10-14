import { useAccountContext } from '@/context/AccountContext';

export function useFavourites() {
  const { favoriteProducts, addFavorites, removeFavorites } =
    useAccountContext();

  const isFavourite = (id: number) => favoriteProducts.includes(id);

  const toggleFavourite = (id: number) => {
    if (isFavourite(id)) {
      removeFavorites(id);
    } else {
      addFavorites(id);
    }
  };

  return { isFavourite, toggleFavourite };
}
