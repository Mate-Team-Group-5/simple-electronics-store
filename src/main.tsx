import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router';
import './index.css';
import App from './App.tsx';
import { AccountProvider } from './context/AccountContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <AccountProvider>
        <App />
      </AccountProvider>
    </HashRouter>
  </StrictMode>,
);
