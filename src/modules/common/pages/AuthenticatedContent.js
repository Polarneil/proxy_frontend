import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchTokenPayload } from '../data/apiService';

function AuthenticatedContent() {
  const { isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [accessToken, setAccessToken] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [error, setError] = useState(null); // Add error state
  const auth0Audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  useEffect(() => {
    const fetchTokens = async () => {
      if (isAuthenticated && getAccessTokenSilently && getIdTokenClaims) {
        try {
          const accessTokenValue = await getAccessTokenSilently({
            audience: auth0Audience,
          });
          setAccessToken(accessTokenValue);
          console.log("Access Token:", accessTokenValue);

          const idTokenClaimsValue = await getIdTokenClaims();
          const rawIdToken = idTokenClaimsValue.__raw;
          setIdToken(rawIdToken);
          console.log("ID Token:", rawIdToken);

          try {
            const decodedPayload = await fetchTokenPayload(rawIdToken);
            setDecodedToken(decodedPayload);
            console.log("Decoded Token Payload:", decodedPayload);
          } catch (decodeError) {
            console.error("Error decoding token:", decodeError);
            setError("Error decoding token."); // Set error state
          }

        } catch (tokenError) {
          console.error("Error getting tokens:", tokenError);
          setError("Error fetching tokens."); // Set error state
        }
      }
    };

    fetchTokens();
  }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims, auth0Audience]);

  if (error) { // Display error message if error state is set
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {isAuthenticated && decodedToken && decodedToken.name && (
        <div>
          <h1>Hello, {decodedToken.name}!</h1>
          {accessToken && <p>Access Token: {accessToken.substring(0, 20)}...</p>}
          {idToken && <p>ID Token: {idToken.substring(0, 20)}...</p>}
          <div>
            <p>Decoded Subject: {decodedToken.sub}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthenticatedContent;