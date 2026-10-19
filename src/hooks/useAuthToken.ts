import { useState } from 'react';

export const useAuthToken = () => {
  const TOKEN_KEY = 'auth_jwt_token';

  // 1. Initialize state with token from sessionStorage if it exists
  const [token, setToken] = useState(() => {
    try {
      return sessionStorage.getItem(TOKEN_KEY) || null;
    } catch (error) {
      console.error('Error reading sessionStorage:', error);
      return null;
    }
  });

  const saveToken = (userToken: string) => {
    try {
      if (userToken) {
        sessionStorage.setItem(TOKEN_KEY, userToken);
        setToken(userToken);
      } else {
        removeToken(); // If empty string or null is passed, clear it
      }
    } catch (error) {
      console.error('Error setting sessionStorage:', error);
    }
  };

  const removeToken = () => {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
      setToken(null);
    } catch (error) {
      console.error('Error removing from sessionStorage:', error);
    }
  };

  return {
    token,
    setToken: saveToken,
    clearToken: removeToken,
    isAuthenticated: !!token,
  };
};
