import React, { useState } from 'react';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from '../common/components/loading';
import AuthenticatedContent from '../common/pages/AuthenticatedContent';
import logo from '../common/img/logo.svg';
import DocsPopup from '../common/components/docs';
import './App.css';

function App() {
  const { isLoading, user } = useAuth0();
  const [isDocsPopupOpen, setIsDocsPopupOpen] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  const handleDocsClick = () => {
    setIsDocsPopupOpen(true);
  };

  const closeDocsPopup = () => {
    setIsDocsPopupOpen(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <img src={logo} alt="Logo" className="app-logo" />
        {user && (
          <div className="user-actions">
            <button
              onClick={handleDocsClick}
              className="docs-button"
            >
              Docs
            </button>
            <div className="user-initials">
              {user.name.split(" ").map(word => word[0]).join("").toUpperCase()}
            </div>
          </div>
        )}
      </header>
      <AuthenticatedContent />
      <DocsPopup isOpen={isDocsPopupOpen} onClose={closeDocsPopup} />
    </div>
  );
}

const AuthenticatedApp = withAuthenticationRequired(App, {
  onRedirecting: () => <Loading />,
});

export default AuthenticatedApp;
