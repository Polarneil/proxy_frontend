import React, { useEffect, useState, useRef } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchTokenPayload, generateKey } from '../data/apiService';
import '../css/authenticated_content.css';
import CopyIcon from '@mui/icons-material/ContentCopy';

function AuthenticatedContent() {
    const { isAuthenticated, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
    const [accessToken, setAccessToken] = useState(null);
    const [idToken, setIdToken] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);
    const [error, setError] = useState(null);
    const auth0Audience = process.env.REACT_APP_AUTH0_AUDIENCE;
    const [selectedModels, setSelectedModels] = useState([]);
    const [generatedToken, setGeneratedToken] = useState(null);
    const [generateKeyError, setGenerateKeyError] = useState(null);
    const tokenRef = useRef(null);

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
                        setError("Error decoding token.");
                    }

                } catch (tokenError) {
                    console.error("Error getting tokens:", tokenError);
                    setError("Error fetching tokens.");
                }
            }
        };

        fetchTokens();
    }, [isAuthenticated, getAccessTokenSilently, getIdTokenClaims, auth0Audience]);

    const handleModelChange = (model) => {
        if (selectedModels.includes(model)) {
            setSelectedModels(selectedModels.filter(m => m !== model));
        } else {
            setSelectedModels([...selectedModels, model]);
        }
    };

    const handleGenerateKey = async () => {
        if (decodedToken && decodedToken.email) {
            try {
                const result = await generateKey(selectedModels, decodedToken.email);
                setGeneratedToken(result.token);
                setGenerateKeyError(null);
            } catch (keyError) {
                console.error("Error generating key:", keyError);
                setGenerateKeyError("Error generating key.");
                setGeneratedToken(null);
            }
        } else {
            setGenerateKeyError("User email not available.");
        }
    };

    const handleCopyToken = () => {
        if (tokenRef.current) {
            navigator.clipboard.writeText(tokenRef.current.textContent); // Changed to textContent
            alert("Token copied to clipboard!");
        }
    };

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="authenticated-content">
            {isAuthenticated && decodedToken && decodedToken.name && (
                <div className="content-container">
                    <span className="greeting-message">Hello, {decodedToken.name}!</span>

                    <div className="model-selection">
                        <span className="select-model-message">Select Models:</span>
                        <label>
                            <input
                                type="checkbox"
                                value="gpt-3.5-turbo"
                                checked={selectedModels.includes("gpt-3.5-turbo")}
                                onChange={() => handleModelChange("gpt-3.5-turbo")}
                            />
                            gpt-3.5-turbo
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="gpt-4o"
                                checked={selectedModels.includes("gpt-4o")}
                                onChange={() => handleModelChange("gpt-4o")}
                            />
                            gpt-4o
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="o1-mini"
                                checked={selectedModels.includes("o1-mini")}
                                onChange={() => handleModelChange("o1-mini")}
                            />
                            o1-mini
                        </label>
                         <label>
                            <input
                                type="checkbox"
                                value="gpt-4o-mini"
                                checked={selectedModels.includes("gpt-4o-mini")}
                                onChange={() => handleModelChange("gpt-4o-mini")}
                            />
                            gpt-4o-mini
                        </label>
                    </div>

                    <button className="generate-button" onClick={handleGenerateKey}>Generate Key</button>

                    {generateKeyError && <p className="error-message">{generateKeyError}</p>}

                    {generatedToken && (
                        <div className="token-display">
                            <p ref={tokenRef}>{generatedToken}</p>
                            <button className="copy-button" onClick={handleCopyToken}>
                                <CopyIcon />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AuthenticatedContent;
