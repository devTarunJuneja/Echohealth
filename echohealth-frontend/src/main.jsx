// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.jsx'
import './index.css'

// Debug: Log the env values
console.log("AUTH0 DOMAIN: ", import.meta.env.VITE_AUTH0_DOMAIN);
console.log("AUTH0 CLIENT ID: ", import.meta.env.VITE_AUTH0_CLIENT_ID);
console.log("AUTH0 AUDIENCE: ", import.meta.env.VITE_AUTH0_AUDIENCE);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
)
