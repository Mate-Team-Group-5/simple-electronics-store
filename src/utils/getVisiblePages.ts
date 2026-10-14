export function getVisiblePages(
  currentPage: number,
  totalPages: number,
  maxVisible = 4,
) {
  const start = Math.max(
    1,
    Math.min(currentPage - 1, totalPages - maxVisible + 1),
  );
  const end = Math.min(totalPages, start + maxVisible - 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
