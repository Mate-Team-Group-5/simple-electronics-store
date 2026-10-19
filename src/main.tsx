import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './index.css';
import App from './App.tsx';
import { AccountProvider } from './context/AccountContext.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <LanguageProvider>
        <AuthProvider>
          <AccountProvider>
            <App />
          </AccountProvider>
        </AuthProvider>
      </LanguageProvider>
    </HashRouter>
  </StrictMode>,
);
