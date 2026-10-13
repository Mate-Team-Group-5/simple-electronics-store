import './Heart.css';

export const Heart = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      className="heart w-20 h-20 cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Like"
      role="img"
    >
      {/* Чорний контур */}
      <path
        d="M50 88 C42 80 8 57 8 32 C8 6 39 4 50 26 C61 4 92 6 92 32 C92 57 58 80 50 88 Z"
        fill="white"
        stroke="black"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const RedHeart = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-20 w-20 cursor-pointer"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Like"
      role="img"
    >
      <path
        d="M50 88 C42 80 8 57 8 32 C8 6 39 4 50 26 C61 4 92 6 92 32 C92 57 58 80 50 88 Z"
        fill="#EF4444"
      />
    </svg>
  );
};
