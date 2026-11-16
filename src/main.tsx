import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import App from './App';
import { initAnalytics } from './lib/analytics';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* LazyMotion + the `m` component keeps the animation bundle small. */}
      <LazyMotion features={domAnimation} strict>
        <App />
      </LazyMotion>
    </BrowserRouter>
  </React.StrictMode>,
);

// Analytics loads after the page is idle and only when VITE_GA_ID is set.
const idle = (cb: () => void) => ('requestIdleCallback' in window ? window.requestIdleCallback(cb) : window.setTimeout(cb, 1500));
window.addEventListener('load', () => idle(initAnalytics));
