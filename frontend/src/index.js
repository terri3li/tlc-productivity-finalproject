import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {Auth0Provider} from "@auth0/auth0-react"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
  <Auth0Provider
  domain="dev-hccg5xhg5sexoulh.us.auth0.com"
  clientId="JBvFXkYMZYdl4e7j6jCsR78c8xuUmtUK"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
  <App />
</Auth0Provider>
  </React.StrictMode>
);

