import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './modules/app/App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0ClientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: "http://localhost:8080/callback",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
