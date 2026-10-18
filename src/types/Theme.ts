export const Theme = {
  white: 'white',
  dark: 'dark',
} as const;

export type Theme = (typeof Theme)[keyof typeof Theme];
