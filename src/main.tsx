import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './index.css';
import App from './App.tsx';
import { AccountProvider } from './context/AccountContext.tsx';
import { LanguageProvider } from './context/LanguageContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <LanguageProvider>
        <AccountProvider>
          <App />
        </AccountProvider>
      </LanguageProvider>
    </HashRouter>
  </StrictMode>,
);
