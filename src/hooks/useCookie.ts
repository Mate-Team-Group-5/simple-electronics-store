import { useState } from 'react';

function getCookie(name: string) {
  const value = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`));

  return value ? JSON.parse(decodeURIComponent(value.split('=')[1])) : null;
}

export function useCookie(name: string, defaultValue: string | null = null) {
  const [value, setValue] = useState(() => {
    return getCookie(name) ?? defaultValue;
  });

  function updateValue(newValue: string) {
    setValue(newValue);

    document.cookie = [
      `${name}=${encodeURIComponent(JSON.stringify(newValue))}`,
      'path=/',
      'max-age=2592000', // 30 днів
      'SameSite=Lax',
    ].join('; ');
  }

  return [value, updateValue];
}
