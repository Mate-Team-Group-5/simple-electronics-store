import { createContext, useContext, useState, type ReactNode } from 'react';
import { useAuthToken } from '@/hooks/useAuthToken';
import { loginUser, registerUser } from '@/services/user';
import type { User } from '@/types/User';
import { useAccountContext } from '@/context/AccountContext';
import type { CartProduct } from '@/types/Cart';

const USER_KEY = 'auth_user';

type RegisterData = {
  email: string;
  password: string;
  phone: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
};

function readSavedUser(): User | null {
  try {
    const saved = sessionStorage.getItem(USER_KEY);

    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

// A JWT has 3 parts separated by dots; the middle one is JSON with `exp`
// (expiration time in seconds). We only read it, we don't verify it.
function isTokenExpired(token: string): boolean {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));

    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { token, setToken, clearToken } = useAuthToken();
  const [user, setUser] = useState<User | null>(readSavedUser);
  const { updateFavorites, updateCart } = useAccountContext();

  const saveUser = (nextUser: User | null) => {
    setUser(nextUser);

    try {
      if (nextUser) {
        sessionStorage.setItem(USER_KEY, JSON.stringify(nextUser));
        updateFavorites(nextUser.favorites);
        updateCart(nextUser.cart as CartProduct[]);
      } else {
        sessionStorage.removeItem(USER_KEY);
      }
    } catch {
      // storage can be unavailable (private mode) — the user stays in memory
    }
  };

  const login = async (email: string, password: string) => {
    const response = await loginUser(email, password);

    setToken(response.token);
    saveUser(response.user);
  };

  const register = async ({ email, password, phone }: RegisterData) => {
    await registerUser(email, password, phone);
    await login(email, password);
  };

  const logout = () => {
    clearToken();
    saveUser(null);
  };

  const isAuthenticated =
    user !== null && token !== null && !isTokenExpired(token);

  return (
    <AuthContext.Provider
      value={{
        user: isAuthenticated ? user : null,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
