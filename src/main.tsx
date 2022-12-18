import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { store } from './app/store';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const container = document.getElementById('root') as HTMLElement;
import.meta.env.DEV && document.body.setAttribute('class', 'debug-screens');
if (!container) throw new Error('Container "root" was not found!');
const root = ReactDOM.createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,
);
