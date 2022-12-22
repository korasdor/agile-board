import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StoreProvider from './providers/StoreProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <StoreProvider>
    <CssBaseline />
    <App />
  </StoreProvider>
  // </React.StrictMode>
);
