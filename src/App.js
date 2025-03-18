import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from './loading';

function App() {
  const { user, isAuthenticated, isLoading, error, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [idToken, setIdToken] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      if (isAuthenticated && getAccessTokenSilently && getIdTokenClaims) {
        try {
          // Fetch Access Token
          const accessTokenValue = await getAccessTokenSilently({
            audience: 'com.nutrimatic.api', // Replace with your API Identifier
          });
          setAccessToken(accessTokenValue);
          console.log("Access Token:", accessTokenValue);

          // Fetch ID Token
          const idTokenClaimsValue = await getIdTokenClaims();
          setIdToken(idTokenClaimsValue.__raw); // Access the raw id_token string.
          console.log("ID Token:", idTokenClaimsValue.__raw);

        } catch (tokenError) {
          console.error("Error getting tokens:", tokenError);
        }
      }
    };

    fetchTokens();
  }, [isLoading, isAuthenticated, error, getAccessTokenSilently, getIdTokenClaims]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isAuthenticated && (
          <div>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            {accessToken && <p>Access Token: {accessToken.substring(0,20)}...</p>}
            {idToken && <p>ID Token: {idToken.substring(0,20)}...</p>}
          </div>
        )}
      </header>
    </div>
  );
}

const AuthenticatedApp = withAuthenticationRequired(App, {
  onRedirecting: () => <Loading />,
});

export default AuthenticatedApp;
